<?php

namespace Database\Seeders;

use App\Models\TshirtSize;
use Illuminate\Database\Seeder;

class TshirtSizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    protected $data = [
        ['key' => 'Small', 'value' => 'Small'],
        ['key' => 'Medium', 'value' => 'Medium'],
        ['key' => 'Large', 'value' => 'Large'],
        ['key' => 'X-Large', 'value' => 'X-Large'],
        ['key' => 'XX-Large', 'value' => 'XX-Large'],
        ['key' => 'XXX-Large', 'value' => 'XXX-Large'],
    ];
    public function run()
    {
        foreach ($this->data as $data) {
            TshirtSize::create($data);
        }
    }
}
