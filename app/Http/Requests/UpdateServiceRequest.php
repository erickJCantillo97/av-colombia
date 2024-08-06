<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceRequest extends FormRequest
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
            'title' => 'required|string|max:255|unique:services,'.request('id'),
            'title_en' => 'nullable|string|max:255|unique:services,'.request('id'),
            'description' => 'required|string|max:4000',
            'description_en' => 'nullable|string|max:4000',
            'price' => 'required|numeric',
            'custom_price' => 'nullable|numeric',
        ];
    }
}
