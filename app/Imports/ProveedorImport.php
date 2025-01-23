<?php

namespace App\Imports;

use App\Models\Proveedor;
use App\Models\Service;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProveedorImport implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $collection)
    {
        foreach ($collection as $index => $row) {
            if (!isset($row['tour']) || !isset($row['proveedor'])) {
                continue;
            }
            // dd($row);
            $service = Service::where(
                'title',
                $row['tour'],
            )->first();
            if (!isset($service)) {
                $service = new Service();
                $service->title = $row['tour'];
                $service->title_en = $row['tour'];
                $service->description_en = 'tour';
                $service->code = 'tour-' . $index;
                $service->duration_type = 'Valido en fecha de Reserva';
                $service->description = $row['description'] ?? 'tour';
                $service->adults_price = 0;
                $service->boys_price = 0;
                $service->save();
            }
            $proveedor = Proveedor::firstOrCreate(
                [
                    'nombre' =>
                    $row['proveedor']
                ]
            );
            if (isset($row['valor']) && is_numeric($row['valor'])) {
                $serviceProveedor = DB::table('service_proveedor')->where(
                    'proveedor_id',
                    $proveedor->id
                )->where('service_id', $service->id)->first();
                if (!isset($serviceProveedor)) {
                    $serviceProveedor = DB::table('service_proveedor')->insert(
                        [
                            'proveedor_id' => $proveedor->id,
                            'service_id' => $service->id,
                            'value' => $row['valor']
                        ]
                    );
                } else {
                    $serviceProveedor = DB::table('service_proveedor')->where(
                        'proveedor_id',
                        $proveedor->id
                    )->where('service_id', $service->id)->update(
                        [
                            'value' => $row['valor']
                        ]
                    );
                }
            }

            // $proveedor = new Proveedor();
            // $proveedor->nombre = $row[0];
            // $proveedor->direccion = $row[1];
            // $proveedor->telefono = $row[2];
            // $proveedor->email = $row[3];
            // $proveedor->save();
        }
    }
}
