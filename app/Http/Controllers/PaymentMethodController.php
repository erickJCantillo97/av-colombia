<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;
use App\Http\Requests\StorePaymentMethodRequest;
use App\Http\Requests\UpdatePaymentMethodRequest;

class PaymentMethodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $methos = PaymentMethod::get();
        return response()->json($methos);
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
    public function store(StorePaymentMethodRequest $request)
    {
        $method = PaymentMethod::create($request->all());
        return back()->with('success', 'Metodo de pago creado correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(PaymentMethod $paymentMethod)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PaymentMethod $paymentMethod)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentMethodRequest $request, PaymentMethod $paymentMethod)
    {
        try {
            $paymentMethod->update($request->all());
            return back()->with('success', 'Metodo de pago actualizado correctamente');
        } catch (\Exception $e) {
            return back()->with('error', 'Error al actualizar el metodo de pago');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymentMethod $paymentMethod)
    {
        try {
            $paymentMethod->delete();
            return back()->with('success', 'Metodo de pago eliminado correctamente');
        } catch (\Exception $e) {
            return back()->with('error', 'Error al eliminar el metodo de pago');
        }
    }
}
