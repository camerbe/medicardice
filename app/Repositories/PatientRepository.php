<?php

namespace App\Repositories;

use App\Http\Resources\PatientResource;
use App\Models\Patient;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class PatientRepository extends BaseRepository
{
    protected $userRepository;
    public function __construct(Patient $patient)
    {
        $this->model=$patient;

    }

    public function findById($id)
    {
        $patient=Patient::with(['user'])
            ->where('id',$id)
            ->get();
        //$patient= parent::findById($id); // TODO: Change the autogenerated stub
        return PatientResource::collection($patient);
    }

    public function delete($id)
    {
        return parent::delete($id); // TODO: Change the autogenerated stub
    }

    public function update(array $input, $id)
    {
        $currentPatient=$this->findById($id)->first();
        $input['first_name']=isset($input['first_name'])? Str::title($input['first_name']):$currentPatient->user->first_name;
        $input['last_name']=isset($input['last_name'])? Str::upper($input['last_name']):$currentPatient->user->last_name;
        $input['phone_number']=isset($input['phone_number'])? $input["tel"]:$currentPatient->phone_number;
        $input['email']=isset($input['email'])? $input["email"]:$currentPatient->user->email;
        $input['user_id']=isset($input['user_id'])? $input["user_id"]:$currentPatient->user_id;
        $input['dob']=isset($input['dob']) ? Carbon::parse($input['dob'])->format('Y-m-d'):$currentPatient->dob;

        $user=User::where('email',$input['email'])->first();
        $user->first_name=$input['first_name'];
        $user->last_name=$input['last_name'];
        $user->save();

        $input['updated_by']=$input['first_name'].' '. $input['last_name'];
        unset($input['first_name']);
        unset($input['last_name']);
        unset($input['email']);
        return parent::update($input, $id); // TODO: Change the autogenerated stub
    }

    public function create(array $input)
    {
        //dd('create');
        $input['first_name']=Str::title($input['first_name']);
        $input['last_name']=Str::upper($input['last_name']);
        $input['password']=bcrypt($input['password']);
        $password=$input['password'];
        $input['dob']=Carbon::parse($input['dob'])->format('Y-m-d');
        $roleName= $input['role'] ?? 'Patient';

        $user = User::create([
            'first_name'=>$input['first_name'],
            'last_name'=>$input['last_name'],
            'password'=>$input['password'],
            'email'=>$input['email'],
        ]);

        $user->sendApiEmailVerificationNotification();
        $role=Role::where('role',$roleName)->first();
        $user->roles()->attach($role->id);
        //$user= parent::create($input); // TODO: Change the autogenerated stub
        //$user->sendApiEmailVerificationNotification();
        $input['user_id']=$user->id;
        unset($input['password']);
        unset($input['first_name']);
        unset($input['last_name']);
        unset($input['email']);
        $input['created_by']=$user->first_name.' '.$user->last_name;
        $input['updated_by']=$input['created_by'];
        return parent::create($input);
    }
    public function findAll(){
        $patients= Patient::with('user')
            /*->orderBy('first_name')
            ->orderBy('last_name')*/
            ->get();
        return PatientResource::collection($patients);
    }

}