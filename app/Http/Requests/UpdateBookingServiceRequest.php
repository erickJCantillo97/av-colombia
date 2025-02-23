<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookingServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'service_id' => 'required|exists:services,id',
            'adults' => 'required|numeric',
            'boys' => 'nullable|numeric',
            'cliente_name' => 'required|string',
            'cliente_phone' => 'required|numeric',
            'cliente_city' => 'required|string',
            'cliente_building' => 'required|string',
            'channel_id' => ['required', 'uuid'],
            'mascota' => 'nullable|numeric',
            'persona_adicional' => 'nullable|numeric',
            'cobre_transaccion' => 'nullable|numeric',
            'cobro_extra_cliente' => 'nullable|numeric',
            'reserva' => 'nullable|numeric',
            'saldo' => 'nullable|numeric',
            'percent_descuento' => 'nullable|numeric',
            // 'payment_type' => 'nullable|numeric',
            'mascota' =>  'nullable|numeric',
            'persona_adicional' =>  'nullable|numeric',
            'cobre_transaccion' =>  'nullable|numeric',
            'cobro_extra_cliente' =>  'nullable|numeric',
            'alimentacion' =>  'nullable|numeric',
            'reserva' =>  'nullable|numeric',
            'saldo' =>  'nullable|numeric',
            'percent_descuento' =>  'nullable|numeric',
            'date' => 'required',
            'total_real' => 'nullable|numeric',
            'percent_channel' => 'nullable|numeric',
            'total' => 'nullable|numeric',
            'observations' => 'nullable|string',
            'method_id' => 'nullable|uuid',
            'time_service' => 'nullable|string',
            'duration' => 'nullable|string',
        ];
    }
}
