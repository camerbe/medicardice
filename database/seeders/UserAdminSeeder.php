<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $lastInsertedID=DB::table('users')->insertGetId([
            'last_name'=>'BOUNECK',
            'first_name'=>'Jean Pierre',
            'email'=>'webmaster@camer.be',
            'email_verified_at'=>now(),
            'password_changed_at'=>now(),
            'password'=> bcrypt('123456')

        ]);

        DB::table('role_user')->insert([
            'user_id'=>$lastInsertedID,
            'role_id'=>1

        ]);
    }
}
