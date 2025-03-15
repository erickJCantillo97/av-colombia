<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use App\Models\BookingService;
use App\Models\PaymentProveedor;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = PaymentProveedor::all();
        
        return inertia('Payments/Index', [
            'payments' => $payments
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
    public function store(StorePaymentRequest $request)
    {

        $validated = $request->validated();
        $booking = BookingService::find($validated['payable_id']);
        if (request('validatePay')) {
            $validated['status'] = 'Confirmado';
        } else {
            $validated['status'] = 'Pendiente';
        }
        if ($validated['amount'] == $booking->total_price) {
            $validated['type'] = 'total';
        }
        $validated['user_id'] = auth()->id();
        $payment = Payment::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentRequest $request, Payment $payment)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }

    public function setState(Payment $payment)
    {
        $payment->update([
            'status' => request('status')
        ]);
        return back()->with('success', 'Estado actualizado');
    }
}
