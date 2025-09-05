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
        Schema::create('tickets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('booking_service_id')->constrained('booking_services')->nullable();
            $table->foreignUuid('ticket_type_id')->constrained('ticket_types')->nullable();
            $table->integer('cantidad')->default(0);
            $table->double('costo_total')->nullable();
            $table->string('tipo_movimiento'); //['entrada', 'salida']
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
