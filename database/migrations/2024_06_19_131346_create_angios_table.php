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
        Schema::create('angios', function (Blueprint $table) {
            $table->id();
            $table->text('angio_titre_fr');
            $table->text('angio_titre_en');
            $table->text('angio_msg_fr');
            $table->text('angio_msg_en');
            $table->string('angio_keyword_en');
            $table->string('angio_keyword_fr');
            $table->string('angio_description_en');
            $table->string('angio_description_fr');
            $table->string('angio_titre_en_slug')->unique();
            $table->string('angio_titre_fr_slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('angios');
    }
};
