<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function show(string $sku)
    {
        // Cari produk berdasarkan SKU atau ID
        $product = Product::where('sku', $sku)->firstOrFail();

        // Ambil produk rekomendasi lainnya (kategori sejenis)
        $relatedProducts = Product::where('id', '!=', $product->id)
                                  ->where('category', $product->category)
                                  ->take(3)
                                  ->get();

        if ($relatedProducts->isEmpty()) {
            $relatedProducts = Product::where('id', '!=', $product->id)->take(3)->get();
        }

        return view('products.show', compact('product', 'relatedProducts'));
    }
}