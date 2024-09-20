<?php

namespace App\Repositories;



use App\Models\Angio;
use App\Models\Catheterization;
use App\Models\Hypertension;
use App\Models\Monitoring;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Stevebauman\Hypertext\Transformer;

class HypertensionRepository extends BaseRepository
{

    protected $transformer;
    public function __construct(Hypertension $hypertension)
    {
        $this->model=$hypertension;
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
        $currentHypertension=parent::findById($id);
        $input['hypertension_titre_fr']=isset($input['hypertension_titre_fr'])? Str::title($input['hypertension_titre_fr']):$currentHypertension->hypertension_titre_fr;
        $input['hypertension_titre_en']=isset($input['hypertension_titre_en'])? Str::title($input['hypertension_titre_en']):$currentHypertension->hypertension_titre_en;

        $input['hypertension_titre_fr_slug']=isset($input['hypertension_titre_fr'])? Str::slug('Médicardice'.' '.$input['hypertension_titre_fr']):$currentHypertension->hypertension_titre_fr_slug;
        $input['hypertension_titre_en_slug']=isset($input['hypertension_titre_en'])? Str::slug('Médicardice'.' '.$input['hypertension_titre_en']):$currentHypertension->hypertension_titre_en_slug;

        $input['hypertension_msg_fr']= $input['hypertension_msg_fr'] ?? $currentHypertension->hypertension_msg_fr;
        $input['hypertension_msg_en']= $input['hypertension_msg_en'] ?? $currentHypertension->hypertension_msg_en;

        $input['hypertension_description_fr']=isset($input['hypertension_msg_fr'])? Str::limit($this->transformer->toText($input['hypertension_msg_fr']),160):$currentHypertension->hypertension_description_fr;
        $input['hypertension_description_en']=isset($input['hypertension_msg_en'])? Str::limit($this->transformer->toText($input['hypertension_msg_en']),160):$currentHypertension->hypertension_description_en;

        //unset($input['photo']);

        return parent::update($input, $id);
    }

    /**
     * @param array $input
     * @return mixed
     */
    public function create(array $input)
    {
        $hypertension_titre_fr=Str::title($input['hypertension_titre_fr']);
        $hypertension_titre_fr_slug=Str::slug('Médicardice'.' '.$input['hypertension_titre_fr']);

        $hypertension_titre_en=Str::title($input['hypertension_titre_en']);
        $hypertension_titre_en_slug=Str::slug('Médicardice'.' '.$input['hypertension_titre_en']);

        $hypertension_description_fr= Str::limit($this->transformer->toText($input['hypertension_msg_fr']),160) ;
        $hypertension_description_en= Str::limit($this->transformer->toText($input['hypertension_msg_en']),160) ;

        $input['hypertension_titre_fr_slug']=$hypertension_titre_fr_slug;
        $input['hypertension_titre_en_slug']=$hypertension_titre_en_slug;

        $input['hypertension_titre_fr']=$hypertension_titre_fr;
        $input['hypertension_titre_en']=$hypertension_titre_en;

        $input['hypertension_description_fr']=$hypertension_description_fr;
        $input['hypertension_description_en']=$hypertension_description_en;

        unset($input['photo']);

        return parent::create($input);
    }

    public function findBySlug(string $slug){
        if($hypertension=Cache::get('hypertension-findBySlug')) return $hypertension;
        $hypertension= Hypertension::where('hypertension_titre_en_slug ',$slug)
            ->orWhere('hypertension_titre_fr_slug ',$slug)
            ->get();
        Cache::set('hypertension-findBySlug',$hypertension,Carbon::now()->hour(24));
        return $hypertension;
    }
    public function findAll(){
        if($hypertension=Cache::get('hypertension-list')) return $hypertension;
        $hypertension=Hypertension::orderBy('id','desc')->get();
        Cache::set('hypertension-list',$hypertension,Carbon::now()->hour(24));
        return  $hypertension;

    }


}
