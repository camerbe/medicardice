<?php

namespace App\Repositories;



use App\Models\Chest;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Stevebauman\Hypertext\Transformer;

class ChestRepository extends BaseRepository
{

    protected $transformer;
    public function __construct(Chest $chest)
    {
        $this->model=$chest;
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
        $currentChest=parent::findById($id);
        $input['chest_titre_fr']=isset($input['chest_titre_fr'])? Str::title($input['chest_titre_fr']):$currentChest->chest_titre_fr;
        $input['chest_titre_en']=isset($input['chest_titre_en'])? Str::title($input['chest_titre_en']):$currentChest->chest_titre_en;

        $input['chest_titre_fr_slug']=isset($input['chest_titre_fr'])? Str::slug('Médicardice'.' '.$input['chest_titre_fr']):$currentChest->chest_titre_fr_slug;
        $input['chest_titre_en_slug']=isset($input['chest_titre_en'])? Str::slug('Médicardice'.' '.$input['chest_titre_en']):$currentChest->chest_titre_en_slug;

        $input['chest_msg_fr']= $input['chest_msg_fr'] ?? $currentChest->chest_msg_fr;
        $input['chest_msg_en']= $input['chest_msg_en'] ?? $currentChest->chest_msg_en;

        $input['chest_description_fr']=isset($input['chest_msg_fr'])? Str::limit($this->transformer->toText($input['chest_msg_fr']),160):$currentChest->chest_description_fr;
        $input['chest_description_en']=isset($input['chest_msg_en'])? Str::limit($this->transformer->toText($input['chest_msg_en']),160):$currentChest->chest_description_en;

        //unset($input['photo']);

        return parent::update($input, $id);
    }

    /**
     * @param array $input
     * @return mixed
     */
    public function create(array $input)
    {
        $chest_titre_fr=Str::title($input['chest_titre_fr']);
        $chest_titre_fr_slug=Str::slug('Médicardice'.' '.$input['chest_titre_fr']);

        $chest_titre_en=Str::title($input['chest_titre_en']);
        $chest_titre_en_slug=Str::slug('Médicardice'.' '.$input['chest_titre_en']);

        $chest_description_fr= Str::limit($this->transformer->toText($input['chest_msg_fr']),160) ;
        $chest_description_en= Str::limit($this->transformer->toText($input['chest_msg_en']),160) ;

        $input['chest_titre_fr_slug']=$chest_titre_fr_slug;
        $input['chest_titre_en_slug']=$chest_titre_en_slug;

        $input['chest_titre_fr']=$chest_titre_fr;
        $input['chest_titre_en']=$chest_titre_en;

        $input['chest_description_fr']=$chest_description_fr;
        $input['chest_description_en']=$chest_description_en;

        unset($input['photo']);

        return parent::create($input);
    }

    public function findBySlug(string $slug){
        if($chest=Cache::get('chest-findBySlug')) return $chest;
        $chest= Chest::where('chest_titre_en_slug ',$slug)
            ->orWhere('chest_titre_fr_slug ',$slug)
            ->get();
        Cache::set('chest-findBySlug',$chest,Carbon::now()->hour(24));
        return $chest;
    }
    public function findAll(){
        //Cache::forget('chest-list');
        if($chest=Cache::get('chest-list')) return $chest;
        $chest=Chest::orderBy('id','desc')->get();
        Cache::set('chest-list',$chest,Carbon::now()->hour(24));
        return  $chest;

    }


}
