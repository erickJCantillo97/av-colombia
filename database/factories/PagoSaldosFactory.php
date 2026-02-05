<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PagoSaldos>
 */
class PagoSaldosFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'amount' => fake()->randomFloat(2, 50000, 500000),
            'proveedor_id' => \App\Models\BookingProveedor::factory(),
            'booking_service_id' => \App\Models\BookingService::factory(),
        ];
    }
}
