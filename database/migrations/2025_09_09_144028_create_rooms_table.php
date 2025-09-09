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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('accommodation_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description');
            $table->integer('capacity_adults')->default(1);
            $table->integer('capacity_children')->default(0);
            $table->decimal('price_per_night', 10, 2);
            $table->boolean('is_available')->default(true);
            $table->timestamps();

            // Índices para optimizar búsquedas
            $table->index(['accommodation_id', 'is_available']);
            $table->index(['price_per_night']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
