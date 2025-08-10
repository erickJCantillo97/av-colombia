<?php

namespace App\Http\Requests\BookingService;

use Illuminate\Foundation\Http\FormRequest;

class BookingClientService extends FormRequest
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
            'date' => 'required|date',
            'persons' => 'required|integer|min:1',
            'last_name' => 'required|string|max:255',
            'time' => 'nullable',
            'service_id' => 'required|exists:services,id',
            'service_name' => 'required|string|max:255',
            'client_name' => 'required|string|max:255',
            'client_email' => 'required|email|max:255',
            'client_phone' => 'required|string|max:20',
            'client_city' => 'required|string|max:255',
            'client_building' => 'required|string|max:255',
            'totalCost' => 'required|numeric|min:1'
        ];
    }
}
