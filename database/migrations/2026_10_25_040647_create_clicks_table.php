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
        Schema::create('clicks', function (Blueprint $table) {
            $table->id();
            $table->string('click_id')->unique();
            $table->string('sub_id1')->index(); // Session / Pengguna
            $table->string('sub_id2')->nullable()->index(); // SKU Produk
            $table->string('sub_id3')->nullable(); // Penempatan (Hero, Flash Deals, dll)
            $table->string('target_url', 1000);
            $table->string('ip_address')->nullable();
            $table->text('user_agent')->nullable();
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
        Schema::dropIfExists('clicks');
    }
};
