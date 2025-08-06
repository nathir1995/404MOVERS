<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    protected $data = [
        ['item_category_id' => 1, 'name' => 'Sofa', 'unit_price' => 20],
        ['item_category_id' => 1, 'name' => 'Chair', 'unit_price' => 25],
        ['item_category_id' => 1, 'name' => 'Cabinet', 'unit_price' => 30],
        ['item_category_id' => 2, 'name' => 'Fridge', 'unit_price' => 50],
        ['item_category_id' => 2, 'name' => 'Washing Machine', 'unit_price' => 45],
        ['item_category_id' => 2, 'name' => 'Oven', 'unit_price' => 60],
    ];

    public function run()
    {
        foreach ($this->data as $data) {
            Item::create($data);
        }
    }
}
