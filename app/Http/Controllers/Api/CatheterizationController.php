<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Catheterization;
use App\Repositories\CatheterizationRepository;
use Illuminate\Http\Request;
use Stevebauman\Hypertext\Transformer;
use Symfony\Component\HttpFoundation\Response;

class CatheterizationController extends Controller
{
    protected $catheterizationRepository;
    protected $transformer;
    protected $lastCatheterization;

    /**
     * @param $catheterizationRepository
     */
    public function __construct(CatheterizationRepository $catheterizationRepository)
    {
        $this->catheterizationRepository = $catheterizationRepository;
        $this->transformer = new Transformer();
        $this->lastCatheterization = Catheterization::last();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $catheterization=$this->catheterizationRepository->findAll();
        if ($catheterization){
            return response()->json([
                'success'=>true,
                'data'=>$catheterization,
                'message'=>"Liste des catheterizations"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de catheterization trouvée"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $catheterization=$this->catheterizationRepository->create($request->all());
        if($request->hasFile('photo')){

            $catheterization->addMediaFromRequest('photo')
                ->usingName($catheterization->catheterization_titre_fr)
                ->toMediaCollection('catheterization');
        }
        if ($catheterization){
            return response()->json([
                'success'=>true,
                'data'=>$catheterization,
                'message'=>"catheterization insérée",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'une catheterization"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $catheterization=$this->catheterizationRepository->findById($id);
        //dd($user);
        if($catheterization){
            return response()->json([
                "success"=>true,
                "data"=>$catheterization,
                "photo"=>$catheterization->getFirstMediaUrl(),
                "message"=>"catheterization trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"catheterization inexistante"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //
        $excludedPhoto = $request->input('photo');
        $requestData = $request->except('photo');
        $catheterization=$this->catheterizationRepository->update($requestData,$id);
        //$request->merge(['photo' => $excludedPhoto]);
        //dd($excludedPhoto);
        $catheterization=$this->catheterizationRepository->findById($id);
        if($request->hasFile('photo')){
            $catheterization->addMediaFromRequest('photo')
                ->usingName($catheterization->catheterization_titre_fr)
                ->toMediaCollection('catheterization');
        }
        if ($catheterization){
            return response()->json([
                'success'=>true,
                'data'=>$catheterization,
                'message'=>"catheterization mise à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'une catheterization"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $catheterization=$this->catheterizationRepository->delete($id);
        if($catheterization>0){
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

    public function getCatheterizationBySlug($slug){
        $catheterization=$this->catheterizationRepository->findBySlug($slug);
        if($catheterization->count()>0){
            return response()->json([
                "success"=>true,
                "data"=>$catheterization,
                "photo"=>$catheterization->getFirstMediaUrl(),
                "message"=>"catheterization trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"catheterization inexistante"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getLastCatheterizationBySlug(){
        return $this->show($this->lastCatheterization->id);
    }
}
