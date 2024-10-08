<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Echocardiographie;
use App\Repositories\EchocardiographieRepository;
use Illuminate\Http\Request;
use Stevebauman\Hypertext\Transformer;
use Symfony\Component\HttpFoundation\Response;

class EchocardiographieController extends Controller
{
    protected $echocardiographieRepository;
    protected $transformer;
    protected $lastEchocardiographie;

    /**
     * @param $echocardiographieRepository
     * @param $transformer
     * @param $lastEchocardiographie
     */
    public function __construct(EchocardiographieRepository $echocardiographieRepository)
    {
        $this->echocardiographieRepository = $echocardiographieRepository;
        $this->transformer = new Transformer();
        $this->lastEchocardiographie = Echocardiographie::last();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $echocardiographies=$this->echocardiographieRepository->findAll();
        if ($echocardiographies){
            return response()->json([
                'success'=>true,
                'data'=>$echocardiographies,
                'message'=>"Liste des échocardiographies"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de échocardiographie trouvée"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $echocardiographie=$this->echocardiographieRepository->create($request->all());
        if($request->hasFile('photo')){

            $echocardiographie->addMediaFromRequest('photo')
                ->withResponsiveImages()
                ->usingName($echocardiographie->echocardiography_titre_fr)
                ->toMediaCollection('echocardiographie');
        }
        if ($echocardiographie){
            return response()->json([
                'success'=>true,
                'data'=>$echocardiographie,
                'message'=>"échocardiographie insérée",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'une échocardiographie"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $echocardiographie=$this->echocardiographieRepository->findById($id);
        //dd($user);
        if($echocardiographie){
            return response()->json([
                "success"=>true,
                "data"=>$echocardiographie,
                "photo"=>$echocardiographie->getFirstMediaUrl(),
                "message"=>"échocardiographie trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"échocardiographie inexistante"
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
        $echocardiographie=$this->echocardiographieRepository->update($requestData,$id);
        $request->merge(['photo' => $excludedPhoto]);
        //dd($excludedPhoto);
        $echocardiographie=$this->echocardiographieRepository->findById($id);
        if($request->hasFile('photo')){
            $echocardiographie->clearMediaCollection('echocardiographie');
            $echocardiographie->addMediaFromRequest('photo')
                ->withResponsiveImages()
                ->usingName($echocardiographie->echocardiography_titre_fr)
                ->toMediaCollection('echocardiographie');
        }
        if ($echocardiographie){
            return response()->json([
                'success'=>true,
                'data'=>$echocardiographie,
                'message'=>"Electrocardiographie mise à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'une échocardiographie"
        ],Response::HTTP_NOT_FOUND);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $echocardiographie=$this->echocardiographieRepository->delete($id);
        if($echocardiographie>0){
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

    public function getEchocardiographieBySlug($slug){
        $echocardiographie=$this->echocardiographieRepository->findBySlug($slug);
        if($echocardiographie->count()>0){

            return response()->json([
                "success"=>true,
                "data"=>$echocardiographie,
                "photo"=>$echocardiographie->getFirstMediaUrl(),
                "message"=>"Electrocardiographie trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Echocardiographie inexistante"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getLastEchocardiographieBySlug(){
        return $this->show($this->lastEchocardiographie->id);
    }
}
