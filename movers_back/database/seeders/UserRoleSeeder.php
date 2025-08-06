<?php

namespace Database\Seeders;

use App\Models\UserRole;
use Illuminate\Database\Seeder;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    protected $data = [
        ['key' => 'admin', 'value' => 'Administrator'],
        ['key' => 'driver', 'value' => 'Driver'],
        ['key' => 'labor', 'value' => 'Labor'],
        ['key' => 'user', 'value' => 'User'],
    ];
    public function run()
    {
        foreach ($this->data as $data) {
            UserRole::create($data);
        }
    }
}
