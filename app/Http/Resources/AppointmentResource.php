<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'slot'=>new SlotResource($this->slot),
            'patient'=>new PatientResource($this->patient),
            'doctor'=>new DoctorResource($this->doctor),
            'appointment_date'=>$this->appointment_date,
            'status'=>$this->status,


        ];
    }
}
