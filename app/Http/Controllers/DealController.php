<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class DealController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->query('category', 'all');
        $query = Product::query();

        if ($category !== 'all') {
            $query->where('category', $category);
        }

        $products = $query->latest()->get();
        
        // Produk Spotlight utama (misal Baseus GaN5)
        $spotlightProduct = Product::where('sku', 'baseus-65w-gan5')->first() ?? $products->first();
        
        // Produk Flash Sale (diskon >= 55%)
        $flashDeals = Product::where('discount_percent', '>=', 55)->take(4)->get();

        return view('deals.index', compact('products', 'spotlightProduct', 'flashDeals', 'category'));
    }

/**
     * Redirect Afiliasi: Catat klik lalu alihkan ke Shopee via Involve Asia
     */
    public function redirect(Request $request, $id, \App\Services\InvolveAsiaService $involveAsia)
    {
        $product = \App\Models\Product::findOrFail($id);
        $clickId = 'CLK_' . time() . '_' . \Illuminate\Support\Str::random(5);

        // Data yang pasti ada di tabel clicks database Anda:
        $clickData = [
            'click_id'   => $clickId,
            'sub_id1'    => $clickId,
            'sub_id2'    => (string) $product->id, // ID Produk disimpan di sub_id2 untuk atribusi komisi
            'sub_id3'    => 'storefront',
            'target_url' => $product->shopee_url,
            'user_agent' => substr($request->userAgent() ?? '', 0, 255),
            'ip_address' => $request->ip(),
        ];

        // Masukkan kolom product_id hanya jika ada di tabel clicks database Anda
        if (\Illuminate\Support\Facades\Schema::hasColumn('clicks', 'product_id')) {
            $clickData['product_id'] = $product->id;
        }

        // Simpan data klik ke database
        \App\Models\Click::create($clickData);

        // Generate Deep Link Involve Asia Resmi (https://invl.io/clo5y2m?...)
        $affiliateUrl = $involveAsia->generateDeeplink($product->shopee_url, [
            'sub_id1' => $clickId,
            'sub_id2' => (string) $product->id,
            'sub_id3' => 'storefront',
        ]);

        // Alihkan pembeli langsung ke produk di Shopee
        return redirect()->away($affiliateUrl);
    }
}