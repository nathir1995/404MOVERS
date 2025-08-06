<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('move_user', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('move_id')->unsigned();
            $table->foreign('move_id')->references('id')->on('moves')->onUpdate('cascade')->onDelete('cascade');
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->boolean('is_started')->default(false);
            $table->dateTime('started_at')->nullable();
            $table->boolean('confirm_started')->default(false);
            $table->dateTime('confirm_started_at')->nullable();
            $table->boolean('is_finished')->default(false);
            $table->dateTime('finished_at')->nullable();
            $table->boolean('confirm_finished')->default(false);
            $table->dateTime('confirm_finished_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('move_users');
    }
};
