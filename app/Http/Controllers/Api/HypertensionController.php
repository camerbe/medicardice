<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Hypertension;
use App\Repositories\HypertensionRepository;
use Illuminate\Http\Request;
use Stevebauman\Hypertext\Transformer;
use Symfony\Component\HttpFoundation\Response;

class HypertensionController extends Controller
{
    protected $hypertensionRepository;
    protected $transformer;
    protected $lastHypertension;

    /**
     * @param $hypertensionRepository
     * @param $transformer
     * @param $lastHypertension
     */
    public function __construct(HypertensionRepository $hypertensionRepository)
    {
        $this->hypertensionRepository = $hypertensionRepository;
        $this->transformer = new Transformer();
        $this->lastHypertension = Hypertension::last();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $hypertension=$this->hypertensionRepository->findAll();
        if ($hypertension){
            return response()->json([
                'success'=>true,
                'data'=>$hypertension,
                'message'=>"Liste des hypertensions"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas d'hypertension trouvée"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $hypertension=$this->hypertensionRepository->create($request->all());
        if($request->hasFile('photo')){
            $hypertension->addMediaFromRequest('photo')
                ->usingName($hypertension->hypertension_titre_fr)
                ->toMediaCollection('hypertension');
        }
        if ($hypertension){
            return response()->json([
                'success'=>true,
                'data'=>$hypertension,
                'message'=>"hypertension insérée",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'une hypertension"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $hypertension=$this->hypertensionRepository->findById($id);
        //dd($user);
        if($hypertension){
            return response()->json([
                "success"=>true,
                "data"=>$hypertension,
                "photo"=>$hypertension->getFirstMediaUrl(),
                "message"=>"hypertension trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"hypertension inexistante"
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
        $hypertension=$this->hypertensionRepository->update($requestData,$id);
        $request->merge(['photo' => $excludedPhoto]);
        //dd($excludedPhoto);
        $hypertension=$this->hypertensionRepository->findById($id);
        if($request->hasFile('photo')){
            $hypertension->clearMediaCollection('hypertension');
            $hypertension->addMediaFromRequest('photo')
                ->usingName($hypertension->hypertension_titre_fr)
                ->toMediaCollection('hypertension');
        }
        if ($hypertension){
            return response()->json([
                'success'=>true,
                'data'=>$hypertension,
                'message'=>"hypertension mise à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'une hypertension"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $hypertension=$this->hypertensionRepository->delete($id);
        if($hypertension>0){
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
    public function getHypertensionBySlug($slug){
        $hypertension=$this->hypertensionRepository->findBySlug($slug);
        if($hypertension->count()>0){
            return response()->json([
                "success"=>true,
                "data"=>$hypertension,
                "photo"=>$hypertension->getFirstMediaUrl(),
                "message"=>"hypertension trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"hypertension inexistante"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getLastHypertensionBySlug(){
        return $this->show($this->lastHypertension->id);
    }
}
