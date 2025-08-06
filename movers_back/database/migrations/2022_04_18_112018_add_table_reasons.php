<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTableReasons extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('reasons', function (Blueprint $table) {
            $table->id();
            $table->text('reason');
            $table->integer('reason_type')->comment('1 = Enquiry, 2 = Complaints , 3 = Cancel')->default();
            $table->tinyInteger('status')->comment('1=Active ,0 = Inactive')->default();
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
        Schema::dropIfExists('reasons');
    }
}
