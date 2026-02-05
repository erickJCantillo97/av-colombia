<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookingProveedor>
 */
class BookingProveedorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'booking_service_id' => \App\Models\BookingService::factory(),
            'proveedor_id' => \App\Models\Proveedor::factory(),
            'cost' => fake()->randomFloat(2, 100000, 500000),
            'payment' => fake()->randomFloat(2, 0, 100000),
        ];
    }
}
