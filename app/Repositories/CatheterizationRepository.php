<?php

namespace App\Repositories;



use App\Models\Catheterization;
use App\Models\Monitoring;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Stevebauman\Hypertext\Transformer;

class CatheterizationRepository extends BaseRepository
{

    protected $transformer;
    public function __construct(Catheterization $catheterization)
    {
        $this->model=$catheterization;
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
        $currentCatheterization=parent::findById($id);
        $input['catheterization_titre_fr']=isset($input['catheterization_titre_fr'])? Str::title($input['catheterization_titre_fr']):$currentCatheterization->catheterization_titre_fr;
        $input['catheterization_titre_en']=isset($input['catheterization_titre_en'])? Str::title($input['catheterization_titre_en']):$currentCatheterization->catheterization_titre_en;

        $input['catheterization_titre_fr_slug']=isset($input['catheterization_titre_fr'])? Str::slug('Médicardice'.' '.$input['catheterization_titre_fr']):$currentCatheterization->catheterization_titre_fr_slug;
        $input['catheterization_titre_en_slug']=isset($input['catheterization_titre_en'])? Str::slug('Médicardice'.' '.$input['catheterization_titre_en']):$currentCatheterization->catheterization_titre_en_slug;

        $input['catheterization_msg_fr']= $input['catheterization_msg_fr'] ?? $currentCatheterization->catheterization_msg_fr;
        $input['catheterization_msg_en']= $input['catheterization_msg_en'] ?? $currentCatheterization->catheterization_msg_en;

        $input['catheterization_description_fr']=isset($input['catheterization_msg_fr'])? Str::limit($this->transformer->toText($input['catheterization_msg_fr']),160):$currentCatheterization->catheterization_description_fr;
        $input['catheterization_description_en']=isset($input['catheterization_msg_en'])? Str::limit($this->transformer->toText($input['catheterization_msg_en']),160):$currentCatheterization->catheterization_description_en;

        //unset($input['photo']);

        return parent::update($input, $id);
    }

    /**
     * @param array $input
     * @return mixed
     */
    public function create(array $input)
    {
        $catheterization_titre_fr=Str::title($input['catheterization_titre_fr']);
        $catheterization_titre_fr_slug=Str::slug('Médicardice'.' '.$input['catheterization_titre_fr']);

        $catheterization_titre_en=Str::title($input['catheterization_titre_en']);
        $catheterization_titre_en_slug=Str::slug('Médicardice'.' '.$input['catheterization_titre_en']);

        $catheterization_description_fr= Str::limit($this->transformer->toText($input['catheterization_msg_fr']),160) ;
        $catheterization_description_en= Str::limit($this->transformer->toText($input['catheterization_msg_en']),160) ;

        $input['catheterization_titre_fr_slug']=$catheterization_titre_fr_slug;
        $input['catheterization_titre_en_slug']=$catheterization_titre_en_slug;

        $input['catheterization_titre_fr']=$catheterization_titre_fr;
        $input['catheterization_titre_en']=$catheterization_titre_en;

        $input['catheterization_description_fr']=$catheterization_description_fr;
        $input['catheterization_description_en']=$catheterization_description_en;

        unset($input['photo']);

        return parent::create($input);
    }

    public function findBySlug(string $slug){
        if($holter=Cache::get('catheterization-findBySlug')) return $holter;
        $holter= Catheterization::where('catheterization_titre_en_slug ',$slug)
            ->orWhere('catheterization_titre_fr_slug ',$slug)
            ->get();
        Cache::set('catheterization-findBySlug',$holter,Carbon::now()->hour(24));
        return $holter;
    }
    public function findAll(){
        if($holter=Cache::get('catheterization-list')) return $holter;
        $holter=Catheterization::orderBy('id','desc')->get();
        Cache::set('catheterization-list',$holter,Carbon::now()->hour(24));
        return  $holter;

    }


}
