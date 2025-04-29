<?php

namespace App\Http\Controllers\BookingService;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookingService\BookingServiceProveedor;
use App\Interfaces\BookingServiceProveedorRepositoryInterface;

class BookingServiceProveedorController extends Controller
{
    public function __construct(
        private BookingServiceProveedorRepositoryInterface $repository,
    ) {}

    public function index()
    {
        $proveedros = $this->repository->getAll();
        return response()->json([
            'data' => $proveedros,
        ]);
    }

    public function getProveedorByBookingService($id)
    {
        $proveedor = $this->repository->getProveedorByBookingService($id);
        return response()->json([
            'proveedors' => $proveedor,
        ]);
    }

    public function store(BookingServiceProveedor $request)
    {
        $this->repository->create($request->validated());

    }

    public function update(BookingServiceProveedor $request, $id)
    {
        $this->repository->update($request->validated(), $id);
    }

    public function destroy($id)
    {
        $this->repository->delete($id);
    }
}
