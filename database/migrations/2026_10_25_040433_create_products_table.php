<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
// 1. Katalog Produk Shopee
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->unique();
            $table->string('name');
            $table->string('category');
            $table->string('brand');
            $table->decimal('price', 12, 2);
            $table->decimal('original_price', 12, 2);
            $table->integer('discount_percent')->default(0);
            $table->decimal('record_low_price', 12, 2)->default(0);
            $table->string('shopee_url', 1000);
            $table->string('involve_offer_id')->default('100412');
            $table->string('voucher_code')->nullable();
            $table->decimal('voucher_discount', 10, 2)->default(0);
            $table->integer('stock_left')->default(10);
            $table->string('main_image', 1000)->nullable();
            $table->json('gallery_images')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
