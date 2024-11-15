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
        Schema::create('booking_proveedors', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('booking_service_id')->nullable()->references('id')->on('booking_services')->onDelete('cascade');
            $table->foreignUuid('proveedor_id')->nullable()->references('id')->on('proveedors')->onDelete('cascade');
            $table->double('cost');
            $table->double('payment')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_proveedors');
    }
};
