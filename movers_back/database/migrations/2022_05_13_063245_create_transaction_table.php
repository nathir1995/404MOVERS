<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transaction', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            //$table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->bigInteger('ride_id')->unsigned()->nullable();
           // $table->foreign('ride_id')->references('id')->on('rides')->onDelete('cascade');
            $table->string('payment_mode');
            $table->string('transaction_id')->nullable();
            $table->decimal('amount',12,2);
            $table->tinyInteger('status')->comment('0=Cancel,1=Success,2=Failed,3=Initiated')->default(3);
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
        Schema::dropIfExists('transaction');
    }
}
