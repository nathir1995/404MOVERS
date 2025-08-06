<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRideTimming extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('booking', function (Blueprint $table) {
            $table->string('ride_start_time')->after('start_lang');
            $table->string('ride_end_time')->after('end_lang');
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
        Schema::table('booking',function(Blueprint $table){
            $table->dropColumn(['ride_start_time','ride_end_time']);
         });
    }
}
