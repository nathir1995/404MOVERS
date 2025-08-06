<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reason extends Model
{
    use HasFactory;

    protected $table = 'reasons';

    protected $guarded = [];

    protected $casts = [
        'id' => 'integer',
        'reason_type' => 'integer',
        'status' => 'integer',
    ];
}
