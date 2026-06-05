<?php

namespace Database\Seeders;

use App\Models\ServiceCategory;
use Illuminate\Database\Seeder;

class ServiceCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['title' => 'Playas', 'color' => '#0ea5e9', 'icon' => 'fa-solid fa-umbrella-beach'],
            ['title' => 'Islas', 'color' => '#14b8a6', 'icon' => 'fa-solid fa-water'],
            ['title' => 'Ciudad', 'color' => '#6366f1', 'icon' => 'fa-solid fa-city'],
            ['title' => 'Aventura', 'color' => '#f97316', 'icon' => 'fa-solid fa-mountain-sun'],
            ['title' => 'Gastronomía', 'color' => '#ef4444', 'icon' => 'fa-solid fa-utensils'],
        ];

        foreach ($categories as $category) {
            ServiceCategory::firstOrCreate(['title' => $category['title']], $category);
        }
    }
}
