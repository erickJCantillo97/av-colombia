<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProveedorRequest extends FormRequest
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
           'nombre' => 'required',
            'direccion' => 'nullable|string',
            'telefono' => 'nullable',
            'nit' => 'nullable|unique:proveedors,nit,'.$this->proveedor,
            'penalidad_no_show' => 'nullable',
            'penalidad_cancelacion' => 'nullable',
            'type_penalidad_cost' => 'nullable',
            'account_number' => 'nullable',
            'cuenta' => 'nullable',
            'services' => 'nullable|array',
            'services.*.service_id' => 'nullable|exists:services,id',
            'services.*.value' => 'required|numeric',
            'services.*.concept' => 'required|string',
        ];
    }
}
