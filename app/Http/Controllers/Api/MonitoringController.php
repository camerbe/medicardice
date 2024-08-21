<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Monitoring;
use App\Repositories\MonitoringRepository;
use Illuminate\Http\Request;
use Stevebauman\Hypertext\Transformer;
use Symfony\Component\HttpFoundation\Response;

class MonitoringController extends Controller
{
    protected $monitoringRepository;
    protected $transformer;
    protected $lastMonitoring;

    /**
     * @param $monitoringRepository
     */
    public function __construct(MonitoringRepository $monitoringRepository)
    {
        $this->monitoringRepository = $monitoringRepository;
        $this->transformer = new Transformer();
        $this->lastMonitoring=Monitoring::last();
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $monitorings=$this->monitoringRepository->findAll();
        if ($monitorings){
            return response()->json([
                'success'=>true,
                'data'=>$monitorings,
                'message'=>"Liste des Monitorings"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de monitoring trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $monitoring=$this->monitoringRepository->create($request->all());
        if($request->hasFile('photo')){

            $monitoring->addMediaFromRequest('photo')
                ->usingName($monitoring->monitoring_titre_fr)
                ->toMediaCollection('monitoring');
        }
        if ($monitoring){
            return response()->json([
                'success'=>true,
                'data'=>$monitoring,
                'message'=>"Monitoring inséré",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'un monitoring"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $monitoring=$this->monitoringRepository->findById($id);
        //dd($user);
        if($monitoring){
            return response()->json([
                "success"=>true,
                "data"=>$monitoring,
                "photo"=>$monitoring->getFirstMediaUrl(),
                "message"=>"monitoring trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"monitoring inexistant"
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
        $monitoring=$this->monitoringRepository->update($requestData,$id);
        $request->merge(['photo' => $excludedPhoto]);
        //dd($excludedPhoto);
        $monitoring=$this->monitoringRepository->findById($id);
        if($request->hasFile('photo')){
            $monitoring->clearMediaCollection('monitoring');
            $monitoring->addMediaFromRequest('photo')
                ->usingName($monitoring->monitoring_titre_fr)
                ->toMediaCollection('monitoring');
        }
        if ($monitoring){
            return response()->json([
                'success'=>true,
                'data'=>$monitoring,
                'message'=>"monitoring mis à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'un monitoring"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $monitoring=$this->monitoringRepository->delete($id);
        if($monitoring>0){
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
    public function getMonitoringBySlug($slug){
        $monitoring=$this->monitoringRepository->findBySlug($slug);
        if($monitoring->count()>0){

            return response()->json([
                "success"=>true,
                "data"=>$monitoring,
                "photo"=>$monitoring->getFirstMediaUrl(),
                "message"=>"monitoring trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"monitoring inexistant"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getLastMonitoringBySlug(){
        return $this->show($this->lastMonitoring->id);
    }
}
