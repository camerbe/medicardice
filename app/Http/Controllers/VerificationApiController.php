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
        $user->email_verified_at =now();
        $user->save();
        return response()->json([
            "msg"=>"Email verified."
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
