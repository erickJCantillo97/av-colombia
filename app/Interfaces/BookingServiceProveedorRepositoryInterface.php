<?php

namespace App\Interfaces;

interface BookingServiceProveedorRepositoryInterface extends BaseRepositoryInterface {

    public function getProveedorByBookingService($id);
}
