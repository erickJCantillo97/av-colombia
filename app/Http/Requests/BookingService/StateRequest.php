<?php

namespace App\Http\Requests\BookingService;

use Illuminate\Foundation\Http\FormRequest;

class StateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }


    public function rules(): array
    {
        return [
            'state' => 'required|string',
            'statable_id' => 'required|integer',
        ];
    }
}
