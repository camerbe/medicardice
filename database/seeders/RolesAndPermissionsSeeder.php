<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole=Role::find(1);
        $secretaryRole=Role::find(2);
        $doctorRole=Role::find(3);
        $patientRole=Role::find(4);
        //
        $lastInsertedID=DB::table('permissions')->insertGetId([
            'permission_name'=>'view_patient_info',
            'description'=>'Voir les informations des patients'

        ]);
        DB::table('permission_role')->insert([
            'role_id'=>$adminRole->id,
            'permission_id'=>$lastInsertedID

        ]);
        DB::table('permission_role')->insert([
            'role_id'=>$secretaryRole->id,
            'permission_id'=>$lastInsertedID

        ]);
        DB::table('permission_role')->insert([
            'role_id'=>$doctorRole->id,
            'permission_id'=>$lastInsertedID

        ]);
        $lastInsertedID=DB::table('permissions')->insertGetId([
            'permission_name'=>'create_appointment',
            'description'=>'Créer des rendez-vous.'
        ]);
        DB::table('permission_role')->insert([
            'role_id'=>$adminRole->id,
            'permission_id'=>$lastInsertedID

        ]);
        DB::table('permission_role')->insert([
            'role_id'=>$secretaryRole->id,
            'permission_id'=>$lastInsertedID

        ]);
        $lastInsertedID=DB::table('permissions')->insertGetId([
            'permission_name'=>'update_appointment',
            'description'=>'Mettre à jour des rendez-vous.'
        ]);
        DB::table('permission_role')->insert([
            'role_id'=>$adminRole->id,
            'permission_id'=>$lastInsertedID

        ]);
        DB::table('permission_role')->insert([
            'role_id'=>$secretaryRole->id,
            'permission_id'=>$lastInsertedID

        ]);
        $lastInsertedID=DB::table('permissions')->insertGetId([
            'permission_name'=>'delete_appointment',
            'description'=>'Supprimer des rendez-vous.'
        ]);
        DB::table('permission_role')->insert([
            'role_id'=>$adminRole->id,
            'permission_id'=>$lastInsertedID

        ]);
        DB::table('permission_role')->insert([
            'role_id'=>$secretaryRole->id,
            'permission_id'=>$lastInsertedID

        ]);
        $lastInsertedID=DB::table('permissions')->insertGetId([
            'permission_name'=>'view_medical_records',
            'description'=>'Voir les dossiers médicaux.'
        ]);
        DB::table('permission_role')->insert([
            'role_id'=>$adminRole->id,
            'permission_id'=>$lastInsertedID

        ]);
        DB::table('permission_role')->insert([
            'role_id'=>$doctorRole->id,
            'permission_id'=>$lastInsertedID

        ]);

        $lastInsertedID=DB::table('permissions')->insertGetId([
            'permission_name'=>'update_medical_records',
            'description'=>'Mettre à jour les dossiers médicaux.'
        ]);
        DB::table('permission_role')->insert([
            'role_id'=>$adminRole->id,
            'permission_id'=>$lastInsertedID

        ]);
        DB::table('permission_role')->insert([
            'role_id'=>$doctorRole->id,
            'permission_id'=>$lastInsertedID

        ]);
        $lastInsertedID=DB::table('permissions')->insertGetId([
            'permission_name'=>'manage_users',
            'description'=>'Gérer les utilisateurs du système'
        ]);
        DB::table('permission_role')->insert([
            'role_id'=>$adminRole->id,
            'permission_id'=>$lastInsertedID

        ]);
        $lastInsertedID=DB::table('permissions')->insertGetId([
            'permission_name'=>'register_self',
            'description'=>"S'enregistrer en tant que patient."
        ]);
        DB::table('permission_role')->insert([
            'role_id'=>$patientRole->id,
            'permission_id'=>$lastInsertedID

        ]);

        $lastInsertedID=DB::table('permissions')->insertGetId([
            'permission_name'=>'book_appointment',
            'description'=>"Prendre rendez-vous pour soi-même."
        ]);
        DB::table('permission_role')->insert([
            'role_id'=>$patientRole->id,
            'permission_id'=>$lastInsertedID

        ]);
    }
}
