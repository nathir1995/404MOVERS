<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnBookingIdComplaints extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('complaints', function (Blueprint $table) {
            //
            $table->bigInteger('booking_id')->unsigned()->after('ride_id');
            $table->foreign('booking_id')->references('id')->on('booking')->onUpdate('cascade')->onDelete('cascade');
          
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
        Schema::table('complaints', function (Blueprint $table) {
            //
            $table->dropColumn(['booking_id']);
        });
    }
}
