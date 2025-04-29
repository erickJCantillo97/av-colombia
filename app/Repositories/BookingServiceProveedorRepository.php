<?php

namespace App\Repositories;

use App\Interfaces\BookingServiceProveedorRepositoryInterface;
use App\Models\BookingProveedor;
use App\Repositories\BaseRepository;

class BookingServiceProveedorRepository extends BaseRepository implements BookingServiceProveedorRepositoryInterface
{


    public function model()
    {
        return BookingProveedor::class;
    }

    public function getProveedorByBookingService($bookingServiceId)
    {
        return $this->model->where('booking_service_id', $bookingServiceId)->with('proveedor')->get();
    }

    public function create(array $data)
    {
        if ($data['cost'] != 0) {
            return $this->model->create($data);
        }
        return false;
    }

    public function update($id, array $data)
    {
        if ($data['cost'] != 0) {
            return $this->model->find($id)->update($data);
        }
        return false;
    }


}
