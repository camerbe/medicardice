<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\AppointmentRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AppointmentController extends Controller
{
    protected $appointmentRepository;

    /**
     * @param $appointmentRepository
     */
    public function __construct(AppointmentRepository $appointmentRepository)
    {
        $this->appointmentRepository = $appointmentRepository;
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $appointments=$this->appointmentRepository->findAll();
        if ($appointments){
            return response()->json([
                'success'=>true,
                'data'=>$appointments,
                'message'=>"Liste des Rendez-vous"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de Rendez-vous trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $appointment=$this->appointmentRepository->create($request->all());

        if ($appointment){
            return response()->json([
                'success'=>true,
                'data'=>$appointment,
                'message'=>"Rendez-vous inséré",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'un Rendez-vous"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $appointment=$this->appointmentRepository->findById($id);
        if($appointment){
            return response()->json([
                "success"=>true,
                "data"=>$appointment,
                "message"=>"Rendez-vous trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Rendez-vous inexistant"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //
        $appointment=$this->appointmentRepository->update($request->all(),$id);

        if ($appointment){
            return response()->json([
                'success'=>true,
                'data'=>$appointment,
                'message'=>"Rendez-vous mis à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'un rendez-vous"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //

        $appointment=$this->appointmentRepository->delete($id);
        if($appointment>0){
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
    public function getSlots(){
        $slots=$this->appointmentRepository->getAllSlots();
        if ($slots){
            return response()->json([
                'success'=>true,
                'data'=>$slots,
                'message'=>"Liste des Slots"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de Slot trouvé"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getDoctors(){
        $doctors=$this->appointmentRepository->getAllDoctors();
        if ($doctors){
            return response()->json([
                'success'=>true,
                'data'=>$doctors,
                'message'=>"Liste des Doctors"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de doctor trouvé"
        ],Response::HTTP_NOT_FOUND);
    }
}
