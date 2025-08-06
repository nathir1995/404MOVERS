<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Storage;
use Laravel\Cashier\Billable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;



class User extends Authenticatable implements HasMedia
{
    use HasApiTokens, HasFactory, HasRoles, Notifiable, InteractsWithMedia, Billable;

    protected $guarded = [];
    protected $hidden = ['password', 'remember_token',];
    protected $casts = [
        'id' => 'integer',
        'email_verified_at' => 'datetime',
        'gender' => 'integer',
        'preferences' => 'integer',
        'verfication' => 'integer',
        'mover_account_status_id' => 'integer',
        'user_role_id' => 'integer',
        'tshirt_size_id' => 'integer',
        'metropolitan_area_id' => 'integer',
        'total_ride' => 'integer',
        'rating' => 'double',
        'hear_about_id' => 'integer',
        'moves_each_week' => 'integer',
        'email_verified_at' => 'datetime',
        'member_since' => 'datetime',
        'member_time' => 'datetime',
        'payment_exempt' => 'boolean',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('driver-license')->onlyKeepLatest(2);
        $this->addMediaCollection('profile-picture')->singleFile();
        $this->addMediaCollection('wcb')->onlyKeepLatest(2);
        $this->addMediaCollection('vehicle')->onlyKeepLatest(5);
        $this->addMediaCollection('proof-of-registration')->onlyKeepLatest(2);
        $this->addMediaCollection('license-plate-number')->onlyKeepLatest(2);
    }

    public function setEmailAttribute($value)
    {
        $this->attributes['email'] = strtolower($value);
    }

    public function getAvatarAttribute($value)
    {
        $imagepath = Storage::url('app/public/' . $value);
        if ($value != "") {
        } else {
            $value = 'uploads/default/download.png';
        }
        return $value;
    }

    public function rideTable()
    {
        return  $this->belongsTo(Rides::class, 'user_id', 'id');
    }

    public function userRole()
    {
        return  $this->belongsTo(UserRole::class, 'user_role_id', 'id');
    }

    public function tshirtSize()
    {
        return  $this->belongsTo(TshirtSize::class, 'tshirt_size_id', 'id');
    }

    public function metropolitanArea()
    {
        return  $this->belongsTo(MetropolitanArea::class, 'metropolitan_area_id', 'id');
    }

    public function province()
    {
        return  $this->belongsTo(Province::class, 'province_id', 'id');
    }

    public function hearAbout()
    {
        return  $this->belongsTo(HearAbout::class, 'hear_about_id', 'id');
    }

    public function moverAccountStatus()
    {
        return  $this->belongsTo(MoverAccountStatus::class, 'mover_account_status_id', 'id');
    }

    public function getCarUser()
    {
        return $this->hasMany(Car::class, 'user_id', 'id');
    }

    public function getEnquiryUser()
    {
        return $this->belongsTo(Enquiry::class, 'user_id', 'id');
    }

    public function moves()
    {
        return $this->hasMany(Move::class);
    }

    public function moversMoves()
    {
        return $this->belongsToMany(Move::class, 'move_user')->using(MoveUser::class)->withPivot(['is_started', 'started_at', 'confirm_started', 'confirm_started_at', 'is_finished', 'finished_at', 'confirm_finished', 'confirm_finished_at']);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function chats()
    {
        return $this->belongsToMany(Chat::class)->withTimestamps();
    }
}
