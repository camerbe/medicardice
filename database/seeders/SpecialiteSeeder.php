<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SpecialiteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('specialites')->insert([
            'specialty_name'=>'Cardiologie',
            'description'=>"Spécialité qui traite des maladies du cœur et du système circulatoire. Les cardiologues diagnostiquent.",
        ]);
        DB::table('specialites')->insert([
            'specialty_name'=>'Neurologie',
            'description'=>"Se concentre sur le diagnostic et le traitement des maladies du système nerveux, incluant le cerveau etc...",
        ]);
        DB::table('specialites')->insert([
            'specialty_name'=>'Pédiatrie',
            'description'=>"Spécialité médicale axée sur les soins de santé des nourrissons, des enfants et des adolescents.",
        ]);
    }
}
