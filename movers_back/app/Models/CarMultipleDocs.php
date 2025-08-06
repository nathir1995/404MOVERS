<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarMultipleDocs extends Model
{
    use HasFactory;
    protected $table = 'car_multiple_docs';

    protected $fillable = [
        'user_id',
        'car_id',
        'document',
    ];

    protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
        'car_id' => 'integer',
    ];
}
