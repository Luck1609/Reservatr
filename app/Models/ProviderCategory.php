<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Sluggable\Attributes\Sluggable;

#[Sluggable(from: 'name', to: 'slug')]
class ProviderCategory extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
        'description',
        'provider_profile_id',
        'slug',
    ];

    /** @return HasMany<Service, $this> */
    public function services(): HasMany
    {
        return $this->hasMany(Service::class, 'category_id');
    }
}
