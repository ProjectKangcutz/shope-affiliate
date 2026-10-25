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
       Schema::create('conversions', function (Blueprint $table) {
        $table->id();
        $table->string('order_id')->unique();
        $table->string('click_id')->nullable()->index();
        $table->string('sub_id1')->nullable()->index();
        $table->string('sub_id2')->nullable()->index();
        $table->string('sub_id3')->nullable();
        $table->decimal('sale_amount', 12, 2);
        $table->decimal('commission_amount', 10, 2);
        $table->decimal('commission_rate', 5, 4)->default(0.085);
        $table->string('currency', 10)->default('IDR');
        $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
        $table->text('raw_payload')->nullable();
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
        Schema::dropIfExists('conversions');
    }
};
