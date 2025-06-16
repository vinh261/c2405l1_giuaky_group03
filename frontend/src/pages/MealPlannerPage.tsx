import React from "react";
import { ChevronLeft, ChevronRight, Plus, Calendar } from "lucide-react";
import { format, isSameDay } from "date-fns";
import { cn } from "@/utils/cn";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import { useMealPlanner, type MealTime } from "@/components/meal-planner-page/useMealPlanner";
import MealPlanCard from "@/components/meal-planner-page/meal-plan-card/MealPlanCard";
import MealSelectorModal from "@/components/meal-planner-page/meal-select-modal/MealSelectorModal";
import Button from "@/components/common/button/ButtonCustom";


const MealPlannrPage: React.FC = () => {  
    const {
        weekDates,
        selectedDate,
        setSelectedDate,
        showMealSelector,
        setShowMealSelector,
        selectedMealTime,
        mealsByTime,
        plansLoading,
        user,
        navigateWeek,
        goToToday,
        handleAddMeal,
        handleSelectMeal,
        handleRemoveMeal,
        navigate,
        mealTimeLabels,
        createPlanMutation
    } = useMealPlanner();

    if (!user) {
        return (
            <div className="container mx-auto text-center mt-20 min-h-118">
                <div className="h-40 bg-[url(@/assets/images/banner-plan.jpg)] bg-cover bg-center rounded-xl mb-6 flex items-center justify-center" />
                <h2 className="text-2xl font-bold mb-4">Vui lòng đăng nhập</h2>
                <p className="text-gray-600 mb-6">
                    Bạn cần đăng nhập để sử dụng tính năng này.
                </p>
                <Button className="border border-slate-300 hover:bg-slate-200" onClick={() => navigate("/login")}>
                    Đăng nhập
                </Button>
            </div>
        );
    }

    return (
        <section className="container mx-auto my-20">
            <div className="h-40 bg-[url(@/assets/images/banner-plan.jpg)] bg-cover bg-center rounded-xl mb-6 flex items-center justify-center" />

            <div className="mx-auto">
                {/* Week Navigation */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <Button variant="outline" onClick={goToToday}>
                            <Calendar className="h-4 w-4 mr-2" />
                            Hôm nay
                        </Button>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigateWeek(-1)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <ChevronLeft size={20} />
                            </button>

                            <span className="font-medium">
                                {format(weekDates[0].date, "dd/MM")} -{" "}
                                {format(weekDates[6].date, "dd/MM/yyyy")}
                            </span>

                            <button
                                onClick={() => navigateWeek(1)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Days of Week */}
                    <div className="grid grid-cols-7 gap-2">
                        {weekDates.map((day, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedDate(new Date(day.date))}
                                className={cn(
                                    "py-3 px-2 rounded-lg text-center border transition-all",
                                    isSameDay(day.date, selectedDate)
                                        ? "bg-green-500 text-white border-green-500"
                                        : day.isToday
                                        ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                                        : "border-gray-200 hover:bg-gray-50"
                                )}>
                                <div className="text-xs mb-1">
                                    {day.dayName}
                                </div>
                                <div className="font-semibold">
                                    {new Date(day.date).getDate()}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Meals by Time */}
                <div className="space-y-6">
                    {(Object.keys(mealsByTime) as MealTime[]).map(
                        (mealTime) => (
                            <div
                                key={mealTime}
                                className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                                    {mealTimeLabels[mealTime]}
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {mealsByTime[mealTime].map((meal) => (
                                        <MealPlanCard
                                            key={`${meal.meal_id}-${meal.planTime}`}
                                            meal={meal}
                                            onRemove={() =>
                                                handleRemoveMeal(meal.meal_id)
                                            }
                                        />
                                    ))}

                                    {/* Add Meal Button */}
                                    <button
                                        onClick={() => handleAddMeal(mealTime)}
                                        disabled={createPlanMutation.isPending}
                                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-green-400 hover:bg-green-50 transition-all group">
                                        <div className="flex flex-col items-center justify-center h-full">
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                                                <Plus
                                                    className="text-green-600"
                                                    size={24}
                                                />
                                            </div>
                                            <span className="text-green-600 font-medium">
                                                Thêm món
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )
                    )}
                </div>

                {/* Loading State */}
                {plansLoading && (
                    <div className="flex justify-center py-20">
                        <LoadingSpinner />
                    </div>
                )}
            </div>

            {/* Meal Selector Modal */}
            <MealSelectorModal
                isOpen={showMealSelector}
                onClose={() => setShowMealSelector(false)}
                onSelect={handleSelectMeal}
                selectedMealTime={selectedMealTime}
            />
        </section>
    );
};
export default MealPlannrPage;
