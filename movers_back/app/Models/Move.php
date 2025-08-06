<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

class Move extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
        'move_package_id' => 'integer',
        'move_status_id' => 'integer',
        'start_lat' => 'double',
        'start_lang' => 'double',
        'end_lat' => 'double',
        'end_lang' => 'double',
        'move_date_time' => 'datetime',
        'number_of_drivers' => 'integer',
        'number_of_labors' => 'integer',
        'remaining_number_of_drivers' => 'integer',
        'remaining_number_of_labors' => 'integer',
        'expected_price' => 'double',
        'actual_price' => 'double',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($move) {
            $currentYear = Carbon::now()->format('Y');
            $currentMonth = Carbon::now()->format('m');

            // Retrieve the last move of the current month and year
            $latestMove = self::whereYear('created_at', $currentYear)
                ->whereMonth('created_at', $currentMonth)
                ->orderBy('id', 'desc')
                ->first();

            $number = $latestMove ? ((int) substr($latestMove->move_number, 9)) + 1 : 1;
            $formattedNumber = str_pad($number, 4, '0', STR_PAD_LEFT);

            // Prefix with MOVE-YEAR-MONTH-
            $move->move_number = "MOVE-{$currentYear}{$currentMonth}-{$formattedNumber}";
        });
    }

    public function items()
    {
        return $this->belongsToMany(Item::class, 'item_move')->using(ItemMove::class)->withPivot('quantity');
    }

    public function movers()
    {
        return $this->belongsToMany(User::class, 'move_user')->using(MoveUser::class)->withPivot(['is_started', 'started_at', 'confirm_started', 'confirm_started_at', 'is_finished', 'finished_at', 'confirm_finished', 'confirm_finished_at']);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }

    public function movePackage()
    {
        return $this->belongsTo(MovePackage::class);
    }

    public function moveStatus()
    {
        return $this->belongsTo(MoveStatus::class);
    }

    public function moveLocations(): HasMany
    {
        return $this->hasMany(Locations::class);
    }
}
