<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cancel extends Model
{
    use HasFactory;
    protected $table = 'cancel';

    public function getCanceluser(){
        return $this->hasOne(User::class,'id','user_id');
    }

    public function getCancelReason(){
        return $this->hasOne(Reason::class,'id','reason_id');
    }

    public function getCancelRideInformation(){
        return $this->hasOne(Rides::class,'id','ride_id');
    }
}
  