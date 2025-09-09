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
        Schema::create('accommodations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description');
            $table->enum('type', ['hotel', 'apartamento', 'casa', 'hostal', 'villa']);
            $table->string('address_line_1');
            $table->string('city');
            $table->string('state');
            $table->string('country');
            $table->string('postal_code');
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->integer('star_rating')->default(1);
            $table->string('contact_email');
            $table->string('contact_phone');
            $table->enum('status', ['publicado', 'borrador', 'inactivo'])->default('borrador');
            $table->timestamps();

            // Índices para optimizar búsquedas
            $table->index(['city', 'country']);
            $table->index(['type', 'status']);
            $table->index(['star_rating', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accommodations');
    }
};
