<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DoctorRequest;
use App\Repositories\DoctorRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DoctorController extends Controller
{
    protected $doctorRepository;
    public function __construct(DoctorRepository $doctorRepository)
    {
        $this->doctorRepository=$doctorRepository;
    }




    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $doctors=$this->doctorRepository->findAll();
        if ($doctors){
            return response()->json([
                'success'=>true,
                'data'=>$doctors,
                'message'=>"Liste des médecins"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de médecin trouvé"
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
    public function store(DoctorRequest $request)
    {
        //
        $doctor=$this->doctorRepository->create($request->all());

        if ($doctor){
            return response()->json([
                'success'=>true,
                'data'=>$doctor,
                'message'=>"médecin inséré",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de l'insertion d'un médecin"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $doctor=$this->doctorRepository->findById($id);
        if($doctor){
            return response()->json([
                "success"=>true,
                "data"=>$doctor,
                "message"=>"médecin trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"médecin inexistant"
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
    public function update(Request $request,  $id)
    {
        //
        $doctor=$this->doctorRepository->update($request->all(),$id);

        if ($doctor){
            return response()->json([
                'success'=>true,
                'data'=>$doctor,
                'message'=>"médecin mis à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de la mise à jour d'un médecin"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $doctor=$this->patientRepository->delete($id);
        if($doctor>0){
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
}
