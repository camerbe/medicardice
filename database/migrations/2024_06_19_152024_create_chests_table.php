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
        Schema::create('chests', function (Blueprint $table) {
            $table->id();
            //$table->string('photo');
            $table->text('chest_titre_fr');
            $table->text('chest_titre_en');
            $table->text('chest_msg_fr');
            $table->text('chest_msg_en');
            $table->string('chest_keyword_en');
            $table->string('chest_keyword_fr');
            $table->string('chest_description_en');
            $table->string('chest_description_fr');
            $table->string('chest_titre_en_slug')->unique();
            $table->string('chest_titre_fr_slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chests');
    }
};
