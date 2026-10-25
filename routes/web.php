<?php

use Illuminate\Support\Facades\Route;
use App\Models\Product;
use App\Models\Click;
use App\Services\InvolveAsiaService;
use Illuminate\Support\Str;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/go/{productId}', function ($productId, InvolveAsiaService $involveAsia) {
    $product = Product::findOrFail($productId);

    $clickId = 'CLK_' . time() . '_' . Str::random(6);
    $sub1 = session()->getId(); // ID Sesi Pengguna
    $sub2 = $product->sku;      // SKU Produk
    $sub3 = request('placement', 'deals_grid'); // Lokasi Tombol Klik

    // Simpan data klik
    Click::create([
        'click_id'   => $clickId,
        'sub_id1'    => $sub1,
        'sub_id2'    => $sub2,
        'sub_id3'    => $sub3,
        'target_url' => $product->shopee_url,
        'ip_address' => request()->ip(),
        'user_agent' => request()->userAgent(),
    ]);

    // Hasilkan Deeplink Involve Asia
    $trackingUrl = $involveAsia->generateDeeplink($product->shopee_url, [
        'sub_id1' => $sub1,
        'sub_id2' => $sub2,
        'sub_id3' => $sub3,
    ]);

    return redirect()->away($trackingUrl);
})->name('affiliate.redirect');