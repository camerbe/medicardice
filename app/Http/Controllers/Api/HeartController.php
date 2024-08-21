<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Heart;
use App\Repositories\HeartRepository;
use Illuminate\Http\Request;
use Stevebauman\Hypertext\Transformer;
use Symfony\Component\HttpFoundation\Response;

class HeartController extends Controller
{
    protected $heartRepository;
    protected $transformer;
    protected $lastHeart;

    /**
     * @param $heartRepository
     * @param $transformer
     * @param $lastHeart
     */
    public function __construct(HeartRepository $heartRepository)
    {
        $this->heartRepository = $heartRepository;
        $this->transformer = new Transformer();
        $this->lastHeart = Heart::last();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $hearts=$this->heartRepository->findAll();
        if ($hearts){
            return response()->json([
                'success'=>true,
                'data'=>$hearts,
                'message'=>"Liste des hearts"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de hearts trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $heart=$this->heartRepository->create($request->all());
        if($request->hasFile('photo')){

            $heart->addMediaFromRequest('photo')
                ->usingName($heart->heart_titre_fr)
                ->toMediaCollection('heart');
        }
        if ($heart){
            return response()->json([
                'success'=>true,
                'data'=>$heart,
                'message'=>"hearts inséré",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'un heart"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $heart=$this->heartRepository->findById($id);
        //dd($user);
        if($heart){
            return response()->json([
                "success"=>true,
                "data"=>$heart,
                "photo"=>$heart->getFirstMediaUrl(),
                "message"=>"Heart trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Heart inexistant"
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
        $heart=$this->heartRepository->update($requestData,$id);
        $request->merge(['photo' => $excludedPhoto]);
        //dd($excludedPhoto);
        $heart=$this->heartRepository->findById($id);
        if($request->hasFile('photo')){
            $heart->clearMediaCollection('heart');
            $heart->addMediaFromRequest('photo')
                ->usingName($heart->heart_titre_fr)
                ->toMediaCollection('heart');
        }
        if ($heart){
            return response()->json([
                'success'=>true,
                'data'=>$heart,
                'message'=>"Heart mis à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'un heart"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $heart=$this->heartRepository->delete($id);
        if($heart>0){
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
    public function getHeartBySlug($slug){
        $heart=$this->heartRepository->findBySlug($slug);
        if($heart->count()>0){

            return response()->json([
                "success"=>true,
                "data"=>$heart,
                "photo"=>$heart->getFirstMediaUrl(),
                "message"=>"Heart trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Holter inexistant"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getLastHeartBySlug(){
        return $this->show($this->lastHeart->id);
    }
}
