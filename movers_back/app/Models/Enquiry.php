<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enquiry extends Model
{
    use HasFactory;

    protected $table ='enquiry';

    public function getEnquiryUser(){
        return $this->hasOne(User::class,'id','user_id');
    }

    public function getEnquiryReason(){
        return $this->hasOne(Reason::class,'id','reason_id');
    }
}
