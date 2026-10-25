<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DealController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ConversionPostbackController;
use App\Http\Middleware\AdminMiddleware;

/*
|--------------------------------------------------------------------------
| 1. STOREFRONT PUBLIC ROUTES
|--------------------------------------------------------------------------
*/
Route::get('/', [DealController::class, 'index'])->name('home');
Route::get('/product/{sku}', [ProductController::class, 'show'])->name('product.show');
Route::get('/products/{sku}', [ProductController::class, 'show'])->name('products.show');
Route::get('/go/{id}', [DealController::class, 'redirect'])->name('affiliate.redirect');

/*
|--------------------------------------------------------------------------
| 2. INVOLVE ASIA S2S WEBHOOK POSTBACK
|--------------------------------------------------------------------------
*/
Route::post('/api/involve-asia/postback', [ConversionPostbackController::class, 'handlePostback'])->name('involve.postback');

/*
|--------------------------------------------------------------------------
| 3. SECURE ADMIN PORTAL ROUTES
|--------------------------------------------------------------------------
*/
Route::redirect('/home', '/');
Route::redirect('/login', '/admin/login')->name('login');

Route::prefix('admin')->name('admin.')->group(function () {

    // Login Admin
    Route::middleware(['throttle:5,1'])->group(function () {
        Route::get('/login', [AdminAuthController::class, 'showLoginForm'])->name('login');
        Route::post('/login', [AdminAuthController::class, 'login'])->name('login.submit');
    });

    // Protected Admin Routes
    Route::middleware(['auth', AdminMiddleware::class])->group(function () {
        Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
        Route::post('/sync-catalog', [AdminController::class, 'syncCatalog'])->name('sync');

        // Form Tambah Produk
        Route::post('/product/store', [AdminController::class, 'storeProduct'])->name('product.store');
        Route::post('/products/store', [AdminController::class, 'storeProduct'])->name('products.store');

        // Tombol Hapus Produk (admin.product.delete & admin.product.destroy)
        Route::match(['delete', 'post', 'get'], '/product/{id}/delete', [AdminController::class, 'destroyProduct'])->name('product.delete');
        Route::match(['delete', 'post', 'get'], '/product/{id}', [AdminController::class, 'destroyProduct'])->name('product.destroy');

        Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');
    });
});