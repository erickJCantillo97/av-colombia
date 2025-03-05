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
        Schema::table('proveedors', function (Blueprint $table) {
            $table->string('nit')->nullable()->unique();
            $table->string('type_penalidad_cost')->nullable();
            $table->double('penalidad_no_show')->nullable();
            $table->double('penalidad_cancelacion')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('proveedors', function (Blueprint $table) {
            //
        });
    }
};
