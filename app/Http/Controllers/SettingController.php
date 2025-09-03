<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\TicketType;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class SettingController extends Controller
{
    public function index()
    {
        $users = User::with('permissions')->get();
        $permisos = Permission::orderBy('name')->get();
        $ticketTypes = TicketType::with('services')->get();
        $services = Service::select('id', 'title')->get();
        
        return Inertia::render('Settings/Index', compact('users', 'permisos', 'ticketTypes', 'services'));
    }
}
