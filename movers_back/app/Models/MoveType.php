<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MoveType extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function moves()
    {
        return $this->hasMany(Move::class);
    }
}
