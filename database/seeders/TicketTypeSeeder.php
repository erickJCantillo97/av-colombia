<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TicketTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ticketTypes = [
            'Adultos Extranjeros',
            'Adultos Nacionales', 
            'Niños Extranjeros',
            'Niños Nacionales',
            'Tercera Edad',
            'Estudiantes'
        ];

        foreach ($ticketTypes as $typeName) {
            \App\Models\TicketType::firstOrCreate(['name' => $typeName]);
        }
    }
}
