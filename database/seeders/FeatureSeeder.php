<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class FeatureSeeder extends Seeder
{
    public function run()
    {
        $features = [
            ['id' => Str::uuid(), 'color' => 'green', 'icon' => 'fa-solid fa-snowflake', 'name' => 'neveras', 'created_at'=>now(),'updated_at'=>now()],
            ['id' => Str::uuid(), 'color' => 'green', 'icon' => 'fa-solid fa-vest', 'name' => 'chalecos', 'created_at'=>now(),'updated_at'=>now()],
            ['id' => Str::uuid(), 'color' => 'green', 'icon' => 'fa-solid fa-server', 'name' => 'toallas', 'created_at'=>now(),'updated_at'=>now()],
            ['id' => Str::uuid(), 'color' => 'green', 'icon' => 'fa-solid fa-wine-bottle', 'name' => 'bebidas', 'created_at'=>now(),'updated_at'=>now()],
            ['id' => Str::uuid(), 'color' => 'green', 'icon' => 'fa-solid fa-dice-d6', 'name' => 'hielo', 'created_at'=>now(),'updated_at'=>now()],
            ['id' => Str::uuid(), 'color' => 'green', 'icon' => 'fa-solid fa-tint', 'name' => 'agua', 'created_at'=>now(),'updated_at'=>now()],
            ['id' => Str::uuid(), 'color' => 'green', 'icon' => 'fa-solid fa-anchor', 'name' => 'capitan', 'created_at'=>now(),'updated_at'=>now()],
            ['id' => Str::uuid(), 'color' => 'green', 'icon' => 'fa-solid fa-user-tie', 'name' => 'marinero', 'created_at'=>now(),'updated_at'=>now()],
            ['id' => Str::uuid(), 'color' => 'green', 'icon' => 'fa-solid fa-gas-pump', 'name' => 'combustible', 'created_at'=>now(),'updated_at'=>now()],
            ['id' => Str::uuid(), 'color' => 'green', 'icon' => 'fa-solid fa-user-tie', 'name' => 'ayudante', 'created_at'=>now(),'updated_at'=>now()],
            ['id' => Str::uuid(), 'color' => 'green', 'icon' => 'fa-solid fa-shield-halved', 'name' => 'poliza de seguro', 'created_at'=>now(),'updated_at'=>now()],

        ];

        DB::table('features')->insert($features);
    }
}

