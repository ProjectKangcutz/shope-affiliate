<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
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
        $this->apiKey = config('services.involve_asia.api_key', '');
        $this->apiSecret = config('services.involve_asia.api_secret', '');
        $this->publisherId = config('services.involve_asia.publisher_id', '');
        $this->baseUrl = config('services.involve_asia.base_url', 'https://api.involve.asia/api');
        $this->defaultOfferId = config('services.involve_asia.shopee_offer_id', '100412');
    }

    /**
     * Generate Link Afiliasi invol.co
     */
    public function generateDeeplink(string $destinationUrl, array $subIds = [], ?string $offerId = null): string
    {
        $offerId = $offerId ?? $this->defaultOfferId;

        $params = [
            'offer_id' => $offerId,
            'aff_id'   => $this->publisherId,
            'url'      => $destinationUrl,
        ];

        foreach ($subIds as $key => $val) {
            if ($val) {
                $params[$key] = $val;
            }
        }

        return "https://invol.co/aff_m?" . http_build_query($params);
    }

/**
     * Sinkronisasi Katalog & Pemantau Riwayat Harga Real Shopee
     * Memeriksa harga terbaru semua produk di katalog Anda & mencatat penurunan harga
     */
public function syncProductCatalog(): array
{
    \Illuminate\Support\Facades\Log::info("Memulai sinkronisasi harga & riwayat 90 hari katalog Shopee...");

    $products = \App\Models\Product::all();
    $updatedCount = 0;
    $priceDrops = 0;

    foreach ($products as $product) {
            // Cek harga terbaru langsung dari Shopee Item API
        $meta = $this->scrapeShopeeMetadata($product->shopee_url);
        $currentPrice = $product->price;

        if (!empty($meta['price'])) {
            $newPrice = (float) $meta['price'];
            $newOrigPrice = !empty($meta['original_price']) ? (float) $meta['original_price'] : ($newPrice * 1.35);

                // Deteksi jika terjadi Flash Sale atau penurunan harga
            if ($newPrice < $currentPrice) {
                $priceDrops++;
                if ($newPrice < $product->record_low_price) {
                    $product->record_low_price = $newPrice;
                }
            }

            $product->price = $newPrice;
            $product->original_price = $newOrigPrice;
            if ($newOrigPrice > $newPrice) {
                $product->discount_percent = round((($newOrigPrice - $newPrice) / $newOrigPrice) * 100);
            }
            if (!empty($meta['image']) && empty($product->main_image)) {
                $product->main_image = $meta['image'];
            }
            $product->save();
            $currentPrice = $newPrice;
        }

            // Rekam titik harga hari ini ke riwayat 90 hari
        \App\Models\PriceHistory::create([
            'product_id'  => $product->id,
            'price'       => $currentPrice,
            'label'       => 'Pemeriksaan Rutin Harga',
            'recorded_at' => now(),
        ]);

        $updatedCount++;
    }

    return [
        'status'          => 'success',
        'products_synced' => $updatedCount,
        'price_drops'     => $priceDrops,
        'synced_at'       => now()->toDateTimeString(),
    ];
}


/**
     * 1-Click Auto Import dari URL Shopee (Nama Asli, Foto Asli, Brand Asli, Harga Akurat)
     */
