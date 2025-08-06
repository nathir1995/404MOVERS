<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Userdetails extends Model
{
    use HasFactory;
    protected $table="user_details";
    protected $fillable = ['user_id','bank_name','holder_name','ifsc_code','account_number','status'];
}
 