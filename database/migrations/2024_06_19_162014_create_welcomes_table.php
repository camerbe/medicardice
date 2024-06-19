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
        Schema::create('welcomes', function (Blueprint $table) {
            $table->id();
            $table->text('welcome_titre_fr');
            $table->text('welcome_titre_en');
            $table->text('welcome_msg_fr');
            $table->text('welcome_msg_en');
            $table->string('welcome_keyword_en');
            $table->string('welcome_keyword_fr');
            $table->string('welcome_description_en');
            $table->string('welcome_description_fr');
            $table->string('welcome_titre_en_slug')->unique();
            $table->string('welcome_titre_fr_slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('welcomes');
    }
};
