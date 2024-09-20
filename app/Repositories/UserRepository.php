<?php

namespace App\Repositories;

use App\Http\Resources\UserResource;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class UserRepository extends BaseRepository
{

    public function __construct(User $user)
    {
        $this->model=$user;
    }
    public function findWithId($id){
        $user=User::with(['roles','patients'])
            ->where('id',$id)
            ->orderBy('first_name')
            ->orderBy('last_name')
            ->get();

        return UserResource::collection($user);

    }
    public function findById($id)
    {
        return parent::findById($id);

    }

    public function delete($id)
    {
        Patient::where('user_id',$id)->delete();
        Doctor::where('user_id',$id)->delete();

        return parent::delete($id);
    }

    public function update(array $input, $id)
    {
        $currentUser=$this->findById($id)->first();
        $input['first_name']=isset($input['first_name'])? Str::title($input['first_name']):$currentUser->user->first_name;
        $input['last_name']=isset($input['last_name'])? Str::upper($input['last_name']):$currentUser->user->last_name;
        $input['email']=isset($input['email'])? $input["email"]:$currentUser->user->email;

        $role=Role::where('role',$input['role'])->first();
        $user=User::find($id);
        $user->roles()->sync($role->id);

        return parent::update($input, $id); // TODO: Change the autogenerated stub
    }

    public function create(array $input)
    {
        //dd($input);
        $input['first_name']=Str::title($input['first_name']);
        $input['last_name']=Str::upper($input['last_name']);
        $password=$input['password'] ?? '123456';
        $input['password']=bcrypt($password);
        $roleName= $input['role'] ?? 'Admin';
        $userID= parent::create($input)->id;
        $user=parent::findById($userID);
        //dd($user);
        $user->sendApiEmailVerificationNotification();
        $role=Role::where('role',$roleName)->first();
        $user->roles()->attach($role->id);
        unset($user);
        return User::with('roles')->where('id',$userID)->get();
        //return UserResource::collection($user);
        //$usr= User::find($userID)->with('roles')->get();
        //return new UserResource($user->roles);
        //return UserResource::collection($usr);
    }
    public function findAll(){
        $users= User::with(['roles','patients'])
                ->orderBy('last_name')
                ->orderBy('first_name')
                ->get();
        return UserResource::collection($users);
    }
    public function findDoctor($id){
        return $this->findById($id)->doctors->get();
    }
    public function findPatient($id){
        return $this->findById($id)->doctors->get();
    }

}
