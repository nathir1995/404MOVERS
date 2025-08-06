<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function province()
    {
        return  $this->belongsTo(Province::class, 'province_id', 'id');
    }

    public function moves()
    {
        return $this->hasMany(Move::class);
    }
}
