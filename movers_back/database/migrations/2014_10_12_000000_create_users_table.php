<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->longText('bio')->nullable();
            $table->string('dob')->nullable();
            $table->string('email')->nullable();
            $table->string('fcm_token')->nullable();
            $table->string('password');
            $table->string('provider')->nullable();
            $table->string('provider_id')->nullable();
            $table->string('avatar')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('otp')->nullable();
            $table->dateTime('otp_created_at')->nullable();
            $table->string('device_id')->nullable();
            // address
            $table->bigInteger('province_id')->unsigned()->nullable();
            $table->foreign('province_id')->references('id')->on('provinces')->onUpdate('cascade')->onDelete('cascade');
            $table->string('city')->nullable();
            $table->string('street')->nullable();
            $table->string('appartment_or_unit_number')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('country_name')->nullable();
            $table->string('contact_code')->nullable();
            $table->string('country_code')->nullable();
            $table->string('address')->nullable();
            //
            $table->integer('gender')->comment('1=>Male,2=>Female,3=>Other')->default(1);
            $table->integer('preferences')->comment('0=Male, 1=Female ,2=Both')->default(2);
            $table->bigInteger('user_role_id')->unsigned();
            $table->foreign('user_role_id')->references('id')->on('user_roles')->onUpdate('cascade')->onDelete('cascade');
            $table->bigInteger('tshirt_size_id')->unsigned()->nullable();
            $table->foreign('tshirt_size_id')->references('id')->on('tshirt_sizes')->onUpdate('cascade')->onDelete('cascade');
            $table->bigInteger('metropolitan_area_id')->unsigned()->nullable();
            $table->foreign('metropolitan_area_id')->references('id')->on('metropolitan_areas')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('verfication')->comment('1 = ACTIVE, 0 = INACTIVE ')->default(0);
            $table->bigInteger('mover_account_status_id')->unsigned()->default(1);
            $table->foreign('mover_account_status_id')->references('id')->on('mover_account_statuses')->onUpdate('cascade')->onDelete('cascade');
            $table->string('total_ride')->default('0');
            $table->string('rating')->default('0');
            $table->bigInteger('hear_about_id')->unsigned()->nullable();
            $table->foreign('hear_about_id')->references('id')->on('hear_abouts')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('moves_each_week')->nullable();
            $table->boolean('able')->nullable();
            $table->string('why_great_mover')->nullable();
            $table->dateTime('email_verified_at')->nullable();
            $table->string('member_since')->nullable();
            $table->string('member_time')->nullable();
            $table->boolean('payment_exempt')->default(false);
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
