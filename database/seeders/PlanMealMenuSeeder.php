<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PlanMealMenu;
use App\Models\MealPlan;
use App\Models\Meal;
use Carbon\Carbon;

class PlanMealMenuSeeder extends Seeder
{
    public function run(): void
    {
        $plan  = MealPlan::first();
        $meals = Meal::take(2)->pluck('meal_id');

        if (!$plan || $meals->isEmpty()) {
            echo "⚠️ Không có meal_plan hoặc meal để seed.\n";
            return;
        }

        $today = Carbon::today();

        foreach ($meals as $idx => $mealId) {
            PlanMealMenu::firstOrCreate([
                'plan_id'    => $plan->plan_id,  // kiểu UUID string
                'meal_id'    => $mealId,
                'serve_date' => $today->copy()->addDays($idx)->toDateString(),
            ]);
        }
    }
}
