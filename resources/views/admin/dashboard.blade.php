<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Dashboard • ShopeePicks Affiliate Center</title>

  <!-- Google Fonts & Icons -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />

  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            "primary": "#b22204",
            "primary-container": "#d63c1e",
            "tertiary": "#006947",
            "surface": "#f7f9fb",
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
          }
        }
      }
    };
  </script>
</head>
<body class="bg-[#f4f6f8] text-gray-900 antialiased font-sans">

  <!-- ================= TOP ADMIN BAR ================= -->
<!-- Top Admin Header -->
  <header class="bg-white border-b border-gray-200 sticky top-0 z-30 px-6 py-3.5 flex items-center justify-between">
    <!-- Kiri: Brand & Logo -->
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 bg-red-50 text-[#b22204] rounded-xl flex items-center justify-center font-black">
        SP
      </div>
      <div>
        <h1 class="text-sm font-extrabold text-gray-900 leading-tight">ShopeePicks Admin Control Center</h1>
        <p class="text-[11px] text-gray-500">Involve Asia Affiliate & Catalog Engine</p>
      </div>
    </div>
    
    <!-- Kanan: Profil Admin, Link Toko & Tombol Logout -->
    <div class="flex items-center gap-3">
      <!-- Badge Admin Login Aktif -->
      <div class="hidden sm:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 text-xs">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="font-bold text-gray-700">{{ Auth::user()->name ?? 'Administrator' }}</span>
        <span class="text-gray-400 text-[11px]">({{ Auth::user()->email ?? 'admin@shopeepicks.com' }})</span>
      </div>

      <!-- Link ke Toko Publik -->
      <a href="{{ url('/') }}" target="_blank" class="text-xs font-bold text-gray-600 hover:text-[#b22204] flex items-center gap-1 transition-colors px-2.5 py-1.5 rounded-xl hover:bg-gray-50">
        <span>Lihat Toko Publik</span>
        <span class="material-symbols-outlined text-sm">open_in_new</span>
      </a>

      <!-- TOMBOL LOGOUT AMAN DENGAN CSRF -->
      <form method="POST" action="{{ route('admin.logout') }}" class="inline">
        @csrf
        <button 
          type="submit" 
          class="bg-red-50 hover:bg-[#b22204] text-[#b22204] hover:text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-red-200 hover:border-[#b22204] shadow-xs"
          title="Keluar dari akun admin"
        >
          <span class="material-symbols-outlined text-sm">logout</span>
          <span>Logout</span>
        </button>
      </form>
    </div>
  </header>

  <!-- ================= MAIN DASHBOARD BODY ================= -->
  <main class="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6">

    <!-- Notifikasi Sukses -->
    @if(session('success'))
    <div class="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
      <span class="material-symbols-outlined text-emerald-700 text-base">check_circle</span>
      <span>{{ session('success') }}</span>
    </div>
    @endif

    <!-- 1. Header Bar + Tombol Sync Manual -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-xs border border-gray-200">
      <div>
        <h2 class="text-xl font-black text-gray-900">Ringkasan Kinerja & Pendapatan</h2>
        <p class="text-xs text-gray-500 mt-0.5">Pantau komisi real-time dari Involve Asia dan status otomasi katalog produk Shopee.</p>
      </div>
      <form action="{{ route('admin.sync') }}" method="POST">
        @csrf
        <button type="submit" class="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all">
          <span class="material-symbols-outlined text-sm">sync</span>
          <span>Sinkronkan Katalog Sekarang</span>
        </button>
      </form>
    </div>

    <!-- 2. Kartu Metrik Keuangan (KPIs) -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
      <div class="bg-white p-4 rounded-2xl shadow-xs border border-gray-200 flex flex-col">
        <span class="text-[11px] font-bold text-gray-400 uppercase">Total Komisi</span>
        <span class="text-2xl font-black text-primary mt-1">Rp {{ number_format($totalCommissions, 0, ',', '.') }}</span>
        <span class="text-[10px] text-emerald-700 font-bold mt-1">Rp {{ number_format($approvedCommissions, 0, ',', '.') }} Approved</span>
      </div>

      <div class="bg-white p-4 rounded-2xl shadow-xs border border-gray-200 flex flex-col">
        <span class="text-[11px] font-bold text-gray-400 uppercase">Komisi Pending</span>
        <span class="text-2xl font-black text-amber-600 mt-1">Rp {{ number_format($pendingCommissions, 0, ',', '.') }}</span>
        <span class="text-[10px] text-gray-400 mt-1">Menunggu validasi Shopee</span>
      </div>

      <div class="bg-white p-4 rounded-2xl shadow-xs border border-gray-200 flex flex-col">
        <span class="text-[11px] font-bold text-gray-400 uppercase">Order / Konversi</span>
        <span class="text-2xl font-black text-gray-900 mt-1">{{ $totalOrders }}</span>
        <span class="text-[10px] text-gray-400 mt-1">Total transaksi terekam</span>
      </div>

      <div class="bg-white p-4 rounded-2xl shadow-xs border border-gray-200 flex flex-col">
        <span class="text-[11px] font-bold text-gray-400 uppercase">Total Klik</span>
        <span class="text-2xl font-black text-gray-900 mt-1">{{ $totalClicks }}</span>
        <span class="text-[10px] text-gray-400 mt-1">Klik link keluar pengunjung</span>
      </div>

      <div class="bg-white p-4 rounded-2xl shadow-xs border border-gray-200 flex flex-col">
        <span class="text-[11px] font-bold text-gray-400 uppercase">Conversion Rate (CR)</span>
        <span class="text-2xl font-black text-emerald-700 mt-1">{{ $cr }}%</span>
        <span class="text-[10px] text-gray-400 mt-1">Rasio klik jadi pembeli</span>
      </div>
    </div>

    <!-- 3. Form Tambah Produk Shopee Baru (Cepat & Praktis) -->
    <div class="bg-white p-6 rounded-2xl shadow-xs border border-gray-200 flex flex-col gap-4">
      <div class="flex items-center gap-2 border-b pb-3">
        <span class="material-symbols-outlined text-primary text-xl">add_circle</span>
        <h3 class="text-sm font-bold text-gray-900">Tambah Produk Rekomendasi Baru ke Katalog</h3>
      </div>
      <form action="{{ route('admin.product.store') }}" method="POST" class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        @csrf
        <div>
          <label class="block font-bold text-gray-600 mb-1">SKU Unik (e.g. keyboard-rgb-rk)</label>
          <input type="text" name="sku" required class="w-full bg-surface border rounded-xl p-2 focus:outline-none" />
        </div>
        <div class="sm:col-span-2">
          <label class="block font-bold text-gray-600 mb-1">Nama Produk Shopee</label>
          <input type="text" name="name" required class="w-full bg-surface border rounded-xl p-2 focus:outline-none" />
        </div>
        <div>
          <label class="block font-bold text-gray-600 mb-1">Kategori (tech/home/kitchen/beauty)</label>
          <select name="category" class="w-full bg-surface border rounded-xl p-2">
            <option value="tech">Tech & Gadgets</option>
            <option value="home">Home & Living</option>
            <option value="kitchen">Kitchen & Dining</option>
            <option value="beauty">Beauty & Fashion</option>
          </select>
        </div>
        <div>
          <label class="block font-bold text-gray-600 mb-1">Nama Brand / Toko</label>
          <input type="text" name="brand" required class="w-full bg-surface border rounded-xl p-2" />
        </div>
        <div>
          <label class="block font-bold text-gray-600 mb-1">Kode Voucher Diskon (Opsional)</label>
          <input type="text" name="voucher_code" placeholder="SHOPEE100" class="w-full bg-surface border rounded-xl p-2" />
        </div>
        <div>
          <label class="block font-bold text-gray-600 mb-1">Harga Promo (Rp)</label>
          <input type="number" name="price" required class="w-full bg-surface border rounded-xl p-2" />
        </div>
        <div>
          <label class="block font-bold text-gray-600 mb-1">Harga Coret Normal (Rp)</label>
          <input type="number" name="original_price" required class="w-full bg-surface border rounded-xl p-2" />
        </div>
        <div>
          <label class="block font-bold text-gray-600 mb-1">URL Gambar Produk (Link Foto)</label>
          <input type="url" name="main_image" required placeholder="https://..." class="w-full bg-surface border rounded-xl p-2" />
        </div>
        <div class="sm:col-span-3">
          <label class="block font-bold text-gray-600 mb-1">Link Asli Produk Shopee</label>
          <input type="url" name="shopee_url" required placeholder="https://shopee.co.id/product/..." class="w-full bg-surface border rounded-xl p-2" />
        </div>
        <div class="sm:col-span-3 pt-2">
          <button type="submit" class="bg-primary hover:bg-primary-container text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-sm">
            Simpan Produk ke Katalog
          </button>
        </div>
      </form>
    </div>

    <!-- 4. Tabel Konversi Postback Terbaru (Real-Time Involve Asia) -->
    <div class="bg-white p-6 rounded-2xl shadow-xs border border-gray-200 flex flex-col gap-4">
      <h3 class="text-sm font-bold text-gray-900 flex items-center gap-1.5 border-b pb-3">
        <span class="material-symbols-outlined text-emerald-700 text-lg">receipt_long</span>
        <span>Daftar Konversi Pembelian Terbaru (S2S Postback)</span>
      </h3>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-surface text-gray-500 font-bold uppercase text-[10px]">
            <tr>
              <th class="py-2.5 px-3">Order ID</th>
              <th class="py-2.5 px-3">Sub-ID 1 (Channel)</th>
              <th class="py-2.5 px-3">Total Belanja</th>
              <th class="py-2.5 px-3">Komisi Diterima</th>
              <th class="py-2.5 px-3">Status</th>
              <th class="py-2.5 px-3">Waktu</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 font-medium">
            @forelse($recentConversions as $conv)
            <tr class="hover:bg-gray-50">
              <td class="py-2.5 px-3 font-mono font-bold">{{ $conv->order_id }}</td>
              <td class="py-2.5 px-3">{{ $conv->sub_id1 ?? 'organic' }}</td>
              <td class="py-2.5 px-3 font-bold">Rp {{ number_format($conv->sale_amount, 0, ',', '.') }}</td>
              <td class="py-2.5 px-3 font-black text-primary">Rp {{ number_format($conv->commission_amount, 0, ',', '.') }}</td>
              <td class="py-2.5 px-3">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold capitalize {{ $conv->status === 'approved' ? 'bg-emerald-100 text-emerald-800' : ($conv->status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800') }}">
                  {{ $conv->status }}
                </span>
              </td>
              <td class="py-2.5 px-3 text-gray-400 text-[10px]">{{ $conv->created_at->diffForHumans() }}</td>
            </tr>
            @empty
            <tr>
              <td colspan="6" class="text-center py-4 text-gray-400">Belum ada data transaksi pembelian dari Shopee.</td>
            </tr>
            @endforelse
          </tbody>
        </table>
      </div>
    </div>

    <!-- 5. Tabel Manajemen Produk Terdaftar -->
    <div class="bg-white p-6 rounded-2xl shadow-xs border border-gray-200 flex flex-col gap-4">
      <h3 class="text-sm font-bold text-gray-900 border-b pb-3">Daftar Produk Aktif di Toko ({{ $products->count() }} Produk)</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-surface text-gray-500 font-bold uppercase text-[10px]">
            <tr>
              <th class="py-2.5 px-3">Foto</th>
              <th class="py-2.5 px-3">Nama Produk</th>
              <th class="py-2.5 px-3">Kategori</th>
              <th class="py-2.5 px-3">Harga Promo</th>
              <th class="py-2.5 px-3">Diskon</th>
              <th class="py-2.5 px-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 font-medium">
            @foreach($products as $prod)
            <tr class="hover:bg-gray-50">
              <td class="py-2 px-3">
                <img src="{{ $prod->main_image }}" class="w-10 h-10 object-contain rounded" />
              </td>
              <td class="py-2 px-3 font-bold text-gray-900 max-w-xs truncate">{{ $prod->name }}</td>
              <td class="py-2 px-3 uppercase text-[10px]">{{ $prod->category }}</td>
              <td class="py-2 px-3 font-bold text-primary">Rp {{ number_format($prod->price, 0, ',', '.') }}</td>
              <td class="py-2 px-3 font-bold text-emerald-700">-{{ $prod->discount_percent }}%</td>
              <td class="py-2 px-3 text-right">
                <form action="{{ route('admin.product.delete', $prod->id) }}" method="POST" onsubmit="return confirm('Hapus produk ini?');" class="inline">
                  @csrf
                  @method('DELETE')
                  <button type="submit" class="text-red-600 hover:text-red-800 font-bold text-xs">Hapus</button>
                </form>
              </td>
            </tr>
            @endforeach
          </tbody>
        </table>
      </div>
    </div>

  </main>
</body>
</html>