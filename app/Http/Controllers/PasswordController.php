<?php

namespace App\Http\Controllers;

use App\Http\Requests\RequestPassword;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PasswordController extends Controller
{
    //
    public function forgot(Request $request){
        $email=$request->input('email');
        $token=Str::random(12);
        DB::table('password_reset_tokens')->insert([
            'email'=>$email,
            'token'=>$token
        ]);
        Mail::send('reset',['token'=>$token],function (Message $message) use($email){
            $message->subject('Réinitialiser votre mot de passe');
            $message->to($email);
        });
        return response()->json([
            "message"=>"vérifie ton email"
        ],Response::HTTP_OK);
    }
    public function reset(RequestPassword $request){
        $passwordRequest=DB::table('password_reset_tokens')
                ->where('token',$request->input('token'))->first();
        if(!$user=User::where('email',$passwordRequest)->first()){
            throw new NotFoundHttpException("User inexistant");
        }
        $user->password=bcrypt($request->input('password'));
        $user->save();
        return response()->json([
            "message"=>"Réinitialisation réussie"
        ],Response::HTTP_OK);
    }
}
