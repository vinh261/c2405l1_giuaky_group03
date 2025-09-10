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
        Schema::create('profiles', function (Blueprint $table) {
            $table->string('profile_id', 50)->primary();
            $table->string('user_name', 50)->nullable();
            $table->string('phone', 10)->nullable();
            $table->string('image')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->enum('gender', ['male', 'female', 'other'])->default('male');
            $table->date('dob')->nullable();
            $table->string('job', 50)->nullable();
            $table->float('height', 5, 2)->default(0.00);
            $table->float('weight', 5, 2)->default(0.00);
            $table->string('address', 100)->nullable();;
            $table->string('note')->nullable();
            $table->enum('role', ['user', 'admin'])->default('user');
            $table->timestamps();

            $table->foreign('profile_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
