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
        Schema::create('hypertensions', function (Blueprint $table) {
            $table->id();
            $table->text('hypertension_titre_fr');
            $table->text('hypertension_titre_en');
            $table->text('hypertension_msg_fr');
            $table->text('hypertension_msg_en');
            $table->string('hypertension_keyword_en');
            $table->string('hypertension_keyword_fr');
            $table->string('hypertension_description_en');
            $table->string('hypertension_description_fr');
            $table->string('hypertension_titre_en_slug')->unique();
            $table->string('hypertension_titre_fr_slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hypertensions');
    }
};
