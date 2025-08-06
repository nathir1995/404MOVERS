<?php

namespace Database\Seeders;

use App\Models\Reason;
use Illuminate\Database\Seeder;

class CancelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    protected $data = [
        ['reason' => 'Bad Weather', 'reason_type' => 3, 'status' => 1],
        ['reason' => 'Closed Road', 'reason_type' => 3, 'status' => 1],
        ['reason' => 'Bad Driver', 'reason_type' => 2, 'status' => 1],
    ];
    public function run()
    {
        foreach ($this->data as $data) {
            Reason::create($data);
        }
    }
}
