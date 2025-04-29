<?php

namespace App\Repositories;

use App\Interfaces\ProveedorRepositoryInterface;
use App\Models\Proveedor;

class ProveedorRepository extends BaseRepository implements ProveedorRepositoryInterface
{
    public function model()
    {
        return Proveedor::class;
    }


}
