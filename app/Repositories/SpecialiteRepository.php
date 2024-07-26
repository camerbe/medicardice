<?php

namespace App\Repositories;

use App\Http\Resources\SpecialiteResource;
use App\Models\Specialite;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class SpecialiteRepository extends BaseRepository
{

    public function __construct(Specialite $specialite)
    {
        $this->model=$specialite;

    }

    public function findById($id)
    {
       return SpecialiteResource::collection(parent::findById($id));
    }

    public function delete($id)
    {
        return parent::delete($id);
    }

    public function update(array $input, $id)
    {
        return parent::update($input, $id);
    }

    public function create(array $input)
    {
        return parent::create($input);
    }
    public function findAll(){
        return SpecialiteResource::collection(Specialite::all());
    }

}
