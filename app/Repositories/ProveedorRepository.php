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

    public function getAll(){
        return $this->model->with('services')->get();
    }

    public function create(array $data)
    {
        $services = $data['services'];
        unset($data['services']);
        if ($data('cuenta')) {
            $data['cuenta'] = $data['cuenta']->store('proveedors/files');
        }
        $proveedor = $this->model->create($data);
        $this->attachServices($proveedor, $services);

    }

    public function update($id, array $data)
    {
        $services = $data['services'];
        unset($data['services']);
        $proveedor = $this->getById($id);
        if ($data['cuenta']) {
            $data['cuenta'] = $data['cuenta']->store('proveedors/files');
        }
        $proveedor->update($data);
        $this->attachServices($proveedor, $services);
    }

    private function attachServices(Proveedor $proveedor, array $services){
        // dd($services);
        $proveedor->services()->detach();
        foreach ($services as $service) {
            $proveedor->services()->attach(
                $service['service_id'],
                [
                'value' => $service['value'],
                'concept' => $service['concept']
                ]
            );
        }
    }


}
