<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'ride_id', 'rider_id', 'booking_id', 'operation_id', 'msisdn', 'payment_mode', 'transaction_id', 'response', 'status', 'amount'];

    protected $table = 'transaction';

    public function GetRideDataForTransaction()
    {
        return $this->hasOne(Rides::class, 'id', 'ride_id');
    }

    public function GetTransactionUserData()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function getCreatedAtAttribute($date)
    {
        $dt = Carbon::parse($date);
        return Carbon::parse($dt)->format('d F,h:i A');
    }

    public function GetTransactionRiderData()
    {
        return $this->hasOne(User::class, 'id', 'rider_id');
    }
}
