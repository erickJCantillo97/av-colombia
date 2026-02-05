<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookingService>
 */
class BookingServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'service' => fake()->randomElement(['TRANSFER', 'TOUR', 'ALOJAMIENTO']),
            'service_id' => \App\Models\Service::factory(),
            'adults' => fake()->numberBetween(1, 4),
            'adults_price' => fake()->randomFloat(2, 50000, 200000),
            'adult_tarifa' => fake()->randomFloat(2, 60000, 250000),
            'boys' => fake()->numberBetween(0, 2),
            'boys_tarifa' => fake()->randomFloat(2, 30000, 100000),
            'boys_price' => fake()->randomFloat(2, 25000, 80000),
            'date' => fake()->dateTimeBetween('now', '+30 days')->format('Y-m-d'),
            'hour' => fake()->time(),
            'status' => 'reservado',
            'payment' => 'pendiente',
            'channel_id' => \App\Models\Channel::factory(),
            'cliente_name' => fake()->name(),
            'cliente_phone' => fake()->phoneNumber(),
            'cliente_city' => fake()->city(),
            'cliente_building' => fake()->address(),
            'user_id' => \App\Models\User::factory(),
        ];
    }
}
