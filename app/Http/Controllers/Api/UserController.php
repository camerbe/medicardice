<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestUser;
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
        $user=$this->userRepository->findById($id);
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
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
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
    public function changePassword(Request $request): JsonResponse
    {
        $user = Auth::user();
        $user->password = bcrypt($request->password);
        //$user->first_login = false; // Mettre à jour l'indicateur de première connexion
        $user->save();

        return response()->json([
            'success'=>true,
            'message' => 'Password changed successfully'
        ],Response::HTTP_OK);
    }






}
