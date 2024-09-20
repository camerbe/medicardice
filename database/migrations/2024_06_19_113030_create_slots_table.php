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
            $table->dateTime('start',6);
            $table->dateTime('end',6);
            $table->enum('status',['Available','Canceled','Reserved'])->default('Available');
            $table->String('created_by',50)->nullable();
            $table->String('updated_by',50)->nullable();
            $table->softDeletes();
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
