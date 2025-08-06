<?php

namespace Database\Seeders;

use App\Models\MoveType;
use Illuminate\Database\Seeder;

class MoveTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    protected $data = [
        ['key' => 'HEAVY', 'value' => 'HEAVY MOVE'],
        ['key' => 'LITE', 'value' => 'LITE MOVE'],
    ];

    public function run()
    {
        foreach ($this->data as $data) {
            MoveType::create($data);
        }
    }
}
