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
        Schema::create('catheterizations', function (Blueprint $table) {
            $table->id();
            //$table->string('photo');
            $table->text('catheterization_titre_fr');
            $table->text('catheterization_titre_en');
            $table->text('catheterization_msg_fr');
            $table->text('catheterization_msg_en');
            $table->string('catheterization_keyword_en');
            $table->string('catheterization_keyword_fr');
            $table->string('catheterization_description_en');
            $table->string('catheterization_description_fr');
            $table->string('catheterization_titre_en_slug')->unique();
            $table->string('catheterization_titre_fr_slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catheterizations');
    }
};
