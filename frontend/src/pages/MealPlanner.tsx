import {
    ChevronLeft,
    ChevronRight,
    Plus,
} from "lucide-react";
import MealCard from "@/features/meals/components/ui/MealPlanCard";
import { cn } from "@/libs/utils";
import MealPlannerProps from "@/features/meals/components/MealPlannerProps";


const MealPlanner = () => {
    const { 
        goToToday, 
        navigateWeek, 
        selectedMeals,
        weekDates,
        selectedDate,
        setSelectedDate
    } = MealPlannerProps();

    return (
        <section className="container-page mt-20 mb-10 text-slate-700">
            <div className="h-40 bg-[url(../assets/images/banner-plan.jpg)] bg-cover bg-center mb-6 rounded-xl"></div>

            <div className="max-w-6xl min-h-220 mx-auto p-6 bg-slate-100 rounded-lg">
                {/* Header */}
                <h1 className="text-3xl font-bold mb-8">Kế hoạch dinh dưỡng</h1>

                {/* Week Navigation */}
                <div className="bg-slate-50 rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={goToToday}
                            className="px-4 py-2 text-sm bg-slate-300 rounded-lg hover:bg-slate-200 transition-colors">
                            Hôm nay
                        </button>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigateWeek(-1)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <ChevronLeft size={20} />
                            </button>

                            <span>
                                Ngày {weekDates[0]?.date} {weekDates[0]?.month} - {" "}
                                Ngày {weekDates[6]?.date} {weekDates[6]?.month}
                            </span>

                            <button
                                onClick={() => navigateWeek(1)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Days of Week */}
                    <div className="grid grid-cols-7 gap-2">
                        {weekDates.map((day, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedDate(day.fullDate)}
                                className={cn("py-3 px-2 rounded-lg text-center border border-slate-200 transition-all",
                                    day.fullDate.toDateString() ===
                                    selectedDate.toDateString()
                                        ? "bg-sky-500 text-slate-100"
                                        : day.isToday
                                        ? "bg-sky-100 text-sky-700 hover:bg-sky-200"
                                        : "hover:bg-sky-100"
                                )}>
                                <div className="mb-1">
                                    {day.dayName}
                                </div>
                                <div className="font-semibold">{day.date}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Meals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {selectedMeals.map((meal) => (
                        <MealCard key={meal.id} meal={meal} />
                    ))}

                    {/* Add Recipe Button */}
                    <button className="bg-slate-50 rounded-lg shadow-sm border-2 border-dashed border-slate-300 p-6 hover:border-blue-400 hover:bg-blue-50 transition-all group">
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                                <Plus className="text-blue-600" size={24} />
                            </div>
                            <span className="text-blue-600 font-medium">
                                Thêm món
                            </span>
                        </div>
                    </button>
                </div>

                {/* Empty State */}
                {selectedMeals.length === 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus className="text-gray-400" size={32} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Không có món nào
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Thêm món để bắt đầu kế hoạch của bạn
                        </p>
                        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            Thêm món
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};
export default MealPlanner;