<?php

namespace App\Repositories;

use App\Models\Electrocardiographie;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Stevebauman\Hypertext\Transformer;

class ElectrocardiographieRepository extends BaseRepository
{

    protected $transformer;
    public function __construct(Electrocardiographie $electrocardiographie)
    {
        $this->model=$electrocardiographie;
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
        $currentElectrocardiography_=parent::findById($id);
        $input['electrocardiography_titre_fr']=isset($input['electrocardiography_titre_fr'])? Str::title($input['electrocardiography_titre_fr']):$currentElectrocardiography_->electrocardiography_titre_fr;
        $input['electrocardiography_titre_en']=isset($input['electrocardiography_titre_en'])? Str::title($input['electrocardiography_titre_en']):$currentElectrocardiography_->electrocardiography_titre_en;

        $input['electrocardiography_titre_fr_slug']=isset($input['electrocardiography_titre_fr'])? Str::slug('Médicardice'.' '.$input['electrocardiography_titre_fr']):$currentElectrocardiography_->electrocardiography_titre_fr_slug;
        $input['electrocardiography_titre_en_slug']=isset($input['electrocardiography_titre_en'])? Str::slug('Médicardice'.' '.$input['electrocardiography_titre_en']):$currentElectrocardiography_->electrocardiography_titre_en_slug;

        $input['electrocardiography_msg_fr']= $input['electrocardiography_msg_fr'] ?? $currentElectrocardiography_->electrocardiography_msg_fr;
        $input['electrocardiography_msg_en']= $input['electrocardiography_msg_en'] ?? $currentElectrocardiography_->electrocardiography_msg_en;

        $input['electrocardiography_description_fr']=isset($input['electrocardiography_msg_fr'])? Str::limit($this->transformer->toText($input['electrocardiography_msg_fr']),160):$currentElectrocardiography_->electrocardiography_description_fr;
        $input['electrocardiography_description_en']=isset($input['electrocardiography_msg_en'])? Str::limit($this->transformer->toText($input['electrocardiography_msg_en']),160):$currentElectrocardiography_->electrocardiography_description_en;

        //unset($input['photo']);

        return parent::update($input, $id);
    }

    /**
     * @param array $input
     * @return mixed
     */
    public function create(array $input)
    {
        $electrocardiography_titre_fr=Str::title($input['electrocardiography_titre_fr']);
        $electrocardiography_titre_fr_slug=Str::slug('Médicardice'.' '.$input['electrocardiography_titre_fr']);

        $electrocardiography_titre_en=Str::title($input['electrocardiography_titre_en']);
        $electrocardiography_titre_en_slug=Str::slug('Médicardice'.' '.$input['electrocardiography_titre_en']);

        $electrocardiography_description_fr= Str::limit($this->transformer->toText($input['electrocardiography_msg_fr']),160) ;
        $electrocardiography_description_en= Str::limit($this->transformer->toText($input['electrocardiography_msg_en']),160) ;

        $input['electrocardiography_titre_fr_slug']=$electrocardiography_titre_fr_slug;
        $input['electrocardiography_titre_en_slug']=$electrocardiography_titre_en_slug;

        $input['electrocardiography_titre_fr']=$electrocardiography_titre_fr;
        $input['electrocardiography_titre_en']=$electrocardiography_titre_en;

        $input['electrocardiography_description_fr']=$electrocardiography_description_fr;
        $input['electrocardiography_description_en']=$electrocardiography_description_en;

        unset($input['photo']);

        return parent::create($input);
    }

    public function findBySlug(string $slug){
        if($electrocardiographie=Cache::get('electrocardiography-findBySlug')) return $electrocardiographie;
        $electrocardiographie= Electrocardiographie::where('electrocardiography_titre_en_slug ',$slug)
            ->orWhere('electrocardiography_titre_fr_slug ',$slug)
            ->get();
        Cache::set('electrocardiography-findBySlug',$electrocardiographie,Carbon::now()->hour(24));
        return $electrocardiographie;
    }
    public function findAll(){
        if($electrocardiographie=Cache::get('electrocardiography-list')) return $electrocardiographie;

        $electrocardiographie=Electrocardiographie::orderBy('id','desc')->get();
        Cache::set('electrocardiography-list',$electrocardiographie,Carbon::now()->hour(24));
        return  $electrocardiographie;

    }


}
