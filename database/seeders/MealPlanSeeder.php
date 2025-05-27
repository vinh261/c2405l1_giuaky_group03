<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\MealPlan;
use App\Models\User;

class MealPlanSeeder extends Seeder
{
    public function run(): void
    {
        // Lấy 1 user bất kỳ để gán user_id
        $user = User::first()
              ?? User::factory()->create([
                     'user_name'=>'PlanUser','email'=>'planuser@example.com'
                 ]);

        MealPlan::firstOrCreate(
          ['plan_name'=>'7-Day Eat Clean'],
          [
            'plan_id'    => (string) Str::uuid(),
            'plan_name'  => '7-Day Eat Clean',
            'start_date' => now()->toDateString(),
            'end_date'   => now()->addDays(6)->toDateString(),
            'user_id'    => $user->user_id,
          ]
        );

        MealPlan::firstOrCreate(
          ['plan_name'=>'28-Day Keto'],
          [
            'plan_id'    => (string) Str::uuid(),
            'plan_name'  => '28-Day Keto',
            'start_date' => now()->toDateString(),
            'end_date'   => now()->addDays(27)->toDateString(),
            'user_id'    => $user->user_id,
          ]
        );
    }
}
