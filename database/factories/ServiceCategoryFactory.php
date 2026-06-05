<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceCategory>
 */
class ServiceCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => ucfirst($this->faker->unique()->word()),
            'color' => $this->faker->hexColor(),
            'icon' => $this->faker->randomElement([
                'fa-solid fa-umbrella-beach',
                'fa-solid fa-mountain-sun',
                'fa-solid fa-ship',
                'fa-solid fa-utensils',
                'fa-solid fa-city',
            ]),
        ];
    }
}
