<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{
    /**
     * Use resource into an array.
     *
     * @property User $resource
     */

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->resource->id,
            'prenom'=>$this->first_name,
            'nom'=>$this->last_name,
            'tel'=>$this->phone_number ,
            'user_id'=>$this->user_id,
            'dob'=>$this->dob,
            'created_by'=>$this->created_by,
            'updated_by'=>$this->updated_by,
            'user'=>new UserResource($this->user),

        ];
    }
}
