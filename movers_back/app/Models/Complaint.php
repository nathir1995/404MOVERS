<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    use HasFactory;
    
    protected $table ='complaints';

    public function getComplaintUser(){
        return $this->hasOne(User::class,'id','user_id');
    }

    public function getComplaintReason(){
        return $this->hasOne(Reason::class,'id','reason_id');
    }

    public function getRideInformation(){
        return $this->hasOne(Rides::class,'id','ride_id');
    }
}
