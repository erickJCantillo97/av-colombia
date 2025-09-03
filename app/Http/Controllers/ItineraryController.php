<?php

namespace App\Http\Controllers;

use App\Models\Itinerary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ItineraryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    /**
     * Procesa múltiples itinerarios con diferentes operaciones (crear, editar, eliminar)
     * basado en la opción especificada para cada itinerario
     *
     * @param Request $request Contiene un array de itinerarios con sus respectivas opciones e imágenes
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // Descomenta esta línea para depurar la petición
        // dd($request->all());

        // Validación básica del array de itinerarios
        $request->validate([
            'itineraries' => 'required|array',
            'itineraries.*.option' => 'required|string|in:create,edit,delete',
        ]);

        // Validaciones específicas según la opción
        foreach ($request->itineraries as $key => $itinerary) {
            $rules = [];

            // Reglas comunes para create y edit
            if (in_array($itinerary['option'], ['create', 'edit'])) {
                $rules["itineraries.{$key}.title"] = 'required|string';
                $rules["itineraries.{$key}.description"] = 'required|string';
            }

            // Reglas específicas para create
            if ($itinerary['option'] === 'create') {
                $rules["itineraries.{$key}.service_id"] = 'required|exists:services,id';
                $rules["itineraries.{$key}.image"] = 'required|string';
                // No validamos id para create
            }

            // Reglas específicas para edit y delete
            if (in_array($itinerary['option'], ['edit', 'delete'])) {
                $rules["itineraries.{$key}.id"] = 'required|string|exists:itineraries,id';
            }

            // Validar este itinerario específico
            $request->validate($rules);
        }

        $created = 0;
        $updated = 0;
        $deleted = 0;

        // Procesar cada itinerario según su opción
        foreach ($request->itineraries as $itineraryData) {
            switch ($itineraryData['option']) {
                case 'create':
                    $this->createItinerary($itineraryData);
                    $created++;
                    break;
                case 'edit':
                    $this->updateItinerary($itineraryData);
                    $updated++;
                    break;
                case 'delete':
                    $this->deleteItinerary($itineraryData);
                    $deleted++;
                    break;
            }
        }

        $message = [];
        if ($created > 0) $message[] = "$created itinerarios creados";
        if ($updated > 0) $message[] = "$updated itinerarios actualizados";
        if ($deleted > 0) $message[] = "$deleted itinerarios eliminados";

        return redirect()->back()->with('success', implode(', ', $message));
    }

    /**
     * Crea un nuevo itinerario con su imagen asociada
     *
     * @param array $itineraryData Datos del itinerario a crear
     * @return Itinerary El itinerario creado
     */
    private function createItinerary(array $itineraryData)
    {
        // Extraer la imagen en base64 del array de datos
        $imageBase64 = $itineraryData['image'] ?? null;

        // Eliminar la imagen, option e id del array para crear el itinerario
        $itineraryAttributes = collect($itineraryData)->except(['image', 'option', 'id'])->toArray();

        // Crear el itinerario
        $itinerary = Itinerary::create($itineraryAttributes);

        // Procesar la imagen en base64 si existe
        if ($imageBase64 && preg_match('/^data:image\/([\\w+]+);base64,(.+)$/', $imageBase64, $matches)) {
            $this->saveItineraryImage($itinerary, $matches);
        }

        return $itinerary;
    }

    /**
     * Actualiza un itinerario existente y su imagen si se proporciona una nueva
     *
     * @param array $itineraryData Datos del itinerario a actualizar
     * @return Itinerary El itinerario actualizado
     */
    private function updateItinerary(array $itineraryData)
    {
        // Encontrar el itinerario por su ID
        $itinerary = Itinerary::findOrFail($itineraryData['id']);

        // Extraer la imagen en base64 del array de datos si existe
        $imageBase64 = $itineraryData['image'] ?? null;

        // Eliminar campos que no se deben actualizar directamente
        $itineraryAttributes = collect($itineraryData)->except(['image', 'option', 'id', 'service_id', 'images'])->toArray();

        // Actualizar el itinerario
        $itinerary->update($itineraryAttributes);

        // Procesar la imagen en base64 si existe
        if ($imageBase64 && preg_match('/^data:image\/([\\w+]+);base64,(.+)$/', $imageBase64, $matches)) {
            // Eliminar imágenes anteriores
            foreach ($itinerary->images as $oldImage) {
                Storage::delete($oldImage->filepath);
                $oldImage->delete();
            }

            // Guardar la nueva imagen
            $this->saveItineraryImage($itinerary, $matches);
        }

        return $itinerary;
    }

    /**
     * Elimina un itinerario y sus imágenes asociadas
     *
     * @param array $itineraryData Datos del itinerario a eliminar
     * @return bool Resultado de la operación
     */
    private function deleteItinerary(array $itineraryData)
    {
        // Encontrar el itinerario por su ID
        $itinerary = Itinerary::findOrFail($itineraryData['id']);

        // Eliminar imágenes asociadas
        foreach ($itinerary->images as $image) {
            Storage::delete($image->filepath);
            $image->delete();
        }

        // Eliminar el itinerario
        return $itinerary->delete();
    }

    /**
     * Guarda una imagen asociada a un itinerario
     *
     * @param Itinerary $itinerary El itinerario al que se asociará la imagen
     * @param array $matches Resultado del regex con el tipo de imagen y datos en base64
     * @return void
     */
    private function saveItineraryImage(Itinerary $itinerary, array $matches)
    {
        $imageType = $matches[1]; // png, jpeg, etc.
        $imageData = base64_decode($matches[2]);

        // Generar un nombre de archivo único
        $filename = uniqid() . '.' . $imageType;
        $filepath = 'public/images/itineraries/' . $filename;

        // Guardar la imagen en el sistema de archivos
        Storage::put($filepath, $imageData);

        // Guardar la referencia en la base de datos
        $itinerary->images()->create([
            'filepath' => $filepath,
            'filename' => $filename,
            'extension' => $imageType,
            'size' => strlen($imageData),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Itinerary $itinerary)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Itinerary $itinerary)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Itinerary $itinerary)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Itinerary $itinerary)
    {
        //
    }
}
