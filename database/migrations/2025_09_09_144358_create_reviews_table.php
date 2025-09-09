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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('accommodation_id')->constrained()->onDelete('cascade');
            $table->foreignId('booking_id')->nullable()->constrained()->onDelete('set null');
            $table->integer('rating');
            $table->text('comment');
            $table->timestamps();

            // Índices para optimizar búsquedas
            $table->index(['accommodation_id', 'rating']);
            $table->index(['user_id']);

            // Un usuario solo puede hacer una reseña por reserva
            $table->unique(['user_id', 'booking_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
