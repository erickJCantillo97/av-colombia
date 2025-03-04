<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissionsType = [
            'crear',
            'ver',
            'editar',
            'eliminar',
        ];

        $permisos = [
            ' usuarios',
            ' metodos',
            ' canales',
            ' tasas',
            ' proveedores',
            ' pagos',
            ' entradas',
            ' experiencas',
            ' servicios',
        ];
        $administrador = Role::create(['name' => 'Super Administrador']);
        foreach ($permissionsType as $type) {
            foreach ($permisos as $permiso) {
                $p = Permission::create([
                    'name' => $type . $permiso,
                ]);
                $administrador->givePermissionTo($p);
            }
        }
    }
}
