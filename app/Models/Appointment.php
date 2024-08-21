<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Appointment extends Model
{
    use HasFactory;

    protected static function boot(){
        parent::boot();
        Appointment::created(function($model){
            $slot=Slot::find($model->slot_id);
            $slot->status='Reserved';
            $slot->save;
        });
        Appointment::deleted(function($model){

        });
        Appointment::updated(function($model){
            if($model->status=='Canceled'){
                $slot=Slot::find($model->slot_id);
                $slot->status='Available';
                $slot->save;
            }

        });
    }
}
