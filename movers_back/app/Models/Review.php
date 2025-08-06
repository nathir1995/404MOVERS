<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    protected $table ="reviews";

    protected $fillable = ["created_at","updated_at"];
 

    public function getReceiver(){
        return $this->hasOne(User::class,'id','receiver_id');
    }

    public function getGiver(){
        return $this->hasOne(User::class,'id','giver_id');
    }

    public function getallGiver(){
        return $this->hasOne(User::class,'id','giver_id');
    }

    public function getallReceiver(){
        return $this->hasOne(User::class,'id','receiver_id');
    }



    

    
}
 