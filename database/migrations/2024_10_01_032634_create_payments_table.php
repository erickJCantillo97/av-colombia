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
        Schema::create('payments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->nullable()->references('id')->on('users')->onDelete('cascade'); // ID del usuario
            $table->uuid('payable_id'); // ID del servicio
            $table->string('payable_type'); // Tipo de pago
            $table->foreignId('method')->nullable()->references('id')->on('payment_methods')->onDelete('cascade');; // Metodo de pago
            $table->string('status'); // Estado
            $table->double('amount'); // Monto
            $table->string('currency'); // Moneda
            $table->string('type')->default('abono'); // Tipo de pago (abono, total)
            // $table->string('description'); 
            // $table->string('response'); // Respuesta
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
