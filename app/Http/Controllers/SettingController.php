<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class SettingController extends Controller
{
    public function index()
    {
        $users = User::all();
        $permisos = Permission::orderBy('name')->get();
        return Inertia::render('Settings/Index', compact('users', 'permisos'));
    }
}
