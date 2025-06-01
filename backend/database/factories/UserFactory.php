<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User; // Thêm import User để gọi generateUserId()

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            // Sinh user_id từ method generateUserId() trên User model
            'user_id' => User::generateUserId(),

            // Email và verify
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),

            // Sinh password đã hash
            'password' => Hash::make('password'),

            // Tạo remember_token (cho Sanctum hoặc Auth)
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
