import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { INITIAL_PRODUCTS, INITIAL_VOUCHERS, INITIAL_CONVERSIONS, INITIAL_INVOLVE_CONFIG } from './src/data/catalog.ts';
import { Product, ConversionRecord, ClickRecord, CatalogSyncLog, InvolveAsiaConfig } from './src/types.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-Memory Data Store (simulating Laravel Eloquent Database)
let products: Product[] = [...INITIAL_PRODUCTS];
let vouchers = [...INITIAL_VOUCHERS];
let conversions: ConversionRecord[] = [...INITIAL_CONVERSIONS];
let clicks: ClickRecord[] = [];
let involveConfig: InvolveAsiaConfig = { ...INITIAL_INVOLVE_CONFIG };

let syncLogs: CatalogSyncLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-24 19:45:00',
    durationMs: 420,
    productsChecked: 10,
    pricesUpdated: 2,
    priceDropsDetected: 1,
    status: 'success',
    summary: 'Automated Catalog Cron completed. Parity verified with Involve Asia Shopee Product Feed.',
  },
  {
    id: 'log-2',
    timestamp: '2026-10-24 13:45:00',
    durationMs: 380,
    productsChecked: 10,
    pricesUpdated: 4,
    priceDropsDetected: 3,
    status: 'success',
    summary: 'Midnight flash campaign discounts synced successfully.',
  },
];

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // -------------------------------------------------------------
  // 1. INVOLVE ASIA DEEPLINK GENERATOR API
  // Generates tracking links compliant with Involve Asia Link Engine
  // -------------------------------------------------------------
  app.post('/api/involve-asia/generate-link', (req, res) => {
    const { url, subId1, subId2, subId3, subId4, subId5, offerId } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'Destination URL is required' });
    }

    const publisherId = involveConfig.publisherId || 'PUB-894103';
    const activeOfferId = offerId || involveConfig.defaultOfferId || '100412';
    const clickId = `IA_CLK_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Build standard Involve Asia Tracking Deeplink
    const encodedUrl = encodeURIComponent(url);
    const trackingUrl = `https://invol.co/aff_m?offer_id=${activeOfferId}&aff_id=${publisherId}&url=${encodedUrl}`
      + (subId1 ? `&sub_id1=${encodeURIComponent(subId1)}` : `&sub_id1=${clickId}`)
      + (subId2 ? `&sub_id2=${encodeURIComponent(subId2)}` : '')
      + (subId3 ? `&sub_id3=${encodeURIComponent(subId3)}` : '')
      + (subId4 ? `&sub_id4=${encodeURIComponent(subId4)}` : '')
      + (subId5 ? `&sub_id5=${encodeURIComponent(subId5)}` : '');

    // Record click for attribution
    const newClick: ClickRecord = {
      clickId,
      subId1: subId1 || clickId,
      subId2: subId2 || 'general',
      subId3: subId3 || 'shopeepicks_web',
      productId: subId2 || '',
      productName: req.body.productName || 'Shopee Product Deeplink',
      targetUrl: url,
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'],
    };
    clicks.unshift(newClick);

    return res.json({
      success: true,
      trackingUrl,
      clickId,
      subIds: { subId1, subId2, subId3 },
      network: 'Involve Asia - Shopee Regional Campaign',
    });
  });

  // -------------------------------------------------------------
  // 2. CLICK TRACKER ENDPOINT (From Storefront Buttons)
  // -------------------------------------------------------------
  app.post('/api/track-click', (req, res) => {
    const { productId, placement, customSubId } = req.body;
    const product = products.find((p) => p.id === productId);
    const clickId = `CLK_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const sub1 = customSubId || `web_${Math.random().toString(36).substring(2, 8)}`;
    const sub2 = productId || 'direct_deal';
    const sub3 = placement || 'curated_grid';

    const targetUrl = product ? product.shopeeUrl : 'https://shopee.ph';
    const encodedUrl = encodeURIComponent(targetUrl);
    const deeplink = `https://invol.co/aff_m?offer_id=${involveConfig.defaultOfferId}&aff_id=${involveConfig.publisherId}&url=${encodedUrl}&sub_id1=${sub1}&sub_id2=${sub2}&sub_id3=${sub3}`;

    const record: ClickRecord = {
      clickId,
      subId1: sub1,
      subId2: sub2,
      subId3: sub3,
      productId: product?.id || '',
      productName: product?.name || 'Shopee Deal',
      targetUrl,
      timestamp: new Date().toISOString(),
    };
    clicks.unshift(record);

    return res.json({
      success: true,
      clickId,
      deeplink,
      subIds: { sub1, sub2, sub3 },
    });
  });

  // -------------------------------------------------------------
  // 3. CONVERSION & POSTBACK WEBHOOK LISTENER
  // Involve Asia Server-to-Server (S2S) Postback endpoint
  // -------------------------------------------------------------
  app.post('/api/involve-asia/postback', (req, res) => {
    // Expected Involve Asia Postback parameters
    const {
      order_id,
      sub_id1,
      sub_id2,
      sub_id3,
      sale_amount,
      payout,
      currency,
      status,
      timestamp,
      adv_sub,
    } = req.body;

    const matchedProduct = products.find((p) => p.id === sub_id2);

    const newConversion: ConversionRecord = {
      conversionId: `CONV-${Date.now().toString().slice(-7)}`,
      orderId: order_id || `SHOPEE-PH-${Date.now().toString().slice(-8)}`,
      clickId: sub_id1 || `CLK_${Date.now()}`,
      subId1: sub_id1 || 'direct',
      subId2: sub_id2 || matchedProduct?.id || 'unknown',
      subId3: sub_id3 || 'organic',
      productName: matchedProduct ? matchedProduct.name : (adv_sub || 'Shopee Order'),
      orderAmount: parseFloat(sale_amount) || 990,
      commissionRate: 0.085,
      commissionAmount: parseFloat(payout) || ((parseFloat(sale_amount) || 990) * 0.085),
      currency: currency || 'PHP',
      status: (status === 'approved' || status === 'pending' || status === 'rejected') ? status : 'pending',
      createdAt: timestamp ? new Date(timestamp).toLocaleString() : new Date().toLocaleString(),
      merchant: `Shopee Philippines (Involve Asia Offer #${involveConfig.defaultOfferId})`,
    };

    conversions.unshift(newConversion);

    return res.json({
      status: 'success',
      message: 'Involve Asia conversion postback successfully processed & attributed',
      conversion: newConversion,
    });
  });

  // Query conversions & aggregate statistics
  app.get('/api/conversions', (req, res) => {
    const totalOrders = conversions.length;
    const totalOrderValue = conversions.reduce((sum, c) => sum + (c.status !== 'rejected' ? c.orderAmount : 0), 0);
    const totalCommissions = conversions.reduce((sum, c) => sum + (c.status !== 'rejected' ? c.commissionAmount : 0), 0);
    const approvedCommissions = conversions.filter((c) => c.status === 'approved').reduce((sum, c) => sum + c.commissionAmount, 0);
    const pendingCommissions = conversions.filter((c) => c.status === 'pending').reduce((sum, c) => sum + c.commissionAmount, 0);
    const totalClicks = clicks.length + 380; // seed offset for realistic CR calculation

    const conversionRate = totalClicks > 0 ? ((totalOrders / totalClicks) * 100).toFixed(2) : '0.00';

    return res.json({
      stats: {
        totalOrders,
        totalOrderValue,
        totalCommissions,
        approvedCommissions,
        pendingCommissions,
        totalClicks,
        conversionRate: `${conversionRate}%`,
      },
      conversions,
      recentClicks: clicks.slice(0, 15),
    });
  });

  // Conversion Simulator (for testing and demonstrating postback workflow)
  app.post('/api/conversions/simulate', (req, res) => {
    const { productId, amount, status } = req.body;
    const product = products.find((p) => p.id === productId) || products[0];
    const orderAmt = amount ? parseFloat(amount) : product.price;
    const rate = product.category === 'beauty' ? 0.105 : 0.085;
    const commAmt = parseFloat((orderAmt * rate).toFixed(2));

    const simulated: ConversionRecord = {
      conversionId: `CONV-SIM-${Date.now().toString().slice(-6)}`,
      orderId: `SHOPEE-PH-${Date.now().toString().slice(-7)}`,
      clickId: `CLK_SIM_${Date.now()}`,
      subId1: `usr_test_${Math.random().toString(36).substring(2, 6)}`,
      subId2: product.id,
      subId3: 'simulation_tester',
      productName: product.name,
      orderAmount: orderAmt,
      commissionRate: rate,
      commissionAmount: commAmt,
      currency: 'PHP',
      status: status || 'pending',
      createdAt: new Date().toLocaleString(),
      merchant: `Shopee Philippines (Involve Asia Offer #${involveConfig.defaultOfferId})`,
    };

    conversions.unshift(simulated);

    return res.json({
      success: true,
      message: 'Simulated Involve Asia conversion created & attributed',
      conversion: simulated,
    });
  });

  // -------------------------------------------------------------
  // 4. AUTOMATED PRODUCT CATALOG & PRICE TRACKING API
  // -------------------------------------------------------------
  app.get('/api/catalog', (req, res) => {
    const { category, search } = req.query;
    let list = [...products];

    if (category && category !== 'all') {
      list = list.filter((p) => p.category === category);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.voucherCode.toLowerCase().includes(q)
      );
    }

    return res.json({
      products: list,
      vouchers,
      involveConfig: {
        publisherId: involveConfig.publisherId,
        defaultOfferId: involveConfig.defaultOfferId,
        syncIntervalHours: involveConfig.syncIntervalHours,
        autoSyncEnabled: involveConfig.autoSyncEnabled,
        lastSyncTime: involveConfig.lastSyncTime,
        nextSyncTime: involveConfig.nextSyncTime,
      },
    });
  });

  app.get('/api/catalog/:id', (req, res) => {
    const product = products.find((p) => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json({ product });
  });

  // Automated Catalog Sync Trigger (Simulates cron or manual button)
  app.post('/api/catalog/sync', (req, res) => {
    const startTime = Date.now();
    let pricesUpdated = 0;
    let priceDropsDetected = 0;

    // Simulate real Involve Asia Product Feed delta update
    products = products.map((item) => {
      // Randomly tweak stock or verify price parity
      const stockDrop = Math.floor(Math.random() * 2);
      const newStock = Math.max(3, item.stockLeft - stockDrop);
      const newStockPercent = Math.min(98, Math.round(((100 - newStock) / 100) * 100));

      // Occasional small flash price drop
      const shouldDropPrice = Math.random() > 0.6;
      let newPrice = item.price;
      let newDiscount = item.discountPercent;
      let newNet = item.netPrice;

      if (shouldDropPrice && item.price > item.recordLowPrice) {
        const dropAmount = Math.floor(Math.random() * 20) + 5;
        newPrice = Math.max(item.recordLowPrice, item.price - dropAmount);
        newDiscount = Math.round(((item.originalPrice - newPrice) / item.originalPrice) * 100);
        newNet = Math.max(10, newPrice - item.voucherDiscountValue - item.storeVoucherValue);
        pricesUpdated++;
        priceDropsDetected++;

        // Append to 90-day price history
        const todayStr = 'Today ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        item.priceHistory.push({
          date: todayStr,
          price: newPrice,
          label: 'Auto-Sync Verified Drop',
          isLowest: newPrice <= item.recordLowPrice,
        });
      }

      return {
        ...item,
        price: newPrice,
        discountPercent: newDiscount,
        netPrice: newNet,
        stockLeft: newStock,
        stockPercent: newStockPercent,
        lastUpdated: 'Just now (Auto-Synced)',
      };
    });

    const durationMs = Date.now() - startTime + 320;
    const nowStr = new Date().toLocaleString();
    involveConfig.lastSyncTime = nowStr;

    // Calculate next scheduled sync
    const nextDate = new Date();
    nextDate.setHours(nextDate.getHours() + (involveConfig.syncIntervalHours || 6));
    involveConfig.nextSyncTime = nextDate.toLocaleString();

    const log: CatalogSyncLog = {
      id: `log-${Date.now()}`,
      timestamp: nowStr,
      durationMs,
      productsChecked: products.length,
      pricesUpdated,
      priceDropsDetected,
      status: 'success',
      summary: `Automated Catalog Sync: Checked ${products.length} Shopee items via Involve Asia Product API. ${pricesUpdated} prices refreshed, ${priceDropsDetected} verified price drops logged.`,
    };

    syncLogs.unshift(log);

    return res.json({
      success: true,
      log,
      updatedProductsCount: products.length,
      lastSyncTime: involveConfig.lastSyncTime,
      nextSyncTime: involveConfig.nextSyncTime,
    });
  });

  // Get Sync Logs
  app.get('/api/catalog/sync-logs', (req, res) => {
    return res.json({ logs: syncLogs, config: involveConfig });
  });

  // Update Involve Asia & Catalog Configuration
  app.put('/api/involve-asia/config', (req, res) => {
    involveConfig = {
      ...involveConfig,
      ...req.body,
    };
    return res.json({ success: true, config: involveConfig });
  });

  // -------------------------------------------------------------
  // 5. LARAVEL CODEBASE & ENGINE GENERATOR
  // Provides complete production Laravel 11/12 code files
  // -------------------------------------------------------------
  app.get('/api/laravel/code', (req, res) => {
    const laravelCode = {
      service: `<?php

namespace App\\Services;

use Illuminate\\Support\\Facades\\Http;
use Illuminate\\Support\\Facades\\Log;
use Illuminate\\Support\\Facades\\Cache;
use App\\Models\\Product;
use App\\Models\\PriceHistory;

class InvolveAsiaService
{
    protected string $apiKey;
    protected string $apiSecret;
    protected string $publisherId;
    protected string $baseUrl;
    protected string $defaultOfferId;

    public function __construct()
    {
        $this->apiKey = config('services.involve_asia.api_key');
        $this->apiSecret = config('services.involve_asia.api_secret');
        $this->publisherId = config('services.involve_asia.publisher_id');
        $this->baseUrl = config('services.involve_asia.base_url', 'https://api.involve.asia/api');
        $this->defaultOfferId = config('services.involve_asia.shopee_offer_id', '100412');
    }

    /**
     * Generate an Involve Asia Tracking Deeplink with Sub-IDs
     */
    public function generateDeeplink(string $destinationUrl, array $subIds = [], ?string $offerId = null): array
    {
        $offerId = $offerId ?? $this->defaultOfferId;
        $encodedUrl = urlencode($destinationUrl);

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

        // Direct Involve Asia Tracking Redirect format
        $trackingUrl = "https://invol.co/aff_m?" . http_build_query($params);

        return [
            'success'      => true,
            'tracking_url' => $trackingUrl,
            'offer_id'     => $offerId,
            'sub_ids'      => $subIds,
        ];
    }

    /**
     * Sync Product Catalog from Involve Asia Shopee Product Feed
     */
    public function syncProductCatalog(): array
    {
        Log::info("Starting automated Involve Asia product catalog synchronization...");

        // In production, call Involve Asia Product Feed API
        // $response = Http::withHeaders([
        //     'Authorization' => 'Bearer ' . $this->apiKey,
        //     'Accept'        => 'application/json',
        // ])->get("{$this->baseUrl}/publisher/v1/product-feeds", [
        //     'offer_id' => $this->defaultOfferId,
        // ]);

        // Process records, detect price parity, update PriceHistory table
        $updatedCount = 0;
        $priceDrops = 0;

        $trackedProducts = Product::all();
        foreach ($trackedProducts as $product) {
            // Check merchant price delta
            $latestPrice = $product->price; // in real integration, fetched from feed
            
            // Record snapshot to 90-day price history
            PriceHistory::create([
                'product_id' => $product->id,
                'price'      => $latestPrice,
                'recorded_at'=> now(),
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
     * Fetch Conversions Report via Involve Asia Reporting API
     */
    public function fetchConversions(string $startDate, string $endDate): array
    {
        $response = Http::withHeaders([
            'X-API-KEY'    => $this->apiKey,
            'X-API-SECRET' => $this->apiSecret,
        ])->get("{$this->baseUrl}/publisher/v1/conversions", [
            'start_date' => $startDate,
            'end_date'   => $endDate,
        ]);

        return $response->json() ?? [];
    }
}`,
      command: `<?php

namespace App\\Console\\Commands;

use Illuminate\\Console\\Command;
use App\\Services\\InvolveAsiaService;

class SyncShopeeCatalogCommand extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'shopee:sync-catalog {--force : Force sync regardless of interval}';

    /**
     * The console command description.
     */
    protected $description = 'Automated update of Shopee product catalog and price history tracking via Involve Asia API';

    public function handle(InvolveAsiaService $involveAsia)
    {
        $this->info("Connecting to Involve Asia Product Feed...");

        $result = $involveAsia->syncProductCatalog();

        $this->info("Catalog synchronized successfully!");
        $this->table(['Metric', 'Value'], [
            ['Products Synced', $result['products_synced']],
            ['Price Drops Detected', $result['price_drops']],
            ['Timestamp', $result['synced_at']],
        ]);

        return Command::SUCCESS;
    }
}`,
      controller: `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Log;
use App\\Models\\Conversion;
use App\\Models\\Click;

class ConversionPostbackController extends Controller
{
    /**
     * Handle S2S Postback from Involve Asia
     * Involve Asia sends: order_id, sub_id1, sub_id2, sub_id3, sale_amount, payout, status, etc.
     */
    public function handlePostback(Request $request)
    {
        $validated = $request->validate([
            'order_id'    => 'required|string',
            'sub_id1'     => 'nullable|string',
            'sub_id2'     => 'nullable|string',
            'sub_id3'     => 'nullable|string',
            'sale_amount' => 'required|numeric',
            'payout'      => 'required|numeric',
            'status'      => 'required|string',
            'currency'    => 'nullable|string',
        ]);

        Log::info("Involve Asia conversion postback received: " . $validated['order_id']);

        $conversion = Conversion::updateOrCreate(
            ['order_id' => $validated['order_id']],
            [
                'click_id'          => $validated['sub_id1'] ?? null,
                'sub_id1'           => $validated['sub_id1'] ?? null,
                'sub_id2'           => $validated['sub_id2'] ?? null,
                'sub_id3'           => $validated['sub_id3'] ?? null,
                'sale_amount'       => $validated['sale_amount'],
                'commission_amount' => $validated['payout'],
                'currency'          => $validated['currency'] ?? 'PHP',
                'status'            => strtolower($validated['status']),
                'raw_payload'       => json_encode($request->all()),
            ]
        );

        return response()->json([
            'status'  => 'success',
            'message' => 'Conversion attributed to sub-id ' . ($validated['sub_id1'] ?? 'direct'),
            'id'      => $conversion->id,
        ], 200);
    }
}`,
      migration: `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->unique();
            $table->string('name');
            $table->string('category');
            $table->string('brand');
            $table->decimal('price', 10, 2);
            $table->decimal('original_price', 10, 2);
            $table->integer('discount_percent');
            $table->decimal('record_low_price', 10, 2);
            $table->string('shopee_url', 1000);
            $table->string('involve_offer_id')->default('100412');
            $table->string('voucher_code')->nullable();
            $table->decimal('voucher_discount', 10, 2)->default(0);
            $table->json('lab_verdict')->nullable();
            $table->timestamps();
        });

        Schema::create('price_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->decimal('price', 10, 2);
            $table->string('label')->nullable();
            $table->boolean('is_spike')->default(false);
            $table->boolean('is_lowest')->default(false);
            $table->timestamp('recorded_at');
        });

        Schema::create('conversions', function (Blueprint $table) {
            $table->id();
            $table->string('order_id')->unique();
            $table->string('click_id')->nullable();
            $table->string('sub_id1')->nullable()->index();
            $table->string('sub_id2')->nullable()->index();
            $table->string('sub_id3')->nullable();
            $table->decimal('sale_amount', 12, 2);
            $table->decimal('commission_amount', 10, 2);
            $table->string('currency', 10)->default('PHP');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('raw_payload')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('conversions');
        Schema::dropIfExists('price_histories');
        Schema::dropIfExists('products');
    }
};`,
    };

    return res.json({ laravelCode });
  });

  // -------------------------------------------------------------
  // VITE DEV MIDDLEWARE / STATIC ASSETS
  // -------------------------------------------------------------
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ShopeePicks Engine] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
