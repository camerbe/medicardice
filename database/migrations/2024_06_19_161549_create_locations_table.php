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
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            //$table->string('photo');
            $table->text('location_titre_fr');
            $table->text('location_titre_en');
            $table->text('location_msg_fr');
            $table->text('location_msg_en');
            $table->string('location_keyword_en');
            $table->string('location_keyword_fr');
            $table->string('location_description_en');
            $table->string('location_description_fr');
            $table->string('location_titre_en_slug')->unique();
            $table->string('location_titre_fr_slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};
