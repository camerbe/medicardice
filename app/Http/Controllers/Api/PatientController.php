<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PatientRequest;
use App\Http\Requests\RequestUser;
use App\Repositories\PatientRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PatientController extends Controller
{
    protected $patientRepository;
    public function __construct(PatientRepository $patientRepository)
    {
        $this->patientRepository=$patientRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $pateints=$this->patientRepository->findAll();
        if ($pateints){
            return response()->json([
                'success'=>true,
                'data'=>$pateints,
                'message'=>"Liste des patients"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de patient trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $patient=$this->patientRepository->create($request->all());

        if ($patient){
            return response()->json([
                'success'=>true,
                'data'=>$patient,
                'message'=>"Patient inséré",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'un patient"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $patient=$this->patientRepository->findById($id);
        if($patient){
            return response()->json([
                "success"=>true,
                "data"=>$patient,
                "message"=>"Patient trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Patient inexistant"
        ],Response::HTTP_NOT_FOUND);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //
        $patient=$this->patientRepository->update($request->all(),$id);

        if ($patient){
            return response()->json([
                'success'=>true,
                'data'=>$patient,
                'message'=>"Patient mis à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'un patient"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $patient=$this->patientRepository->delete($id);
        if($patient>0){
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
    public function register(PatientRequest $request)
    {
        //dd('toto');
        //
        $user=$this->patientRepository->create($request->all());

        if ($user){
            return response()->json([
                'success'=>true,
                'data'=>$user,
                'message'=>"Patient inséré",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'un patient"
        ],Response::HTTP_NOT_FOUND);
    }

    public function findAppointementByPatient($user_id){
        return $this->patientRepository->findPatientAppointments($user_id);
    }

    public function getPatientId($user_id){
        return $this->patientRepository->getPatientId($user_id);
    }


}
