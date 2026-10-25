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
}