<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Electrocardiographie;
use App\Repositories\ElectrocardiographieRepository;
use Illuminate\Http\Request;
use Stevebauman\Hypertext\Transformer;
use Symfony\Component\HttpFoundation\Response;

class ElectrocardiographieController extends Controller
{
    protected $electrocardiographieRepository;
    protected $transformer;
    protected $lastElectrocardiographie;

    /**
     * @param $electrocardiographieRepository
     */
    public function __construct(ElectrocardiographieRepository $electrocardiographieRepository)
    {
        $this->electrocardiographieRepository = $electrocardiographieRepository;
        $this->transformer = new Transformer();
        $this->lastElectrocardiographie=Electrocardiographie::last();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $electrocardiographies=$this->electrocardiographieRepository->findAll();
        if ($electrocardiographies){
            return response()->json([
                'success'=>true,
                'data'=>$electrocardiographies,
                'message'=>"Liste des électrocardiographies"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de électrocardiographie trouvée"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $electrocardiographie=$this->electrocardiographieRepository->create($request->all());
        if($request->hasFile('photo')){

            $electrocardiographie->addMediaFromRequest('photo')
                ->usingName($electrocardiographie->electrocardiography_titre_fr)
                ->toMediaCollection('electrocardiographie');
        }
        if ($electrocardiographie){
            return response()->json([
                'success'=>true,
                'data'=>$electrocardiographie,
                'message'=>"électrocardiographie insérée",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'une électrocardiographie"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $electrocardiographie=$this->electrocardiographieRepository->findById($id);
        //dd($user);
        if($electrocardiographie){
            return response()->json([
                "success"=>true,
                "data"=>$electrocardiographie,
                "photo"=>$electrocardiographie->getFirstMediaUrl(),
                "message"=>"électrocardiographie trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"électrocardiographie inexistante"
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
        $electrocardiographie=$this->electrocardiographieRepository->update($requestData,$id);
        //$request->merge(['photo' => $excludedPhoto]);
        //dd($excludedPhoto);
        $electrocardiographie=$this->electrocardiographieRepository->findById($id);
        if($request->hasFile('photo')){
            $electrocardiographie->addMediaFromRequest('photo')
                ->usingName($electrocardiographie->electrocardiography_titre_fr)
                ->toMediaCollection('electrocardiographie');
        }
        if ($electrocardiographie){
            return response()->json([
                'success'=>true,
                'data'=>$electrocardiographie,
                'message'=>"Electrocardiographie mise à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'une Electrocardiographie"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $electrocardiographie=$this->electrocardiographieRepository->delete($id);
        if($electrocardiographie>0){
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

    public function getElectrocardiographieBySlug($slug){
        $electrocardiographie=$this->electrocardiographieRepository->findBySlug($slug);
        if($electrocardiographie->count()>0){

            return response()->json([
                "success"=>true,
                "data"=>$electrocardiographie,
                "photo"=>$electrocardiographie->getFirstMediaUrl(),
                "message"=>"Electrocardiographie trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Electrocardiographie inexistante"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getLastElectrocardiographieBySlug(){
        return $this->show($this->lastElectrocardiographie->id);
    }
}
