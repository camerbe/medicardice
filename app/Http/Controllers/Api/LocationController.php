<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Location;
use App\Repositories\LocationRepository;
use Illuminate\Http\Request;
use Stevebauman\Hypertext\Transformer;
use Symfony\Component\HttpFoundation\Response;

class LocationController extends Controller
{
    protected $locationRepository;
    protected $transformer;
    protected $lastLocation;

    /**
     * @param $locationRepository
     * @param $transformer
     * @param $lastLocation
     */
    public function __construct(LocationRepository  $locationRepository)
    {
        $this->locationRepository = $locationRepository;
        $this->transformer = new  Transformer();
        $this->lastLocation = Location::last();
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $locations=$this->locationRepository->findAll();
        if ($locations){
            return response()->json([
                'success'=>true,
                'data'=>$locations,
                'message'=>"Liste des Locations"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de location trouvée"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $location=$this->locationRepository->create($request->all());
        if($request->hasFile('photo')){
            $location->addMediaFromRequest('photo')
                ->withResponsiveImages()
                ->usingName($location->location_titre_fr)
                ->toMediaCollection('location');
        }
        if ($location){
            return response()->json([
                'success'=>true,
                'data'=>$location,
                'message'=>"Location insérée",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de l'insertion d'une location"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
        $location=$this->locationRepository->findById($id);
        //dd($user);
        if($location){
            return response()->json([
                "success"=>true,
                "data"=>$location,
                "photo"=>$location->getFirstMediaUrl(),
                "message"=>"location trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"location inexistante"
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
        $location=$this->locationRepository->update($requestData,$id);
        $request->merge(['photo' => $excludedPhoto]);
        //dd($excludedPhoto);
        $location=$this->locationRepository->findById($id);
        if($request->hasFile('photo')){
            $location->clearMediaCollection('location');
            $location->addMediaFromRequest('photo')
                ->withResponsiveImages()
                ->usingName($location->location_titre_fr)
                ->toMediaCollection('location');
        }
        if ($location){
            return response()->json([
                'success'=>true,
                'data'=>$location,
                'message'=>"location mise à jour",
            ],Response::HTTP_CREATED);
        }
        return response()->json([
            "sucess"=>false,
            "message"=>"Erreur lors de la mise à jour d'une location"
        ],Response::HTTP_NOT_FOUND);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        $location=$this->locationRepository->delete($id);
        if($location>0){
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

    public function getLocationBySlug($slug){
        $location=$this->locationRepository->findBySlug($slug);
        if($location->count()>0){
            return response()->json([
                "success"=>true,
                "data"=>$location,
                "photo"=>$location->getFirstMediaUrl(),
                "message"=>"location trouvée"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"location inexistante"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getLastLocationBySlug(){
        return $this->show($this->lastLocation->id);
    }
}
