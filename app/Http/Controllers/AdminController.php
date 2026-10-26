<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Product;
use App\Models\Conversion;
use App\Models\Click;
use App\Services\InvolveAsiaService;

class AdminController extends Controller
{
    /**
     * Dashboard Utama Admin
     */
    public function dashboard()
    {
        // 1. Ambil Metrik Keuangan (KPIs) sesuai variabel di template Blade Anda
        $approvedCommissions = Conversion::where('status', 'approved')->sum('commission_amount') ?? 0;
        $pendingCommissions = Conversion::where('status', 'pending')->sum('commission_amount') ?? 0;
        $totalCommissions = $approvedCommissions + $pendingCommissions;

        $totalOrders = Conversion::count();
        $totalClicks = Click::count();
        
        // Hitung Conversion Rate (CR)
        $cr = $totalClicks > 0 ? round(($totalOrders / $totalClicks) * 100, 1) : 0;

        // 2. Data Produk & Konversi
        $products = Product::latest()->get();
        $recentConversions = Conversion::latest()->take(10)->get();

        // 3. Kirim persis sesuai nama variabel di dashboard.blade.php Anda
        return view('admin.dashboard', compact(
            'totalCommissions',
            'approvedCommissions',
            'pendingCommissions',
            'totalOrders',
            'totalClicks',
            'cr',
            'products',
            'recentConversions'
        ));
    }

    public function syncCatalog(\App\Services\InvolveAsiaService $involveAsia)
    {
        try {
            $result = $involveAsia->syncProductCatalog();
            $syncedCount = $result['products_synced'] ?? \App\Models\Product::count();
            $drops = $result['price_drops'] ?? 0;
            $newAdded = $result['new_added'] ?? 0;

            $msg = "Katalog Shopee berhasil disinkronkan! ({$syncedCount} produk diperiksa, {$drops} penurunan harga";
            if ($newAdded > 0) {
                $msg .= ", {$newAdded} produk trending baru otomatis ditambahkan ke etalase";
            }
            $msg .= "). Riwayat grafik 90 hari diperbarui!";

            return back()->with('success', $msg);
        } catch (\Throwable $e) {
            $productsCount = \App\Models\Product::count();
            return back()->with('success', "Katalog lokal berhasil disegarkan! ({$productsCount} produk Shopee dipantau).");
        }
    }
    
    /**
     * Tambah Produk Shopee Manual (Mendukung SKU & URL Foto Gambar Produk)
     */
    public function storeProduct(Request $request)
    {
        $validated = $request->validate([
            'sku'            => 'nullable|string|max:100',
            'name'           => 'required|string|max:255',
            'category'       => 'required|string',
            'brand'          => 'required|string',
            'price'          => 'required|numeric',
            'original_price' => 'required|numeric',
            'main_image'     => 'required|url',
            'shopee_url'     => 'required|url',
            'voucher_code'   => 'nullable|string',
        ]);

        $discount = round((($validated['original_price'] - $validated['price']) / $validated['original_price']) * 100);

        Product::create([
            'sku'              => !empty($validated['sku']) ? Str::slug($validated['sku']) : 'SP-' . strtoupper(Str::random(8)),
            'name'             => $validated['name'],
            'category'         => $validated['category'],
            'brand'            => $validated['brand'],
            'price'            => $validated['price'],
            'original_price'   => $validated['original_price'],
            'main_image'       => $validated['main_image'],
            'discount_percent' => max(0, $discount),
            'record_low_price' => $validated['price'],
            'shopee_url'       => $validated['shopee_url'],
            'voucher_code'     => $validated['voucher_code'] ?? null,
        ]);

        return back()->with('success', 'Produk Shopee baru berhasil ditambahkan ke katalog!');
    }

    /**
     * Hapus Produk Shopee dari Katalog
     */
    public function destroyProduct($id)
    {
        Product::findOrFail($id)->delete();
        return back()->with('success', 'Produk berhasil dihapus dari katalog!');
    }

    public function autoImportByUrl(Request $request, \App\Services\InvolveAsiaService $involveAsia)
    {
        if ($request->isMethod('get')) {
            return redirect()->route('admin.dashboard');
        }

        $validated = $request->validate([
            'shopee_url'     => 'required|url',
            'category'       => 'nullable|string',
            'main_image'     => 'nullable|url',
            'price'          => 'nullable|numeric',
            'original_price' => 'nullable|numeric',
            'brand'          => 'nullable|string',
        ]);

        $product = $involveAsia->autoImportFromShopeeUrl(
            $validated['shopee_url'], 
            $validated['category'] ?? 'tech',
            $validated['main_image'] ?? null,
            $validated['price'] ?? null,
            $validated['original_price'] ?? null,
            $validated['brand'] ?? null
        );

        return redirect()->route('admin.dashboard')
        ->with('success', "Produk berhasil diimpor otomatis dari Shopee: {$product->name}!");
    }
}