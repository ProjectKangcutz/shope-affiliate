<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Conversion;
use App\Models\Click;
use App\Services\InvolveAsiaService;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard()
    {
        // 1. Statistik Konversi & Komisi
        $totalOrders = Conversion::count();
        $totalCommissions = Conversion::where('status', '!=', 'rejected')->sum('commission_amount');
        $approvedCommissions = Conversion::where('status', 'approved')->sum('commission_amount');
        $pendingCommissions = Conversion::where('status', 'pending')->sum('commission_amount');
        $totalClicks = Click::count();

        $cr = $totalClicks > 0 ? round(($totalOrders / $totalClicks) * 100, 2) : 0;

        // 2. Data Terbaru
        $recentConversions = Conversion::latest()->take(8)->get();
        $products = Product::latest()->get();

        return view('admin.dashboard', compact(
            'totalOrders',
            'totalCommissions',
            'approvedCommissions',
            'pendingCommissions',
            'totalClicks',
            'cr',
            'recentConversions',
            'products'
        ));
    }

    // Tombol Manual Sinkronisasi Katalog dari Browser
    public function triggerSync(InvolveAsiaService $involveAsia)
    {
        $result = $involveAsia->syncProductCatalog();
        return redirect()->route('admin.dashboard')->with('success', "Katalog Berhasil Diperbarui! {$result['products_synced']} produk diperiksa.");
    }

 /**
     * Simpan produk Shopee baru dari form manual Dashboard Admin
     */
    public function storeProduct(Request $request)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'category'       => 'required|string',
            'brand'          => 'nullable|string',
            'price'          => 'required|numeric',
            'original_price' => 'required|numeric',
            'shopee_url'     => 'required|url',
            'voucher_code'   => 'nullable|string',
        ]);

        $discount = round((($validated['original_price'] - $validated['price']) / $validated['original_price']) * 100);

        \App\Models\Product::create([
            'sku'              => 'SP-' . strtoupper(\Illuminate\Support\Str::random(8)),
            'name'             => $validated['name'],
            'category'         => $validated['category'],
            'brand'            => $validated['brand'] ?? 'Shopee Choice',
            'price'            => $validated['price'],
            'original_price'   => $validated['original_price'],
            'discount_percent' => max(0, $discount),
            'record_low_price' => $validated['price'],
            'shopee_url'       => $validated['shopee_url'],
            'voucher_code'     => $validated['voucher_code'] ?? null,
        ]);

        return back()->with('success', 'Produk Shopee berhasil ditambahkan ke katalog!');
    }

    /**
     * Hapus produk dari katalog
     */
    public function destroyProduct($id)
    {
        \App\Models\Product::findOrFail($id)->delete();
        return back()->with('success', 'Produk berhasil dihapus!');
    }
}