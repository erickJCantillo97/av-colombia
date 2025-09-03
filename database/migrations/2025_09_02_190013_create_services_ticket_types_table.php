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
        Schema::create('services_ticket_types', function (Blueprint $table) {
            // $table->uuid('id')->primary();
            $table->foreignUuid('service_id')->constrained('services')->onDelete('cascade');
            $table->foreignUuid('ticket_type_id')->constrained('ticket_types')->onDelete('cascade');
            $table->timestamps();
            
            $table->unique(['service_id', 'ticket_type_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services_ticket_types');
    }
};
