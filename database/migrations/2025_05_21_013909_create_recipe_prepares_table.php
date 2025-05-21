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
        Schema::create('recipe_prepares', function (Blueprint $table) {
            $table->id('recipe_id');
            $table->string('cuisine_type', 50);
            $table->unsignedInteger('step_number');
            $table->string('desc_step');
            $table->string('cook_time', 25);
            $table->string('create_by', 50);
            $table->timestamps();

            $table->foreign('create_by')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipe_repairs');
    }
};
