<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Specialite extends Model
{
    use HasFactory;
    protected $fillable = [
        'specialty_name',
        'description',

    ];
    public function doctors():HasMany{
        return $this->hasMany(Doctor::class);
    }
}
