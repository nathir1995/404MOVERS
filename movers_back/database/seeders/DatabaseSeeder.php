<?php

namespace Database\Seeders;

use App\Models\ItemCategory;
use App\Models\Province;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserRoleSeeder::class,
            VehicleTypeSeeder::class,
            TshirtSizeSeeder::class,
            MetropolitanAreaSeeder::class,
            ProvinceSeeder::class,
            HearAboutSeeder::class,
            MoverAccountStatusSeeder::class,
            Users::class,
            Admin_setting::class,
            CancelSeeder::class,
            MovePackageSeeder::class,
            MoveTypeSeeder::class,
            MoveStatusSeeder::class,
            ItemCategorySeeder::class,
            ItemSeeder::class,
        ]);
    }
}
