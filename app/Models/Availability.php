<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Availability extends Model
{
    use HasFactory;
    use HasUuids;

    protected $guarded = [];

    public function horarios()
    {
        return $this->hasMany(Horario::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function precies()
    {
        return $this->hasMany(Precie::class);
    }
}
