<?php

namespace Database\Seeders;

use App\Models\HearAbout;
use Illuminate\Database\Seeder;

class HearAboutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    protected $data = [
        ['key' => 'Furniture Store', 'value' => 'Furniture Store'],
        ['key' => 'Facebook', 'value' => 'Facebook'],
        ['key' => 'Kijiji', 'value' => 'Kijiji'],
        ['key' => 'From a Friend', 'value' => 'From a Friend'],
        ['key' => 'Other Social Media', 'value' => 'Other Social Media'],
        ['key' => 'Other', 'value' => 'Other'],
    ];
    public function run()
    {
        foreach ($this->data as $data) {
            HearAbout::create($data);
        }
    }
}
