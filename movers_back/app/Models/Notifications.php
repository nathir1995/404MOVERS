<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notifications extends Model
{
    use HasFactory;

    protected $table  = 'notifications';

    protected $guarded = [];

    protected $casts = [
        'read' => 'integer',
        'status' => 'integer',
        'user_id' => 'integer',
        'id' => 'integer',
        'meta' => 'array',
    ];

    public function getUserInfoForNotification()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
