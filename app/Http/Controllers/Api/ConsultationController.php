<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Consultation;
use App\Repositories\ConsultationRepository;
use Illuminate\Http\Request;
use Stevebauman\Hypertext\Transformer;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\UploadedFile;


class ConsultationController extends Controller
{
    protected $consultationRepository;
    protected $transformer;
    protected $lastConsultation;

    /**
     * @param $consultationRepository
     */
    public function __construct(ConsultationRepository $consultationRepository)
    {
        $this->consultationRepository = $consultationRepository;
        $this->transformer = new Transformer();
        $this->lastConsultation=Consultation::last();
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $consultations=$this->consultationRepository->findAll();
        if ($consultations){
            return response()->json([
                'success'=>true,
                'data'=>$consultations,
                'message'=>"Liste des consultations"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de consultation trouvée"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $consultation=$this->consultationRepository->create($request->all());
        if($request->hasFile('photo')){

            $consultation->addMediaFromRequest('photo')
                ->withResponsiveImages()
                ->usingName($consultation->cons_titre_fr)
                ->toMediaCollection('consultation');
        }
        if ($consultation){
            return response()->json([
                'success'=>true,
                'data'=>$consultation,
                'message'=>"Consultation insérée",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'une consultation"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $consultation=$this->consultationRepository->findById($id);
        //dd($user);
        if($consultation){
            return response()->json([
                "success"=>true,
                "data"=>$consultation,
                "photo"=>$consultation->getFirstMediaUrl(),
                "message"=>"Consultation trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Consultation inexistante"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //
        //dd( $request->hasFile('photo'));
        $excludedPhoto = $request->input('photo');
        $requestData = $request->except('photo');
        //dd($request->has('photo'));
        $consultation=$this->consultationRepository->update($requestData,$id);
        $request->merge(['photo' => $excludedPhoto]);

        $consultation=$this->consultationRepository->findById($id);
        if($request->hasFile('photo')){
            $consultation->clearMediaCollection('consultation');
            $consultation->addMediaFromRequest('photo')
                ->withResponsiveImages()
                ->usingName($consultation->cons_titre_fr)
                ->toMediaCollection('consultation');
        }
        if ($consultation){
            return response()->json([
                'success'=>true,
                'data'=>$consultation,
                'message'=>"Consultation mise à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'une consultation"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $consultation=$this->consultationRepository->delete($id);
        if($consultation>0){
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

    public function getConsultationBySlug($slug){
        $consultation=$this->consultationRepository->findBySlug($slug);
        if($consultation->count()>0){

            return response()->json([
                "success"=>true,
                "data"=>$consultation,
                "photo"=>$consultation->getFirstMediaUrl(),
                "message"=>"Consultation trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Consultation inexistante"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getLastConsultationBySlug(){
        return $this->show($this->lastConsultation->id);
    }
}
