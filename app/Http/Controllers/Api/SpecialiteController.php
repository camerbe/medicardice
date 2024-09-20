<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\SpecialiteRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SpecialiteController extends Controller
{
    protected $specialiteRepository;

    /**
     * @param $specialiteRepository
     */
    public function __construct(SpecialiteRepository $specialiteRepository)
    {
        $this->specialiteRepository = $specialiteRepository;
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $specialites=$this->specialiteRepository->findAll();
        if ($specialites){
            return response()->json([
                'success'=>true,
                'data'=>$specialites,
                'message'=>"Liste des spécialités"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de spécialité trouvée"
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
}
