<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\MedicalRecordRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MedicalRecordController extends Controller
{
    protected $medicalrecordRepository;

 /**
 *
 * @param $medicalrecordRepository
 */
    public function __construct(MedicalRecordRepository $medicalrecordRepository)
    {
        $this->medicalrecordRepository = $medicalrecordRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $medicalrecords=$this->medicalrecordRepository->findAll();
        if ($medicalrecords){
            return response()->json([
                'success'=>true,
                'data'=>$medicalrecords,
                'message'=>"Liste des Medical Records"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de Medical Records trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $medicalrecord=$this->medicalrecordRepository->create($request->all());

        if ($medicalrecord){
            return response()->json([
                'success'=>true,
                'data'=>$medicalrecord,
                'message'=>"Medical Record inséré",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'un Medical record"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $medicalrecord=$this->medicalrecordRepository->findById($id);
        if($medicalrecord){
            return response()->json([
                "success"=>true,
                "data"=>$medicalrecord,
                "message"=>"Medical record trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Medical record inexistant"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $medicalrecord=$this->medicalrecordRepository->update($request->all(),$id);

        if ($medicalrecord){
            return response()->json([
                'success'=>true,
                'data'=>$medicalrecord,
                'message'=>"Medical record mis à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'un Medical record"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $medicalrecord=$this->medicalrecordRepository->delete($id);
        if($medicalrecord>0){
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

    public function getMedicalRecordsByPatient(int $patient_id){
        $medicalrecords=$this->medicalrecordRepository->getMedicalRecordsByPatient($patient_id);
        if ($medicalrecords){
            return response()->json([
                'success'=>true,
                'data'=>$medicalrecords,
                'message'=>"Liste des Medical Records par patient"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de Medical Records trouvé"
        ],Response::HTTP_NOT_FOUND);
    }
}
