<?php

namespace App\Http\Requests\Service;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
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
            'title' => 'required|string|max:255|unique:services',
            'code' => 'required|string',
            'destinos' => 'nullable|string',
            'title_en' => 'nullable|string|max:255|unique:services',
            'description' => 'nullable|string|max:4000',
            'description_en' => 'nullable|string|max:4000',
            'includes' => 'nullable|string',
            'notIncludes' => 'nullable|string',
            'type' => 'nullable|string',
            'city' => 'nullable|string',
            'duration_type' => 'nullable|string',
            'duration' => 'nullable|numeric',
            'duration_unit' => 'nullable|string',
            'adults_price' => 'nullable|numeric',
            'boys_price' => 'nullable|numeric',
            'capacidad_min' => 'nullable|numeric',
            'capacidad_min' => 'nullable|numeric',
            'recogidas' => 'nullable|string',
            'availability_type' => 'nullable|string',
            'price_type' => 'nullable|string',
            'puntos' => 'nullable|string',
        ];
    }
}
