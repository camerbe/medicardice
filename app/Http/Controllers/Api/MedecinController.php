<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MedecinRequest;
use App\Models\Medecin;
use App\Repositories\MedecinRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Stevebauman\Hypertext\Transformer;
use Symfony\Component\HttpFoundation\Response;

class MedecinController extends Controller
{
    protected $medecinRepository;
    protected $transformer;
    protected $lastMedecin;

    /**
     * @param $medecinRepository
     */
    public function __construct(MedecinRepository $medecinRepository)
    {
        $this->medecinRepository = $medecinRepository;
        $this->transformer = new Transformer();
        $this->lastMedecin=Medecin::last();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $medecins=$this->medecinRepository->findAll();
        if ($medecins){
            return response()->json([
                'success'=>true,
                'data'=>$medecins,
                'message'=>"Liste des Médecins"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de médecin trouvé"
        ],Response::HTTP_NOT_FOUND);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $medecin=$this->medecinRepository->create($request->all());
        if($request->hasFile('photo')){

            $medecin->addMediaFromRequest('photo')
                ->usingName($medecin->doc_titre_fr)
                ->toMediaCollection('medecin');
        }
        if ($medecin){
            return response()->json([
                'success'=>true,
                'data'=>$medecin,
                'message'=>"Médecin inséré",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'un medecin"
        ],Response::HTTP_NOT_FOUND);

    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $medecin=$this->medecinRepository->findById($id);
        //dd($user);
        if($medecin){
            return response()->json([
                "success"=>true,
                "data"=>$medecin,
                "photo"=>$medecin->getFirstMediaUrl(),
                "message"=>"Médecin trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Médecin inexistant"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //
        //dd($request->all());
        $excludedPhoto = $request->input('photo');
        $requestData = $request->except('photo');
        //dd( $requestData);
        $medecin=$this->medecinRepository->update($requestData,$id);
        $request->merge(['photo' => $excludedPhoto]);
        $medecin=$this->medecinRepository->findById($id);
        if($request->hasFile('photo')){
            $medecin->clearMediaCollection('medecin');
            $medecin->addMediaFromRequest('photo')
                ->usingName($medecin->doc_titre_fr)
                ->toMediaCollection('medecin');
        }
        if ($medecin){
            return response()->json([
                'success'=>true,
                'data'=>$medecin,
                'message'=>"Médecin mis à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'un médecin"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $medecin=$this->medecinRepository->delete($id);
        if($medecin>0){
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
    public function getMedecinBySlug($slug){
        $medecin=$this->medecinRepository->findBySlug($slug);
        if($medecin->count()>0){

            return response()->json([
                "success"=>true,
                "data"=>$medecin,
                "photo"=>$medecin->getFirstMediaUrl(),
                "message"=>"Article trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Article inexistant"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getLastMedecinBySlug(){
        return $this->show($this->lastMedecin->id);
    }
}
