<?php

namespace App\Http\Controllers;

use App\Models\Amenity;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AmenityController extends Controller
{
    /**
     * Store a newly created amenity in storage.
     */
        public function store(Request $request): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:amenities,name',
                'icon' => 'required|string|max:255',
            ], [
                'name.required' => 'El nombre es requerido.',
                'name.unique' => 'Ya existe una amenidad con este nombre.',
                'name.max' => 'El nombre no puede tener más de 255 caracteres.',
                'icon.required' => 'El icono es requerido.',
                'icon.max' => 'El icono no puede tener más de 255 caracteres.',
            ]);

            $amenity = Amenity::create([
                'name' => $validated['name'],
                'icon' => $validated['icon'],
            ]);

            return back()->with([
                'success' => 'Amenidad creada exitosamente.',
                'amenity' => $amenity
            ]);

        } catch (ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            return back()->withErrors(['general' => 'Error interno del servidor.'])->withInput();
        }
    }

    /**
     * Display a listing of the amenities.
     */
    public function index(): JsonResponse
    {
        $amenities = Amenity::orderBy('name')->get();

        return response()->json([
            'success' => true,
            'amenities' => $amenities,
        ]);
    }

    /**
     * Remove the specified amenity from storage.
     */
    public function destroy(Amenity $amenity): JsonResponse
    {
        try {
            $amenity->delete();

            return response()->json([
                'success' => true,
                'message' => 'Amenidad eliminada exitosamente.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar la amenidad.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
