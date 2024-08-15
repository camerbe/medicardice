<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coronaryangioplastie;
use App\Repositories\CoronaryangioplastyRepository;
use Illuminate\Http\Request;
use Stevebauman\Hypertext\Transformer;
use Symfony\Component\HttpFoundation\Response;

class CoronaryangioplastyController extends Controller
{
    protected $coronaryangioplastyRepository;
    protected $transformer;
    protected $lastCoronaryangioplastie;

    /**
     * @param $coronaryangioplastyRepository
     * @param $transformer
     * @param $lastCoronaryangioplastie
     */
    public function __construct(CoronaryangioplastyRepository $coronaryangioplastyRepository)
    {
        $this->coronaryangioplastyRepository = $coronaryangioplastyRepository;
        $this->transformer = new Transformer();
        $this->lastCoronaryangioplastie = Coronaryangioplastie::last();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $coronaryangioplasty=$this->coronaryangioplastyRepository->findAll();
        if ($coronaryangioplasty){
            return response()->json([
                'success'=>true,
                'data'=>$coronaryangioplasty,
                'message'=>"Liste des coronaryangioplasties"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de coronaryangioplastie trouvée"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $coronaryangioplasty=$this->coronaryangioplastyRepository->create($request->all());
        if($request->hasFile('photo')){

            $coronaryangioplasty->addMediaFromRequest('photo')
                ->usingName($coronaryangioplasty->coronaryangioplasty_titre_fr)
                ->toMediaCollection('coronaryangioplasty');
        }
        if ($coronaryangioplasty){
            return response()->json([
                'success'=>true,
                'data'=>$coronaryangioplasty,
                'message'=>"coronaryangioplastie insérée",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'une coronaryangioplastie"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $coronaryangioplasty=$this->coronaryangioplastyRepository->findById($id);
        //dd($user);
        if($coronaryangioplasty){
            return response()->json([
                "success"=>true,
                "data"=>$coronaryangioplasty,
                "photo"=>$coronaryangioplasty->getFirstMediaUrl(),
                "message"=>"coronaryangioplastie trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"coronaryangioplastie inexistante"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $excludedPhoto = $request->input('photo');
        $requestData = $request->except('photo');
        $coronaryangioplasty=$this->coronaryangioplastyRepository->update($requestData,$id);
        //$request->merge(['photo' => $excludedPhoto]);
        //dd($excludedPhoto);
        $coronaryangioplasty=$this->coronaryangioplastyRepository->findById($id);
        if($request->hasFile('photo')){
            $coronaryangioplasty->addMediaFromRequest('photo')
                ->usingName($coronaryangioplasty->coronaryangioplasty_titre_fr)
                ->toMediaCollection('coronaryangioplasty');
        }
        if ($coronaryangioplasty){
            return response()->json([
                'success'=>true,
                'data'=>$coronaryangioplasty,
                'message'=>"coronaryangioplastie mise à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'une coronaryangioplastie"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $coronaryangioplasty=$this->coronaryangioplastyRepository->delete($id);
        if($coronaryangioplasty>0){
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

    public function getCoronaryangioplastyBySlug($slug){
        $coronaryangioplasty=$this->coronaryangioplastyRepository->findBySlug($slug);
        if($coronaryangioplasty->count()>0){
            return response()->json([
                "success"=>true,
                "data"=>$coronaryangioplasty,
                "photo"=>$coronaryangioplasty->getFirstMediaUrl(),
                "message"=>"coronaryangioplastie trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"coronaryangioplastie inexistante"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getLastCoronaryangioplastyBySlug(){
        return $this->show($this->lastCoronaryangioplastie->id);
    }
}
