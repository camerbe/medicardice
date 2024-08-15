<?php

namespace App\Repositories;



use App\Models\Stress;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Stevebauman\Hypertext\Transformer;

class StressRepository extends BaseRepository
{

    protected $transformer;
    public function __construct(Stress $stress)
    {
        $this->model=$stress;
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
        $currentStress=parent::findById($id);
        $input['stress_titre_fr']=isset($input['stress_titre_fr'])? Str::title($input['stress_titre_fr']):$currentStress->stress_titre_fr;
        $input['stress_titre_en']=isset($input['stress_titre_en'])? Str::title($input['stress_titre_en']):$currentStress->stress_titre_en;

        $input['stress_titre_fr_slug']=isset($input['stress_titre_fr'])? Str::slug('Médicardice'.' '.$input['stress_titre_fr']):$currentStress->stress_titre_fr_slug;
        $input['stress_titre_en_slug']=isset($input['stress_titre_en'])? Str::slug('Médicardice'.' '.$input['stress_titre_en']):$currentStress->stress_titre_en_slug;

        $input['stress_msg_fr']= $input['stress_msg_fr'] ?? $currentStress->stress_msg_fr;
        $input['stress_msg_en']= $input['stress_msg_en'] ?? $currentStress->stress_msg_en;

        $input['stress_description_fr']=isset($input['stress_msg_fr'])? Str::limit($this->transformer->toText($input['stress_msg_fr']),160):$currentStress->stress_description_fr;
        $input['stress_description_en']=isset($input['stress_msg_en'])? Str::limit($this->transformer->toText($input['stress_msg_en']),160):$currentStress->stress_description_en;

        //unset($input['photo']);

        return parent::update($input, $id);
    }

    /**
     * @param array $input
     * @return mixed
     */
    public function create(array $input)
    {
        $stress_titre_fr=Str::title($input['stress_titre_fr']);
        $stress_titre_fr_slug=Str::slug('Médicardice'.' '.$input['stress_titre_fr']);

        $stress_titre_en=Str::title($input['stress_titre_en']);
        $stress_titre_en_slug=Str::slug('Médicardice'.' '.$input['stress_titre_en']);

        $stress_description_fr= Str::limit($this->transformer->toText($input['stress_msg_fr']),160) ;
        $stress_description_en= Str::limit($this->transformer->toText($input['stress_msg_en']),160) ;

        $input['stress_titre_fr_slug']=$stress_titre_fr_slug;
        $input['stress_titre_en_slug']=$stress_titre_en_slug;

        $input['stress_titre_fr']=$stress_titre_fr;
        $input['stress_titre_en']=$stress_titre_en;

        $input['stress_description_fr']=$stress_description_fr;
        $input['stress_description_en']=$stress_description_en;

        unset($input['photo']);

        return parent::create($input);
    }

    public function findBySlug(string $slug){
        if($stress=Cache::get('stress-findBySlug')) return $stress;
        $stress= Stress::where('stress_titre_en_slug ',$slug)
            ->orWhere('stress_titre_fr_slug ',$slug)
            ->get();
        Cache::set('stress-findBySlug',$stress,Carbon::now()->hour(24));
        return $stress;
    }
    public function findAll(){
        if($stress=Cache::get('stress-list')) return $stress;
        $stress=Stress::orderBy('id','desc')->get();
        Cache::set('stress-list',$stress,Carbon::now()->hour(24));
        return  $stress;

    }


}
