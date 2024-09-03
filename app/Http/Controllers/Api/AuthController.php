<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
//class AuthController extends Controller implements HasMiddleware
{

    /*public function __construct()
    {
        $this->middleware('auth:api',['except'=>['login']]);
    }*/

    public static function middleware(): array
    {
        return [
             new Middleware('auth:sanctum', except: ['login']),
        ];
    }
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request):JsonResponse{
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        $credentials = $request->only(['email', 'password']);
        $user = User::where('email', $request->email)->first();
        if ($user && Hash::check($request->password, $user->password)){
            Auth::guard('web')->login($user);
            $usrs=User::with('roles')
                ->where('id',Auth::guard('web')->user()->id)
                ->get();

            /****************************************************
             *
             */
            if( is_null(Auth::guard('web')->user()->password_changed_at) ){
                return response()->json([
                    'success'=>false,
                    'user' => $user,
                    'token'=>null,
                    'message' => 'change_password'
                ],Response::HTTP_UNAUTHORIZED);
            }
            if( is_null(Auth::guard('web')->user()->email_verified_at) ){
                return response()->json([
                    'success'=>false,
                    'user' => $user,
                    'token'=>null,
                    'message' => 'verify_mail'
                ],Response::HTTP_UNAUTHORIZED);
            }


            if(!is_null(Auth::guard('web')->user()->email_verified_at) && !is_null(Auth::guard('web')->user()->password_changed_at)){
                //$request->session()->regenerate();
                $token=Auth::guard('web')->user()->createToken('user',['*'],Carbon::now()->addMinute(30))->plainTextToken;
                $varArray=explode("|",$token);
                $id=$varArray[0];
                $personalAccessTokens= DB::table('personal_access_tokens')->where('id', $id)->first();
                /*$roles=$user->roles;*/
                $poste=null;
                foreach ($usrs as $usr){
                    foreach ($usr->roles as $rol){
                        $poste=$rol->role;
                    }
                }
                return response()->json([
                    'success'=>true,
                    'user'=>$user,
                    'token'=>$token,
                    'expires_at'=>$personalAccessTokens->expires_at,
                    'role'=>$poste,
                    'message'=>"Login OK"
                ],Response::HTTP_OK);


            }
        }
        return response()->json([
            'success'=>false,
            'user' => null,
            'token'=>null,
            'message'=>"Login failed"
        ],Response::HTTP_UNAUTHORIZED);
        /*
        if(!Auth::guard('web')->attempt($credentials)){
            return response()->json([
                'success'=>false,
                'user' => null,
                'token'=>null,
                'message'=>"Login failed"
            ],Response::HTTP_UNAUTHORIZED);
        }

        $userId=Auth::id();
        $user=User::with('roles')
                    ->where('id',$userId)
                    ->get();
        if(!is_null(Auth::user()->email_verified_at) && !is_null(Auth::user()->password_changed_at)){
            $token=Auth::user()->createToken('user',['*'],Carbon::now()->addMinute(15))->plainTextToken;
            $varArray=explode("|",$token);
            $id=$varArray[0];
            $personalAccessTokens= DB::table('personal_access_tokens')->where('id', $id)->first();

            $poste=null;
            foreach ($user as $usr){
                foreach ($usr->roles as $rol){
                    $poste=$rol->role;
                }
            }
            return response()->json([

                'success'=>true,
                'user'=>$user,
                'token'=>$token,
                'expires_at'=>$personalAccessTokens->expires_at,
                'role'=>$poste,
                'message'=>"Login OK"
            ],Response::HTTP_OK);

        }

        if( is_null(Auth::user()->password_changed_at) ){
            return response()->json([
                'success'=>false,
                'user' => $user,
                'token'=>null,
                'message' => 'change_password'
            ],Response::HTTP_UNAUTHORIZED);
        }
        return response()->json([
            'success'=>false,
            'user' => $user,
            'token'=>null,
            'message' => 'verify_mail'
        ],Response::HTTP_UNAUTHORIZED);*/

    }
    public function profile(): JsonResponse
    {
        $user=auth()->user();
        $roles=$user->roles;
        $poste=null;
        foreach ($roles as $role){
            $poste=$role->role;
        }
        return response()->json([
            'success'=>true,
            'id'=>$user->id,
            'profile'=>$user->last_name. ' '. $user->first_name,
            'email'=>$user->email,
            'role'=>$poste
        ],Response::HTTP_OK);
    }
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return \response()->json([
            "success"=>true,
            "message"=>"Logout ok"
        ],Response::HTTP_OK);
    }



}
