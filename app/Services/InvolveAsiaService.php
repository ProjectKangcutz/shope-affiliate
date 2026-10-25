<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Product;
use App\Models\PriceHistory;

class InvolveAsiaService
{
    protected string $apiKey;
    protected string $apiSecret;
    protected string $publisherId;
    protected string $baseUrl;
    protected string $defaultOfferId;

    public function __construct()
    {
        $this->apiKey = (string) config('services.involve_asia.api_key');
        $this->apiSecret = (string) config('services.involve_asia.api_secret');
        $this->publisherId = (string) config('services.involve_asia.publisher_id');
        $this->baseUrl = (string) config('services.involve_asia.base_url');
        $this->defaultOfferId = (string) config('services.involve_asia.shopee_offer_id');
    }

    /**
     * 1. Generate Deeplink Ber-tracking dengan Sub-ID (sub_id1, sub_id2, sub_id3)
     */
    public function generateDeeplink(string $destinationUrl, array $subIds = [], ?string $offerId = null): string
    {
        $offerId = $offerId ?? $this->defaultOfferId;

        $params = [
            'offer_id' => $offerId,
            'aff_id'   => $this->publisherId,
            'url'      => $destinationUrl,
        ];

        foreach ($subIds as $key => $value) {
            if (!empty($value)) {
                $params[$key] = $value;
            }
        }

        // Format redirect resmi Involve Asia
        return "https://invol.co/aff_m?" . http_build_query($params);
    }

    /**
     * 2. Sinkronisasi Otomatis Katalog Produk dari Product Feed API Involve Asia
     */
    public function syncProductCatalog(): array
    {
        Log::info("Memulai sinkronisasi otomatis katalog Shopee via Involve Asia API...");

        // Panggil Product Feed API Involve Asia
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Accept'        => 'application/json',
        ])->timeout(30)->get("{$this->baseUrl}/publisher/v1/product-feeds", [
            'offer_id' => $this->defaultOfferId,
            'limit'    => 100,
        ]);

        $syncedCount = 0;
        $priceDrops = 0;
        $items = $response->json('data') ?? [];

        foreach ($items as $item) {
            $product = Product::where('sku', $item['sku'] ?? $item['product_id'])->first();

            if ($product) {
                $newPrice = (float) $item['sale_price'];
                $oldPrice = (float) $product->price;

                if ($newPrice < $oldPrice) {
                    $priceDrops++;
                }

                // Update harga katalog terkini
                $product->update([
                    'price'            => $newPrice,
                    'discount_percent' => (int) round((($product->original_price - $newPrice) / $product->original_price) * 100),
                    'stock_left'       => $item['stock'] ?? $product->stock_left,
                ]);

                // Simpan ke riwayat harga (Price History) untuk grafik 90 hari
                PriceHistory::create([
                    'product_id'  => $product->id,
                    'price'       => $newPrice,
                    'is_lowest'   => $newPrice <= $product->record_low_price,
                    'recorded_at' => now(),
                ]);

                $syncedCount++;
            }
        }

        return [
            'status'          => 'success',
            'products_synced' => $syncedCount,
            'price_drops'     => $priceDrops,
            'synced_at'       => now()->toDateTimeString(),
        ];
    }
}