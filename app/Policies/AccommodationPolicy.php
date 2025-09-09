<?php

namespace App\Policies;

use App\Models\Accommodation;
use App\Models\User;

class AccommodationPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // Todos pueden ver alojamientos
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Accommodation $accommodation): bool
    {
        return true; // Todos pueden ver un alojamiento específico
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->rol === 'proveedor' || $user->rol === 'admin' || $user->rol === 'superadmin';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Accommodation $accommodation): bool
    {
        return $user->id === $accommodation->user_id ||
               $user->rol === 'admin' ||
               $user->rol === 'superadmin';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Accommodation $accommodation): bool
    {
        return $user->id === $accommodation->user_id ||
               $user->rol === 'admin' ||
               $user->rol === 'superadmin';
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Accommodation $accommodation): bool
    {
        return $user->rol === 'admin' || $user->rol === 'superadmin';
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Accommodation $accommodation): bool
    {
        return $user->rol === 'superadmin';
    }
}
