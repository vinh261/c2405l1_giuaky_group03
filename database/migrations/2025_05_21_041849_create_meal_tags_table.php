<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('meal_tags', function (Blueprint $table) {
            // Cả 2 ID đều là string(50) vì meals & tags đều dùng UUID string
            $table->string('tag_id', 50);
            $table->string('meal_id', 50);

            $table->primary(['tag_id', 'meal_id']);
            $table->timestamps();

            $table->foreign('tag_id')->references('tag_id')->on('tags')->onDelete('cascade');
            $table->foreign('meal_id')->references('meal_id')->on('meals')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('meal_tags'); // ✅ đúng tên bảng
    }
};
