<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return  [
            'id'=>$this->id,
            'prenom'=>$this->first_name,
            'nom'=>$this->last_name ,
            'email'=>$this->email,
            'roles'=>RoleResource::collection($this->whenLoaded('roles')),
           // 'roles'=>this->roles,
           // 'roles'=>RoleResource::Collection($this->roles)


        ];
    }
}
