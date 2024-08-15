<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Holter;
use App\Repositories\HolterRepository;
use Illuminate\Http\Request;
use Stevebauman\Hypertext\Transformer;
use Symfony\Component\HttpFoundation\Response;

class HolterController extends Controller
{
    protected $holterRepository;
    protected $transformer;
    protected $lastHolter;

    /**
     * @param $holterRepository
     */
    public function __construct(HolterRepository $holterRepository)
    {
        $this->holterRepository = $holterRepository;
        $this->transformer = new Transformer();
        $this->lastHolter=Holter::last();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $holters=$this->holterRepository->findAll();
        if ($holters){
            return response()->json([
                'success'=>true,
                'data'=>$holters,
                'message'=>"Liste des holters"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de holter trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $holter=$this->holterRepository->create($request->all());
        if($request->hasFile('photo')){

            $holter->addMediaFromRequest('photo')
                ->usingName($holter->holter_titre_fr)
                ->toMediaCollection('holter');
        }
        if ($holter){
            return response()->json([
                'success'=>true,
                'data'=>$holter,
                'message'=>"holter inséré",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'un holter"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $holter=$this->holterRepository->findById($id);
        //dd($user);
        if($holter){
            return response()->json([
                "success"=>true,
                "data"=>$holter,
                "photo"=>$holter->getFirstMediaUrl(),
                "message"=>"Holter trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Holter inexistant"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $excludedPhoto = $request->input('photo');
        $requestData = $request->except('photo');
        $holter=$this->holterRepository->update($requestData,$id);
        //$request->merge(['photo' => $excludedPhoto]);
        //dd($excludedPhoto);
        $holter=$this->holterRepository->findById($id);
        if($request->hasFile('photo')){
            $holter->addMediaFromRequest('photo')
                ->usingName($holter->holter_titre_fr)
                ->toMediaCollection('holter');
        }
        if ($holter){
            return response()->json([
                'success'=>true,
                'data'=>$holter,
                'message'=>"Holter mis à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'un holter"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $holter=$this->holterRepository->delete($id);
        if($holter>0){
            return response()->json([
                "success"=>true,
                "message"=>"Suppression réussie"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Une erreur s'est produite..."
        ],Response::HTTP_NOT_FOUND);
    }

    public function getHolterBySlug($slug){
        $holter=$this->holterRepository->findBySlug($slug);
        if($holter->count()>0){

            return response()->json([
                "success"=>true,
                "data"=>$holter,
                "photo"=>$holter->getFirstMediaUrl(),
                "message"=>"Holter trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Holter inexistant"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getLastHolterBySlug(){
        return $this->show($this->lastHolter->id);
    }
}
