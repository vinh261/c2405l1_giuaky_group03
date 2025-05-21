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
        Schema::create('recommend_detail', function (Blueprint $table) {
            $table->unsignedBigInteger('recommend_id');
            $table->unsignedBigInteger('recipe_id');
            $table->text('description');
            $table->primary(['recommend_id', 'recipe_id']);
            $table->timestamps();

            $table->foreign('recommend_id')->references('recommend_id')->on('recommends');
            $table->foreign('recipe_id')->references('recipe_id')->on('recipe_prepares');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recommend_detail');
    }
};
