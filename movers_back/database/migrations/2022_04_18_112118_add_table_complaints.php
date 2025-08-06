<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTableComplaints extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('complaints', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->bigInteger('ride_id')->unsigned();
            $table->foreign('ride_id')->references('id')->on('rides')->onUpdate('cascade')->onDelete('cascade');
            $table->bigInteger('reason_id')->unsigned();
            $table->foreign('reason_id')->references('id')->on('reasons')->onUpdate('cascade')->onDelete('cascade');
            $table->text('complaints');
            $table->integer('status')->comment('1=NEW, 2=READ, 3=RESOLVED')->default();
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
        Schema::dropIfExists('complaints');
    }
}
