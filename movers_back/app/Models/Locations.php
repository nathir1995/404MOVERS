<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Locations extends Model
{
    use HasFactory;
    protected $table = 'locations';

    protected $guarded = [];

    protected $casts = [
        'move_id' => 'integer',
        'latitude' => 'double',
        'longitude' => 'double',
        'timestamp' => 'datetime',
    ];

    public function move(): BelongsTo
    {
        return $this->belongsTo(Move::class, 'move_id');
    }
}
