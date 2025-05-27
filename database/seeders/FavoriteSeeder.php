<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Favorite;
use App\Models\User;
use App\Models\Meal;

class FavoriteSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();
        $meal = Meal::first();

        if($user && $meal) {
            Favorite::firstOrCreate([
                'user_id' => $user->user_id,
                'meal_id' => $meal->meal_id,
            ]);
        }
    }
}
