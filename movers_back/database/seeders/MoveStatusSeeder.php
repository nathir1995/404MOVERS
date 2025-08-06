<?php

namespace Database\Seeders;

use App\Models\MoveStatus;
use Illuminate\Database\Seeder;

class MoveStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    protected $data = [
        ['key' => 'DRAFT', 'value' => 'DRAFT'],
        ['key' => 'PENDING', 'value' => 'PENDING'],
        ['key' => 'SCHEDULED', 'value' => 'SCHEDULED'],
        ['key' => 'ONGOING', 'value' => 'ONGOING'],
        ['key' => 'STARTED', 'value' => 'STARTED'],
        ['key' => 'DONE', 'value' => 'DONE'],
    ];

    public function run()
    {
        foreach ($this->data as $data) {
            MoveStatus::create($data);
        }
    }
}
