<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('echocardiographies', function (Blueprint $table) {
            $table->id();
            //$table->string('photo');
            $table->text('echocardiography_titre_fr');
            $table->text('echocardiography_titre_en');
            $table->text('echocardiography_msg_fr');
            $table->text('echocardiography_msg_en');
            $table->string('echocardiography_keyword_en');
            $table->string('echocardiography_keyword_fr');
            $table->string('echocardiography_description_en');
            $table->string('echocardiography_description_fr');
            $table->string('echocardiography_titre_en_slug')->unique();
            $table->string('echocardiography_titre_fr_slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('echocardiographies');
    }
};
