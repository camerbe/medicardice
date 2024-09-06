<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Slot extends Model
{
    use HasFactory;

    protected $fillable = [
        'start',
        'end',
        'status',
        'created_by',
        'updated_by',
        'doctor_id',
    ];
    public function appointments():HasMany{
        return $this->hasMany(Appointment::class);
    }
    public function doctor():BelongsTo{
        return $this->belongsTo(User::class);
    }
}
