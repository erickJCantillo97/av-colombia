<?php

namespace Database\Seeders;

use App\Models\Channel;
use App\Models\PaymentMethod;
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
            'name' => 'Carolina',
            'email' => 'carolina@avcolombia.com',
            'password' => Hash::make('Carolina112024'),
            'rol' => 'admin',
        ]);
        //     User::factory()->create([
        //         'name' => 'Hotel example',
        //         'email' => 'hotelexample@avcolombia.com',
        //         'password' => Hash::make('12345678'),
        //         'rol' => 'hotel',
        //     ]);
        //     $channels = [
        //         'Vendedor',
        //         'Directa',
        //         'viator',
        //         'Facebook',
        //         'Instagram',
        //         'Tripadvisor',
        //         'Booking',
        //         'Expedia',
        //         'Whatsapp',
        //         'Plataforma',
        //         'Pagina Web',
        //     ];

        //     foreach ($channels as $channel) {
        //         Channel::create(
        //             [
        //                 'name' => $channel,
        //             ]
        //         );
        //     }
        //     $medios = [
        //         'Efectivo',
        //         'Tarjeta',
        //         'Transferencia',
        //         'Paypal',
        //         'Nequi',
        //         'Daviplata',
        //         'PSE',
        //         'Yape',
        //         'Mercado Pago',
        //         'Otro',
        //     ];
        //     foreach($medios as $medio){
        //         PaymentMethod::create([
        //             'name' => $medio,
        //             'parcent_charge' => 0,
        //         ]);
        //     }

    }
}
