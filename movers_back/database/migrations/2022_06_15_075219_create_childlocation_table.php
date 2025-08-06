<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChildlocationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('childlocation', function (Blueprint $table) {    
                $table->id();
                $table->bigInteger('checklocation_id')->unsigned();
                $table->foreign('checklocation_id')->references('id')->on('checklocation')->onUpdate('cascade')->onDelete('cascade');
                $table->string('start_point_name');
                $table->string('start_lat');
                $table->string('start_lang');
                $table->string('end_point_name');
                $table->string('end_lat');
                $table->string('end_lang');
                $table->decimal('price',12,2);
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
        Schema::dropIfExists('childlocation');
    }
}
