<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checklocation extends Model
{
    use HasFactory;
    protected $table = 'checklocation';

    protected $fillable = [
        'user_id',
        'start_point_name',
        'start_lat',
        'start_lang',
        'end_point_name',
        'end_lat',
        'end_lang',
        'price',
    ];

    protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
    ];


    public function OtherStops()
    {
        return $this->hasMany(Childlocation::class, 'checklocation_id', 'id')->orderBy('id');
    }
}
