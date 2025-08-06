<?php

namespace Database\Seeders;

use App\Models\MetropolitanArea;
use Illuminate\Database\Seeder;

class MetropolitanAreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    protected $data = [
        ['key' => 'Calgary', 'value' => 'Calgary'],
    ];
    public function run()
    {
        foreach ($this->data as $data) {
            MetropolitanArea::create($data);
        }
    }
}
