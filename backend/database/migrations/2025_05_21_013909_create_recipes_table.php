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
        Schema::create('recipes', function (Blueprint $table) {
            $table->id('recipe_id');
            $table->string('cuisine_type', 50);
            $table->text('desc_step');
            $table->string('cook_time', 25);
            $table->unsignedInteger('serve')->default(1);
            $table->string('created_by', 50);
            $table->timestamps();

            $table->foreign('created_by')->references('profile_id')->on('profiles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
