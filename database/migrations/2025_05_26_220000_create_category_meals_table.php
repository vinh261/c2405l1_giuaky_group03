<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('category_meals', function (Blueprint $table) {
            $table->string('category_id', 50);
            $table->string('meal_id', 50); // ✅ Đảm bảo đúng kiểu string

            $table->primary(['category_id', 'meal_id']);
            $table->timestamps();

            $table->foreign('category_id')->references('category_id')->on('categories')->onDelete('cascade');
            $table->foreign('meal_id')->references('meal_id')->on('meals')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('category_meals');
    }
};
