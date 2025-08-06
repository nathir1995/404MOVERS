<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Childlocation extends Model
{
    use HasFactory;
    protected $table = 'childlocation';

    protected $fillable = [
        'checklocation_id',
        'start_point_name',
        'start_lat',
        'start_lang',
        'end_point_name',
        'end_lat',
        'end_lang',
        'price',
        'distance',
    ];

    protected $casts = [
        'id' => 'integer',
        'checklocation_id' => 'integer',
    ];

    public function locations()
    {
        return $this->belongsTo('Checklocation');
    }
}