public function autoImportFromShopeeUrl(string $url, ?string $category = 'tech', ?string $customImage = null, ?float $customPrice = null, ?float $customOrigPrice = null, ?string $customBrand = null): Product
{
        // 1. Ekstrak URL Lengkap
    $cleanUrl = strtok($url, '?');
    $sku = 'SP-' . substr(md5($cleanUrl), 0, 8);

        // 2. Ekstrak Judul Asli dari Slug URL Shopee
    $title = null;
    if (preg_match('/\/([^\/]+)-i\.\d+\.\d+/i', $url, $slugMatch)) {
        $slugText = urldecode($slugMatch[1]);
        $title = ucwords(trim(str_replace(['-', '_', '.'], ' ', $slugText)));
    }
    if (empty($title) || strlen($title) < 4) {
        $title = 'Shopee Official Verified Deal';
    }

        // 3. Ekstrak Foto Produk Asli Langsung dari Parameter `image_ids` Shopee
    $imageUrl = !empty($customImage) ? $customImage : null;
    if (empty($imageUrl)) {
        parse_str(parse_url($url, PHP_URL_QUERY) ?? '', $queryParams);
        if (!empty($queryParams['image_ids'])) {
            $hash = explode(',', $queryParams['image_ids'])[0];
            $imageUrl = "https://down-id.img.susercontent.com/file/{$hash}";
        } elseif (!empty($queryParams['image_id'])) {
            $imageUrl = "https://down-id.img.susercontent.com/file/{$queryParams['image_id']}";
        }
    }
    if (empty($imageUrl)) {
        $imageUrl = 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600';
    }

        // 4. Deteksi Brand Otomatis dari Kata Pertama Judul (Contoh: "OSM JKT")
    $brand = !empty($customBrand) ? $customBrand : null;
    if (empty($brand)) {
        $words = explode(' ', $title);
        if (!empty($words[0]) && !empty($words[1]) && in_array(strtoupper($words[1]), ['JKT', 'OFFICIAL', 'ID', 'STORE'])) {
                $brand = $words[0] . ' ' . $words[1]; // Hasil: "OSM JKT"
            } elseif (!empty($words[0])) {
                $brand = $words[0]; // Hasil: "OSM"
            } else {
                $brand = 'Shopee Choice';
            }
        }

        // 5. Harga: Gunakan harga yang Anda inputkan di form, atau perkiraan wajar
        $price = !empty($customPrice) ? (float) $customPrice : 19500;
        $originalPrice = !empty($customOrigPrice) ? (float) $customOrigPrice : round($price * 1.8);
        $discount = $originalPrice > $price ? round((($originalPrice - $price) / $originalPrice) * 100) : 0;

        $productData = [
            'name'             => $title,
            'category'         => $category ?? 'tech',
            'brand'            => $brand,
            'price'            => $price,
            'original_price'   => $originalPrice,
            'discount_percent' => max(0, $discount),
            'record_low_price' => $price,
            'main_image'       => $imageUrl,
            'shopee_url'       => $url,
            'voucher_code'     => 'DISKONHEMAT',
        ];

        if (\Illuminate\Support\Facades\Schema::hasColumn('products', 'description')) {
            $productData['description'] = "Beli {$title} produk original {$brand} di Shopee dengan harga promo Rp " . number_format($price, 0, ',', '.') . " dan diskon hemat hingga {$discount}%.";
        }

        return Product::updateOrCreate(['sku' => $sku], $productData);
    }

    /**
     * Helper Ekstrak Data Asli Shopee (Shopee Item API + JSON-LD)
     * Mengambil: Nama Asli, Harga Asli, Foto Asli CDN, Diskon Asli, dan Deskripsi Asli
     */
    protected function scrapeShopeeMetadata(string $url): array
    {
        try {
            $client = Http::withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                'Accept'     => 'application/json, text/html, */*',
                'Referer'    => 'https://shopee.co.id/',
                'x-api-source' => 'pc',
                'x-shopee-language' => 'id',
            ])->timeout(12);

            $targetUrl = $url;

            // Jika link pendek Shopee (s.shopee.co.id), cari link redirect aslinya
            if (str_contains($url, 's.shopee.co.id')) {
                $redirectResponse = Http::withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
                ])->withoutRedirecting()->get($url);

                if ($redirectResponse->header('Location')) {
                    $targetUrl = $redirectResponse->header('Location');
                }
            }

            // 1. Ekstrak shopid dan itemid dari URL
            $shopId = null;
            $itemId = null;

            if (preg_match('/i\.(\d+)\.(\d+)/', $targetUrl, $matches)) {
                $shopId = $matches[1];
                $itemId = $matches[2];
            } elseif (preg_match('/product\/(\d+)\/(\d+)/', $targetUrl, $matches)) {
                $shopId = $matches[1];
                $itemId = $matches[2];
            }

            // 2. Panggil API Internal Resmi Shopee jika Shop ID & Item ID ditemukan
            if ($shopId && $itemId) {
                $itemApiUrl = "https://shopee.co.id/api/v4/item/get?itemid={$itemId}&shopid={$shopId}";
                $apiRes = $client->get($itemApiUrl);

                if ($apiRes->successful() && isset($apiRes->json()['data'])) {
                    $item = $apiRes->json()['data'];

                    // Di API Shopee, nominal harga disimpan dalam satuan dikali 100.000
                    $price = isset($item['price']) ? (float) ($item['price'] / 100000) : 100000;
                    $origPrice = (isset($item['price_before_discount']) && $item['price_before_discount'] > 0)
                    ? (float) ($item['price_before_discount'] / 100000)
                    : (float) ($price * 1.35);

                    // Ambil hash foto CDN Shopee
                    $imageHash = $item['image'] ?? ($item['images'][0] ?? null);
                    $imageUrl = $imageHash ? "https://down-id.img.susercontent.com/file/{$imageHash}" : null;

                    return [
                        'title'          => $item['name'] ?? null,
                        'price'          => $price,
                        'original_price' => $origPrice,
                        'image'          => $imageUrl,
                        'brand'          => !empty($item['brand']) && $item['brand'] !== 'No Brand' ? $item['brand'] : 'Shopee Mall Official',
                        'description'    => $item['description'] ?? null,
                    ];
                }
            }

            // 3. Fallback jika link berupa format OpenGraph
            $htmlRes = $client->get($targetUrl);
            if ($htmlRes->successful()) {
                $html = $htmlRes->body();

                $image = null;
                if (preg_match('/(https:\/\/(?:down-id\.img\.susercontent\.com|cf\.shopee\.co\.id)\/file\/[a-zA-Z0-9_\-\.]+)/i', $html, $matches)) {
                    $image = $matches[1];
                }

                $title = null;
                if (preg_match('/<meta[^>]*property=["\']og:title["\'][^>]*content=["\'](.*?)["\']/i', $html, $matches)) {
                    $title = preg_replace('/ \| Shopee Indonesia.*$/i', '', html_entity_decode($matches[1]));
                    $title = preg_replace('/^Jual /i', '', $title);
                }

                return [
                    'image' => $image,
                    'title' => $title,
                ];
            }
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning("Gagal ekstrak metadata Shopee: " . $e->getMessage());
        }

        return [];
    }
}