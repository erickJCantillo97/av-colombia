<?php

namespace Database\Seeders;

use App\Models\Accommodation;
use App\Models\Amenity;
use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Seeder;

class AccommodationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear amenidades básicas
        $amenities = [
            ['name' => 'WiFi Gratis', 'slug' => 'wifi-gratis'],
            ['name' => 'Piscina', 'slug' => 'piscina'],
            ['name' => 'Parking Gratis', 'slug' => 'parking-gratis'],
            ['name' => 'Aire Acondicionado', 'slug' => 'aire-acondicionado'],
            ['name' => 'Desayuno Incluido', 'slug' => 'desayuno-incluido'],
            ['name' => 'Gimnasio', 'slug' => 'gimnasio'],
            ['name' => 'Spa', 'slug' => 'spa'],
            ['name' => 'Restaurante', 'slug' => 'restaurante'],
            ['name' => 'Bar', 'slug' => 'bar'],
            ['name' => 'Room Service', 'slug' => 'room-service'],
            ['name' => 'Pet Friendly', 'slug' => 'pet-friendly'],
            ['name' => 'Vista al Mar', 'slug' => 'vista-al-mar'],
        ];

        foreach ($amenities as $amenityData) {
            Amenity::create($amenityData);
        }

        // Obtener el primer usuario o crear uno de prueba
        $user = User::first();
        if (! $user) {
            $user = User::create([
                'name' => 'Propietario de Prueba',
                'email' => 'propietario@ejemplo.com',
                'password' => bcrypt('password'),
                'rol' => 'proveedor',
            ]);
        }

        // Crear alojamientos de ejemplo
        $accommodations = [
            [
                'name' => 'Hotel Boutique Cartagena',
                'description' => 'Elegante hotel boutique en el corazón del centro histórico de Cartagena, con arquitectura colonial y servicios de lujo.',
                'type' => 'hotel',
                'address_line_1' => 'Calle de la Factoria #36-57',
                'city' => 'Cartagena',
                'state' => 'Bolívar',
                'country' => 'Colombia',
                'postal_code' => '130001',
                'latitude' => 10.4236,
                'longitude' => -75.5378,
                'star_rating' => 5,
                'contact_email' => 'reservas@hotelboutiquecartagena.com',
                'contact_phone' => '+57 5 123-4567',
                'status' => 'publicado',
                'amenities' => [1, 2, 3, 4, 5, 6, 7, 8, 9, 12], // WiFi, Piscina, Parking, AC, Desayuno, Gimnasio, Spa, Restaurante, Bar, Vista al Mar
                'rooms' => [
                    [
                        'name' => 'Habitación Superior con Vista al Mar',
                        'description' => 'Amplia habitación con balcón privado y vista panorámica al mar Caribe.',
                        'capacity_adults' => 2,
                        'capacity_children' => 1,
                        'price_per_night' => 350000.00,
                    ],
                    [
                        'name' => 'Suite Junior',
                        'description' => 'Elegante suite con sala de estar separada y terraza privada.',
                        'capacity_adults' => 3,
                        'capacity_children' => 2,
                        'price_per_night' => 550000.00,
                    ],
                    [
                        'name' => 'Habitación Estándar',
                        'description' => 'Cómoda habitación con todas las comodidades modernas.',
                        'capacity_adults' => 2,
                        'capacity_children' => 0,
                        'price_per_night' => 250000.00,
                    ],
                ],
            ],
            [
                'name' => 'Apartamento Moderno Zona Rosa',
                'description' => 'Moderno apartamento completamente equipado en la exclusiva Zona Rosa de Bogotá.',
                'type' => 'apartamento',
                'address_line_1' => 'Carrera 13 #85-32',
                'city' => 'Bogotá',
                'state' => 'Cundinamarca',
                'country' => 'Colombia',
                'postal_code' => '110221',
                'latitude' => 4.6737,
                'longitude' => -74.0574,
                'star_rating' => 4,
                'contact_email' => 'info@apartamentozonrosa.com',
                'contact_phone' => '+57 1 234-5678',
                'status' => 'publicado',
                'amenities' => [1, 3, 4, 5, 6], // WiFi, Parking, AC, Desayuno, Gimnasio
                'rooms' => [
                    [
                        'name' => 'Apartamento Completo',
                        'description' => 'Apartamento de 2 habitaciones con cocina completa, sala y comedor.',
                        'capacity_adults' => 4,
                        'capacity_children' => 2,
                        'price_per_night' => 200000.00,
                    ],
                ],
            ],
            [
                'name' => 'Casa Campestre Coffee Region',
                'description' => 'Encantadora casa campestre rodeada de cafetales en el Eje Cafetero colombiano.',
                'type' => 'casa',
                'address_line_1' => 'Vereda La Pradera, Finca El Café',
                'city' => 'Manizales',
                'state' => 'Caldas',
                'country' => 'Colombia',
                'postal_code' => '170001',
                'latitude' => 5.0703,
                'longitude' => -75.5138,
                'star_rating' => 4,
                'contact_email' => 'reservas@casacampestrecafe.com',
                'contact_phone' => '+57 6 345-6789',
                'status' => 'publicado',
                'amenities' => [1, 3, 4, 5, 11], // WiFi, Parking, AC, Desayuno, Pet Friendly
                'rooms' => [
                    [
                        'name' => 'Casa Completa',
                        'description' => 'Casa completa con 3 habitaciones, sala, comedor, cocina y terraza con vista a los cafetales.',
                        'capacity_adults' => 6,
                        'capacity_children' => 4,
                        'price_per_night' => 300000.00,
                    ],
                ],
            ],
        ];

        foreach ($accommodations as $accommodationData) {
            $rooms = $accommodationData['rooms'];
            $amenityIds = $accommodationData['amenities'];

            unset($accommodationData['rooms'], $accommodationData['amenities']);
            $accommodationData['user_id'] = $user->id;

            $accommodation = Accommodation::create($accommodationData);

            // Asociar amenidades
            $accommodation->amenities()->attach($amenityIds);

            // Crear habitaciones
            foreach ($rooms as $roomData) {
                $roomData['accommodation_id'] = $accommodation->id;
                Room::create($roomData);
            }
        }
    }
}
