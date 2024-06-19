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
        Schema::create('medecins', function (Blueprint $table) {
            $table->id();
            $table->text('doc_titre_fr');
            $table->text('doc_titre_en');
            $table->text('doc_msg_fr');
            $table->text('doc_msg_en');
            $table->string('doc_keyword_en');
            $table->string('doc_keyword_fr');
            $table->string('doc_description_en');
            $table->string('doc_description_fr');
            $table->string('doc_titre_en_slug')->unique();
            $table->string('doc_titre_fr_slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medecins');
    }
};
