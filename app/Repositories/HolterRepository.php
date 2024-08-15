<?php

namespace App\Repositories;



use App\Models\Holter;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Stevebauman\Hypertext\Transformer;

class HolterRepository extends BaseRepository
{

    protected $transformer;
    public function __construct(Holter $holter)
    {
        $this->model=$holter;
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
        $currentHolter=parent::findById($id);
        $input['holter_titre_fr']=isset($input['holter_titre_fr'])? Str::title($input['holter_titre_fr']):$currentholter->holter_titre_fr;
        $input['holter_titre_en']=isset($input['holter_titre_en'])? Str::title($input['holter_titre_en']):$currentholter->holter_titre_en;

        $input['holter_titre_fr_slug']=isset($input['holter_titre_fr'])? Str::slug('Médicardice'.' '.$input['holter_titre_fr']):$currentholter->holter_titre_fr_slug;
        $input['holter_titre_en_slug']=isset($input['holter_titre_en'])? Str::slug('Médicardice'.' '.$input['holter_titre_en']):$currentholter->holter_titre_en_slug;

        $input['holter_msg_fr']= $input['holter_msg_fr'] ?? $currentholter->holter_msg_fr;
        $input['holter_msg_en']= $input['holter_msg_en'] ?? $currentholter->holter_msg_en;

        $input['holter_description_fr']=isset($input['holter_msg_fr'])? Str::limit($this->transformer->toText($input['holter_msg_fr']),160):$currentholter->holter_description_fr;
        $input['holter_description_en']=isset($input['holter_msg_en'])? Str::limit($this->transformer->toText($input['holter_msg_en']),160):$currentholter->holter_description_en;

        //unset($input['photo']);

        return parent::update($input, $id);
    }

    /**
     * @param array $input
     * @return mixed
     */
    public function create(array $input)
    {
        $holter_titre_fr=Str::title($input['holter_titre_fr']);
        $holter_titre_fr_slug=Str::slug('Médicardice'.' '.$input['holter_titre_fr']);

        $holter_titre_en=Str::title($input['holter_titre_en']);
        $holter_titre_en_slug=Str::slug('Médicardice'.' '.$input['holter_titre_en']);

        $holter_description_fr= Str::limit($this->transformer->toText($input['holter_msg_fr']),160) ;
        $holter_description_en= Str::limit($this->transformer->toText($input['holter_msg_en']),160) ;

        $input['holter_titre_fr_slug']=$holter_titre_fr_slug;
        $input['holter_titre_en_slug']=$holter_titre_en_slug;

        $input['holter_titre_fr']=$holter_titre_fr;
        $input['holter_titre_en']=$holter_titre_en;

        $input['holter_description_fr']=$holter_description_fr;
        $input['holter_description_en']=$holter_description_en;

        unset($input['photo']);

        return parent::create($input);
    }

    public function findBySlug(string $slug){
        if($holter=Cache::get('holter-findBySlug')) return $holter;
        $holter= Holter::where('holter_titre_en_slug ',$slug)
            ->orWhere('holter_titre_fr_slug ',$slug)
            ->get();
        Cache::set('holter-findBySlug',$holter,Carbon::now()->hour(24));
        return $holter;
    }
    public function findAll(){
        if($holter=Cache::get('holter-list')) return $holter;
        $holter=Holter::orderBy('id','desc')->get();
        Cache::set('holter-list',$holter,Carbon::now()->hour(24));
        return  $holter;

    }


}
