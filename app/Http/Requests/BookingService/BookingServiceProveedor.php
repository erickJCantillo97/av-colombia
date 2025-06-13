<?php

namespace App\Http\Requests\BookingService;

use Illuminate\Foundation\Http\FormRequest;

class BookingServiceProveedor extends FormRequest
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
            'booking_service_id' => 'required|exists:booking_services,id',
            'proveedor_id' => 'required|exists:proveedors,id',
            'cost' => 'required|numeric',
            'concept' => 'required|string|max:255',
            'discount' => 'nullable|numeric|min:0',
        ];
    }
}
