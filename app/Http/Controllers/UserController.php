<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $permisos = Permission::get();
        return Inertia::render('Users/Index', [
            'users' => User::with('permissions')->get(),
            'permisos' => $permisos
        ]);
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
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'rol' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'password' => ['required', 'string', 'confirmed'],
        ]);

        if (request()->file('camara_comercio')) {
            $request['camara_comercio'] = request()->file('camara_comercio')->store('users/files');
        }
        if (request()->file('rut')) {
            $request['rut'] = request()->file('rut')->store('users/files');
        }
        if (request()->file('cuenta')) {
            $request['cuenta'] = request()->file('cuenta')->store('users/files');
        }

        User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'rol' => $request['rol'],
            'password' => Hash::make($request['password']),
            'phone' => $request['phone'],
            'camara_comercio' => $request['camara_comercio'],
            'rut' => $request['rut'],
            'cuenta' => $request['cuenta'],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validateData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'rol' => ['required', 'string', 'max:255'],
            // 'password' => ['nullable', 'string', 'confirmed'],
        ]);
        $camara_comercio = $user->camara_comercio;
        $rut = $user->rut;
        $cuenta = $user->cuenta;
        if ($request->filled('password')) {
            $validateData['password'] = Hash::make($request['password']);
        }
        if (request()->file('camara_comercio')) {
            $camara_comercio = request()->file('camara_comercio')->store('users');
        }
        if (request()->file('rut')) {
            $rut = request()->file('rut')->store('users');
        }
        if (request()->file('cuenta')) {
            $cuenta = request()->file('cuenta')->store('users');
        }
        try {
            $user->update([
                'name' => $request['name'],
                'email' => $request['email'],
                'rol' => $request['rol'],
                'password' => Hash::make($request['password']),
                'phone' => $request['phone'],
                'camara_comercio' => $camara_comercio,
                'rut' => $rut,
                'cuenta' => $cuenta,
            ]);
            $permisos = json_decode($request->permissions);
            $user->syncPermissions($permisos);
            return back()->with('success', 'User updated successfully.');
        } catch (\Exception $e) {
            dd($e);
            return back()->with('error', 'User not updated.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return back()->with('success', 'User deleted successfully.');
    }
}
