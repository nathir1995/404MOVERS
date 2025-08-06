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
        Schema::table('move_packages', function (Blueprint $table) {
            $table->decimal('base_fee', 8, 2)->default(0)->after('price');
            $table->decimal('km_rate', 8, 2)->default(0)->after('base_fee');
            $table->decimal('labor_rate', 8, 2)->default(0)->after('km_rate');
            $table->integer('default_drivers')->default(1)->after('labor_rate');
            $table->integer('default_laborers')->default(2)->after('default_drivers');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('move_packages', function (Blueprint $table) {
            $table->dropColumn(['base_fee', 'km_rate', 'labor_rate', 'default_drivers', 'default_laborers']);
        });
    }
}; 