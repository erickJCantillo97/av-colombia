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
        Schema::table('booking_services', function (Blueprint $table) {
            $table->integer('adults_nacionales')->default(0)->after('adults');
            $table->integer('adults_extranjeros')->default(0)->after('adults_nacionales');
            $table->integer('boys_nacionales')->default(0)->after('boys');
            $table->integer('boys_extranjeros')->default(0)->after('boys_nacionales');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('booking_services', function (Blueprint $table) {
            $table->dropColumn(['adults_nacionales', 'adults_extranjeros', 'boys_nacionales', 'boys_extranjeros']);
        });
    }
};
