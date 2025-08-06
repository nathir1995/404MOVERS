<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use File;
use URL;


class Car extends Model
{
    use HasFactory;

    protected $table = 'cars';

    protected $fillable = [
        'user_id',
        'car_name',
        'car_model',
        'car_color',
        'car_number',
        'total_seat',
        'primary_car',
        'car_img',
        'driving_license',
        'status',
        'is_verified'
    ];

    protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
        'status' => 'integer',
        'is_verified' => 'integer'
    ];

    public function getCarUser()
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }

    public function getCarDocument()
    {
        return $this->hasMany(CarMultipleDocs::class, 'car_id', 'id');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }

    public function vehicleType()
    {
        return  $this->belongsTo(VehicleType::class, 'vehicle_type_id', 'id');
    }
}
