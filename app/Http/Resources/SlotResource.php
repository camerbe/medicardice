<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SlotResource extends JsonResource
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
            'start'=>$this->start,
            'created_by'=>$this->created_by,
            'updated_by'=>$this->updated_by,
            'doctor'=>new DoctorResource($this->whenLoaded('doctor')),



        ];
    }
}
