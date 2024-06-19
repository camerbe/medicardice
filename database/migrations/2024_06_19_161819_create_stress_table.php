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
        Schema::create('stress', function (Blueprint $table) {
            $table->id();
            $table->text('stress_titre_fr');
            $table->text('stress_titre_en');
            $table->text('stress_msg_fr');
            $table->text('stress_msg_en');
            $table->string('stress_keyword_en');
            $table->string('stress_keyword_fr');
            $table->string('stress_description_en');
            $table->string('stress_description_fr');
            $table->string('stress_titre_en_slug')->unique();
            $table->string('stress_titre_fr_slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stress');
    }
};
