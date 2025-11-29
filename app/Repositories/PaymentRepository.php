<?php

namespace App\Repositories;

use App\Interfaces\PaymentRepositoryInterface;
use App\Interfaces\ServiceRepositoryInterface;
use App\Models\Payment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;

class PaymentRepository extends BaseRepository implements PaymentRepositoryInterface
{
    public function __construct(
        private ServiceRepositoryInterface $serviceRepository,
    ) {
        parent::__construct();
    }

    public function model()
    {
        return Payment::class;
    }

    public function createPayment(array $data, $userId, $bookingId)
    {
        if ($data['payment_method'] == 2) {
            return $this->createPaymentOnline($data, $userId, $bookingId);
        }
    }

    private function getTokenToPayment()
    {
        $server_application_code = env('API_LOGIN_DEV', 'AVCOLOMBIACTG76-RE-SERVER');
        $server_app_key = env('APP_KEY_SERVER', 'wBNX4A570rFMSFCIePTrTXhn4PXHBW');
        $date = new Carbon;
        $unix_timestamp = $date->getTimestamp();
        $uniq_token_string = $server_app_key.$unix_timestamp;
        $uniq_token_hash = hash('sha256', $uniq_token_string);
        $auth_token = base64_encode($server_application_code.';'.$unix_timestamp.';'.$uniq_token_hash);

        return $auth_token;
    }

    private function createPaymentOnline(array $data, $userId, $bookingId)
    {
        $token = $this->getTokenToPayment();
        $user = User::find($userId);
        $service = $this->serviceRepository->getById($data['service_id']);
        $link = Http::withHeaders(headers: ['auth-token' => $token, 'content-type' => 'application/json'])->post('https://noccapi.redeban.com/linktopay/init_order/', [
            'user' => [
                'id' => $user->id,
                'email' => $data['cliente_email'],
                'name' => $data['cliente_name'],
                'last_name' => $data['cliente_name'],
            ],
            'order' => [
                'dev_reference' => $bookingId,
                'description' => $service->title,
                'amount' => $data['total_real'],
                'installments_type' => 0,
                'currency' => 'COP',
            ],
            'configuration' => [
                'partial_payment' => false,
                'expiration_days' => 1,
                'allowed_payment_methods' => ['Card', 'BankTransfer', 'Cash', 'Rappi', 'ApplePay'],
                'success_url' => route('booking.success', ['bookingService' => $bookingId]),
                'failure_url' => 'https://url-to-failure.com',
                'pending_url' => 'https://url-to-pending.com',
                'review_url' => 'https://url-to-review.com',
            ],
        ]);

        return $link->json();
    }
}
