<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Security Login - ShopeePicks Hub</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#f7f9fb] min-h-screen font-sans flex items-center justify-center p-4 antialiased text-[#191c1e]">

  <div class="w-full max-w-md flex flex-col gap-6">
    <!-- Brand Header -->
    <div class="text-center flex flex-col items-center gap-2">
      <div class="w-14 h-14 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center p-2.5">
        <img src="https://lh3.googleusercontent.com/aida/AEtjO1XKE-XY4I90M61mEOWSiMj1OeBOkhszuuD7XSEcyRjm3WNEPl6H_7W1ssW-uJV6S4so1t0lqekavLaP87AnTmvXH4SzyRLvhUZ963ewuBhLVPS2o8z4W6CMWa2lY8um3y2Sl_uh0UbaaRil-vE1wCAPV2j83rE9lsuVw6mxyKxpnEx7HTeeMNnhI9f_YU67TJhSr4wGyGLOVsHVex1wFgeBdz9k8mmWbaSb1Pz5ONANap_MTUUVlfOZWA4" alt="ShopeePicks" class="h-full w-auto object-contain" />
      </div>
      <div>
        <h1 class="text-2xl font-black text-[#b22204] tracking-tight">ShopeePicks Admin</h1>
        <p class="text-xs text-gray-500 font-semibold mt-0.5">Involve Asia Affiliate & Catalog Engine</p>
      </div>
    </div>

    <!-- Security Card -->
    <div class="bg-white rounded-3xl p-7 shadow-xl border border-gray-100 relative overflow-hidden">
      <!-- Accent Top Line -->
      <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#b22204] to-red-500"></div>

      <div class="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
        <div>
          <h2 class="text-base font-bold text-gray-900">Masuk ke Portal Admin</h2>
          <p class="text-xs text-gray-500">Autentikasi terenkripsi & rate-limited</p>
        </div>
        <span class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">
          <span class="material-symbols-outlined text-xs">shield</span>
          Brute Force Guard
        </span>
      </div>

      <!-- Flash Notification Alerts -->
      @if (session('success'))
        <div class="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
          <span class="material-symbols-outlined text-sm">check_circle</span>
          <span>{{ session('success') }}</span>
        </div>
      @endif

      @if (session('info'))
        <div class="mb-4 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
          <span class="material-symbols-outlined text-sm">info</span>
          <span>{{ session('info') }}</span>
        </div>
      @endif

      @if (session('error'))
        <div class="mb-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
          <span class="material-symbols-outlined text-sm">error</span>
          <span>{{ session('error') }}</span>
        </div>
      @endif

      @if ($errors->any())
        <div class="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs flex flex-col gap-1">
          <div class="flex items-center gap-1.5 font-bold">
            <span class="material-symbols-outlined text-sm">warning</span>
            <span>Gagal masuk:</span>
          </div>
          <ul class="list-disc list-inside ml-1 space-y-0.5">
            @foreach ($errors->all() as $error)
              <li>{{ $error }}</li>
            @endforeach
          </ul>
        </div>
      @endif

      <!-- Login Form with CSRF Protection -->
      <form method="POST" action="{{ route('admin.login.submit') }}" class="flex flex-col gap-4">
        @csrf

        <!-- Email Field -->
        <div>
          <label for="email" class="block text-xs font-bold text-gray-700 mb-1.5">
            Email Administrator
          </label>
          <div class="relative">
            <span class="material-symbols-outlined text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-lg">
              mail
            </span>
            <input
              id="email"
              type="email"
              name="email"
              value="{{ old('email') }}"
              required
              autofocus
              placeholder="admin@shopeepicks.com"
              class="w-full bg-[#f2f4f6] focus:bg-white text-gray-900 text-xs font-medium pl-10 pr-3.5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#b22204]/30 focus:border-[#b22204] transition-all"
            />
          </div>
        </div>

        <!-- Password Field with Toggle Show/Hide -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label for="password" class="block text-xs font-bold text-gray-700">
              Kata Sandi
            </label>
            <span class="text-[11px] text-gray-400">Min. 6 Karakter</span>
          </div>
          <div class="relative">
            <span class="material-symbols-outlined text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-lg">
              lock
            </span>
            <input
              id="password"
              type="password"
              name="password"
              required
              placeholder="••••••••••••"
              class="w-full bg-[#f2f4f6] focus:bg-white text-gray-900 text-xs font-medium pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#b22204]/30 focus:border-[#b22204] transition-all"
            />
            <button
              type="button"
              onclick="togglePassword()"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
            >
              <span id="pwdIcon" class="material-symbols-outlined text-lg">visibility</span>
            </button>
          </div>
        </div>

        <!-- Remember Me Checkbox -->
        <div class="flex items-center justify-between pt-1">
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              class="w-4 h-4 rounded border-gray-300 text-[#b22204] focus:ring-[#b22204]"
            />
            <span class="text-xs text-gray-600 font-medium">Ingat Saya (30 Hari)</span>
          </label>
          <span class="text-[11px] text-gray-400 font-mono">Rate-limit: 5x/menit</span>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-[#b22204] hover:bg-[#d63c1e] text-white py-3.5 rounded-xl text-xs font-extrabold shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
        >
          <span class="material-symbols-outlined text-base">login</span>
          <span>Masuk ke Dashboard</span>
        </button>
      </form>

      <!-- Security Details Box -->
      <div class="mt-6 pt-5 border-t border-gray-100 flex flex-col gap-2">
        <div class="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
          <span class="material-symbols-outlined text-sm text-emerald-600">verified_user</span>
          <span>Dilindungi Session Regenerate, CSRF Guard, & Bcrypt Hashing</span>
        </div>
      </div>
    </div>

    <!-- Back to Storefront Link -->
    <div class="text-center">
      <a href="{{ url('/') }}" class="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#b22204] transition-colors">
        <span class="material-symbols-outlined text-sm">arrow_back</span>
        <span>Kembali ke Halaman Deals Katalog</span>
      </a>
    </div>
  </div>

  <script>
    function togglePassword() {
      const pwd = document.getElementById('password');
      const icon = document.getElementById('pwdIcon');
      if (pwd.type === 'password') {
        pwd.type = 'text';
        icon.innerText = 'visibility_off';
      } else {
        pwd.type = 'password';
        icon.innerText = 'visibility';
      }
    }
  </script>
</body>
</html>