<?php

namespace Database\Seeders;

use App\Models\Province;
use Illuminate\Database\Seeder;

class ProvinceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    protected $data = [
        ['key' => 'Alberta', 'value' => 'Alberta'],
        ['key' => 'British Columbia', 'value' => 'British Columbia'],
    ];
    public function run()
    {
        foreach ($this->data as $data) {
            Province::create($data);
        }
    }
}
