<?php

// database/factories/UserFactory.php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = \App\Models\User::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id'           => (string) Str::uuid(),
            'user_name'         => $this->faker->name(),
            'phone'             => $this->faker->numerify('0#########'),
            'email'             => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password'          => Hash::make('password'), // mặc định: "password"
            'image'             => null,
            'status'            => 'active',
            'gender'            => 'male',
            'dob'               => $this->faker->date(),
            'height'            => $this->faker->randomFloat(2, 1.50, 2.00),
            'weight'            => $this->faker->randomFloat(2, 45, 100),
            'address'           => $this->faker->address(),
            'note'              => $this->faker->sentence(),
            'role'              => 'user',
            'remember_token'    => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
