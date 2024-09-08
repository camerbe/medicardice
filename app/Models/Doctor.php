<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Doctor extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'first_name',
        'last_name',
        'specialite_id',
        'phone_number',
        'created_by',
        'updated_by',
        'user_id',
        'email',
        'password',
    ];
    public function user():BelongsTo{
        return $this->belongsTo(User::class);
    }
    public function specialite():BelongsTo{
        return $this->belongsTo(Specialite::class);
    }
    public function slots():HasMany{
        return $this->hasMany(Slot::class);
    }
    public function appointments():HasMany{
        return $this->hasMany(Appointment::class);
    }
}
