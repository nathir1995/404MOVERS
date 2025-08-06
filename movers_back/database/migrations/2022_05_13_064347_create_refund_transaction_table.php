<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRefundTransactionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('refund_transaction', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
         //   $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->bigInteger('ride_id')->unsigned();
            //$table->foreign('ride_id')->references('id')->on('rides')->onUpdate('cascade')->onDelete('cascade');
            $table->string('payment_mode');
            $table->string('refund_id');
            $table->string('refund_transaction_id');
            $table->text('response');
            $table->string('status');
            $table->timestamps();
        });


        Schema::table('transaction', function(Blueprint $table) {
            
            $table->foreign('user_id')
            ->references('id')
            ->on('users')
            ->onDelete('cascade');
            $table->foreign('ride_id')
            ->references('id')
            ->on('rides')
            ->onDelete('cascade');

           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('refund_transaction');
    }
}
