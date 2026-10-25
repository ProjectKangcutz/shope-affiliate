import React, { useState, useEffect } from 'react';

export const LaravelCodebaseView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tutorial' | 'service' | 'command' | 'controller' | 'migration' | 'routes'>('tutorial');
  const [copied, setCopied] = useState(false);
  const [codeData, setCodeData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/laravel/code')
      .then((res) => res.json())
      .then((data) => setCodeData(data.laravelCode))
      .catch((e) => console.error(e));
  }, []);

  const tabs = [
    { id: 'tutorial', label: '📖 Step-by-Step Tutorial', path: 'PANDUAN_INSTALASI_LARAVEL.md' },
    { id: 'service', label: 'InvolveAsiaService.php', path: 'app/Services/InvolveAsiaService.php' },
    { id: 'command', label: 'SyncShopeeCatalogCommand.php', path: 'app/Console/Commands/SyncShopeeCatalogCommand.php' },
    { id: 'controller', label: 'ConversionPostbackController.php', path: 'app/Http/Controllers/ConversionPostbackController.php' },
    { id: 'migration', label: 'Database Migrations', path: 'database/migrations/create_shopee_affiliate_tables.php' },
    { id: 'routes', label: 'routes/api.php & console.php', path: 'routes/api.php' },
  ];

  return (
    <div className="w-full py-8 px-4 sm:px-8 bg-[#f7f9fb] min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-red-600 to-[#b22204] p-6 rounded-2xl shadow-md text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm bg-white/20 px-2 py-0.5 rounded font-black">
                PHP 8.0 & Laravel 9 LTS
              </span>
              <h1 className="text-xl sm:text-2xl font-black">
                Laravel Backend Architecture (PHP 8.0 Compatible)
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-2xl leading-relaxed">
              Arsitektur lengkap untuk PHP 8.0 (Laravel 9): Service Involve Asia, App/Console/Kernel Scheduler, S2S Postback Webhook Controller, dan Database Migrations.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="bg-white hover:bg-gray-100 text-red-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-sm">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied File!' : 'Copy Active File'}</span>
          </button>
        </div>

        {/* Code Tabs & Viewer */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 overflow-hidden flex flex-col">
          {/* File Tab Bar */}
          <div className="bg-[#1e1e2e] px-4 py-2 flex items-center gap-2 overflow-x-auto border-b border-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-[10px] text-red-300">PHP</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Active File Path Info */}
          <div className="bg-[#282a36] px-4 py-2 text-xs font-mono text-gray-300 flex items-center justify-between border-b border-gray-800">
            <span className="text-gray-400">
              Path: <span className="text-emerald-400">{tabs.find((t) => t.id === activeTab)?.path}</span>
            </span>
            <span className="text-[11px] text-gray-400">Ready for Laravel deployment</span>
          </div>

          {/* Code Body / Tutorial */}
          {activeTab === 'tutorial' ? (
            <div className="p-5 sm:p-7 bg-[#1e1e2e] text-gray-200 text-xs overflow-y-auto leading-relaxed max-h-[650px] flex flex-col gap-6">
              <div className="bg-[#282a36] p-4 rounded-xl border border-gray-700">
                <h2 className="text-base font-bold text-white mb-1">
                  🚀 Panduan Lengkap: Membuat Website Shopee Affiliate Menggunakan Laravel & Involve Asia API
                </h2>
                <p className="text-gray-400 text-xs">
                  Tutorial ini memandu Anda dari pembuatan project Laravel kosong hingga website berjalan otomatis dengan tracking konversi dan sinkronisasi katalog berkala.
                </p>
              </div>

              {/* Step 1 */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">1</span>
                  <h3 className="text-sm font-bold text-white">Instalasi Project Laravel (Versi Kompatibel PHP 8.0: Laravel 9)</h3>
                </div>
                <p className="text-gray-400">
                  Untuk <strong>PHP 8.0</strong>, gunakan <strong>Laravel 9.x</strong> (karena Laravel 10 butuh PHP &gt;= 8.1 dan Laravel 11 butuh PHP &gt;= 8.2):
                </p>
                <div className="bg-black/60 p-3 rounded-lg font-mono text-[11px] text-emerald-400 select-all border border-gray-800">
                  composer create-project "laravel/laravel:^9.0" shopee-affiliate-portal<br/>
                  cd shopee-affiliate-portal
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">2</span>
                  <h3 className="text-sm font-bold text-white">Konfigurasi .env & Kredensial Involve Asia</h3>
                </div>
                <p className="text-gray-400">
                  Dapatkan API Key, Secret, dan Publisher ID dari dashboard Involve Asia Anda. Buka file <code className="text-red-400">.env</code> dan tambahkan:
                </p>
                <div className="bg-black/60 p-3 rounded-lg font-mono text-[11px] text-amber-300 select-all border border-gray-800">
                  INVOLVE_ASIA_API_KEY=ia_live_your_api_key<br/>
                  INVOLVE_ASIA_API_SECRET=your_api_secret<br/>
                  INVOLVE_ASIA_PUBLISHER_ID=PUB-894103<br/>
                  INVOLVE_ASIA_SHOPEE_OFFER_ID=100412<br/>
                  INVOLVE_ASIA_BASE_URL=https://api.involve.asia/api
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">3</span>
                  <h3 className="text-sm font-bold text-white">Buat Database Migration & Model</h3>
                </div>
                <p className="text-gray-400">
                  Jalankan perintah Artisan untuk membuat tabel produk, riwayat harga 90 hari, dan tabel konversi postback:
                </p>
                <div className="bg-black/60 p-3 rounded-lg font-mono text-[11px] text-emerald-400 select-all border border-gray-800">
                  php artisan make:model Product -m<br/>
                  php artisan make:model PriceHistory -m<br/>
                  php artisan make:model Conversion -m<br/>
                  php artisan make:model Click -m
                </div>
                <p className="text-gray-400 text-[11px]">
                  Salin skema migration dari tab <strong>Database Migrations</strong>, lalu jalankan:
                </p>
                <div className="bg-black/60 p-2.5 rounded-lg font-mono text-[11px] text-emerald-400 select-all border border-gray-800">
                  php artisan migrate
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">4</span>
                  <h3 className="text-sm font-bold text-white">Implementasi InvolveAsiaService (Deeplink & API)</h3>
                </div>
                <p className="text-gray-400">
                  Buat folder dan file <code className="text-red-400">app/Services/InvolveAsiaService.php</code> (lihat tab <strong>InvolveAsiaService.php</strong>). Service ini bertugas mengubah URL Shopee menjadi link ber-tracking <code className="text-amber-300">https://invol.co/aff_m?...</code> dengan parameter <code className="text-amber-300">sub_id1</code>, <code className="text-amber-300">sub_id2</code>, dll.
                </p>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">5</span>
                  <h3 className="text-sm font-bold text-white">Automated Catalog Update (Artisan Command & Kernel Scheduler)</h3>
                </div>
                <p className="text-gray-400">
                  Buat command untuk memperbarui harga & diskon produk Shopee secara otomatis:
                </p>
                <div className="bg-black/60 p-2.5 rounded-lg font-mono text-[11px] text-emerald-400 select-all border border-gray-800">
                  php artisan make:command SyncShopeeCatalogCommand
                </div>
                <p className="text-gray-400">
                  Salin kode dari tab <strong>SyncShopeeCatalogCommand.php</strong>. Di Laravel 9 (PHP 8.0), jadwalkan di <code className="text-red-400">app/Console/Kernel.php</code>:
                </p>
                <div className="bg-black/60 p-2.5 rounded-lg font-mono text-[11px] text-amber-300 select-all border border-gray-800">
                  // app/Console/Kernel.php<br/>
                  protected function schedule(Schedule $schedule)<br/>
                  &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;$schedule-&gt;command('shopee:sync-catalog')-&gt;everySixHours();<br/>
                  &#125;
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">6</span>
                  <h3 className="text-sm font-bold text-white">Tracking Konversi via S2S Postback Webhook</h3>
                </div>
                <p className="text-gray-400">
                  Buat controller postback untuk menangani data pembelian dari Involve Asia:
                </p>
                <div className="bg-black/60 p-2.5 rounded-lg font-mono text-[11px] text-emerald-400 select-all border border-gray-800">
                  php artisan make:controller ConversionPostbackController
                </div>
                <p className="text-gray-400">
                  Buka dashboard <strong>Involve Asia &gt; Settings &gt; Postback</strong> dan daftarkan URL webhook Anda:
                </p>
                <div className="bg-black/60 p-2.5 rounded-lg font-mono text-[11px] text-cyan-300 select-all border border-gray-800">
                  POST https://yourdomain.com/api/involve-asia/postback
                </div>
              </div>

              {/* Step 7 */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">7</span>
                  <h3 className="text-sm font-bold text-white">Menjalankan Server & Background Cron</h3>
                </div>
                <p className="text-gray-400">
                  Di server lokal (development):
                </p>
                <div className="bg-black/60 p-2.5 rounded-lg font-mono text-[11px] text-emerald-400 select-all border border-gray-800">
                  php artisan serve<br/>
                  php artisan schedule:work
                </div>
                <p className="text-gray-400">
                  Di server produksi (Linux Crontab):
                </p>
                <div className="bg-black/60 p-2.5 rounded-lg font-mono text-[11px] text-amber-300 select-all border border-gray-800">
                  * * * * * cd /var/www/shopee-affiliate-portal &amp;&amp; php artisan schedule:run &gt;&gt; /dev/null 2&gt;&amp;1
                </div>
              </div>
            </div>
          ) : (
            <pre className="p-4 sm:p-6 bg-[#1e1e2e] text-gray-100 font-mono text-xs overflow-x-auto leading-relaxed max-h-[600px] select-all">
              <code>
                {codeData
                  ? activeTab === 'routes'
                    ? `// routes/api.php
use App\\Http\\Controllers\\ConversionPostbackController;

// Involve Asia S2S Conversion Postback Webhook
Route::post('/involve-asia/postback', [ConversionPostbackController::class, 'handlePostback']);

// routes/console.php
use Illuminate\\Support\\Facades\\Schedule;

// Automated Product Catalog & Price History Snapshot
Schedule::command('shopee:sync-catalog')->everySixHours();

// config/services.php
'involve_asia' => [
    'api_key'         => env('INVOLVE_ASIA_API_KEY'),
    'api_secret'      => env('INVOLVE_ASIA_API_SECRET'),
    'publisher_id'    => env('INVOLVE_ASIA_PUBLISHER_ID'),
    'shopee_offer_id' => env('INVOLVE_ASIA_SHOPEE_OFFER_ID', '100412'),
],`
                    : codeData[activeTab]
                  : '// Loading Laravel code...'}
              </code>
            </pre>
          )}
        </div>

        {/* Quick Setup Instructions for Laravel */}
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-gray-200 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-gray-900">How to deploy this in your Laravel application:</h3>
          <ol className="list-decimal list-inside text-xs text-gray-600 flex flex-col gap-2 leading-relaxed">
            <li>
              <strong>Environment Variables:</strong> Add <code className="bg-gray-100 px-1 py-0.5 rounded text-red-600 font-mono">INVOLVE_ASIA_API_KEY</code>, <code className="bg-gray-100 px-1 py-0.5 rounded text-red-600 font-mono">INVOLVE_ASIA_API_SECRET</code>, and <code className="bg-gray-100 px-1 py-0.5 rounded text-red-600 font-mono">INVOLVE_ASIA_PUBLISHER_ID</code> to your Laravel <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">.env</code>.
            </li>
            <li>
              <strong>Database Migrations:</strong> Run <code className="bg-gray-100 px-1 py-0.5 rounded text-red-600 font-mono">php artisan migrate</code> to generate the <code className="font-mono">products</code>, <code className="font-mono">price_histories</code>, and <code className="font-mono">conversions</code> tables.
            </li>
            <li>
              <strong>Automated Catalog Updates:</strong> Schedule <code className="bg-gray-100 px-1 py-0.5 rounded text-red-600 font-mono">php artisan shopee:sync-catalog</code> in your server's crontab via <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">* * * * * cd /path-to-your-project &amp;&amp; php artisan schedule:run &gt;&gt; /dev/null 2&gt;&amp;1</code>.
            </li>
            <li>
              <strong>Postback Webhook Configuration:</strong> In your Involve Asia Publisher Dashboard, set the S2S Postback URL to <code className="bg-gray-100 px-1 py-0.5 rounded text-emerald-700 font-mono">https://your-domain.com/api/involve-asia/postback</code>.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
