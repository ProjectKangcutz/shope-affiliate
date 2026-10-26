<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * Kolom-kolom yang diizinkan untuk diisi secara massal (Mass Assignment)
     */
    protected $fillable = [
        'sku',
        'name',
        'category',
        'brand',
        'price',
        'original_price',
        'discount_percent',
        'record_low_price',
        'main_image',
        'shopee_url',
        'voucher_code',
        'rating',
        'review_count',
        'sales_count',
        'description',
    ];

    /**
     * Relasi ke riwayat harga 90 hari
     */
    public function priceHistories()
    {
        return $this->hasMany(PriceHistory::class)->orderBy('recorded_at', 'asc');
    }

    /**
     * Relasi ke data klik pelacakan
     */
    public function clicks()
    {
        return $this->hasMany(Click::class);
    }
}