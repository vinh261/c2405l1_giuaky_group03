import { useState } from "react";


export type MealItemPlanner = {
    id: string;
    name: string;
    image: string;
    cookingTime: number;
    day: string;
    mealType: "sáng" | "trưa" | "tối" | "ăn vặt";
}

const MealPlannerProps = () => {
    const [currentWeek, setCurrentWeek] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Sample data
    const [mealPlan] = useState<MealItemPlanner[]>([
        {
            id: "1",
            name: "Seared Strip Steak with Lemon-Miso Butter & Curry Roasted Vegetables",
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
            cookingTime: 40,
            day: "Thứ Hai",
            mealType: "sáng",
        },
    ]);

    // Lấy ngày trong tuần
    const getWeekDates = () => {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + currentWeek * 7);

        const weekDates = [];

        const dayNames = new Intl.DateTimeFormat("vi-VN", { weekday: "long" }); // Lấy tên ngày đầy đủ
        const monthNames = new Intl.DateTimeFormat("vi-VN", { month: "short" }); // Lấy tên tháng viết tắt

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            weekDates.push({
                dayName: dayNames.format(date),
                date: date.getDate(),
                month: monthNames.format(date),
                fullDate: date,
                isToday: date.toDateString() === today.toDateString(),
            });
        }

        return weekDates;
    };

    const weekDates = getWeekDates();

    // Navigation functions
    const goToToday = () => {
        setCurrentWeek(0);
        setSelectedDate(new Date());
    };

    const navigateWeek = (direction: number) => {
        setCurrentWeek(currentWeek + direction);
    };

    // Filter meals cho ngày được chọn
    const getSelectedDayMeals = () => {
        const selectedDayName = weekDates.find(
            (d) => d.fullDate.toDateString() === selectedDate.toDateString()
        )?.dayName;

        return mealPlan.filter((meal) => meal.day === selectedDayName);
    };

    const selectedMeals = getSelectedDayMeals();

    return {
        goToToday,
        navigateWeek,
        selectedMeals,
        weekDates,
        selectedDate,
        setSelectedDate
    };
};
export default MealPlannerProps;
