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
        Schema::create('booking_services', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('service');
            $table->uuid('service_id');
            $table->integer('adults');
            $table->double('adults_price');
            $table->double('adult_tarifa');
            $table->integer('boys');
            $table->double('boys_tarifa');
            $table->double('boys_price');
            $table->date('date');
            $table->time('hour');
            $table->string('status')->default('reservado');
            $table->string('payment')->default('pendiente');
            $table->string('cliente_name');
            $table->string('cliente_phone');
            $table->string('cliente_building');
            $table->foreignId('user_id')->nullable()->references('id')->on('users')->onDelete('cascade');
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_services');
    }
};
