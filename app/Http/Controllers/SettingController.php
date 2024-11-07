<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('Settings/Index', compact('users'));
    }
}
