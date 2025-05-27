<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('plan_meal_menu', function (Blueprint $table) {
            $table->string('plan_id', 50);
            $table->string('meal_id', 50);
            $table->date('serve_date'); // 👈 phải có để xác định ngày phục vụ món ăn
            $table->timestamps();

            // Composite primary key gồm 3 cột
            $table->primary(['plan_id', 'meal_id', 'serve_date']);

            $table->foreign('plan_id')
                  ->references('plan_id')
                  ->on('meal_plans')
                  ->onDelete('cascade');

            $table->foreign('meal_id')
                  ->references('meal_id')
                  ->on('meals')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('plan_meal_menu');
    }
};
