<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('custom_product_users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->double('custom_price');
            $table->id('user_id');
            $table->uuid('service
            
            
            
            
            
            
            
            
            _id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('service
            
            
            
            
            
            
            
            
            _id')->references('id')->on('services')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('custom_product_users');
    }
};
