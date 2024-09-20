<?php

namespace App\Repositories;



use App\Models\Coronaryangioplastie;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Stevebauman\Hypertext\Transformer;

class CoronaryangioplastyRepository extends BaseRepository
{

    protected $transformer;
    public function __construct(Coronaryangioplastie $coronaryangioplastie)
    {
        $this->model=$coronaryangioplastie;
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
        $currentCoronaryangioplasty=parent::findById($id);
        $input['coronaryangioplasty_titre_fr']=isset($input['coronaryangioplasty_titre_fr'])? Str::title($input['coronaryangioplasty_titre_fr']):$currentCoronaryangioplasty->coronaryangioplasty_titre_fr;
        $input['coronaryangioplasty_titre_en']=isset($input['coronaryangioplasty_titre_en'])? Str::title($input['coronaryangioplasty_titre_en']):$currentCoronaryangioplasty->coronaryangioplasty_titre_en;

        $input['coronaryangioplasty_titre_fr_slug']=isset($input['coronaryangioplasty_titre_fr'])? Str::slug('Médicardice'.' '.$input['coronaryangioplasty_titre_fr']):$currentCoronaryangioplasty->coronaryangioplasty_titre_fr_slug;
        $input['coronaryangioplasty_titre_en_slug']=isset($input['coronaryangioplasty_titre_en'])? Str::slug('Médicardice'.' '.$input['coronaryangioplasty_titre_en']):$currentCoronaryangioplasty->coronaryangioplasty_titre_en_slug;

        $input['coronaryangioplasty_msg_fr']= $input['coronaryangioplasty_msg_fr'] ?? $currentCoronaryangioplasty->coronaryangioplasty_msg_fr;
        $input['coronaryangioplasty_msg_en']= $input['coronaryangioplasty_msg_en'] ?? $currentCoronaryangioplasty->coronaryangioplasty_msg_en;

        $input['coronaryangioplasty_description_fr']=isset($input['coronaryangioplasty_msg_fr'])? Str::limit($this->transformer->toText($input['coronaryangioplasty_msg_fr']),160):$currentCoronaryangioplasty->coronaryangioplasty_description_fr;
        $input['coronaryangioplasty_description_en']=isset($input['coronaryangioplasty_msg_en'])? Str::limit($this->transformer->toText($input['coronaryangioplasty_msg_en']),160):$currentCoronaryangioplasty->coronaryangioplasty_description_en;

        //unset($input['photo']);

        return parent::update($input, $id);
    }

    /**
     * @param array $input
     * @return mixed
     */
    public function create(array $input)
    {
        $coronaryangioplasty_titre_fr=Str::title($input['coronaryangioplasty_titre_fr']);
        $coronaryangioplasty_titre_fr_slug=Str::slug('Médicardice'.' '.$input['coronaryangioplasty_titre_fr']);

        $coronaryangioplasty_titre_en=Str::title($input['coronaryangioplasty_titre_en']);
        $coronaryangioplasty_titre_en_slug=Str::slug('Médicardice'.' '.$input['coronaryangioplasty_titre_en']);

        $coronaryangioplasty_description_fr= Str::limit($this->transformer->toText($input['coronaryangioplasty_msg_fr']),160) ;
        $coronaryangioplasty_description_en= Str::limit($this->transformer->toText($input['coronaryangioplasty_msg_en']),160) ;

        $input['coronaryangioplasty_titre_fr_slug']=$coronaryangioplasty_titre_fr_slug;
        $input['coronaryangioplasty_titre_en_slug']=$coronaryangioplasty_titre_en_slug;

        $input['coronaryangioplasty_titre_fr']=$coronaryangioplasty_titre_fr;
        $input['coronaryangioplasty_titre_en']=$coronaryangioplasty_titre_en;

        $input['coronaryangioplasty_description_fr']=$coronaryangioplasty_description_fr;
        $input['coronaryangioplasty_description_en']=$coronaryangioplasty_description_en;

        unset($input['photo']);

        return parent::create($input);
    }

    public function findBySlug(string $slug){
        if($holter=Cache::get('coronaryangioplasty-findBySlug')) return $holter;
        $holter= Coronaryangioplastie::where('coronaryangioplasty_titre_en_slug ',$slug)
            ->orWhere('coronaryangioplasty_titre_fr_slug ',$slug)
            ->get();
        Cache::set('coronaryangioplasty-findBySlug',$holter,Carbon::now()->hour(24));
        return $holter;
    }
    public function findAll(){
        if($holter=Cache::get('coronaryangioplasty-list')) return $holter;
        $holter=Coronaryangioplastie::orderBy('id','desc')->get();
        Cache::set('coronaryangioplasty-list',$holter,Carbon::now()->hour(24));
        return  $holter;

    }


}
