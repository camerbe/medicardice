<?php

namespace App\Repositories;



use App\Models\Monitoring;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Stevebauman\Hypertext\Transformer;

class MonitoringRepository extends BaseRepository
{

    protected $transformer;
    public function __construct(Monitoring $monitoring)
    {
        $this->model=$monitoring;
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
        $currentMonitoring=parent::findById($id);
        $input['monitoring_titre_fr']=isset($input['monitoring_titre_fr'])? Str::title($input['monitoring_titre_fr']):$currentMonitoring->monitoring_titre_fr;
        $input['monitoring_titre_en']=isset($input['monitoring_titre_en'])? Str::title($input['monitoring_titre_en']):$currentMonitoring->monitoring_titre_en;

        $input['monitoring_titre_fr_slug']=isset($input['monitoring_titre_fr'])? Str::slug('Médicardice'.' '.$input['monitoring_titre_fr']):$currentMonitoring->monitoring_titre_fr_slug;
        $input['monitoring_titre_en_slug']=isset($input['monitoring_titre_en'])? Str::slug('Médicardice'.' '.$input['monitoring_titre_en']):$currentMonitoring->monitoring_titre_en_slug;

        $input['monitoring_msg_fr']= $input['monitoring_msg_fr'] ?? $currentMonitoring->monitoring_msg_fr;
        $input['monitoring_msg_en']= $input['monitoring_msg_en'] ?? $currentMonitoring->monitoring_msg_en;

        $input['monitoring_description_fr']=isset($input['monitoring_msg_fr'])? Str::limit($this->transformer->toText($input['monitoring_msg_fr']),160):$currentMonitoring->monitoring_description_fr;
        $input['monitoring_description_en']=isset($input['monitoring_msg_en'])? Str::limit($this->transformer->toText($input['monitoring_msg_en']),160):$currentMonitoring->monitoring_description_en;

        //unset($input['photo']);

        return parent::update($input, $id);
    }

    /**
     * @param array $input
     * @return mixed
     */
    public function create(array $input)
    {
        $monitoring_titre_fr=Str::title($input['monitoring_titre_fr']);
        $monitoring_titre_fr_slug=Str::slug('Médicardice'.' '.$input['monitoring_titre_fr']);

        $monitoring_titre_en=Str::title($input['monitoring_titre_en']);
        $monitoring_titre_en_slug=Str::slug('Médicardice'.' '.$input['monitoring_titre_en']);

        $monitoring_description_fr= Str::limit($this->transformer->toText($input['monitoring_msg_fr']),160) ;
        $monitoring_description_en= Str::limit($this->transformer->toText($input['monitoring_msg_en']),160) ;

        $input['monitoring_titre_fr_slug']=$monitoring_titre_fr_slug;
        $input['monitoring_titre_en_slug']=$monitoring_titre_en_slug;

        $input['monitoring_titre_fr']=$monitoring_titre_fr;
        $input['monitoring_titre_en']=$monitoring_titre_en;

        $input['monitoring_description_fr']=$monitoring_description_fr;
        $input['monitoring_description_en']=$monitoring_description_en;

        unset($input['photo']);

        return parent::create($input);
    }

    public function findBySlug(string $slug){
        if($holter=Cache::get('monitoring-findBySlug')) return $holter;
        $holter= Monitoring::where('monitoring_titre_en_slug ',$slug)
            ->orWhere('monitoring_titre_fr_slug ',$slug)
            ->get();
        Cache::set('monitoring-findBySlug',$holter,Carbon::now()->hour(24));
        return $holter;
    }
    public function findAll(){
        if($holter=Cache::get('monitoring-list')) return $holter;
        $holter=Monitoring::orderBy('id','desc')->get();
        Cache::set('monitoring-list',$holter,Carbon::now()->hour(24));
        return  $holter;

    }


}
