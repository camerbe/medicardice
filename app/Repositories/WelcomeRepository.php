<?php

namespace App\Repositories;

use App\Models\Welcome;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Stevebauman\Hypertext\Transformer;

class WelcomeRepository extends BaseRepository
{
    protected $transformer;
    public function __construct(Welcome $welcome)
    {
        $this->model=$welcome;
        $this->transformer = new Transformer();
    }

    public function findById($id)
    {
        return parent::findById($id);
    }

    public function delete($id)
    {
        return parent::delete($id);
    }

    public function update(array $input, $id)
    {
        $currentWelcome=$this->findById($id)->first();

        $input['welcome_titre_fr']=isset($input['welcome_titre_fr'])? Str::title($input['welcome_titre_fr']):$currentWelcome->welcome_titre_fr;
        $input['welcome_titre_en']=isset($input['welcome_titre_en'])? Str::title($input['welcome_titre_en']):$currentWelcome->welcome_titre_en;

        //$input['welcome_msg_fr']=isset($input['welcome_msg_fr'])?? $input['welcome_msg_fr']:$currentWelcome->welcome_msg_fr;
        //$input['welcome_msg_en']=isset($input['welcome_msg_en'])?? $input['welcome_msg_en']:$currentWelcome->welcome_msg_en;

        $input['welcome_msg_fr']= $input['welcome_msg_fr'] ?? $currentWelcome->welcome_msg_fr;
        $input['welcome_msg_en']= $input['welcome_msg_en'] ?? $currentWelcome->welcome_msg_en;

        $input['welcome_description_fr']=isset($input['welcome_description_fr'])? Str::limit($this->transformer->toText($input['welcome_msg_fr']),160):$currentWelcome->welcome_description_fr;
        $input['welcome_description_en']=isset($input['welcome_description_en'])? Str::limit($this->transformer->toText($input['welcome_msg_en']),160):$currentWelcome->welcome_description_en;

        $input['welcome_titre_fr_slug']=isset($input['welcome_titre_fr_slug'])? Str::slug('Médicardice'.' '.$input['welcome_titre_fr']):$currentWelcome->welcome_titre_fr_slug;
        $input['welcome_titre_en_slug']=isset($input['welcome_titre_en_slug'])? Str::slug('Médicardice'.' '.$input['welcome_titre_en']):$currentWelcome->welcome_titre_en_slug;

        unset($input['photo']);
        return parent::update($input, $id);
    }

    public function create(array $input)
    {

        $welcome_titre_fr=Str::title($input['welcome_titre_fr']);
        $welcome_titre_fr_slug=Str::slug('Médicardice'.' '.$input['welcome_titre_fr']);

        $welcome_titre_en=Str::title($input['welcome_titre_en']);
        $welcome_titre_en_slug=Str::slug('Médicardice'.' '.$input['welcome_titre_en']);

        $welcome_description_fr= Str::limit($this->transformer->toText($input['welcome_msg_fr']),160) ;
        $welcome_description_en= Str::limit($this->transformer->toText($input['welcome_msg_en']),160) ;

        $input['welcome_titre_fr_slug']=$welcome_titre_fr_slug;
        $input['welcome_titre_en_slug']=$welcome_titre_en_slug;

        $input['welcome_titre_fr']=$welcome_titre_fr;
        $input['welcome_titre_en']=$welcome_titre_en;

        $input['welcome_description_fr']=$welcome_description_fr;
        $input['welcome_description_en']=$welcome_description_en;

        //dd($input['photo']);
        unset($input['photo']);
        return parent::create($input);



    }
    public function findBySlug(string $slug){
        if($welcome=Cache::get('welcome-list')) return $welcome;
        $welcome= Welcome::where('welcome_titre_en_slug',$slug)
            ->orWhere('welcome_titre_fr_slug',$slug)
            ->get();
        Cache::set('welcome-list',$welcome,Carbon::now()->hour(24));
        return $welcome;
    }
    public function findAll(){
        Cache::forget('welcome-list');
       /*return  DB::table('welcomes')
                ->join('media','welcomes.id','=','media.model_id')
                ->select('*')
                ->get();*/
       if($welcome=Cache::get('welcome-list')) return $welcome;
        $welcome=Welcome::orderBy('id','desc')->get();
        //$welcome->getMedia('welcome');
        Cache::set('welcome-list',$welcome,Carbon::now()->hour(24));
       return  $welcome;
    }
    public function getLastWelcome(){
        return Welcome::last()->getFirstMedia();
    }

}
