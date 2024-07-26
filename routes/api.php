<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\SpecialiteController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\VerificationApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');*/
Route::post('users/register', [UserController::class, 'register']);
Route::put('users/changepassword/{changepassword}', [UserController::class, 'changePassword']);
Route::post('auth/login', [AuthController::class, 'login']);
//Route::post('users/login', [UserController::class, 'login']);
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('auth/profile', [AuthController::class, 'profile']);
    Route::post('auth/logout', [AuthController::class, 'logout']);

    Route::apiResources([
        "users"=> UserController::class,
        "patients"=> PatientController::class,
        "doctors"=> DoctorController::class,
        "specialites"=> SpecialiteController::class,
    ]);

});
/*Route::apiResources([
    "users"=> UserController::class,
    "patients"=> PatientController::class,
]);*/

Route::get('email/verify/{id}', [VerificationApiController::class,'verify'])
    ->name('verify');
Route::get('email/resend', [VerificationApiController::class,'resend'])
    ->name('resend');


