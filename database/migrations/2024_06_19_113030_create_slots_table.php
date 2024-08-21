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
        Schema::create('slots', function (Blueprint $table) {
            $table->id();
            $table->string('beginning',6);
            $table->string('end',6);
            $table->integer('duration');
            $table->enum('status',['Available','Canceled','Reserved'])->default('Available');
            $table->String('created_by',50)->nullable();
            $table->String('updated_by',50)->nullable();
            $table->softDeletes();
            $table->String('dayweek',50);
            $table->foreignId('doctor_id')
                ->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('slots');
    }
};
