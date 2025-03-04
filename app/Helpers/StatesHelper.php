<?php

use App\Models\State;

function storeState($statable, $state = 'RESERVADO', $terminated = false)
{

    State::create([
        'user_id' => auth()->user()->id,
        'state' => $state,
        'statable_id' => $statable->id,
        'statable_type' => get_class($statable),
        'terminated' => $terminated
    ]);
}
