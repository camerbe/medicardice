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
        Schema::create('holters', function (Blueprint $table) {
            $table->id();
            //$table->string('photo');
            $table->text('holter_titre_fr');
            $table->text('holter_titre_en');
            $table->text('holter_msg_fr');
            $table->text('holter_msg_en');
            $table->string('holter_keyword_en');
            $table->string('holter_keyword_fr');
            $table->string('holter_description_en');
            $table->string('holter_description_fr');
            $table->string('holter_titre_en_slug')->unique();
            $table->string('holter_titre_fr_slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('holters');
    }
};
