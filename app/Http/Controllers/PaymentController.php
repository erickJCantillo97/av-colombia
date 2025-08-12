<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookingService\BookingClientService;
use App\Models\Payment;
use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use App\Models\BookingService;
use App\Models\PaymentProveedor;
use App\Models\Service;
use App\Models\User;
use Carbon\Carbon;
use Gemini\Foundation\Request;
use Illuminate\Support\Facades\Http;

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
    public function show(Payment $payment) {}

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
    public function update(UpdatePaymentRequest $request, Payment $payment) {}

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

    public function generateLinkToPayment(BookingClientService $request, $userId)
    {
        $user = User::find($userId);
        $service = Service::findOrFail($request->service_id);
        // $token = $this->getTokenToPayment();
        $link = Http::withHeaders(headers: ['auth-token' => $token, 'content-type' => 'application/json'])->post("https://noccapi-stg.redeban.com/linktopay/init_order/", [
            "user" => [
                "id" => $user->id,
                "email" => $request->client_email,
                "name" => $request->client_name,
                "last_name" => $request->last_name
            ],
            "order" => [
                "dev_reference" => "1",
                "description" => $service->title,
                "amount" => $request->totalCost,
                "installments_type" => 0,
                "currency" => "COP"
            ],
            "configuration" => [
                "partial_payment" => false,
                "expiration_days" => 1,
                "allowed_payment_methods" => ["All"],
                "success_url" => "https://url-to-success.com",
                "failure_url" => "https://url-to-failure.com",
                "pending_url" => "https://url-to-pending.com",
                "review_url" => "https://url-to-review.com"
            ]
        ]);
        return response()->json($link->json());
    }

    
}
