<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ItemMove extends Pivot
{
    use HasFactory;

    //specify the table name
    protected $table = 'item_move';

    protected $casts = [
        'move_id' => 'integer',
        'item_id' => 'integer',
        'quantity' => 'integer',
    ];
}
