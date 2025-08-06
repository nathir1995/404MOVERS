<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'id' => 'integer',
        'item_category_id' => 'integer',
        'unit_price' => 'double',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function itemCategory()
    {
        return $this->belongsTo(ItemCategory::class);
    }

    public function moves()
    {
        return $this->belongsToMany(Move::class, 'item_move')->using(ItemMove::class)->withPivot('quantity');
    }
}
