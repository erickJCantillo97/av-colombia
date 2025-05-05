<?php

namespace App\Http\Controllers;

use App\Models\Proveedor;
use App\Http\Requests\StoreProveedorRequest;
use App\Http\Requests\UpdateProveedorRequest;
use App\Imports\ProveedorImport;
use App\Interfaces\ProveedorRepositoryInterface;
use App\Models\Service;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class ProveedorController extends Controller
{

    public function __construct(
        private ProveedorRepositoryInterface $proveedorRepository
    ){}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $proveedors = $this->proveedorRepository->getAll();
        return inertia('Proveedor/Index', ['proveedores' => $proveedors]);
    }

    public function getAll(){
        $proveedors = $this->proveedorRepository->getAll();
        return response()->json([
            'proveedors' => $proveedors
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProveedorRequest $request)
    {
        try {
            DB::beginTransaction();
            $this->proveedorRepository->create($request->validated());
            DB::commit();
            return back()->with('Proveedor Creado');
        } catch (Exception $th) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Error Al crear el proveedor']);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Proveedor $proveedor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Proveedor $proveedor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProveedorRequest $request, $proveedor)
    {
        try {
            DB::beginTransaction();
            $this->proveedorRepository->update($proveedor, $request->validated());
            DB::commit();
            return back()->with('Proveedor Actualizado');
        } catch (Exception $th) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Error Al actualizar el proveedor']);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proveedor $proveedor)
    {
        try {
            $proveedor->delete();
            return back()->with('Proveedor Eliminado');
        } catch (\Throwable $th) {
            return back()->withErrors(['message' => 'Error Al eliminar el proveedor']);
        }
    }

    public function upload(Request $request)
    {

        Excel::import(new ProveedorImport(), $request->docs);
    }

    public function addConcept()
    {
        $proveedors = Proveedor::all();
        foreach ($proveedors as $proveedor) {
            $services = $proveedor->services;
            foreach ($services as $service) {
                $service->pivot->update(['concept' => trim($service->title)]);
            }
        }
    }

    public function getProvedorsService(Service $service)
    {
        $proveedors = $service->proveedors;
        return response()->json([
            'proveedors' => $proveedors
        ]);
    }
}
