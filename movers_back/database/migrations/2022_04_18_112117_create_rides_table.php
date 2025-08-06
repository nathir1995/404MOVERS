<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRidesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rides', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('car_id');
            $table->text('start_point_name');
            $table->string('start_lat');
            $table->string('start_lang');
            $table->string('pickup_date');
            $table->string('pickup_time');
            $table->text('end_point_name');
            $table->string('end_lat');
            $table->string('end_lang');
            // $table->string('end_date');
            // $table->string('end_time');
            $table->decimal('price',12,2);
            $table->string('comfort_seat')->comment('0= Yes , 1 = No')->default('1');
            $table->integer('how_many_pessenger')->default(1);
            $table->string('preference')->comment('0= Male , 1 = Female ,2 = Both')->default('1');
            $table->integer('instant_booking')->comment('0= Yes , 1 = No')->default(1);
            $table->integer('return_trip')->comment('0= Yes , 1 = No')->default(1);
            $table->text('instruction')->nullable();
            $table->integer('status')->comment('0 = Pending Ride, 1 = Ride Start, 2= Ride Complete , 3 = Ride Cancel')->default(0);
            $table->integer('ride_type')->comment('0 = No Parcel, 1 = With Parcel')->default(0);
            $table->timestamps();
        });

        Schema::table('rides', function(Blueprint $table) {

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
        Schema::dropIfExists('rides');

    }
}
