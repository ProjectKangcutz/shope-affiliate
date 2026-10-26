<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Click extends Model
{
    use HasFactory;

    /**
     * Izinkan seluruh kolom klik (click_id, sub_id1, dll) untuk disimpan
     */
    protected $guarded = [];

    /**
     * Relasi ke model Product
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}