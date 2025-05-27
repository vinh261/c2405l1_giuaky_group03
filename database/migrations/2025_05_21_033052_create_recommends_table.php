<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recommends', function (Blueprint $table) {
            $table->string('recommend_id', 50)->primary(); // UUID
            $table->string('criteria')->nullable();
            $table->string('user_id', 50);
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recommends');
    }
};
