<?php

namespace Database\Seeders;

use App\Models\MovePackage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MovePackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    protected $data = [
        // Labor only
        ['name' => 'Labor Only', 'description' => 'No truck, but a ton of muscle', 'price' => 56.00, 'base_fee' => 30.00, 'km_rate' => 0.00, 'labor_rate' => 1.20],
        // Minivan
        ['name' => 'Minivan', 'description' => 'Small van for light moves', 'price' => 73.00, 'base_fee' => 40.00, 'km_rate' => 1.80, 'labor_rate' => 1.20],
        // Cargo Van
        ['name' => 'Cargo Van', 'description' => 'Medium van for moderate moves', 'price' => 93.00, 'base_fee' => 55.00, 'km_rate' => 2.00, 'labor_rate' => 1.40],
        // Pickup Truck
        ['name' => 'Pickup Truck', 'description' => 'Pickup for larger items', 'price' => 111.00, 'base_fee' => 70.00, 'km_rate' => 2.20, 'labor_rate' => 1.50],
        // Box Truck
        ['name' => 'Box Truck', 'description' => 'Large truck for big moves', 'price' => 133.50, 'base_fee' => 85.00, 'km_rate' => 2.50, 'labor_rate' => 1.80],
        // Store Delivery (fallback, not in screenshot)
        ['name' => 'Store Delivery', 'description' => 'Get your purchase home', 'price' => 65.00, 'base_fee' => 35.00, 'km_rate' => 1.50, 'labor_rate' => 1.00],
        // Haul Away (fallback, not in screenshot)
        ['name' => 'Haul Away', 'description' => 'Easily discard unwanted items', 'price' => 59.00, 'base_fee' => 32.00, 'km_rate' => 1.60, 'labor_rate' => 1.10],
    ];
    public function run(): void
    {
        foreach ($this->data as $data) {
            MovePackage::create($data);
        }
    }
}
