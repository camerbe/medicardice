<?php

namespace App\Repositories;


use App\Models\Echocardiographie;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Stevebauman\Hypertext\Transformer;

class EchocardiographieRepository extends BaseRepository
{

    protected $transformer;
    public function __construct(Echocardiographie $echocardiographie)
    {
        $this->model=$echocardiographie;
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
        $currentEchocardiography=parent::findById($id);
        $input['echocardiography_titre_fr']=isset($input['echocardiography_titre_fr'])? Str::title($input['echocardiography_titre_fr']):$currentEchocardiography->echocardiography_titre_fr;
        $input['echocardiography_titre_en']=isset($input['echocardiography_titre_en'])? Str::title($input['echocardiography_titre_en']):$currentEchocardiography->echocardiography_titre_en;

        $input['echocardiography_titre_fr_slug']=isset($input['echocardiography_titre_fr'])? Str::slug('Médicardice'.' '.$input['echocardiography_titre_fr']):$currentEchocardiography->echocardiography_titre_fr_slug;
        $input['echocardiography_titre_en_slug']=isset($input['echocardiography_titre_en'])? Str::slug('Médicardice'.' '.$input['echocardiography_titre_en']):$currentEchocardiography->echocardiography_titre_en_slug;

        $input['echocardiography_msg_fr']= $input['echocardiography_msg_fr'] ?? $currentEchocardiography->echocardiography_msg_fr;
        $input['echocardiography_msg_en']= $input['echocardiography_msg_en'] ?? $currentEchocardiography->echocardiography_msg_en;

        $input['echocardiography_description_fr']=isset($input['echocardiography_msg_fr'])? Str::limit($this->transformer->toText($input['echocardiography_msg_fr']),160):$currentEchocardiography->echocardiography_description_fr;
        $input['echocardiography_description_en']=isset($input['echocardiography_msg_en'])? Str::limit($this->transformer->toText($input['echocardiography_msg_en']),160):$currentEchocardiography->echocardiography_description_en;

        //unset($input['photo']);

        return parent::update($input, $id);
    }

    /**
     * @param array $input
     * @return mixed
     */
    public function create(array $input)
    {
        $echocardiography_titre_fr=Str::title($input['echocardiography_titre_fr']);
        $echocardiography_titre_fr_slug=Str::slug('Médicardice'.' '.$input['echocardiography_titre_fr']);

        $echocardiography_titre_en=Str::title($input['echocardiography_titre_en']);
        $echocardiography_titre_en_slug=Str::slug('Médicardice'.' '.$input['echocardiography_titre_en']);

        $echocardiography_description_fr= Str::limit($this->transformer->toText($input['echocardiography_msg_fr']),160) ;
        $echocardiography_description_en= Str::limit($this->transformer->toText($input['echocardiography_msg_en']),160) ;

        $input['echocardiography_titre_fr_slug']=$echocardiography_titre_fr_slug;
        $input['echocardiography_titre_en_slug']=$echocardiography_titre_en_slug;

        $input['echocardiography_titre_fr']=$echocardiography_titre_fr;
        $input['echocardiography_titre_en']=$echocardiography_titre_en;

        $input['echocardiography_description_fr']=$echocardiography_description_fr;
        $input['echocardiography_description_en']=$echocardiography_description_en;

        unset($input['photo']);

        return parent::create($input);
    }

    public function findBySlug(string $slug){
        if($echocardiographie=Cache::get('echocardiographie-findBySlug')) return $echocardiographie;
        $echocardiographie= Echocardiographie::where('echocardiography_titre_en_slug ',$slug)
            ->orWhere('echocardiography_titre_fr_slug ',$slug)
            ->get();
        Cache::set('echocardiographie-findBySlug',$echocardiographie,Carbon::now()->hour(24));
        return $echocardiographie;
    }
    public function findAll(){
        if($echocardiographie=Cache::get('echocardiographie-list')) return $echocardiographie;

        $echocardiographie=Echocardiographie::orderBy('id','desc')->get();
        Cache::set('echocardiographie-list',$echocardiographie,Carbon::now()->hour(24));
        return  $echocardiographie;

    }


}
