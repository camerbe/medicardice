<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DoctorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->resource->id,
            'first_name'=>$this->first_name,
            'last_name'=>$this->last_name,
            'user_id'=>$this->user_id,
            'specialite_id'=>$this->specialite_id,
            'created_by'=>$this->created_by,
            'updated_by'=>$this->updated_by,
            'phone_number'=>$this->phone_number,
            'user'=>new UserResource($this->user),
            'specialite'=>new SpecialiteResource($this->specialite),

        ];
    }
}
