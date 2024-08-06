<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Feature extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'name',
        'icon',
        'color'
    ];

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class);
    }
}
