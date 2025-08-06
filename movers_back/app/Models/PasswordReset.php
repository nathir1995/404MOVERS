<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class PasswordReset extends Model {

    protected $table = 'password_resets';
    public $timestamps = false;

    protected $hidden = [];
    protected $guarded = [];

}
