<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMovesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('moves', function (Blueprint $table) {
            $table->id();
            $table->string('move_number')->nullable();
            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->bigInteger('guest_id')->unsigned()->nullable();
            $table->foreign('guest_id')->references('id')->on('guests')->onUpdate('cascade')->onDelete('cascade');
            $table->bigInteger('move_package_id')->unsigned();
            $table->foreign('move_package_id')->references('id')->on('move_packages')->onUpdate('cascade')->onDelete('cascade');
            $table->text('start_point_name')->nullable();
            $table->string('start_lat')->nullable();
            $table->string('start_lang')->nullable();
            $table->text('end_point_name')->nullable();
            $table->string('end_lat')->nullable();
            $table->string('end_lang')->nullable();
            $table->string('start_building_number')->nullable();
            $table->string('start_apartment_number')->nullable();
            $table->string('end_building_number')->nullable();
            $table->string('end_apartment_number')->nullable();
            $table->dateTime('move_date_time')->nullable();
            $table->bigInteger('move_status_id')->unsigned();
            $table->foreign('move_status_id')->references('id')->on('move_statuses')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('number_of_drivers')->nullable();
            $table->integer('number_of_labors')->nullable();
            $table->integer('remaining_number_of_drivers')->nullable();
            $table->integer('remaining_number_of_labors')->nullable();
            $table->text('instruction')->nullable();
            $table->unsignedDecimal('expected_price', 10, 2)->nullable();
            $table->unsignedDecimal('actual_price', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('moves');
    }
}
