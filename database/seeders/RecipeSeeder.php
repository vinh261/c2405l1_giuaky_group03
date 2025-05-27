<?php

// database/seeders/RecipeSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Recipe;
use App\Models\User;          // ← dùng User, không phải Category

class RecipeSeeder extends Seeder
{
    public function run(): void
    {
        // Lấy một user đã tồn tại (hoặc tạo mới)
        $user = User::first()
              ?? User::factory()->create([
                     'user_name' => 'Seeder User',
                     'email'     => 'seeder@example.com',
                 ]);

        Recipe::firstOrCreate(
            ['cuisine_type' => 'Asia Fusion'],
            [
              'recipe_id'    => (string) Str::uuid(),
              'desc_step'    => 'Rửa sạch, trộn gia vị…',
              'cook_time'    => '30 phút',
              'created_by'   => $user->user_id,  // ← gán đúng user_id
            ]
        );
    }
}
