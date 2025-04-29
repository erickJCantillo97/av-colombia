<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHorarioRequest;
use App\Interfaces\HorarioRepositoryInterface;
use App\Models\Horario;
use Illuminate\Http\Request;

class HorarioController extends Controller
{

    public function __construct(
        private HorarioRepositoryInterface $horarioRepository
    ) {}


    public function store(StoreHorarioRequest $request)
    {
        $this->horarioRepository->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Horario $horario)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Horario $horario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Horario $horario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Horario $horario)
    {
        //
    }
}
