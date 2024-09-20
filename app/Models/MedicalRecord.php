<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MedicalRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'patient_id',
        'doctor_id',
        'visit_date',
        'notes',
        'prescriptions',
        'created_by',
        'updated_by',

    ];
    public static function last(){
        return static::all()->last();
    }
    public function patient():BelongsTo{
        return $this->belongsTo(Patient::class);
    }
    public function doctor():BelongsTo{
        return $this->belongsTo(Doctor::class);
    }
}
