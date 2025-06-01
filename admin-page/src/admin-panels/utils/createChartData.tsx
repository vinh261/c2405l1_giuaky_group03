import { format } from "date-fns";
import type { InputVisitedProps } from "../../types/models.types";


const startDate = new Date("2025-01-01");
const endDate = new Date("2025-12-31");

// Dữ liệu lượt truy cập theo ngày:
/**
 * Tạo dữ liệu mẫu về lượt truy cập từ khoảng thời gian chỉ định
 * @param start Ngày bắt đầu
 * @param end Ngày kết thúc
 * @returns Mảng dữ liệu lượt truy cập theo ngày
 */

const createVisitByDay = ({ start, end }: { start: Date; end: Date }): InputVisitedProps[] => {
    const dataDay: InputVisitedProps[] = [];
    const currentDate = new Date(start);

    while (currentDate <= end) {
        dataDay.push({
            date: format(currentDate, "yyyy-MM-dd"), // không bị ảnh hưởng bơi timezone
            visits: Math.floor(Math.random() * 200), // lượt truy cập random
            members: Math.floor(Math.random() * 50), // so luong thanh vien
            total_amount: Math.floor(Math.random() * 10000) // thu nhap
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dataDay;
};

// Tạo và xuất dữ liệu mẫu
export const createChartData: InputVisitedProps[] = createVisitByDay({ 
    start: startDate, 
    end: endDate 
});