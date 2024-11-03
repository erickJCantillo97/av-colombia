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
        Schema::create('locks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id')->nullable()->references('id')->on('users')->onDelete('cascade'); // ID del usuario
            $table->uuid('lockable_id'); // ID del servicio
            $table->string('lockable_type'); // Tipo de Lock
            $table->date('start_date'); // 
            $table->date('end_date'); // Fecha de expiración
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locks');
    }
};
