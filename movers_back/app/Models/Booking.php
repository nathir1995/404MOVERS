<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Booking extends Model
{
    use HasFactory;

    protected $table="booking";

    protected $fillable=['booking_type','created_at','updated_at'];

    protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
        'ride_id' => 'integer',
        'booking_status' => 'integer',
        'payment_status' => 'integer',
        'booking_cancel_by' => 'integer',
        'review' => 'integer',
        'report' => 'integer',
    ];

    public function GetrideInfoBooking(){
        return $this->hasOne(Rides::class,'id','ride_id');
    }

    public function GetBookedUserInfo(){
        return $this->hasOne(User::class,'id','user_id');
    }

    public function GetMemberSince(){
        return $this->hasOne(User::class,'id','user_id');
    }

    public function GetallBookedUser(){
        return $this->hasOne(User::class,'id','user_id');
    }



}
