<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Process;

class AngularSSRController extends Controller
{
    //
    public function index(Request $request){
        $nodeProcess=new Process([
            'node', base_path('angular-ssr/main.server.mjs')
        ]);
        $nodeProcess->run();
        if (!$nodeProcess->isSuccessful()) {
            throw new \RuntimeException($nodeProcess->getErrorOutput());
        }

        $output = $nodeProcess->getOutput();
        return response($output);
    }
}
