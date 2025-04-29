<?php

namespace App\Http\Controllers;

use App\Models\Availability;
use App\Models\Precie;
use Illuminate\Http\Request;

class AvailabilityController extends Controller
{


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);
        try {
            $availability = new Availability();
            $availability->service_id = $request->service_id;
            $availability->name = $request->name;
            $availability->start_date = $request->start_date;
            $availability->end_date = $request->end_date;
            $availability->save();
            return response()->json($availability, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        $availability = Availability::findOrFail($id);
        $availability->name = $request->name;
        $availability->start_date = $request->start_date;
        $availability->end_date = $request->end_date;
        $availability->save();

        return response()->json($availability, 200);
    }

    public function destroy($id)
    {
        $availability = Availability::findOrFail($id);
        $availability->delete();
        return response()->json(null, 204);
    }

    public function syncPrices(Request $request, $id)
    {
        $availabilities = Availability::findOrFail($id);
        Precie::whereIn('id', $availabilities->precies->pluck('id')->toArray())->delete();
        foreach ($request->prices as $key => $value) {
            Precie::create([
                'availability_id' => $availabilities->id,
                'min' => $value['min'],
                'max' => $value['max'],
                'duration' => $value['duration'],
                'duration_type' => $value['duration_type'],
                'value' => $value['value'],
            ]);
        }

    }
}
