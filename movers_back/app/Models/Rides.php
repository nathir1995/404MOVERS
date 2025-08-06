<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rides extends Model
{
    use HasFactory;

    protected $table = 'rides';

    protected $fillable = [
        'user_id',
        'car_id',
        'start_point_name',
        'start_lat',
        'start_lang',
        'ride_start_time',
        'pickup_date',
        'pickup_time',
        'end_point_name',
        'end_lat',
        'end_lang',
        'ride_end_time',
        'price',
        'comfort_seat',
        'how_many_pessenger',
        'preference',
        'instant_booking',
        'return_trip',
        'instruction',
        'ride_started_time',
        'ride_completed_time',
        'status',
        'ride_type',
    ];

    protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
        'car_id' => 'integer',
        'how_many_pessenger' => 'integer',
        'instant_booking' => 'integer',
        'return_trip' => 'integer',
        'status' => 'integer',
        'ride_type' => 'integer',
    ];

    public function GetUserInfo()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function GetCarInfo()
    {
        return $this->hasOne(Car::class, 'id', 'car_id');
    }

    public function GetOtherLocation()
    {
        return $this->hasMany(Locations::class, 'ride_id', 'id');
    }

    public function GetbookedRide()
    {
        return $this->hasMany(Booking::class, 'ride_id', 'id');
    }

    public function GetNewBookingRequest()
    {
        return $this->hasMany(Booking::class, 'id', 'ride_id')->where('booking_status', '=', '1');
    }

    public function GetRide()
    {
        return $this->hasMany(Transaction::class, 'ride_id', 'id');
    }
}
