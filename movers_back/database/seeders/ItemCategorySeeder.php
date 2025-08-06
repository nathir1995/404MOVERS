<?php

namespace Database\Seeders;

use App\Models\ItemCategory;
use Illuminate\Database\Seeder;

class ItemCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    protected $data = [
        ['name' => 'Furniture'],
        ['name' => 'Home Appliances'],
        ['name' => 'Parcel'],
    ];

    public function run()
    {
        foreach ($this->data as $data) {
            ItemCategory::create($data);
        }
    }
}
