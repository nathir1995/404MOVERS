<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTableReviews extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('reviews',function (Blueprint $table){
            $table->id();
            $table->bigInteger('receiver_id')->unsigned();
            $table->foreign('receiver_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->bigInteger('giver_id')->unsigned();
            $table->foreign('giver_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->string('review_date');
            $table->string('rating')->default('0');
            $table->text('description')->default('');
            $table->tinyInteger('status')->comment('1=Active ,0 = Inactive')->default('1');
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
        //
        Schema::dropIfExists('reviews');
    }
}
