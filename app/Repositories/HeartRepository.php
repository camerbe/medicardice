<?php

namespace App\Repositories;



use App\Models\Chest;
use App\Models\Heart;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Stevebauman\Hypertext\Transformer;

class HeartRepository extends BaseRepository
{

    protected $transformer;
    public function __construct(Heart $heart)
    {
        $this->model=$heart;
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
        $currentHeart=parent::findById($id);
        $input['heart_titre_fr']=isset($input['heart_titre_fr'])? Str::title($input['heart_titre_fr']):$currentHeart->heart_titre_fr;
        $input['heart_titre_en']=isset($input['heart_titre_en'])? Str::title($input['heart_titre_en']):$currentHeart->heart_titre_en;

        $input['heart_titre_fr_slug']=isset($input['heart_titre_fr'])? Str::slug('Médicardice'.' '.$input['heart_titre_fr']):$currentHeart->heart_titre_fr_slug;
        $input['heart_titre_en_slug']=isset($input['heart_titre_en'])? Str::slug('Médicardice'.' '.$input['heart_titre_en']):$currentHeart->heart_titre_en_slug;

        $input['heart_msg_fr']= $input['heart_msg_fr'] ?? $currentHeart->heart_msg_fr;
        $input['heart_msg_en']= $input['heart_msg_en'] ?? $currentHeart->heart_msg_en;

        $input['heart_description_fr']=isset($input['heart_msg_fr'])? Str::limit($this->transformer->toText($input['heart_msg_fr']),160):$currentHeart->heart_description_fr;
        $input['heart_description_en']=isset($input['heart_msg_en'])? Str::limit($this->transformer->toText($input['heart_msg_en']),160):$currentHeart->heart_description_en;

        //unset($input['photo']);

        return parent::update($input, $id);
    }

    /**
     * @param array $input
     * @return mixed
     */
    public function create(array $input)
    {
        $heart_titre_fr=Str::title($input['heart_titre_fr']);
        $heart_titre_fr_slug=Str::slug('Médicardice'.' '.$input['heart_titre_fr']);

        $heart_titre_en=Str::title($input['heart_titre_en']);
        $heart_titre_en_slug=Str::slug('Médicardice'.' '.$input['heart_titre_en']);

        $heart_description_fr= Str::limit($this->transformer->toText($input['heart_msg_fr']),160) ;
        $heart_description_en= Str::limit($this->transformer->toText($input['heart_msg_en']),160) ;

        $input['heart_titre_fr_slug']=$heart_titre_fr_slug;
        $input['heart_titre_en_slug']=$heart_titre_en_slug;

        $input['heart_titre_fr']=$heart_titre_fr;
        $input['heart_titre_en']=$heart_titre_en;

        $input['heart_description_fr']=$heart_description_fr;
        $input['heart_description_en']=$heart_description_en;

        unset($input['photo']);

        return parent::create($input);
    }

    public function findBySlug(string $slug){
        if($heart=Cache::get('heart-findBySlug')) return $heart;
        $heart= Heart::where('heart_titre_en_slug ',$slug)
            ->orWhere('heart_titre_fr_slug ',$slug)
            ->get();
        Cache::set('heart-findBySlug',$heart,Carbon::now()->hour(24));
        return $heart;
    }
    public function findAll(){
        //Cache::forget('heart-list');
        if($heart=Cache::get('heart-list')) return $heart;
        $heart=Heart::orderBy('id','desc')->get();
        Cache::set('heart-list',$heart,Carbon::now()->hour(24));
        return  $heart;

    }


}
