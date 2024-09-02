<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
     
        User::factory()->create([
            'name' => 'Brian',
            'email' => 'brian@avcolombia.com',
            'password' => Hash::make('12345678'),
            'rol' => 'admin',
        ]);
        User::factory()->create([
            'name' => 'Hotel example',
            'email' => 'hotelexample@avcolombia.com',
            'password' => Hash::make('12345678'),
            'rol' => 'hotel',
        ]);
    }
}
