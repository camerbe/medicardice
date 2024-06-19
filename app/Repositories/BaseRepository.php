<?php

namespace App\Repositories;

class BaseRepository
{
    protected $model;
    public function findById($id){
        return $this->model->findOrFail($id);
    }
    public function delete($id){
        return $this->findById($id)->delete();
    }
    public function update(Array $input,$id){
        return $this->findById($id)->update($input);
    }
    public function create(Array $input){
        return $this->model->create($input);
    }

}
