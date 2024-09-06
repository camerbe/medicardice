<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\SlotRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SlotController extends Controller
{
    protected $slotRepository;

    /**
 * @param $slotRepository
 */
    public function __construct(SlotRepository $slotRepository)
    {
        $this->slotRepository = $slotRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $slots=$this->slotRepository->findAll();
        if ($slots){
            return response()->json([
                'success'=>true,
                'data'=>$slots,
                'message'=>"Liste des slots"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de slot trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $slot=$this->slotRepository->create($request->all());

        if ($slot){
            return response()->json([
                'success'=>true,
                'data'=>$slot,
                'message'=>"Slot inséré",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'un slot"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $slot=$this->slotRepository->findById($id);
        if($slot){
            return response()->json([
                "success"=>true,
                "data"=>$slot,
                "message"=>"Slot trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Slot inexistant"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $slot=$this->slotRepository->update($request->all(),$id);

        if ($slot){
            return response()->json([
                'success'=>true,
                'data'=>$slot,
                'message'=>"Slot mis à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'un slot"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $slot=$this->slotRepository->delete($id);
        if($slot>0){
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
