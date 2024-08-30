<?php

namespace App\Repositories;



use App\Models\Chest;
use App\Models\Heart;
use App\Models\Location;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Stevebauman\Hypertext\Transformer;

class LocationRepository extends BaseRepository
{

    protected $transformer;
    public function __construct(Location $location)
    {
        $this->model=$location;
        $this->transformer = new Transformer();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function findById($id)
    {
        return parent::findById($id);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function delete($id)
    {
        return parent::delete($id);
    }

    /**
     * @param array $input
     * @param $id
     * @return mixed
     */
    public function update(array $input, $id)
    {
        $currentLocation=parent::findById($id);
        $input['location_titre_fr']=isset($input['location_titre_fr'])? Str::title($input['location_titre_fr']):$currentLocation->location_titre_fr;
        $input['location_titre_en']=isset($input['location_titre_en'])? Str::title($input['location_titre_en']):$currentLocation->location_titre_en;

        $input['location_titre_fr_slug']=isset($input['location_titre_fr'])? Str::slug('Médicardice'.' '.$input['location_titre_fr']):$currentLocation->location_titre_fr_slug;
        $input['location_titre_en_slug']=isset($input['location_titre_en'])? Str::slug('Médicardice'.' '.$input['location_titre_en']):$currentLocation->location_titre_en_slug;

        $input['location_msg_fr']= $input['location_msg_fr'] ?? $currentLocation->location_msg_fr;
        $input['location_msg_en']= $input['location_msg_en'] ?? $currentLocation->location_msg_en;

        $input['location_description_fr']=isset($input['location_msg_fr'])? Str::limit($this->transformer->toText($input['location_msg_fr']),160):$currentLocation->location_description_fr;
        $input['location_description_en']=isset($input['location_msg_en'])? Str::limit($this->transformer->toText($input['location_msg_en']),160):$currentLocation->location_description_en;

        //unset($input['photo']);

        return parent::update($input, $id);
    }

    /**
     * @param array $input
     * @return mixed
     */
    public function create(array $input)
    {
        $location_titre_fr=Str::title($input['location_titre_fr']);
        $location_titre_fr_slug=Str::slug('Médicardice'.' '.$input['location_titre_fr']);

        $location_titre_en=Str::title($input['location_titre_en']);
        $location_titre_en_slug=Str::slug('Médicardice'.' '.$input['location_titre_en']);

        $location_description_fr= Str::limit($this->transformer->toText($input['location_msg_fr']),160) ;
        $location_description_en= Str::limit($this->transformer->toText($input['location_msg_en']),160) ;

        $input['location_titre_fr_slug']=$location_titre_fr_slug;
        $input['location_titre_en_slug']=$location_titre_en_slug;

        $input['location_titre_fr']=$location_titre_fr;
        $input['location_titre_en']=$location_titre_en;

        $input['location_description_fr']=$location_description_fr;
        $input['location_description_en']=$location_description_en;

        unset($input['photo']);

        return parent::create($input);
    }

    public function findBySlug(string $slug){
        if($heart=Cache::get('location-findBySlug')) return $heart;
        $heart= Heart::where('location_titre_en_slug ',$slug)
            ->orWhere('location_titre_fr_slug ',$slug)
            ->get();
        Cache::set('location-findBySlug',$heart,Carbon::now()->hour(24));
        return $heart;
    }
    public function findAll(){
        //Cache::forget('location-list');
        if($heart=Cache::get('location-list')) return $heart;
        $heart=Heart::orderBy('id','desc')->get();
        Cache::set('location-list',$heart,Carbon::now()->hour(24));
        return  $heart;

    }


}
