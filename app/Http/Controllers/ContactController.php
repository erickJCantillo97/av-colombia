<?php

namespace App\Http\Controllers;

use App\Http\Requests\Contact\StoreContactRequest;
use App\Mail\ContactMessage;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(StoreContactRequest $request): JsonResponse
    {
        $contact = $request->validated();

        try {
            Mail::to([$contact['email'], 'avacacionales@gmail.com'])
                ->send(new ContactMessage($contact));
        } catch (Exception $e) {
            Log::error('Error al enviar el mensaje de contacto', [
                'email' => $contact['email'],
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'message' => 'No pudimos enviar tu mensaje. Inténtalo de nuevo más tarde.',
                'status' => false,
            ], 500);
        }

        return response()->json([
            'message' => 'Tu mensaje ha sido enviado correctamente. Te contactaremos pronto.',
            'status' => true,
        ], 200);
    }
}
