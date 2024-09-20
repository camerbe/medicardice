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
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->text('contact_titre_fr');
            $table->text('contact_titre_en');
            $table->text('contact_msg_fr');
            $table->text('contact_msg_en');
            $table->string('contact_keyword_en');
            $table->string('contact_keyword_fr');
            $table->string('contact_description_en');
            $table->string('contact_description_fr');
            $table->string('contact_titre_en_slug')->unique();
            $table->string('contact_titre_fr_slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
