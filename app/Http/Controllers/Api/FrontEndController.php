<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\FrontEndRepository;
use Illuminate\Http\Request;

class FrontEndController extends Controller
{
    //
    protected $frontendRepository;

    /**
     * @param $frontendRepository
     */
    public function __construct(FrontEndRepository $frontendRepository)
    {
        $this->frontendRepository = $frontendRepository;
    }



}
