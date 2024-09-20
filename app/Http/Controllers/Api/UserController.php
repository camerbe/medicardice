<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestUser;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    protected $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository=$userRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $users=$this->userRepository->findAll();
        if ($users){
            return response()->json([
                'success'=>true,
                'data'=>$users,
                'message'=>"Liste des Administrateurs"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas d'administrateur trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(RequestUser $request){
        //dd('store');
        //
        $user=$this->userRepository->create($request->all());

        if ($user){
            return response()->json([
                'success'=>true,
                'data'=>$user,
                'message'=>"Administrateur inséré",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'un administration"
        ],Response::HTTP_NOT_FOUND);
    }

    public function register(RequestUser $request)
    {
        //dd('toto');
        //
        $user=$this->userRepository->create($request->all());

        if ($user){
            return response()->json([
                'success'=>true,
                'data'=>$user,
                'message'=>"Administrateur inséré",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'un administration"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $user=$this->userRepository->findWithId($id);
        //dd($user);
        if($user){
            return response()->json([
                "success"=>true,
                "data"=>$user,
                "message"=>"Administrateur trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"administrateur inexistant"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $user=$this->userRepository->update($request->all(),$id);

        if ($user){
            return response()->json([
                'success'=>true,
                'data'=>$user,
                'message'=>"Patient mis à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'un patient"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $user=$this->userRepository->delete($id);
        if($user>0){
            return response()->json([
                "success"=>true,
                "message"=>"Suppression réussie"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Une erreur s'est produite..."
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){

        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)){
            $user = Auth::user();
            if( is_null($user->password_changed_at) ){
                return response()->json([
                    'success'=>false,
                    'user' => $user,
                    'message' => 'change_password'
                ],Response::HTTP_UNAUTHORIZED);
            }
            if( is_null($user->email_verified_at) ){
                return response()->json([
                    'success'=>false,
                    'user' => $user,
                    'message' => 'verify_mail'
                ],Response::HTTP_UNAUTHORIZED);
            }
            return response()->json([
                'success'=>true,
                'token'=>$user->createToken('user',['*'],now()->addMinute(15))->plainTextToken
            ],Response::HTTP_OK);
        }
        return response()->json([
            'success'=>false,
            'message'=>"Login failed"
        ],Response::HTTP_UNAUTHORIZED);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changePassword(Request $request, int $id): JsonResponse
    {

        $user = User::find($id);
        //dd($user);
        if(is_null($user->password_changed_at)){
            $user->password = bcrypt($request->password);
            $user->password_changed_at = now();
            $user->email_verified_at = now();
            $user->save();

            return response()->json([
                'success'=>true,
                'message' => 'Le mot de passe a été changé avec succès'
            ],Response::HTTP_OK);
        }
        return response()->json([
            'success'=>false,
            'message' => 'La mise à jour a déjà été faite'
        ],Response::HTTP_NOT_MODIFIED);
    }






}
