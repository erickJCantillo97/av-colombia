<?php

namespace App\Http\Controllers;

use App\Models\Proveedor;
use App\Http\Requests\StoreProveedorRequest;
use App\Http\Requests\UpdateProveedorRequest;

class ProveedorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $proveedors = Proveedor::with('services')->get();
        if (request()->expectsJson()) {
            return response()->json([
                'proveedors' => $proveedors
            ]);
        }
        return inertia('Proveedor/Index', ['proveedores' => $proveedors]);
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

        $proveedor = Proveedor::create($request->validated());
        foreach (request('services') as $service) {
            $proveedor->services()->attach($service['service_id'], ['value' => $service['value']]);
        }
        return back()->with('Proveedor Creado');
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
    public function update(UpdateProveedorRequest $request, Proveedor $proveedor)
    {
        try {
            $proveedor->update($request->validated());
            $proveedor->services()->detach();
            foreach (request('services') as $service) {
                $proveedor->services()->attach($service['service_id'], ['value' => $service['value']]);
            }
            return back()->with('Proveedor Actualizado');
        } catch (\Throwable $th) {
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
}
