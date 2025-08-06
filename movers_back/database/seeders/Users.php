<?php

namespace Database\Seeders;

use App\Models\MoverAccountStatus;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserRole;

class Users extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $user = User::create([
            'first_name' => 'Jhon',
            'last_name' => 'Doe',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin@123'),
            'user_role_id' => UserRole::where('key', 'admin')->first()->id,
            'mover_account_status_id' => MoverAccountStatus::where('key', 'ACCOUNT_APPROVED')->first()->id,
            'verfication' => 1,
        ]);

        $user = User::create([
            'first_name' => 'Cezar',
            'last_name' => 'Terzian',
            'email' => 'aboelsiz@gmail.com',
            'password' => bcrypt('Pa$$w0rd'),
            'phone_number' => '+2348012345678',
            'user_role_id' => UserRole::where('key', 'user')->first()->id,
            'mover_account_status_id' => MoverAccountStatus::where('key', 'ACCOUNT_APPROVED')->first()->id,
            'verfication' => 1,
        ]);
    }
}
