<?php

namespace Database\Seeders;

use App\Models\VehicleType;
use Illuminate\Database\Seeder;

class VehicleTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    protected $data = [
        ['key' => 'Sedan', 'value' => 'Sedan'],
        ['key' => 'SUV', 'value' => 'SUV'],
        ['key' => 'Pickup Truck', 'value' => 'Pickup Truck'],
        ['key' => 'Mini Van', 'value' => 'Mini Van'],
    ];
    public function run()
    {
        foreach ($this->data as $data) {
            VehicleType::create($data);
        }
    }
}
