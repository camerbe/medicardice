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
        Schema::create('coronaryangioplasties', function (Blueprint $table) {
            $table->id();
            //$table->string('photo');
            $table->text('coronaryangioplasty_titre_fr');
            $table->text('coronaryangioplasty_titre_en');
            $table->text('coronaryangioplasty_msg_fr');
            $table->text('coronaryangioplasty_msg_en');
            $table->string('coronaryangioplasty_keyword_en');
            $table->string('coronaryangioplasty_keyword_fr');
            $table->string('coronaryangioplasty_description_en');
            $table->string('coronaryangioplasty_description_fr');
            $table->string('coronaryangioplasty_titre_en_slug')->unique();
            $table->string('coronaryangioplasty_titre_fr_slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coronaryangioplasties');
    }
};
