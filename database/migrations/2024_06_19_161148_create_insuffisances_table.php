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
        Schema::create('insuffisances', function (Blueprint $table) {
            $table->id();
            //$table->string('photo');
            $table->text('insuffisance_titre_fr');
            $table->text('insuffisance_titre_en');
            $table->text('insuffisance_msg_fr');
            $table->text('insuffisance_msg_en');
            $table->string('insuffisance_keyword_en');
            $table->string('insuffisance_keyword_fr');
            $table->string('insuffisance_description_en');
            $table->string('insuffisance_description_fr');
            $table->string('insuffisance_titre_en_slug')->unique();
            $table->string('insuffisance_titre_fr_slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insuffisances');
    }
};
