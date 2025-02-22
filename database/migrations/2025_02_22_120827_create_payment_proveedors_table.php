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
        Schema::create('payment_proveedors', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->nullable()->references('id')->on('users')->onDelete('cascade'); // ID del usuario
            $table->foreignUuid('proveedor_id')->nullable()->references('id')->on('proveedors')->onDelete('cascade');
            $table->double('amount'); // Monto
            $table->string('comprobante')->nullable();
            $table->date('date');
            $table->date('startDate');
            $table->date('endDate');
            $table->string('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_proveedors');
    }
};
