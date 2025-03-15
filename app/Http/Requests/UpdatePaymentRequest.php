<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePaymentRequest extends FormRequest
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
            'payable_id' => ['required', 'uuid'],
            'payable_type' => ['required', 'string'],
            'method' => ['required', 'string'],
            'amount' => ['required', 'numeric'],
            'currency' => ['required', 'string'],
        ];
    }
}
