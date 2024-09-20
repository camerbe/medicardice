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
        Schema::create('ethics', function (Blueprint $table) {
            $table->id();
            //$table->string('photo');
            $table->text('ethic_titre_fr');
            $table->text('ethic_titre_en');
            $table->text('ethic_msg_fr');
            $table->text('ethic_msg_en');
            $table->string('ethic_keyword_en');
            $table->string('ethic_keyword_fr');
            $table->string('ethic_description_en');
            $table->string('ethic_description_fr');
            $table->string('ethic_titre_en_slug')->unique();
            $table->string('ethic_titre_fr_slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ethics');
    }
};
