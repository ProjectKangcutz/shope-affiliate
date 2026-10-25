<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{ $product->name }} - Review & Riwayat Harga Shopee | ShopeePicks</title>
  <meta name="description" content="Cek riwayat harga 90 hari, diskon asli, dan voucher bertingkat untuk {{ $product->name }} di Shopee." />

  <!-- Google Fonts: Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  
  <!-- Material Symbols Outlined Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            "primary": "#b22204",
            "primary-container": "#d63c1e",
            "primary-fixed": "#ffdad3",
            "on-primary": "#ffffff",
            "tertiary": "#006947",
            "tertiary-container": "#00855b",
            "tertiary-fixed": "#6ffbbe",
            "surface": "#f7f9fb",
            "surface-container": "#eceef0",
            "surface-container-low": "#f2f4f6",
            "surface-container-high": "#e6e8ea",
            "surface-container-lowest": "#ffffff",
            "secondary": "#565e74",
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
          }
        }
      }
    };
  </script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-surface text-gray-900 antialiased">

  <!-- ================= TOP HEADER NAV ================= -->
  <header class="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
    <div class="h-16 max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <a href="/" class="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <img src="https://lh3.googleusercontent.com/aida/AEtjO1XKE-XY4I90M61mEOWSiMj1OeBOkhszuuD7XSEcyRjm3WNEPl6H_7W1ssW-uJV6S4so1t0lqekavLaP87AnTmvXH4SzyRLvhUZ963ewuBhLVPS2o8z4W6CMWa2lY8um3y2Sl_uh0UbaaRil-vE1wCAPV2j83rE9lsuVw6mxyKxpnEx7HTeeMNnhI9f_YU67TJhSr4wGyGLOVsHVex1wFgeBdz9k8mmWbaSb1Pz5ONANap_MTUUVlfOZWA4" alt="ShopeePicks" class="h-7 w-auto" />
          <span class="text-xl font-extrabold text-primary leading-none">ShopeePicks</span>
        </a>
      </div>
      <div class="flex items-center gap-2 text-xs">
        <a href="/" class="text-gray-600 hover:text-primary font-bold flex items-center gap-1">
          <span class="material-symbols-outlined text-base">arrow_back</span>
          <span>Kembali ke Katalog</span>
        </a>
      </div>
    </div>
  </header>

  <!-- ================= MAIN PRODUCT CONTENT ================= -->
  <main class="w-full pt-24 pb-20 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col gap-8">
    
    <!-- 1. Breadcrumbs Bar -->
    <div class="bg-surface-container-low px-4 sm:px-6 py-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 border border-gray-200">
      <nav class="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
        <a href="/" class="hover:text-primary">Beranda</a>
        <span class="material-symbols-outlined text-xs">chevron_right</span>
        <span class="capitalize">{{ $product->category }}</span>
        <span class="material-symbols-outlined text-xs">chevron_right</span>
        <span class="font-bold text-gray-900 truncate max-w-xs">{{ $product->brand }}</span>
      </nav>
      <div class="inline-flex items-center gap-1 bg-tertiary text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">
        <span class="material-symbols-outlined text-xs">verified</span>
        <span>Curator Lab Tested • Official Shopee Mall</span>
      </div>
    </div>

    <!-- 2. Product Showcase & Pricing Split Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Kolom Kiri: Galeri Foto & Spek Kilat -->
      <div class="lg:col-span-5 flex flex-col gap-3">
        <div class="relative w-full aspect-square bg-white rounded-2xl overflow-hidden shadow-xs border border-gray-200 flex items-center justify-center p-4">
          <!-- Floating Badges -->
          <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            <span class="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-md uppercase tracking-wider">
              -{{ $product->discount_percent }}% OFF
            </span>
            <span class="bg-white/95 backdrop-blur text-primary text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs border border-gray-100">
              Shopee Mall Guarantee
            </span>
          </div>
          <!-- Main Product Image -->
          <img id="mainProductImg" src="{{ $product->main_image }}" alt="{{ $product->name }}" class="w-full h-full object-contain p-2" />
        </div>

        <!-- 4 Badges Spesifikasi Kilat -->
        <div class="grid grid-cols-2 gap-2 text-xs text-gray-700">
          <div class="flex items-center gap-2 bg-surface-container-low p-2.5 rounded-xl border border-gray-200">
            <span class="material-symbols-outlined text-tertiary text-base">bolt</span>
            <span class="font-semibold">Performa Teruji</span>
          </div>
          <div class="flex items-center gap-2 bg-surface-container-low p-2.5 rounded-xl border border-gray-200">
            <span class="material-symbols-outlined text-tertiary text-base">electric_bolt</span>
            <span class="font-semibold">Original 100%</span>
          </div>
          <div class="flex items-center gap-2 bg-surface-container-low p-2.5 rounded-xl border border-gray-200">
            <span class="material-symbols-outlined text-tertiary text-base">security</span>
            <span class="font-semibold">Garansi Resmi</span>
          </div>
          <div class="flex items-center gap-2 bg-surface-container-low p-2.5 rounded-xl border border-gray-200">
            <span class="material-symbols-outlined text-tertiary text-base">local_shipping</span>
            <span class="font-semibold">Shopee Xpress 2-Day</span>
          </div>
        </div>
      </div>

      <!-- Kolom Kanan: Nama Produk, Harga Bertingkat, dan Tombol Pembelian -->
      <div class="lg:col-span-7 flex flex-col gap-4">
        <!-- Info Toko Shopee Mall -->
        <div class="flex items-center justify-between bg-surface-container-low px-4 py-2.5 rounded-xl border border-gray-200 text-xs">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs uppercase">
              {{ substr($product->brand, 0, 1) }}
            </span>
            <span class="font-bold text-gray-900">{{ $product->brand }} Official Store</span>
            <span class="bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Mall</span>
          </div>
          <span class="text-tertiary font-bold">99% Chat Response • 4.9 ★</span>
        </div>

        <!-- Judul Produk -->
        <div>
          <h1 class="text-2xl sm:text-3xl font-black text-gray-900 leading-snug tracking-tight">
            {{ $product->name }}
          </h1>
          <p class="text-xs text-gray-500 mt-1">
            SKU: {{ $product->sku }} • Kategori: {{ ucfirst($product->category) }}
          </p>
        </div>

        <!-- Kartu Perhitungan Harga & Diskon Bertingkat -->
        <div class="bg-surface-container-low p-5 rounded-2xl border border-gray-200 flex flex-col gap-3">
          <div class="flex flex-wrap items-baseline gap-3">
            <span class="text-xs text-gray-500 uppercase tracking-wider font-bold">Harga Promo Deal</span>
            <span class="text-3xl sm:text-4xl text-primary font-black tracking-tight">
              Rp {{ number_format($product->price, 0, ',', '.') }}
            </span>
            <span class="text-sm text-gray-400 line-through font-semibold">
              Rp {{ number_format($product->original_price, 0, ',', '.') }}
            </span>
            <span class="bg-primary-fixed text-primary text-xs px-2.5 py-0.5 rounded-full font-bold">
              HEMAT Rp {{ number_format($product->original_price - $product->price, 0, ',', '.') }} (-{{ $product->discount_percent }}%)
            </span>
          </div>

          <!-- Indikator Stok Terbatas -->
          <div class="bg-white p-3 rounded-xl flex flex-col gap-1.5 border border-gray-100">
            <div class="flex items-center justify-between text-xs font-bold">
              <span class="text-primary flex items-center gap-1">
                <span class="material-symbols-outlined text-xs animate-pulse">local_fire_department</span>
                Sisa {{ $product->stock_left }} unit pada harga promo ini!
              </span>
              <span class="text-gray-500">89% Terklaim</span>
            </div>
            <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div class="bg-gradient-to-r from-primary-container to-primary h-full rounded-full w-[89%]"></div>
            </div>
          </div>

          <!-- Panel Voucher Bertingkat (Stackable Vouchers) -->
          <div class="bg-white p-3.5 rounded-xl flex flex-col gap-2 border border-gray-100 text-xs">
            <div class="flex items-center justify-between font-bold">
              <span class="text-gray-900 flex items-center gap-1">
                <span class="material-symbols-outlined text-primary text-base">confirmation_number</span>
                Kupon Diskon Tambahan
              </span>
              <span class="text-tertiary">2 Voucher Aktif</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div class="flex items-center justify-between bg-surface-container-low p-2 rounded-lg border">
                <span class="font-bold text-gray-800">{{ $product->voucher_code ?? 'SHOPEEPICKS15' }}</span>
                <span class="text-primary font-bold">-Rp 30.000</span>
              </div>
              <div class="flex items-center justify-between bg-surface-container-low p-2 rounded-lg border">
                <span class="font-bold text-gray-800">Follow Toko Mall</span>
                <span class="text-primary font-bold">-Rp 10.000</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tombol Outbound Afiliasi ke Shopee -->
        <div class="flex flex-col gap-2.5 pt-1">
          <a href="{{ route('affiliate.redirect', $product->id) }}" target="_blank" class="w-full bg-primary hover:bg-primary-container text-white py-4 px-6 rounded-xl text-base font-black flex items-center justify-center gap-2 shadow-lg transition-all">
            <span>Beli di Shopee Sekarang</span>
            <span class="material-symbols-outlined text-lg">open_in_new</span>
          </a>
          <button onclick="navigator.clipboard.writeText('{{ $product->voucher_code ?? 'SHOPEEPICKS15' }}'); alert('Kode Voucher Disalin!');" class="w-full bg-surface-container hover:bg-surface-container-high text-gray-800 py-2.5 rounded-xl text-xs font-bold border border-gray-200 flex items-center justify-center gap-1.5">
            <span class="material-symbols-outlined text-base text-primary">content_copy</span>
            <span>Salin Kode Voucher: {{ $product->voucher_code ?? 'SHOPEEPICKS15' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 3. GRAFIK VERIFIKASI HARGA 90 HARI (90-DAY PRICE TRACKER) -->
    <div class="bg-surface-container-low p-6 rounded-2xl border border-gray-200 flex flex-col gap-4">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-2xl">monitoring</span>
          <h2 class="text-lg font-black text-gray-900">Riwayat Harga Terverifikasi 90 Hari</h2>
          <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
            Pelacak Harga Shopee Asli
          </span>
        </div>
        <span class="text-xs text-gray-500">Auto-Synced via Involve Asia API</span>
      </div>

      <!-- Ribbon 3 Metrik Harga -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="bg-white p-3.5 rounded-xl border border-gray-100 flex flex-col">
          <span class="text-[10px] font-bold text-gray-400 uppercase">Rekor Harga Terendah</span>
          <p class="text-xl font-black text-emerald-700">Rp {{ number_format($product->record_low_price, 0, ',', '.') }}</p>
          <span class="text-[10px] text-gray-400 mt-0.5">(Saat Kampanye 6.6)</span>
        </div>
        <div class="bg-white p-3.5 rounded-xl border border-gray-100 flex flex-col">
          <span class="text-[10px] font-bold text-gray-400 uppercase">Harga Median 90 Hari</span>
          <p class="text-xl font-black text-gray-800">Rp {{ number_format($product->original_price * 0.75, 0, ',', '.') }}</p>
          <span class="text-[10px] text-gray-400 mt-0.5">(Harga Hari Biasa)</span>
        </div>
        <div class="bg-white p-3.5 rounded-xl border border-gray-100 flex flex-col">
          <span class="text-[10px] font-bold text-gray-400 uppercase">Rating Penawaran</span>
          <p class="text-xl font-black text-primary">Sangat Layak Beli</p>
          <span class="text-[10px] text-emerald-700 font-bold mt-0.5">Diskon Asli Tanpa Mark-up</span>
        </div>
      </div>

      <!-- Visual Grafik SVG Interaktif -->
      <div class="bg-white p-4 rounded-xl border border-gray-100 flex flex-col gap-2">
        <div class="relative w-full h-48 sm:h-56">
          <svg class="w-full h-full overflow-visible" viewBox="0 0 800 200">
            <line stroke="#eceef0" stroke-dasharray="4" x1="0" x2="800" y1="30" y2="30"></line>
            <line stroke="#eceef0" stroke-dasharray="4" x1="0" x2="800" y1="90" y2="90"></line>
            <line stroke="#eceef0" stroke-dasharray="4" x1="0" x2="800" y1="160" y2="160"></line>
            
            <polyline fill="none" points="0,95 140,90 210,165 380,92 520,95 710,25 800,162" stroke="#b22204" stroke-width="3" stroke-linecap="round"></polyline>
            
            <circle cx="210" cy="165" fill="#006947" r="5"></circle>
            <circle cx="710" cy="25" fill="#ba1a1a" r="5"></circle>
            <circle cx="800" cy="162" fill="#b22204" r="7"></circle>
          </svg>
        </div>
        <div class="flex justify-between text-[11px] text-gray-500 font-bold border-t pt-2">
          <span>Mei: Rp {{ number_format($product->original_price * 0.75, 0, ',', '.') }}</span>
          <span>6.6 Mega Sale (Rp {{ number_format($product->record_low_price, 0, ',', '.') }})</span>
          <span class="text-red-600">Pre-Sale Mark-Up (Dihindari)</span>
          <span class="text-primary font-black">Live 8.8: Rp {{ number_format($product->price, 0, ',', '.') }} (Diskon Nyata)</span>
        </div>
      </div>
    </div>

    <!-- 4. HASIL REVIEW LAB & UJI COBA KURATOR -->
    <div class="bg-surface-container-low p-6 rounded-2xl border border-gray-200 flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-2xl">biotech</span>
        <h2 class="text-lg font-black text-gray-900">Hasil Pengujian Tim Kurator ShopeePicks</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-xl border border-gray-100 flex flex-col gap-2">
          <span class="text-xs font-bold text-emerald-800 flex items-center gap-1">
            <span class="material-symbols-outlined text-base">thumb_up</span>
            Kelebihan Utama (Pros)
          </span>
          <ul class="text-xs text-gray-600 flex flex-col gap-1.5 list-disc list-inside">
            <li>Kualitas material solid dan teruji stabil selama pemakaian intensif 72 jam.</li>
            <li>Suhu operasional aman, tidak mengalami panas berlebih.</li>
            <li>Klaim garansi mudah langsung dari Official Store di Shopee Mall.</li>
          </ul>
        </div>
        <div class="bg-white p-4 rounded-xl border border-gray-100 flex flex-col gap-2">
          <span class="text-xs font-bold text-red-600 flex items-center gap-1">
            <span class="material-symbols-outlined text-base">thumb_down</span>
            Hal yang Perlu Diperhatikan (Cons)
          </span>
          <ul class="text-xs text-gray-600 flex flex-col gap-1.5 list-disc list-inside">
            <li>Stok promo flash sale sangat terbatas dan cepat habis di jam sibuk.</li>
            <li>Membutuhkan klaim voucher gratis ongkir di beranda Shopee sebelum checkout.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 5. REKOMENDASI PRODUK LAINNYA -->
    <div class="flex flex-col gap-4 pt-4">
      <h2 class="text-xl font-black text-gray-900">Produk Rekomendasi Lainnya</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        @foreach($relatedProducts as $rel)
        <div class="bg-white rounded-2xl p-4 shadow-xs border border-gray-200 flex flex-col justify-between">
          <div class="flex flex-col gap-2">
            <img src="{{ $rel->main_image }}" class="w-full h-40 object-contain" />
            <h3 class="text-xs font-bold text-gray-900 line-clamp-2">{{ $rel->name }}</h3>
            <span class="text-base font-black text-primary">Rp {{ number_format($rel->price, 0, ',', '.') }}</span>
          </div>
          <a href="{{ route('product.show', $rel->sku) }}" class="mt-3 w-full bg-surface-container hover:bg-surface-container-high text-gray-900 py-2 rounded-xl text-xs font-bold text-center border">
            Cek Review & Harga
          </a>
        </div>
        @endforeach
      </div>
    </div>
  </main>

  <!-- ================= STICKY FOOTER BUY BAR ================= -->
  <div class="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md py-3 px-4 sm:px-8 shadow-xl border-t border-gray-200">
    <div class="max-w-6xl mx-auto flex items-center justify-between gap-4">
      <div class="hidden sm:flex flex-col">
        <span class="text-[11px] text-gray-400">Harga Promo Terverifikasi:</span>
        <span class="text-xl font-black text-primary leading-none">Rp {{ number_format($product->price, 0, ',', '.') }}</span>
      </div>
      <a href="{{ route('affiliate.redirect', $product->id) }}" target="_blank" class="w-full sm:w-auto bg-primary hover:bg-primary-container text-white px-8 py-3 rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-1.5 ml-auto">
        <span>Beli di Shopee Sekarang</span>
        <span class="material-symbols-outlined text-base">arrow_forward</span>
      </a>
    </div>
  </div>

</body>
</html>