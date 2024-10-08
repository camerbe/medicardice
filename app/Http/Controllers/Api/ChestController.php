<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chest;
use App\Repositories\ChestRepository;
use Illuminate\Http\Request;
use Stevebauman\Hypertext\Transformer;
use Symfony\Component\HttpFoundation\Response;

class ChestController extends Controller
{
    protected $chestRepository;
    protected $transformer;
    protected $lastChest;

    /**
     * @param $chestRepository
     * @param $transformer
     * @param $lastChest
     */
    public function __construct(ChestRepository $chestRepository)
    {
        $this->chestRepository = $chestRepository;
        $this->transformer = new Transformer();
        $this->lastChest = Chest::last();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $chests=$this->chestRepository->findAll();
        if ($chests){
            return response()->json([
                'success'=>true,
                'data'=>$chests,
                'message'=>"Liste des chests"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de chest trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $chest=$this->chestRepository->create($request->all());
        if($request->hasFile('photo')){
            $chest->addMediaFromRequest('photo')
                ->withResponsiveImages()
                ->usingName($chest->chest_titre_fr)
                ->toMediaCollection('chest');
        }
        if ($chest){
            return response()->json([
                'success'=>true,
                'data'=>$chest,
                'message'=>"Chest inséré",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'un chest"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $chest=$this->chestRepository->findById($id);
        //dd($user);
        if($chest){
            return response()->json([
                "success"=>true,
                "data"=>$chest,
                "photo"=>$chest->getFirstMediaUrl(),
                "message"=>"Chest trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Chest inexistant"
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
        $chest=$this->chestRepository->update($requestData,$id);
        $request->merge(['photo' => $excludedPhoto]);
        //dd($excludedPhoto);
        $chest=$this->chestRepository->findById($id);
        if($request->hasFile('photo')){
            $chest->clearMediaCollection('chest');
            $chest->addMediaFromRequest('photo')
                ->withResponsiveImages()
                ->usingName($chest->chest_titre_fr)
                ->toMediaCollection('chest');
        }
        if ($chest){
            return response()->json([
                'success'=>true,
                'data'=>$chest,
                'message'=>"Chest mis à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'un Chest"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $chest=$this->chestRepository->delete($id);
        if($chest>0){
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
    public function getChestBySlug($slug){
        $chest=$this->chestRepository->findBySlug($slug);
        if($chest->count()>0){
            return response()->json([
                "success"=>true,
                "data"=>$chest,
                "photo"=>$chest->getFirstMediaUrl(),
                "message"=>"Chest trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Chest inexistant"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getLastChestBySlug(){
        return $this->show($this->lastChest->id);
    }
}
