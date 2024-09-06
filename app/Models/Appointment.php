<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Cache;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'slot_id',
        'patient_id',
        'doctor_id',
        'appointment_date',
        'status',

    ];

    protected static function boot(){
        parent::boot();
        Appointment::created(function($model){
            $slot=Slot::find($model->slot_id);
            $slot->status='Reserved';
            $slot->save();

        });
        Appointment::deleting(function($model){
            $slot=Slot::find($model->slot_id);
            $slot->status='Available';
            $slot->save();
        });
        Appointment::deleted(function($model){

        });
        Appointment::updated(function($model){
            if($model->status=='Canceled'){
                $slot=Slot::find($model->slot_id);
                $slot->status='Available';
                $slot->save();
            }

        });
    }
    public function slot():BelongsTo{
        return $this->belongsTo(Slot::class);
    }
    public function patient():BelongsTo{
        return $this->belongsTo(Patient::class);
    }
    public function doctor():BelongsTo{
        return $this->belongsTo(Doctor::class);
    }
}
