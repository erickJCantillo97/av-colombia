<?php

namespace App\Http\Controllers;

use App\Models\PaymentProveedor;
use App\Http\Requests\StorePaymentProveedorRequest;
use App\Http\Requests\UpdatePaymentProveedorRequest;

class PaymentProveedorController extends Controller
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
    public function store(StorePaymentProveedorRequest $request)
    {
        // dd($request->all());
        $data = $request->validated();
        if (request()->file('comprobante')) {
            $data['comprobante'] = request()->file('comprobante')->store('payment_proveedors');
        }
        PaymentProveedor::create($data);
        // return redirect()->route('proveedors.index');
        return response()->json(['message' => 'Pago registrado correctamente']);
    }

    /**
     * Display the specified resource.
     */
    public function show(PaymentProveedor $paymentProveedor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PaymentProveedor $paymentProveedor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentProveedorRequest $request, PaymentProveedor $paymentProveedor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymentProveedor $paymentProveedor)
    {
        //
    }
}
