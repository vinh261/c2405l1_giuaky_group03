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
        Schema::create('nutrition_info', function (Blueprint $table) {
            // Nếu recipes.recipe_id là string(50):
            $table->string('recipe_id', 50);

            // Các cột dinh dưỡng ví dụ
            $table->float('calories');
            $table->float('protein');
            // … các cột khác …

            $table->timestamps();

            // Khóa ngoại phải khớp kiểu
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
        Schema::dropIfExists('nutrition_info');
    }
};
