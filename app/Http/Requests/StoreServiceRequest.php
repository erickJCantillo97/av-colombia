<?php

namespace App\Http\Requests;

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
            'description' => 'required|string|max:4000',
            'description_en' => 'nullable|string|max:4000',
            'includes' => 'nullable|string',
            'notIncludes' => 'nullable|string',
            'type' => 'required|string',
            'city' => 'required|string',
            'duration_type' => 'required|string',
            'duration' => 'nullable|numeric',
            'duration_unit' => 'nullable|string',
            'adults_price' => 'required|numeric',
            'boys_price' => 'required|numeric',
            'capacidad_min' => 'nullable|numeric',
            'capacidad_min' => 'nullable|numeric',
            'recogidas' => 'nullable|string',
            'puntos' => 'nullable|string',
        ];
    }
}
