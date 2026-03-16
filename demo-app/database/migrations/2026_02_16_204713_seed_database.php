<?php

use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Seeds database for browser tests. Only seeds if users table is empty
     * to avoid conflicts when running migrate:fresh --seed.
     */
    public function up(): void
    {
        if (User::count() === 0) {
            (new DatabaseSeeder)->run();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
