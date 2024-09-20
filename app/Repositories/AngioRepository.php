<?php

namespace App\Repositories;



use App\Models\Angio;
use App\Models\Catheterization;
use App\Models\Monitoring;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Stevebauman\Hypertext\Transformer;

class AngioRepository extends BaseRepository
{

    protected $transformer;
    public function __construct(Angio $angio)
    {
        $this->model=$angio;
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
        $currentAngio=parent::findById($id);
        $input['angio_titre_fr']=isset($input['angio_titre_fr'])? Str::title($input['angio_titre_fr']):$currentAngio->angio_titre_fr;
        $input['angio_titre_en']=isset($input['angio_titre_en'])? Str::title($input['angio_titre_en']):$currentAngio->angio_titre_en;

        $input['angio_titre_fr_slug']=isset($input['angio_titre_fr'])? Str::slug('Médicardice'.' '.$input['angio_titre_fr']):$currentAngio->angio_titre_fr_slug;
        $input['angio_titre_en_slug']=isset($input['angio_titre_en'])? Str::slug('Médicardice'.' '.$input['angio_titre_en']):$currentAngio->angio_titre_en_slug;

        $input['angio_msg_fr']= $input['angio_msg_fr'] ?? $currentAngio->angio_msg_fr;
        $input['angio_msg_en']= $input['angio_msg_en'] ?? $currentAngio->angio_msg_en;

        $input['angio_description_fr']=isset($input['angio_msg_fr'])? Str::limit($this->transformer->toText($input['angio_msg_fr']),160):$currentAngio->angio_description_fr;
        $input['angio_description_en']=isset($input['angio_msg_en'])? Str::limit($this->transformer->toText($input['angio_msg_en']),160):$currentAngio->angio_description_en;

        //unset($input['photo']);

        return parent::update($input, $id);
    }

    /**
     * @param array $input
     * @return mixed
     */
    public function create(array $input)
    {
        $angio_titre_fr=Str::title($input['angio_titre_fr']);
        $angio_titre_fr_slug=Str::slug('Médicardice'.' '.$input['angio_titre_fr']);

        $angio_titre_en=Str::title($input['angio_titre_en']);
        $angio_titre_en_slug=Str::slug('Médicardice'.' '.$input['angio_titre_en']);

        $angio_description_fr= Str::limit($this->transformer->toText($input['angio_msg_fr']),160) ;
        $angio_description_en= Str::limit($this->transformer->toText($input['angio_msg_en']),160) ;

        $input['angio_titre_fr_slug']=$angio_titre_fr_slug;
        $input['angio_titre_en_slug']=$angio_titre_en_slug;

        $input['angio_titre_fr']=$angio_titre_fr;
        $input['angio_titre_en']=$angio_titre_en;

        $input['angio_description_fr']=$angio_description_fr;
        $input['angio_description_en']=$angio_description_en;

        unset($input['photo']);

        return parent::create($input);
    }

    public function findBySlug(string $slug){
        if($angio=Cache::get('angio-findBySlug')) return $angio;
        $angio= Angio::where('angio_titre_en_slug ',$slug)
            ->orWhere('angio_titre_fr_slug ',$slug)
            ->get();
        Cache::set('angio-findBySlug',$angio,Carbon::now()->hour(24));
        return $angio;
    }
    public function findAll(){
        if($angio=Cache::get('angio-list')) return $angio;
        $angio=Angio::orderBy('id','desc')->get();
        Cache::set('angio-list',$angio,Carbon::now()->hour(24));
        return  $angio;

    }


}
