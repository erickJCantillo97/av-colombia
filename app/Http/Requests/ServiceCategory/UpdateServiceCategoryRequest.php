<?php

namespace App\Http\Requests\ServiceCategory;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceCategoryRequest extends FormRequest
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
        $category = $this->route('serviceCategory');
        $id = is_object($category) ? $category->id : $category;

        return [
            'title' => 'required|string|max:255|unique:service_categories,title,'.$id,
            'color' => 'nullable|string|max:30',
            'icon' => 'nullable|string|max:100',
        ];
    }
}
