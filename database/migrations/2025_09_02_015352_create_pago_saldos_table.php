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
        Schema::create('pago_saldos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->decimal('amount', 15, 2);
            $table->foreignUuid('proveedor_id')->constrained('booking_proveedors')->cascadeOnDelete();
            $table->foreignUuid('booking_service_id')->constrained('booking_services')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pago_saldos');
    }
};
