<?php

namespace App\Repositories;

use App\Models\Consultation;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Stevebauman\Hypertext\Transformer;

class ConsultationRepository extends BaseRepository
{

    protected $transformer;
    public function __construct(Consultation $consultation)
    {
        $this->model=$consultation;
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
        $currentCons_=parent::findById($id);
        $input['cons_titre_fr']=isset($input['cons_titre_fr'])? Str::title($input['cons_titre_fr']):$currentCons_->cons_titre_fr;
        $input['cons_titre_en']=isset($input['cons_titre_en'])? Str::title($input['cons_titre_en']):$currentCons_->cons_titre_en;

        $input['cons_titre_fr_slug']=isset($input['cons_titre_fr'])? Str::slug('Médicardice'.' '.$input['cons_titre_fr']):$currentCons_->cons_titre_fr_slug;
        $input['cons_titre_en_slug']=isset($input['cons_titre_en'])? Str::slug('Médicardice'.' '.$input['cons_titre_en']):$currentCons_->cons_titre_en_slug;

        $input['cons_msg_fr']= $input['cons_msg_fr'] ?? $currentCons_->cons_msg_fr;
        $input['cons_msg_en']= $input['cons_msg_en'] ?? $currentCons_->cons_msg_en;

        $input['cons_description_fr']=isset($input['cons_msg_fr'])? Str::limit($this->transformer->toText($input['cons_msg_fr']),160):$currentCons_->cons_description_fr;
        $input['cons_description_en']=isset($input['cons_msg_en'])? Str::limit($this->transformer->toText($input['cons_msg_en']),160):$currentCons_->cons_description_en;

        //unset($input['photo']);

        return parent::update($input, $id);
    }

    /**
     * @param array $input
     * @return mixed
     */
    public function create(array $input)
    {
        $cons_titre_fr=Str::title($input['cons_titre_fr']);
        $cons_titre_fr_slug=Str::slug('Médicardice'.' '.$input['cons_titre_fr']);

        $cons_titre_en=Str::title($input['cons_titre_en']);
        $cons_titre_en_slug=Str::slug('Médicardice'.' '.$input['cons_titre_en']);

        $cons_description_fr= Str::limit($this->transformer->toText($input['cons_msg_fr']),160) ;
        $cons_description_en= Str::limit($this->transformer->toText($input['cons_msg_en']),160) ;

        $input['cons_titre_fr_slug']=$cons_titre_fr_slug;
        $input['cons_titre_en_slug']=$cons_titre_en_slug;

        $input['cons_titre_fr']=$cons_titre_fr;
        $input['cons_titre_en']=$cons_titre_en;

        $input['cons_description_fr']=$cons_description_fr;
        $input['cons_description_en']=$cons_description_en;

        unset($input['photo']);

        return parent::create($input);
    }

    public function findBySlug(string $slug){
        if($consultation=Cache::get('consultation-findBySlug')) return $consultation;
        $consultation= Consultation::where('cons_titre_en_slug ',$slug)
            ->orWhere('cons_titre_fr_slug ',$slug)
            ->get();
        Cache::set('consultation-findBySlug',$consultation,Carbon::now()->hour(24));
        return $consultation;
    }
    public function findAll(){
        if($consultation=Cache::get('consultation-list')) return $consultation;

        $consultation=Consultation::orderBy('id','desc')->get();
        Cache::set('consultation-list',$consultation,Carbon::now()->hour(24));
        return  $consultation;

    }


}
