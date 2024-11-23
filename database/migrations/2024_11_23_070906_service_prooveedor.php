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
        Schema::create('service_proveedor', function (Blueprint $table) {
            $table->foreignUuid('proveedor_id')->nullable()->references('id')->on('proveedors')->onDelete('cascade');
            $table->foreignUuid('service_id')->nullable()->references('id')->on('services')->onDelete('cascade');
            $table->double('value')->nullable();
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
