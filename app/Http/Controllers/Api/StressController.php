<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Stress;
use App\Repositories\StressRepository;
use Illuminate\Http\Request;
use Stevebauman\Hypertext\Transformer;
use Symfony\Component\HttpFoundation\Response;

class StressController extends Controller
{
    protected $stressRepository;
    protected $transformer;
    protected $lastStress;

    /**
     * @param $stressRepository
     */
    public function __construct(StressRepository $stressRepository)
    {
        $this->stressRepository = $stressRepository;
        $this->transformer = new Transformer();
        $this->lastStress = Stress::last();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $stress=$this->stressRepository->findAll();
        if ($stress){
            return response()->json([
                'success'=>true,
                'data'=>$stress,
                'message'=>"Liste des stress"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de stress trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $stress=$this->stressRepository->create($request->all());
        if($request->hasFile('photo')){

            $stress->addMediaFromRequest('photo')
                ->usingName($stress->stress_titre_fr)
                ->toMediaCollection('stress');
        }
        if ($stress){
            return response()->json([
                'success'=>true,
                'data'=>$stress,
                'message'=>"stress inséré",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'un stress"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $stress=$this->stressRepository->findById($id);
        //dd($user);
        if($stress){
            return response()->json([
                "success"=>true,
                "data"=>$stress,
                "photo"=>$stress->getFirstMediaUrl(),
                "message"=>"stress trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"stress inexistant"
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
        $stress=$this->stressRepository->update($requestData,$id);
        //$request->merge(['photo' => $excludedPhoto]);
        //dd($excludedPhoto);
        $stress=$this->stressRepository->findById($id);
        if($request->hasFile('photo')){
            $stress->addMediaFromRequest('photo')
                ->usingName($stress->stress_titre_fr)
                ->toMediaCollection('stress');
        }
        if ($stress){
            return response()->json([
                'success'=>true,
                'data'=>$stress,
                'message'=>"Stress mis à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'un stress"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $stress=$this->stressRepository->delete($id);
        if($stress>0){
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

    public function getStressBySlug($slug){
        $stress=$this->stressRepository->findBySlug($slug);
        if($stress->count()>0){

            return response()->json([
                "success"=>true,
                "data"=>$stress,
                "photo"=>$stress->getFirstMediaUrl(),
                "message"=>"Stress trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Stress inexistant"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getLastStressBySlug(){
        return $this->show($this->lastStress->id);
    }
}
