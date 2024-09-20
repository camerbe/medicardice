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
        Schema::create('hearts', function (Blueprint $table) {
            $table->id();
            //$table->string('photo');
            $table->text('heart_titre_fr');
            $table->text('heart_titre_en');
            $table->text('heart_msg_fr');
            $table->text('heart_msg_en');
            $table->string('heart_keyword_en');
            $table->string('heart_keyword_fr');
            $table->string('heart_description_en');
            $table->string('heart_description_fr');
            $table->string('heart_titre_en_slug')->unique();
            $table->string('heart_titre_fr_slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hearts');
    }
};
