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
        Schema::create('services', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title')->unique();
            $table->string('title_en')->unique()->nullable();
            $table->string('slug')->unique();
            $table->string('days')->nullable();
            $table->text('description', 4000);
            $table->text('description_en', 4000)->nullable();
            $table->double('adults_price');
            $table->double('boys_price');
            $table->string('includes')->nullable();
            $table->string('notIncludes')->nullable();
            $table->boolean('problematic')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
