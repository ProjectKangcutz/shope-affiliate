<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ShopeePicks - Curated Shopee Deals, Verified Vouchers & Price Tracker</title>
  <meta name="description" content="Katalog promo Shopee terkurasi dengan verifikasi diskon asli 90 hari dan voucher eksklusif." />

  <!-- Google Fonts: Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  
  <!-- Google Material Symbols Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />

  <!-- Tailwind CSS CDN dengan Konfigurasi Warna ShopeePicks -->
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
            "on-tertiary-fixed-variant": "#005236",
            "surface": "#f7f9fb",
            "surface-container": "#eceef0",
            "surface-container-low": "#f2f4f6",
            "surface-container-high": "#e6e8ea",
            "surface-container-lowest": "#ffffff",
            "secondary": "#565e74",
            "secondary-container": "#dae2fd",
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
          }
        }
      }
    };
  </script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-surface font-sans text-gray-900 antialiased">

  <!-- ================= 1. HEADER & TOP FLASH BANNER ================= -->
  <header class="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
    <!-- Top Announcement Strip -->
    <div class="bg-primary text-white py-1.5 px-4 sm:px-8">
      <div class="max-w-7xl mx-auto flex items-center justify-between text-xs font-semibold">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-sm">bolt</span>
          <span>⚡ 8.8 Mega Flash Sale Live! Diskon hingga 80% + Voucher Gratis Ongkir</span>
        </div>
        <div class="hidden md:flex items-center gap-4 text-xs font-medium opacity-90">
          <span>Tracking Diskon Asli 90 Hari</span>
          <span>•</span>
          <span class="flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
            Auto-Updated Daily via Involve Asia API
          </span>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="h-20 border-b border-gray-100">
      <div class="max-w-7xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between gap-4">
        <!-- Logo -->
        <a href="{{ route('home') }}" class="flex items-center gap-3 flex-shrink-0 cursor-pointer">
          <img src="https://lh3.googleusercontent.com/aida/AEtjO1XKE-XY4I90M61mEOWSiMj1OeBOkhszuuD7XSEcyRjm3WNEPl6H_7W1ssW-uJV6S4so1t0lqekavLaP87AnTmvXH4SzyRLvhUZ963ewuBhLVPS2o8z4W6CMWa2lY8um3y2Sl_uh0UbaaRil-vE1wCAPV2j83rE9lsuVw6mxyKxpnEx7HTeeMNnhI9f_YU67TJhSr4wGyGLOVsHVex1wFgeBdz9k8mmWbaSb1Pz5ONANap_MTUUVlfOZWA4" alt="ShopeePicks" class="h-8 w-auto object-contain" />
          <div class="flex flex-col">
            <span class="text-xl font-extrabold text-primary leading-none tracking-tight">ShopeePicks</span>
            <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Curated Deals Hub</span>
          </div>
        </a>

        <!-- Search Bar with Category Dropdown & Trending Tags -->
        <div class="flex-1 max-w-2xl hidden lg:flex flex-col gap-1">
          <div class="flex items-center bg-surface-container-low rounded-xl px-2 py-1.5 focus-within:bg-white focus-within:shadow-[0_0_0_2px_rgba(178,34,4,0.3)] transition-all border border-gray-200">
            <select class="bg-transparent text-gray-600 font-semibold text-xs px-2 border-r border-gray-300 focus:outline-none cursor-pointer">
              <option>Semua Kategori</option>
              <option>Tech & Gadgets</option>
              <option>Home & Living</option>
              <option>Beauty & Fashion</option>
            </select>
            <div class="flex-1 flex items-center px-2">
              <span class="material-symbols-outlined text-gray-400 text-lg mr-2">search</span>
              <input type="text" placeholder="Cari deal Shopee, brand, atau kode voucher..." class="w-full bg-transparent text-xs text-gray-900 focus:outline-none" />
            </div>
            <button class="bg-primary hover:bg-primary-container text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors">
              Cari Deals
            </button>
          </div>
          <!-- Trending Pills -->
          <div class="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pt-0.5 text-xs">
            <span class="text-[11px] font-bold text-gray-500 inline-flex items-center gap-0.5">
              <span class="material-symbols-outlined text-xs text-primary">local_fire_department</span> Trending:
            </span>
            <span class="text-[11px] font-semibold bg-surface-container px-2.5 py-0.5 rounded-full text-gray-600 hover:bg-primary hover:text-white cursor-pointer transition-colors">Air Fryer</span>
            <span class="text-[11px] font-semibold bg-surface-container px-2.5 py-0.5 rounded-full text-gray-600 hover:bg-primary hover:text-white cursor-pointer transition-colors">Mechanical Keyboard</span>
            <span class="text-[11px] font-semibold bg-surface-container px-2.5 py-0.5 rounded-full text-gray-600 hover:bg-primary hover:text-white cursor-pointer transition-colors">GaN Charger</span>
            <span class="text-[11px] font-semibold bg-surface-container px-2.5 py-0.5 rounded-full text-gray-600 hover:bg-primary hover:text-white cursor-pointer transition-colors">Wireless Earbuds</span>
          </div>
        </div>

        <!-- Telegram Button & Curator Profile Avatar -->
        <div class="flex items-center gap-3 flex-shrink-0">
          <a href="https://t.me" target="_blank" class="hidden sm:flex items-center gap-1.5 bg-tertiary-container hover:bg-tertiary text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm">
            <span class="material-symbols-outlined text-base">send</span>
            <span>Telegram Deals</span>
            <span class="bg-white text-tertiary text-[10px] font-extrabold px-1.5 py-0.2 rounded-full uppercase">Live</span>
          </a>
          <div class="flex items-center gap-2 pl-2 border-l border-gray-200">
            <div class="relative">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeLx9k34O9nTJJ_gKi6Oupv5QR4VpKAJYSSJKGhlqWY76u9PEyxv5WHTdJbyEMOdNDXFz-DxvLyrG9oRUWDr7_XOUcS2Bc7mDDOoxgRcaQpkZj5W8XMdIKawa1-QufdBAMT41fsO6egoFEOy_MhCbSd5LAoRe7-I2gLWv6LEeGBmJxqpxUSOTR-68yoJ6arhdOmOE1Ruzk-D_510lgE67pbggggPMT0gXvKK7fZTBxCTwZ2UOus5GHsg" class="w-8 h-8 rounded-full object-cover ring-2 ring-primary-fixed" />
              <span class="absolute -bottom-1 -right-1 bg-tertiary text-white rounded-full p-0.5 flex items-center justify-center">
                <span class="material-symbols-outlined text-[10px]">verified</span>
              </span>
            </div>
            <div class="hidden xl:flex flex-col text-left">
              <span class="text-xs font-bold text-gray-900 leading-tight">Curator Pick</span>
              <span class="text-[10px] font-bold text-tertiary">Verified Curator</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Sub-Nav Bar (DENGAN GARIS BAWAH MERAH) -->
    <div class="bg-white/80 border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-8">
        <nav class="flex items-center gap-6 overflow-x-auto whitespace-nowrap text-xs font-bold py-1">
          <a href="{{ route('home') }}" class="py-2.5 text-primary border-b-2 border-primary flex items-center gap-1.5">Top Deals</a>
          <a href="#flash" class="py-2.5 text-gray-600 hover:text-gray-900">Flash Sales</a>
          <a href="#katalog" class="py-2.5 text-gray-600 hover:text-gray-900">Tech & Gadgets</a>
          <a href="#katalog" class="py-2.5 text-gray-600 hover:text-gray-900">Home & Living</a>
          <a href="#katalog" class="py-2.5 text-gray-600 hover:text-gray-900">Beauty & Fashion</a>
          <a href="#vouchers" class="py-2.5 text-gray-600 hover:text-gray-900">Vouchers & Codes</a>
        </nav>
      </div>
    </div>
  </header>

  <!-- ================= 2. MAIN HERO & SPOTLIGHT ================= -->
  <main class="w-full pt-36 min-h-screen">
    <section class="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface px-4 sm:px-8 py-10 lg:py-14">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
        <!-- Kolom Kiri: Value Proposition & 4 Trust Stats -->
        <div class="w-full lg:w-7/12 flex flex-col gap-4 text-left">
          <div class="inline-flex items-center gap-2 bg-white shadow-xs rounded-full px-3.5 py-1.5 w-fit border border-gray-100">
            <span class="flex h-2.5 w-2.5 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span class="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
              Shopee 8.8 Mega Campaign • Verified Live Tracking
            </span>
          </div>

          <h1 class="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Hand-Picked <span class="text-primary underline decoration-primary-container decoration-wavy decoration-2">Shopee Deals</span>, Real Reviews & Verified Vouchers
          </h1>

          <p class="text-sm text-gray-600 max-w-xl leading-relaxed">
            Never miss an authentic price drop. Our community lab rigorously stress-tests viral gadgets and home finds, filtering out fake markups to give you direct affiliate savings and stacked promo codes.
          </p>

          <div class="flex flex-wrap items-center gap-3 pt-1">
            <a href="#katalog" class="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md transition-all">
              <span>🔥 Browse Today's Top 50 Picks</span>
              <span class="material-symbols-outlined text-base">arrow_forward</span>
            </a>
            <a href="#vouchers" class="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm px-5 py-3 rounded-xl shadow-xs border border-gray-200">
              <span class="material-symbols-outlined text-tertiary text-base">confirmation_number</span>
              <span>Claim Exclusive Vouchers</span>
            </a>
          </div>

          <!-- 4 TRUST STATS CARDS -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div class="flex flex-col bg-white p-3 rounded-xl shadow-xs border border-gray-100">
              <span class="text-2xl text-primary font-black leading-none">250K+</span>
              <span class="text-xs text-gray-500 mt-1">Monthly Shoppers</span>
            </div>
            <div class="flex flex-col bg-white p-3 rounded-xl shadow-xs border border-gray-100">
              <div class="flex items-center gap-1">
                <span class="text-2xl text-gray-900 font-black leading-none">4.9</span>
                <span class="material-symbols-outlined text-emerald-600 text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
              </div>
              <span class="text-xs text-gray-500 mt-1">Verified TrustScore</span>
            </div>
            <div class="flex flex-col bg-white p-3 rounded-xl shadow-xs border border-gray-100">
              <span class="text-2xl text-gray-900 font-black leading-none">1,200+</span>
              <span class="text-xs text-gray-500 mt-1">Active Deal Catalog</span>
            </div>
            <div class="flex flex-col bg-white p-3 rounded-xl shadow-xs border border-gray-100">
              <span class="text-2xl text-emerald-700 font-black leading-none">5m ago</span>
              <span class="text-xs text-gray-500 mt-1">Price Parity Updated</span>
            </div>
          </div>
        </div>

        <!-- Kolom Kanan: Spotlight Hero Card (Baseus) DENGAN LINK DETAIL MANDIRI -->
        <div class="w-full lg:w-5/12">
          <div class="relative bg-white rounded-2xl shadow-xl overflow-hidden p-4 sm:p-5 flex flex-col gap-3.5 border border-gray-100 transition-all hover:shadow-2xl">
            <div class="flex items-center justify-between">
              <span class="bg-primary text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                <span class="material-symbols-outlined text-xs">local_fire_department</span> #1 VIRAL TECH FIND
              </span>
              <span class="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <span class="material-symbols-outlined text-xs">verified</span> Official Shopee Mall
              </span>
            </div>

            <!-- Image: Mengarah langsung ke Halaman Detail Mandiri -->
            <a href="{{ route('product.show', $spotlightProduct->sku ?? 'baseus-65w-gan5') }}" class="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-surface flex items-center justify-center group cursor-pointer block">
              <img src="{{ $spotlightProduct->main_image ?? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTzOx5upRApAAwtROoQ6x1ysyadNzFYzNyw4UmDWFlk9NzDfFL-8sQ42UuaMKUIxjO2E64IPNW-5ydDvfg0vjxfvOGl8fUS3KNB5fOwb7jJd-hZmAv3MwyoqY9P_PM0tDCSc3MJ_TENmwta57Kxi-Kuro6xrppXHPtMN5gq9sJU6CoqTrwqK_k273Q43OoFG_ZvUwFNBQv_IjjNToGomwyWz2L1FJNblO9zoEZ4qrwojw6bBmhAdPlYA' }}" class="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute top-3 left-3 bg-primary text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-md">
                -{{ $spotlightProduct->discount_percent ?? 63 }}% OFF
              </div>
              <div class="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-gray-800 text-[11px] font-bold flex items-center gap-1 shadow-xs">
                <span class="material-symbols-outlined text-primary text-sm">schedule</span> Price valid: 3h remaining
              </div>
            </a>

            <!-- Info Details: Mengarah ke Halaman Detail Mandiri -->
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center gap-2 text-xs font-bold text-gray-500">
                <span class="text-emerald-700 flex items-center">
                  <span class="material-symbols-outlined text-xs" style="font-variation-settings: 'FILL' 1;">star</span> 4.95 (4.8k reviews)
                </span>
                <span>•</span>
                <span class="text-primary font-semibold">⚡ 42 Sold this hour</span>
              </div>
              <a href="{{ route('product.show', $spotlightProduct->sku ?? 'baseus-65w-gan5') }}" class="text-lg font-bold text-gray-900 leading-tight hover:text-primary transition-colors block">
                {{ $spotlightProduct->name ?? 'Baseus 65W GaN5 Pro Ultra-Fast Charger (Dual Type-C + USB)' }}
              </a>
              <p class="text-xs text-gray-500 line-clamp-2">
                Verified by ShopeePicks tech team: Powers M2 MacBook Air to 50% in 28 mins with 0 heating issues. Fully supports Samsung Super Fast Charging 2.0.
              </p>
            </div>

            <!-- Price & Progress Bar -->
            <div class="flex flex-col gap-2 bg-surface-container-low p-3 rounded-xl">
              <div class="flex items-baseline justify-between">
                <div class="flex items-baseline gap-2">
                  <span class="text-2xl font-black text-primary">Rp {{ number_format($spotlightProduct->price ?? 199000, 0, ',', '.') }}</span>
                  <span class="text-xs text-gray-400 line-through font-semibold">Rp {{ number_format($spotlightProduct->original_price ?? 540000, 0, ',', '.') }}</span>
                </div>
                <span class="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Hemat Rp {{ number_format(($spotlightProduct->original_price ?? 540000) - ($spotlightProduct->price ?? 199000), 0, ',', '.') }}
                </span>
              </div>

              <!-- Stock Bar -->
              <div class="flex flex-col gap-1">
                <div class="flex justify-between text-[11px] font-bold text-gray-600">
                  <span>Claimed: 89%</span>
                  <span class="text-primary">Only {{ $spotlightProduct->stock_left ?? 14 }} left in stock</span>
                </div>
                <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div class="bg-gradient-to-r from-primary-container to-primary h-full rounded-full w-[89%]"></div>
                </div>
              </div>
            </div>

            <!-- Buttons: Link ke Halaman Mandiri vs Link Afiliasi Shopee -->
            <div class="grid grid-cols-2 gap-2 pt-0.5">
              <a href="{{ route('product.show', $spotlightProduct->sku ?? 'baseus-65w-gan5') }}" class="w-full bg-surface-container hover:bg-surface-container-high text-gray-900 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-gray-200">
                <span class="material-symbols-outlined text-sm text-primary">insights</span>
                <span>Price Tracker</span>
              </a>
              <a href="{{ route('affiliate.redirect', $spotlightProduct->id ?? 1) }}" target="_blank" class="w-full bg-primary hover:bg-primary-container text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm">
                <span>Buy on Shopee</span>
                <span class="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= 3. MIDNIGHT FLASH RUSH (COUNTDOWN LIVE) ================= -->
    <section class="w-full bg-surface-container/70 py-12 px-4 sm:px-8 border-y border-gray-200" id="flash">
      <div class="max-w-7xl mx-auto flex flex-col gap-6">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-xs border border-gray-100">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">bolt</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-xl sm:text-2xl font-black text-gray-900 leading-none">Midnight Flash Rush</h2>
                <span class="bg-primary text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase animate-pulse">Live</span>
              </div>
              <p class="text-xs text-gray-500 mt-1">Prices reset when timer reaches zero. Limited quantity vouchers applied.</p>
            </div>
          </div>
          <!-- Real-Time Countdown Blocks -->
          <div class="flex items-center gap-1.5">
            <div class="flex flex-col items-center bg-surface-container-low px-3.5 py-2 rounded-xl min-w-[56px] border border-gray-200">
              <span class="text-xl sm:text-2xl font-black text-primary leading-none" id="countdown-hours">03</span>
              <span class="text-[10px] font-bold text-gray-500 uppercase mt-1">HRS</span>
            </div>
            <span class="text-xl font-black text-primary">:</span>
            <div class="flex flex-col items-center bg-surface-container-low px-3.5 py-2 rounded-xl min-w-[56px] border border-gray-200">
              <span class="text-xl sm:text-2xl font-black text-primary leading-none" id="countdown-mins">24</span>
              <span class="text-[10px] font-bold text-gray-500 uppercase mt-1">MIN</span>
            </div>
            <span class="text-xl font-black text-primary">:</span>
            <div class="flex flex-col items-center bg-surface-container-low px-3.5 py-2 rounded-xl min-w-[56px] border border-gray-200">
              <span class="text-xl sm:text-2xl font-black text-primary leading-none" id="countdown-secs">18</span>
              <span class="text-[10px] font-bold text-gray-500 uppercase mt-1">SEC</span>
            </div>
          </div>
        </div>

        <!-- 4-Flash Deals Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          @foreach($flashDeals as $flash)
          <div class="bg-white rounded-2xl shadow-xs border border-gray-100 p-4 flex flex-col justify-between hover:shadow-lg transition-all">
            <div class="flex flex-col gap-2.5">
              <a href="{{ route('product.show', $flash->sku) }}" class="relative w-full h-48 bg-surface rounded-xl overflow-hidden flex items-center justify-center cursor-pointer block group">
                <img src="{{ $flash->main_image }}" class="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform" />
                <span class="absolute top-2 left-2 bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-lg">-{{ $flash->discount_percent }}% OFF</span>
                <span class="absolute top-2 right-2 bg-white/95 text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded-md">Shopee Mall</span>
              </a>
              <div class="flex items-center justify-between text-[11px] font-bold text-gray-500">
                <span class="text-emerald-700">★ 4.9 (1.2k)</span>
                <span>94% Claimed</span>
              </div>
              <a href="{{ route('product.show', $flash->sku) }}" class="text-sm font-bold text-gray-900 line-clamp-2 hover:text-primary transition-colors block">
                {{ $flash->name }}
              </a>
              <div class="flex items-baseline gap-2">
                <span class="text-xl font-black text-primary">Rp {{ number_format($flash->price, 0, ',', '.') }}</span>
                <span class="text-xs text-gray-400 line-through">Rp {{ number_format($flash->original_price, 0, ',', '.') }}</span>
              </div>
            </div>
            <div class="mt-4 flex flex-col gap-2">
              <div class="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div class="bg-primary h-full w-[94%]"></div>
              </div>
              <div class="grid grid-cols-2 gap-1.5">
                <a href="{{ route('product.show', $flash->sku) }}" class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-xl text-xs font-bold text-center">
                  Review
                </a>
                <a href="{{ route('affiliate.redirect', $flash->id) }}" target="_blank" class="w-full bg-primary hover:bg-primary-container text-white py-2 rounded-xl text-xs font-bold text-center shadow-xs">
                  Beli
                </a>
              </div>
            </div>
          </div>
          @endforeach
        </div>
      </div>
    </section>

    <!-- ================= 4. CURATED DEALS GRID ================= -->
    <section class="py-12 px-4 sm:px-8 max-w-7xl mx-auto" id="katalog">
      <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-6">
        <div>
          <span class="text-xs uppercase tracking-wider text-primary font-extrabold">Tested & Evaluated</span>
          <h2 class="text-2xl sm:text-3xl font-black text-gray-900">Curated Affiliate Picks for Today</h2>
          <p class="text-xs text-gray-500 mt-1">Direct official links with verified stackable coin vouchers & authenticity checks.</p>
        </div>
        <!-- Filter Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1">
          <a href="{{ route('home') }}" class="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold">All Picks</a>
          <a href="{{ route('home', ['category' => 'tech']) }}" class="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-100">💻 Tech & Gadgets</a>
          <a href="{{ route('home', ['category' => 'home']) }}" class="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-100">🏡 Home & Living</a>
          <a href="{{ route('home', ['category' => 'kitchen']) }}" class="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-100">🍳 Kitchen & Dining</a>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        @foreach($products as $item)
        <div class="bg-white rounded-2xl p-5 shadow-xs border border-gray-200 flex flex-col justify-between hover:shadow-xl transition-all">
          <div class="flex flex-col gap-3">
            <!-- Gambar Mengarah ke Halaman Detail Mandiri -->
            <a href="{{ route('product.show', $item->sku) }}" class="relative w-full h-56 bg-surface rounded-xl flex items-center justify-center p-2 cursor-pointer block group">
              <img src="{{ $item->main_image }}" class="w-full h-full object-contain group-hover:scale-105 transition-transform" />
              <span class="absolute top-2 left-2 bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded">-{{ $item->discount_percent }}%</span>
              <span class="absolute top-2 right-2 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">Super Seller</span>
            </a>

            <div class="flex items-center gap-2">
              <span class="bg-surface-container text-gray-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded">{{ $item->category }}</span>
              <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">+10% Shopee Coins</span>
            </div>

            <!-- Judul Mengarah ke Halaman Detail Mandiri -->
            <a href="{{ route('product.show', $item->sku) }}" class="text-sm font-bold text-gray-900 line-clamp-2 leading-snug hover:text-primary transition-colors block">
              {{ $item->name }}
            </a>

            <!-- Review Box Mengarah ke Halaman Detail Mandiri -->
            <a href="{{ route('product.show', $item->sku) }}" class="bg-surface-container-low p-2.5 rounded-xl block hover:bg-surface-container transition-colors">
              <p class="text-xs text-gray-600 italic">
                <strong class="text-gray-900 not-italic font-bold">Curator Review: </strong>
                "Produk asli garansi resmi, performa sangat stabil dan bebas panas berlebih selama pengujian 72 jam."
              </p>
            </a>
          </div>

          <div class="mt-4 flex flex-col gap-3">
            <div class="flex items-baseline justify-between">
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-black text-primary">Rp {{ number_format($item->price, 0, ',', '.') }}</span>
                <span class="text-xs text-gray-400 line-through">Rp {{ number_format($item->original_price, 0, ',', '.') }}</span>
              </div>
              <span class="text-xs font-bold text-emerald-700">4.9 ★</span>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button onclick="copyCode('{{ $item->voucher_code }}')" class="bg-surface-container hover:bg-surface-container-high text-gray-800 py-2.5 rounded-xl text-xs font-bold border border-gray-200">
                Code: {{ $item->voucher_code }}
              </button>
              <a href="{{ route('affiliate.redirect', $item->id) }}" target="_blank" class="bg-primary hover:bg-primary-container text-white py-2.5 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1 shadow-xs">
                <span>Buy on Shopee</span>
                <span class="material-symbols-outlined text-xs">arrow_outward</span>
              </a>
            </div>
          </div>
        </div>
        @endforeach
      </div>
    </section>

    <!-- ================= 5. VOUCHERS STATION (TIKET BERLEKUK) ================= -->
    <section class="w-full bg-surface-container-low py-12 px-4 sm:px-8 border-y border-gray-200" id="vouchers">
      <div class="max-w-7xl mx-auto flex flex-col gap-6">
        <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-3">
          <div>
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-primary text-xl">confirmation_number</span>
              <span class="text-xs uppercase tracking-wider text-primary font-extrabold">Stack & Save More</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">Verified Shopee Voucher Codes</h2>
            <p class="text-xs text-gray-500">Auto-verified every 30 minutes via Involve Asia feed.</p>
          </div>
          <span class="bg-white px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 border border-gray-200">
            ✓ Stackable with Free Shipping Vouchers
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Ticket 1 -->
          <div class="relative bg-white rounded-2xl p-5 shadow-xs border border-gray-200 flex flex-col justify-between overflow-hidden">
            <div class="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-surface-container-low rounded-full border-l border-gray-200"></div>
            <div class="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-surface-container-low rounded-full border-r border-gray-200"></div>
            <div>
              <span class="bg-primary-fixed text-primary font-black text-[10px] px-2 py-0.5 rounded">EXCLUSIVE</span>
              <h3 class="text-2xl font-black text-primary mt-1">15% OFF</h3>
              <p class="text-xs font-bold text-gray-800">Capped at Rp 30.000 discount</p>
              <p class="text-[11px] text-gray-400">Min spend Rp 100.000</p>
            </div>
            <div class="mt-4 flex flex-col gap-2">
              <div class="bg-surface-container p-2 rounded-lg text-center font-mono font-bold text-xs select-all">SHOPEEPICKS15</div>
              <button onclick="copyCode('SHOPEEPICKS15')" class="w-full bg-primary hover:bg-primary-container text-white py-2 rounded-xl text-xs font-bold">Copy & Claim</button>
            </div>
          </div>

          <!-- Ticket 2 -->
          <div class="relative bg-white rounded-2xl p-5 shadow-xs border border-gray-200 flex flex-col justify-between overflow-hidden">
            <div class="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-surface-container-low rounded-full border-l border-gray-200"></div>
            <div class="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-surface-container-low rounded-full border-r border-gray-200"></div>
            <div>
              <span class="bg-emerald-100 text-emerald-800 font-black text-[10px] px-2 py-0.5 rounded">ZERO MIN SPEND</span>
              <h3 class="text-2xl font-black text-emerald-800 mt-1">FREE SHIPPING</h3>
              <p class="text-xs font-bold text-gray-800">Gratis Ongkir Seluruh Indonesia</p>
              <p class="text-[11px] text-gray-400">Min. Belanja Rp 0</p>
            </div>
            <div class="mt-4 flex flex-col gap-2">
              <div class="bg-surface-container p-2 rounded-lg text-center font-mono font-bold text-xs select-all">FREESHIP88</div>
              <button onclick="copyCode('FREESHIP88')" class="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-2 rounded-xl text-xs font-bold">Copy & Claim</button>
            </div>
          </div>

          <!-- Ticket 3 -->
          <div class="relative bg-white rounded-2xl p-5 shadow-xs border border-gray-200 flex flex-col justify-between overflow-hidden">
            <div class="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-surface-container-low rounded-full border-l border-gray-200"></div>
            <div class="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-surface-container-low rounded-full border-r border-gray-200"></div>
            <div>
              <span class="bg-secondary-container text-gray-800 font-black text-[10px] px-2 py-0.5 rounded">TECH PASS</span>
              <h3 class="text-2xl font-black text-gray-900 mt-1">Rp 100.000 OFF</h3>
              <p class="text-xs font-bold text-gray-800">Khusus Gadget & Komputer</p>
              <p class="text-[11px] text-gray-400">Toko Mall Resmi</p>
            </div>
            <div class="mt-4 flex flex-col gap-2">
              <div class="bg-surface-container p-2 rounded-lg text-center font-mono font-bold text-xs select-all">TECHSAVER100</div>
              <button onclick="copyCode('TECHSAVER100')" class="w-full bg-primary hover:bg-primary-container text-white py-2 rounded-xl text-xs font-bold">Copy & Claim</button>
            </div>
          </div>

          <!-- Ticket 4 -->
          <div class="relative bg-white rounded-2xl p-5 shadow-xs border border-gray-200 flex flex-col justify-between overflow-hidden">
            <div class="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-surface-container-low rounded-full border-l border-gray-200"></div>
            <div class="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-surface-container-low rounded-full border-r border-gray-200"></div>
            <div>
              <span class="bg-emerald-100 text-emerald-800 font-black text-[10px] px-2 py-0.5 rounded">CASHBACK</span>
              <h3 class="text-2xl font-black text-emerald-800 mt-1">20% COINS</h3>
              <p class="text-xs font-bold text-gray-800">Beauty & Fashion</p>
              <p class="text-[11px] text-gray-400">Instant Cashback Shopee Coins</p>
            </div>
            <div class="mt-4 flex flex-col gap-2">
              <div class="bg-surface-container p-2 rounded-lg text-center font-mono font-bold text-xs select-all">BEAUTYGLOW</div>
              <button onclick="copyCode('BEAUTYGLOW')" class="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-2 rounded-xl text-xs font-bold">Copy & Claim</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= 6. HOW WE TEST & REVIEWS ================= -->
    <section class="w-full py-12 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col gap-8">
      <div class="text-center max-w-2xl mx-auto">
        <span class="text-xs font-extrabold uppercase text-primary">Zero Sponsored Bias</span>
        <h2 class="text-2xl font-black text-gray-900 mt-1">How We Test, Verify & Select Every Product</h2>
        <p class="text-xs text-gray-500 mt-1">Kami menolak 94% produk viral yang memanipulasi diskon harga sebelum campaign.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col gap-2">
          <span class="material-symbols-outlined text-primary text-2xl">history_toggle_off</span>
          <h3 class="font-bold text-sm text-gray-900">Real Price History Tracking</h3>
          <p class="text-xs text-gray-500">Database kami melacak harga 90 hari terakhir untuk memastikan diskon benar-benar asli.</p>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col gap-2">
          <span class="material-symbols-outlined text-emerald-700 text-2xl">verified_user</span>
          <h3 class="font-bold text-sm text-gray-900">Store Reputation Standard</h3>
          <p class="text-xs text-gray-500">Hanya mengindeks toko Official Mall dengan rating minimal 4.8 bintang.</p>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col gap-2">
          <span class="material-symbols-outlined text-secondary text-2xl">rate_review</span>
          <h3 class="font-bold text-sm text-gray-900">Hands-On Curator Testing</h3>
          <p class="text-xs text-gray-500">Tim kami membeli dan menguji langsung daya tahan serta suhu operasional produk.</p>
        </div>
      </div>
    </section>
  </main>

  <!-- ================= 7. FOOTER ================= -->
  <footer class="w-full bg-white border-t border-gray-200 text-gray-800 mt-12">
    <div class="bg-surface-container-low py-3.5 border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
        <div class="flex items-start md:items-center gap-2.5">
          <span class="material-symbols-outlined text-primary text-xl flex-shrink-0">policy</span>
          <p class="text-xs text-gray-600">
            <strong class="text-gray-900 font-semibold">Affiliate Transparency:</strong> As a Shopee affiliate, we earn from qualifying purchases at no extra cost to you. Pricing, stock, and promo voucher availability are subject to merchant updates.
          </p>
        </div>
        <span class="bg-gray-200 px-2 py-0.5 rounded text-[10px] font-bold text-gray-800">Shopee Open Platform</span>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
      <p>© 2026 ShopeePicks. All rights reserved. Independent affiliate portal.</p>
      <div class="flex items-center gap-4">
        <span>Privacy Policy</span>
        <span>Terms of Use</span>
        <span>Affiliate Disclosure</span>
      </div>
    </div>
  </footer>

  <!-- JAVASCRIPT LOGIC (TIMER & CLIPBOARD) -->
  <script>
    // Countdown Timer Jam Berdetak Real-Time
    let totalSeconds = (3 * 3600) + (24 * 60) + 18;
    setInterval(() => {
      if (totalSeconds > 0) totalSeconds--;
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      const elH = document.getElementById('countdown-hours');
      const elM = document.getElementById('countdown-mins');
      const elS = document.getElementById('countdown-secs');
      if (elH && elM && elS) {
        elH.textContent = String(h).padStart(2, '0');
        elM.textContent = String(m).padStart(2, '0');
        elS.textContent = String(s).padStart(2, '0');
      }
    }, 1000);

    // Salin Kode Voucher ke Clipboard
    function copyCode(code) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code);
      }
      alert('✓ Kode Voucher "' + code + '" berhasil disalin! Silakan tempel di keranjang Shopee Anda.');
    }
  </script>
</body>
</html>