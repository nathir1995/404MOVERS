<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnBookingTableRating extends Migration
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
            $table->integer('review')->comment('0 = Review Not Given ,1 =  , 2 = Review Given')->after('booking_status')->default(0);
            $table->integer('report')->comment('0 = Report Not Given ,1 =  , 2 = Report Given')->after('review')->default(0);
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
            $table->dropColumn(['review','report']);
         });
    }
}
