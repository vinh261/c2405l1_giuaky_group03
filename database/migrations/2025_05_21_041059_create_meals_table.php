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
        Schema::create('meals', function (Blueprint $table) {
            $table->id('meal_id');
            $table->string('meal_name', 50)->unique();
            $table->string('diet_type', 50)->unique();
            $table->string('image')->nullable();
            $table->unsignedBigInteger('recipe_id');
            $table->timestamps();

            $table->foreign('recipe_id')->references('recipe_id')->on('recipes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meals');
    }
};
