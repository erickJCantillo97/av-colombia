<?php

use App\Models\State;
use Illuminate\Support\Facades\Auth;

function storeState($statable, $state = 'RESERVADO', $terminated = false)
{
    State::create([
        'user_id' => Auth::id(),
        'state' => $state,
        'statable_id' => $statable->id,
        'statable_type' => get_class($statable),
        'terminated' => $terminated
    ]);
}
