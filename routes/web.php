<?php

use App\Http\Controllers\AngularController;
use App\Http\Controllers\AngularSSRController;
use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;
use Symfony\Component\Process\Process;

/*Route::get('/', function () {
    return view('welcome');
});

Route::group(['prefix' => 'laravel-filemanager', 'middleware' => ['web']], function () {
    \UniSharp\LaravelFilemanager\Lfm::routes();
});
Route::any('/any',[AngularController::class,'index'])
    ->where('any','^(?!api).*$');*/
/*
Route::get('/{any}', function () {
    return view('angular');
})->where('any', '^(?!api).*$');*/

Route::get('/{any}', function () {
    //return view('angular');
    return File::get(public_path('angular/index.html'));
})->where('any', '^(?!api).*$');



/*
Route::get('/{any}', function (Request $request) {
    $process = new Process(['node', base_path('angular-ssr/main.server.mjs')]);
    $process->setEnv(['REQUEST_URI' => $request->getRequestUri()]);
    $process->run();

    if (!$process->isSuccessful()) {
        throw new \RuntimeException($process->getErrorOutput());
    }

    return $process->getOutput();
})->where('any', '^(?!api).*$');
*/
Route::get('/sitemap.xml', function() {
    return response()->file(public_path('sitemap.xml'));
});



