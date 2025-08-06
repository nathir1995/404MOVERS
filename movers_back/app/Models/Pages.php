<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;


class Pages extends Model
{
    use HasFactory,Sluggable;

    protected $table = 'pages';

    protected $casts = [
        'id' => 'integer',
        'status' => 'integer',
    ];

    public function sluggable():array {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }

    protected $guarded = [];
}
