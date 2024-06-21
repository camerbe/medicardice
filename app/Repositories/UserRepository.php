<?php

namespace App\Repositories;

use Illuminate\Support\Str;

class UserRepository extends BaseRepository
{

    public function __construct(User $user)
    {
        $this->model=$user;
    }

    public function findById($id)
    {
        return parent::findById($id); // TODO: Change the autogenerated stub
    }

    public function delete($id)
    {
        return parent::delete($id); // TODO: Change the autogenerated stub
    }

    public function update(array $input, $id)
    {
        return parent::update($input, $id); // TODO: Change the autogenerated stub
    }

    public function create(array $input)
    {
        $input['first_name']=Str::title($input['first_name']);
        $input['last_name']=Str::upper($input['last_name']);
        $input['password']=bcrypt($input['password']);
        return parent::create($input); // TODO: Change the autogenerated stub
    }

}
