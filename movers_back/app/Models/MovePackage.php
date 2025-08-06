<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MovePackage extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'id' => 'integer',
        'price' => 'double',
        'default_drivers' => 'integer',
        'default_laborers' => 'integer',
        'base_fee' => 'double',
        'km_rate' => 'double',
        'labor_rate' => 'double',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function moves(): HasMany
    {
        return $this->hasMany(Move::class);
    }
}
