<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Angio;
use App\Repositories\AngioRepository;
use Illuminate\Http\Request;
use Stevebauman\Hypertext\Transformer;
use Symfony\Component\HttpFoundation\Response;

class AngioController extends Controller
{
    protected $angioRepository;
    protected $transformer;
    protected $lastAngio;

    /**
     * @param $angioRepository
     * @param $transformer
     * @param $lastAngio
     */
    public function __construct(AngioRepository $angioRepository)
    {
        $this->angioRepository = $angioRepository;
        $this->transformer = new Transformer();
        $this->lastAngio = Angio::last();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $angios=$this->angioRepository->findAll();
        if ($angios){
            return response()->json([
                'success'=>true,
                'data'=>$angios,
                'message'=>"Liste des angios"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas d'angio trouvée"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //dd($request);
        //
        $angio=$this->angioRepository->create($request->all());
        if($request->hasFile('photo')){
            $angio->addMediaFromRequest('photo')
                ->usingName($angio->angio_titre_fr)
                ->toMediaCollection('angio');
        }
        if ($angio){
            return response()->json([
                'success'=>true,
                'data'=>$angio,
                'message'=>"angio insérée",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'une angio"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $angio=$this->angioRepository->findById($id);
        //dd($user);
        if($angio){
            return response()->json([
                "success"=>true,
                "data"=>$angio,
                "photo"=>$angio->getFirstMediaUrl(),
                "message"=>"angio trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"angio inexistante"
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
        $angio=$this->angioRepository->update($requestData,$id);
        $request->merge(['photo' => $excludedPhoto]);
        //dd($excludedPhoto);
        $angio=$this->angioRepository->findById($id);
        if($request->hasFile('photo')){
            $angio->clearMediaCollection('angio');
            $angio->addMediaFromRequest('photo')
                ->usingName($angio->angio_titre_fr)
                ->toMediaCollection('angio');
        }
        if ($angio){
            return response()->json([
                'success'=>true,
                'data'=>$angio,
                'message'=>"angio mise à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'une angio"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $angio=$this->angioRepository->delete($id);
        if($angio>0){
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
    public function getAngioBySlug($slug){
        $angio=$this->angioRepository->findBySlug($slug);
        if($angio->count()>0){
            return response()->json([
                "success"=>true,
                "data"=>$angio,
                "photo"=>$angio->getFirstMediaUrl(),
                "message"=>"angio trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"angio inexistante"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getLastAngioBySlug(){
        return $this->show($this->lastAngio->id);
    }
}
