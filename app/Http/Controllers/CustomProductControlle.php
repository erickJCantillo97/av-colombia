<?php

namespace App\Http\Controllers;

use App\Models\CustomProductUser;
use Illuminate\Http\Request;

class CustomProductControlle extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'boys_tarifa' => 'required',
            'adult_tarifa' => 'required',
            'service_id' => 'required',
        ]);
        try{
            $validateData['user_id'] = auth()->user()->id;
            $customProduct = CustomProductUser::where('user_id', auth()->user()->id)->where('service_id', $validateData['service_id'])->first();
            $customProduct->boys_tarifa =  $validateData['boys_tarifa'];
            $customProduct->adult_tarifa =  $validateData['adult_tarifa'];
            $customProduct->save();
        }catch(\Exception $e){
            return response()->json(['message' => 'Error al guardar el producto personalizado'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
