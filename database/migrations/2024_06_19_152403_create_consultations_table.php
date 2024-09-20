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
        Schema::create('consultations', function (Blueprint $table) {
            $table->id();
            //$table->string('photo');
            $table->text('cons_titre_fr');
            $table->text('cons_titre_en');
            $table->text('cons_msg_fr');
            $table->text('cons_msg_en');
            $table->string('cons_keyword_en');
            $table->string('cons_keyword_fr');
            $table->string('cons_description_en');
            $table->string('cons_description_fr');
            $table->string('cons_titre_en_slug')->unique();
            $table->string('cons_titre_fr_slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultations');
    }
};
