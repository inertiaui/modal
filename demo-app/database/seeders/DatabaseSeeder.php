<?php

namespace Database\Seeders;

use App\Models\Role;
use Database\Factories\UserFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::create(['name' => 'Admin']);
        Role::create(['name' => 'Editor']);
        Role::create(['name' => 'Viewer']);

        UserFactory::new()
            ->recycle(Role::all())
            ->count(20)
            ->create();
    }
}
