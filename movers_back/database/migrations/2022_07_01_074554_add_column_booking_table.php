<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnBookingTable extends Migration
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
            $table->integer('booking_cancel_by')->comment('0 = Not Cancel ,1 = Cancel By Rider , 2 = Cancel By Passenger')->after('booking_status')->default(0);
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
            $table->dropColumn(['booking_cancel_by']);
         });
    }
}
