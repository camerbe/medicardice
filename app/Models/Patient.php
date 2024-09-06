<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Cache;

class Patient extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'dob',
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
    public function appointments():HasMany{
        return $this->hasMany(Appointment::class);
    }
    protected static function boot(){
        parent::boot();
        Patient::created(function($model){
            Cache::forget('patient-list');
            Cache::forget('patient-findBySlug');
        });
        Patient::deleted(function($model){
            Cache::forget('patient-list');
            Cache::forget('patient-findBySlug');
        });
        Patient::updated(function($model){
            Cache::forget('patient-list');
            Cache::forget('patient-findBySlug');
        });
    }
}
