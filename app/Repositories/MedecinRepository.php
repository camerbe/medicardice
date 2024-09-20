<?php

namespace App\Repositories;

use App\Models\Medecin;
use App\Models\doc;
use App\Models\Welcome;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Stevebauman\Hypertext\Transformer;

class MedecinRepository extends BaseRepository
{

    protected $transformer;
    public function __construct(Medecin $medecin)
    {
        $this->model=$medecin;
        $this->transformer = new Transformer();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function findById($id)
    {
        if($medecin=Cache::get('front-end-medecin-'.$id)) return $medecin;
        $medecin= parent::findById($id);
        Cache::set('front-end-medecin-'.$id,$medecin,Carbon::now()->hour(24));
        return $medecin;
        //return parent::findById($id);
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
        //dd($input);
        $currentDoc=parent::findById($id);

        $input['doc_titre_fr']=isset($input['doc_titre_fr'])? Str::title($input['doc_titre_fr']):$currentDoc->doc_titre_fr;
        $input['doc_titre_en']=isset($input['doc_titre_en'])? Str::title($input['doc_titre_en']):$currentDoc->doc_titre_en;

        $input['doc_titre_fr_slug']=isset($input['doc_titre_fr'])? Str::slug('Médicardice'.' '.$input['doc_titre_fr']):$currentDoc->doc_titre_fr_slug;
        $input['doc_titre_en_slug']=isset($input['doc_titre_en'])? Str::slug('Médicardice'.' '.$input['doc_titre_en']):$currentDoc->doc_titre_en_slug;

        $input['doc_msg_fr']= $input['doc_msg_fr'] ?? $currentDoc->doc_msg_fr;
        $input['doc_msg_en']= $input['doc_msg_en'] ?? $currentDoc->doc_msg_en;

        $input['doc_description_fr']=isset($input['doc_msg_fr'])? Str::limit($this->transformer->toText($input['doc_msg_fr']),160):$currentDoc->doc_description_fr;
        $input['doc_description_en']=isset($input['doc_msg_en'])? Str::limit($this->transformer->toText($input['doc_msg_en']),160):$currentDoc->doc_description_en;

        unset($input['photo']);

        return parent::update($input, $id);

    }

    /**
     * @param array $input
     * @return mixed
     */
    public function create(array $input)
    {
        $doc_titre_fr=Str::title($input['doc_titre_fr']);
        $doc_titre_fr_slug=Str::slug('Médicardice'.' '.$input['doc_titre_fr']);

        $doc_titre_en=Str::title($input['doc_titre_en']);
        $doc_titre_en_slug=Str::slug('Médicardice'.' '.$input['doc_titre_en']);

        $doc_description_fr= Str::limit($this->transformer->toText($input['doc_msg_fr']),160) ;
        $doc_description_en= Str::limit($this->transformer->toText($input['doc_msg_en']),160) ;

        $input['doc_titre_fr_slug']=$doc_titre_fr_slug;
        $input['doc_titre_en_slug']=$doc_titre_en_slug;

        $input['doc_titre_fr']=$doc_titre_fr;
        $input['doc_titre_en']=$doc_titre_en;

        $input['doc_description_fr']=$doc_description_fr;
        $input['doc_description_en']=$doc_description_en;

        unset($input['photo']);

        return parent::create($input);
    }

    public function findBySlug(string $slug){

        if($medecin=Cache::get('front-end-medecin-findBySlug')) return $medecin;
        $medecin= Medecin::where('doc_titre_en_slug ',$slug)
            ->orWhere('doc_titre_fr_slug ',$slug)
            ->get();
        Cache::set('front-end-medecin-findBySlug',$medecin,Carbon::now()->hour(24));
        return $medecin;
    }
    public function findAll(){
        if($medecin=Cache::get('front-end-medecin-list')) return $medecin;

        $medecin=Medecin::orderBy('id','desc')->get();
        Cache::set('front-end-medecin-list',$medecin,Carbon::now()->hour(24));
        return  $medecin;

    }


}
