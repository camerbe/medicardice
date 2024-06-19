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
        Schema::create('monitorings', function (Blueprint $table) {
            $table->id();
            $table->text('monitoring_titre_fr');
            $table->text('monitoring_titre_en');
            $table->text('monitoring_msg_fr');
            $table->text('monitoring_msg_en');
            $table->string('monitoring_keyword_en');
            $table->string('monitoring_keyword_fr');
            $table->string('monitoring_description_en');
            $table->string('monitoring_description_fr');
            $table->string('monitoring_titre_en_slug')->unique();
            $table->string('monitoring_titre_fr_slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monitorings');
    }
};
