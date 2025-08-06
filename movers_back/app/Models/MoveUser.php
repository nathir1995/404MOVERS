<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class MoveUser extends Pivot
{
    use HasFactory;

    protected $table = 'move_user';

    protected $casts = [
        'move_id' => 'integer',
        'user_id' => 'integer',
        'is_started' => 'boolean',
        'started_at' => 'datetime',
        'confirm_started' => 'boolean',
        'confirm_started_at' => 'datetime',
        'is_finished' => 'boolean',
        'finished_at' => 'datetime',
        'confirm_finished' => 'boolean',
        'confirm_finished_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
