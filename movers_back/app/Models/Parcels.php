<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parcels extends Model
{
    use HasFactory;

    protected $table='parcel';

    protected $fillable=['rides_id','size','weight','created_at','updated_at'];

  
}
