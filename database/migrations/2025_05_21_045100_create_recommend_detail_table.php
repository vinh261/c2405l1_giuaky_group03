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
            $table->unsignedBigInteger('meal_id');
            $table->primary(['recommend_id', 'meal_id']);
            $table->timestamps();

            $table->foreign('recommend_id')->references('recommend_id')->on('recommends')->onDelete('cascade');
            $table->foreign('meal_id')->references('meal_id')->on('meals')->onDelete('cascade');
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
