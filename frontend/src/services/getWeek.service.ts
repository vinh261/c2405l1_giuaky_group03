import { addDays, format, isSameDay, startOfWeek } from "date-fns";
import { vi } from "date-fns/locale";


// Lấy ngày trong tuần
export const getWeekDates = (weekOffset: number) => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    const weekStart = addDays(start, weekOffset * 7);

    const dates = [];
    for (let i = 0; i < 7; i++) {
        const date = addDays(weekStart, i);
        dates.push({
            date,
            dayName: format(date, "EEEE", { locale: vi }),
            dayNumber: format(date, "d"),
            month: format(date, "MMM", { locale: vi }),
            isToday: isSameDay(date, new Date()),
            fullDateStr: format(date, "yyyy-MM-dd"),
        });
    }
    return dates;
};


// format date
export const formatDate = (dateInput: Date | string | null | undefined): string => {
    // Kiểm tra nếu dateInput là null, undefined hoặc chuỗi rỗng
    if (!dateInput) {
        return 'N/A'; // Hoặc một giá trị mặc định khác bạn muốn
    }

    try {
        // Tạo đối tượng Date từ input.
        // Nếu dateInput đã là Date object, new Date(dateInput) vẫn hoạt động đúng.
        const date = new Date(dateInput);

        // Kiểm tra xem date có phải là một ngày hợp lệ không
        // (ví dụ: nếu dateInput là một chuỗi không thể parse thành ngày)
        if (isNaN(date.getTime())) {
            console.warn("formatDate nhận vào một ngày không hợp lệ:", dateInput);
            return 'Ngày không hợp lệ';
        }

        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    } catch (error) {
        console.error("Lỗi khi format ngày:", dateInput, error);
        // Có thể trả về chuỗi gốc nếu không format được, hoặc một thông báo lỗi
        return String(dateInput); // Hoặc 'Lỗi ngày'
    }
};
