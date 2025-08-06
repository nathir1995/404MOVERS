<?php

namespace Database\Seeders;

use App\Models\Settings;
use Illuminate\Database\Seeder;

class Admin_setting extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    protected $data = [
        ['option_name' => 'GST Percentage (%)', 'option_type' => 'g_s_t_percentage(%)', 'option_value' => '5', 'status' => '1'],
        ['option_name' => 'Base Fare ($)', 'option_type' => 'base_fare($)', 'option_value' => '60', 'status' => '1'],
        ['option_name' => 'Time Based Rate ($/min)', 'option_type' => 'time_based_rate($/min)', 'option_value' => '60', 'status' => '1'],
        ['option_name' => 'Distance Based Rate ($/km)', 'option_type' => 'distance_based_rate($/km)', 'option_value' => '60', 'status' => '1']
    ];

    public function run()
    {
        //
        // $user = Settings::create();
        foreach ($this->data as $data) {
            Settings::create($data);
        }
    }
}
