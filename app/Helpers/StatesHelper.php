<?php

use App\Models\State;
use Illuminate\Support\Facades\Auth;

function storeState($statable, $state = 'RESERVADO', $user_id = null, $terminated = false)
{
    if ($user_id === null) {
        $user = Auth::user()->id;
        $user_id = $user ? $user : null;
    }

    State::create([
        'user_id' => $user_id,
        'state' => $state,
        'statable_id' => $statable->id,
        'statable_type' => get_class($statable),
        'terminated' => $terminated
    ]);

    addChanges(
        $user_id,
        $statable,
        [
            'description' => 'Estado actualizado a ' . $state,
        ]
    );
}
