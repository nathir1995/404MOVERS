<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColoumnTransactionAdmin extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('transaction', function (Blueprint $table) {
            //
            $table->integer('pay_to_rider')->comment('0 = Pending,1 = Success')->default(0)->after('amount');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('transaction', function (Blueprint $table) {
            //
            $table->dropColumn(['pay_to_rider']);
        });
    }
}
