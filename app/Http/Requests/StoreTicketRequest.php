<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'booking_service_id' => ['nullable', 'exists:booking_services,id'],
            'adults_extranjeros' => ['required', 'integer', 'min:0'],
            'adults_nacionales' => ['required', 'integer', 'min:0'],
            'boys_extranjeros' => ['required', 'integer', 'min:0'],
            'boys_nacionales' => ['required', 'integer', 'min:0'],
            'costo_total' => ['nullable', 'numeric', 'min:0'],
            'tipo_movimiento' => ['required', 'in:entrada,salidas'],
        ];
    }
}
