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
        Schema::create('links', function (Blueprint $table) {
            $table->id();
            $table->text('link_titre_fr');
            $table->text('link_titre_en');
            $table->text('link_msg_fr');
            $table->text('link_msg_en');
            $table->string('link_keyword_en');
            $table->string('link_keyword_fr');
            $table->string('link_description_en');
            $table->string('link_description_fr');
            $table->string('link_titre_en_slug')->unique();
            $table->string('link_titre_fr_slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('links');
    }
};
