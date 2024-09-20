<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerificationApiController extends Controller
{

    //

    public function verify(Request $request){


        $userID=$request['id'];
        $user=User::find($userID);
        if(is_null($user->email_verified_at)){
            $user->email_verified_at =now();
            foreach ($user->roles as $perm){

                if($perm->role==='Patient'){
                    $user->password_changed_at=now();
                }
            }
            $user->save();
            return response()->json([
                "msg"=>"Email verified."
            ],Response::HTTP_OK);
        }

        return response()->json([
            "msg"=>"Email already verified."
        ],Response::HTTP_OK);
    }
    public function resend(Request $request){
        if($request->user()->hasVerifiedEmail()){
            return response()->json([
                "msg"=>"Email already verified."
            ],Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        $request->user()->sendEmailVerificationNotification();
        return response()->json([
            "msg"=>"The notification has been resubmitted"
        ],Response::HTTP_OK);
    }
}
