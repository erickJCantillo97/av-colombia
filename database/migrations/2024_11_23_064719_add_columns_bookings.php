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
        Schema::table('booking_services', function (Blueprint $table) {
            $table->double('value_pasajero')->nullable();
            $table->double('mascota')->default(0);
            $table->double('persona_adicional')->default(0);
            $table->double('cobre_transaccion')->default(0);
            $table->double('cobro_extra_cliente')->default(0);
            $table->double('alimentacion')->default(0);
            $table->double('alimentacion_proveedor')->default(0);
            $table->double('reserva')->default(0);
            $table->double('saldo')->default(0);
            $table->double('total')->default(0);
            $table->double('servicios_adicionales')->default(0);
            $table->date('fecha_cancelacion')->nullable();
            $table->double('penalidad')->default(0);
            $table->double('valor_penalidad')->default(0);
            $table->double('devolucion')->default(0);
            $table->double('penalidad_agencia')->default(0);
            $table->double('penalidad_proveedor')->default(0);
            $table->double('comision_plataforma')->default(0);
            $table->double('percent_plataforma')->default(0);
            $table->double('total_pago_proveedor')->default(0);
            $table->double('total_pago_agencia')->default(0);
            $table->double('pago_extra_proveedor')->default(0);
            $table->double('percent_descuento')->default(0);
            $table->double('utilidad')->default(0);
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('booking_services', function (Blueprint $table) {
            //
        });
    }
};
