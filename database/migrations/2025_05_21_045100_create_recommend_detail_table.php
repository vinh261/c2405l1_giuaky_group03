<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recommend_detail', function (Blueprint $table) {
            // ❌ SAI: $table->unsignedBigInteger('recommend_id');
            // ✅ ĐÚNG:
            $table->string('recommend_id', 50); // khớp kiểu UUID với recommends
            $table->string('meal_id', 50);      // khớp với meals

            $table->primary(['recommend_id', 'meal_id']);
            $table->timestamps();

            $table->foreign('recommend_id')
                  ->references('recommend_id')
                  ->on('recommends')
                  ->onDelete('cascade');

            $table->foreign('meal_id')
                  ->references('meal_id')
                  ->on('meals')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recommend_detail');
    }
};
