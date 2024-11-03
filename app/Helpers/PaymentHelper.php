<?php

use App\Models\Payment;

function paymentStore($monto, $metodo, $paimable)
{
    $payment = Payment::create([
        'user_id' => auth()->user()->id ?? null,
        'payable_id' => $paimable->id,
        'payable_type' => get_class($paimable),
        'method' => $metodo,
        'amount' => $monto,
        'status' => 'pendiente',
        'currency' => 'COP'
    ]);
}

