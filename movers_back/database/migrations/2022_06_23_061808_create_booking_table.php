<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('booking', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('ride_id')->unsigned();
            $table->foreign('ride_id')->references('id')->on('rides')->onUpdate('cascade')->onDelete('cascade');
            $table->bigInteger('user_id')->unsigned();
            $table->text('start_point_name');
            $table->string('start_lat');
            $table->string('start_lang');
            $table->text('end_point_name');
            $table->string('end_lat');
            $table->string('end_lang');
            $table->string('distance');
            $table->decimal('price',12,2);
            $table->string('booked_seat');
            $table->integer('payment_status')->comment('0 = Cancel ,1 = Success ,2 = Failed,  3 = Pending')->default(3);
            $table->integer('booking_status')->comment('0 = Request accept ,1 = Pending Request, 2 = Cancel Request , 3 = Driver reject request')->default(1);
            $table->timestamps();
        });

        Schema::table('booking', function(Blueprint $table) {
            
            $table->foreign('user_id')
            ->references('id')
            ->on('users')
            ->onDelete('cascade')->onUpdate("cascade");

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('booking');
    }
}
