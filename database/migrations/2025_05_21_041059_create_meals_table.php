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
            $table->string('meal_id', 50)->primary();
            $table->string('meal_name', 50)->unique();
            $table->string('slug', 100)->unique();
            $table->text('description')->nullable();
            $table->unsignedInteger('price')->default(0);
            $table->string('diet_type', 50)->nullable();
            $table->string('image')->nullable();
            $table->string('recipe_id', 50);

            $table->timestamps();

            $table->foreign('recipe_id')
                  ->references('recipe_id')
                  ->on('recipes')
                  ->onDelete('cascade');
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
