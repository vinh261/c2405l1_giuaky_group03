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
        Schema::create('plan_meal_menu', function (Blueprint $table) {
            $table->enum('time', ['breakfast', 'lunch', 'dinner'])->default('breakfast');
            $table->unsignedBigInteger('plan_id');
            $table->unsignedBigInteger('meal_id');
            $table->primary(['plan_id', 'meal_id']);
            $table->timestamps();

            $table->foreign('plan_id')->references('plan_id')->on('meal_plans')->onDelete('cascade');
            $table->foreign('meal_id')->references('meal_id')->on('meals')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plan_meal_menu');
    }
};
