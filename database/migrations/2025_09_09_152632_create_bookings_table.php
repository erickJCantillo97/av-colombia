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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('room_id')->constrained('rooms')->onDelete('cascade');

            $table->date('check_in_date');
            $table->date('check_out_date');

            $table->integer('guests_adults')->default(1);
            $table->integer('guests_children')->default(0);

            $table->string('guest_name')->nullable();
            $table->string('guest_email')->nullable();
            $table->string('guest_phone')->nullable();
            $table->string('guest_document')->nullable();
            $table->text('special_requests')->nullable();

            $table->decimal('total_price', 10, 2);
            $table->enum('status', ['pendiente', 'confirmada', 'cancelada', 'completada'])->default('confirmada');

            $table->timestamps();

            // Índices para optimizar consultas
            $table->index(['check_in_date', 'check_out_date']);
            $table->index(['status']);
            $table->index(['user_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
