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
        Schema::table('services', function (Blueprint $table) {
            // $table->string('city')->default('cartagena');
            // $table->string('portada')->nullable();
            // $table->string('type');
            // $table->string('code')->unique();
            // $table->string('destinations')->nullable();
            // $table->string('duration_type');
            // $table->string('duration')->nullable();
            // $table->string('duration_unit')->nullable();
            // $table->string('capacidad_min')->nullable();
            // $table->string('capacidad_max')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
