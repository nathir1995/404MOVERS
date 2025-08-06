<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->string('vehicle_make')->nullable();
            $table->string('vehicle_model')->nullable();
            $table->string('vehicle_year')->nullable();
            $table->string('vehicle_color')->nullable();
            $table->string('vehicle_number')->nullable();
            $table->bigInteger('vehicle_type_id')->unsigned();
            $table->foreign('vehicle_type_id')->references('id')->on('vehicle_types')->onUpdate('cascade')->onDelete('cascade');
            $table->string('total_seat')->nullable();
            $table->text('car_img')->default('');
            $table->text('driving_license')->default('');
            $table->enum('status', ['Active', 'Inactive'])->comment('Active ,Inactive')->default('Active');
            $table->enum('is_verified', ['Approved', 'Pending'])->comment('Approved ,Pending')->default('Pending');
            $table->enum('primary_car', ['Primary', 'Secondary'])->comment('Primary,Secondary')->default('Primary');
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
        Schema::dropIfExists('cars');
    }
}
