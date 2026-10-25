<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DealController;
use App\Http\Controllers\ProductController;
use App\Models\Product;
use App\Models\Click;
use App\Services\InvolveAsiaService;
use Illuminate\Support\Str;

// Halaman Katalog Tampilan Preview
Route::get('/', [DealController::class, 'index'])->name('home');

// Rute Redirect Afiliasi dengan Sub-ID Tracking Involve Asia
Route::get('/go/{id}', function ($id, InvolveAsiaService $involveAsia) {
    $product = Product::findOrFail($id);

    $clickId = 'CLK_' . time() . '_' . Str::random(6);
    $sub1 = session()->getId();
    $sub2 = $product->sku;
    $sub3 = request('placement', 'deals_page');

    Click::create([
        'click_id'   => $clickId,
        'sub_id1'    => $sub1,
        'sub_id2'    => $sub2,
        'sub_id3'    => $sub3,
        'target_url' => $product->shopee_url,
        'ip_address' => request()->ip(),
        'user_agent' => request()->userAgent(),
    ]);

    $deeplink = $involveAsia->generateDeeplink($product->shopee_url, [
        'sub_id1' => $sub1,
        'sub_id2' => $sub2,
        'sub_id3' => $sub3,
    ]);

    return redirect()->away($deeplink);
})->name('affiliate.redirect');

// Halaman Detail Produk Berdasarkan SKU (contoh: /product/baseus-65w-gan5)
Route::get('/product/{sku}', [ProductController::class, 'show'])->name('product.show');