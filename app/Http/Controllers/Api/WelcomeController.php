<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\WelcomeRequest;
use App\Models\Welcome;
use App\Repositories\WelcomeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Stevebauman\Hypertext\Transformer;
use Symfony\Component\HttpFoundation\Response;

class WelcomeController extends Controller
{
    protected $welcomeRepository;
    protected $lastWelcome;
    protected $transformer;
    protected $lastWelcomeImage;

    /**
     * @param $welcomeRepository
     */
    public function __construct(WelcomeRepository $welcomeRepository)
    {
        $this->welcomeRepository = $welcomeRepository;
        $this->transformer = new Transformer();
        $this->lastWelcome=Welcome::last();

    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $welcomes=$this->welcomeRepository->findAll();
        if ($welcomes){
            return response()->json([
                'success'=>true,
                'data'=>$welcomes,

                'message'=>"Liste des welcomes"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas d'welcomes trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        //dd($request->all());
        //dd($request->validated($request));
        $welcome=$this->welcomeRepository->create($request->all());
        if($request->hasFile('photo')){

            $welcome->addMediaFromRequest('photo')
                ->usingName($welcome->welcome_titre_fr)
                ->toMediaCollection('welcome');
        }
        if ($welcome){
            return response()->json([
                'success'=>true,
                'data'=>$welcome,
                'message'=>"Welcome inséré",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'un welcome"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $welcome=$this->welcomeRepository->findById($id);
        //dd($user);
        if($welcome){
            return response()->json([
                "success"=>true,
                "data"=>$welcome,
                "photo"=>$welcome->getFirstMediaUrl(),
                "message"=>"Welcome trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Welcome inexistant"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $welcome=$this->welcomeRepository->update($request->all(),$id);
        if($request->hasFile('photo')){
           $welcome->addMediaFromRequest('photo')
                ->usingName($welcome->welcome_titre_fr)
                ->toMediaCollection('welcome');
        }
        if ($welcome){
            return response()->json([
                'success'=>true,
                'data'=>$welcome,
                'message'=>"Welcome mis à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'un welcome"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $welcome=$this->welcomeRepository->delete($id);
        if($welcome>0){
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
    /**
     * Display the specified resource by slug.
     */
    public function getWelcomeBySlug($slug){
        $welcome=$this->welcomeRepository->findBySlug($slug);
        if($welcome->count()>0){

            return response()->json([
                "success"=>true,
                "data"=>$welcome,
                "photo"=>$welcome->getFirstMediaUrl(),
                "message"=>"Article trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Article inexistant"
        ],Response::HTTP_NOT_FOUND);

    }
    public function getLastBySlug(){
        return $this->show($this->lastWelcome->id);
    }
}
