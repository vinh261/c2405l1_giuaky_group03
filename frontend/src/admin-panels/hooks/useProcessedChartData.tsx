import { useEffect, useMemo, useState } from "react";
import { differenceInDays, format, getWeek, parseISO, subDays } from "date-fns";
import { vi } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import type { ChartPoint, InputVisitedProps, TimeRange } from "../../types/models.types";


// Xu ly data:
export const useProcessedChartData = (
    data: InputVisitedProps[],
    range: DateRange,
    currentChart: string,
) => {
    const [chartData, setChartData] = useState<ChartPoint[]>([]);
    const [xAxisKey, setXAxisKey] = useState<TimeRange>("week");
    const [error, setError] = useState<string | null>(null);

    // Sử dụng useMemo để tính toán fromDate và toDate từ range
    const { fromDate, toDate } = useMemo(() => {
        const from = range.from ? new Date(range.from) : subDays(new Date(), 28);
        const to = range.to ? new Date(range.to) : new Date();
        return { fromDate: from, toDate: to };
    }, [range.from, range.to]);

    // Sử dụng useMemo để tính toán dữ liệu biểu đồ để tránh vòng lặp vô tận
    // thay vì xử lý trực tiếp trong useEffect
    const processedData = useMemo(()=> {
        // Kiểm tra tính hợp lệ của ngày
        if (!fromDate || !toDate || isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
            return { 
                chartData: [], 
                xAxisKey: "invalid" as TimeRange, 
                error: "Vui lòng chọn khoảng thời gian hợp lệ" 
            };
        }

        const days = differenceInDays(toDate, fromDate);

        if (days <= 1) {
            return { 
                chartData: [], 
                xAxisKey: "invalid" as TimeRange, 
                error: "Khoảng thời gian quá ngắn" 
            };
        }

        // Lọc dữ liệu theo khoảng thời gian
        const filtered = data.filter((d) => {
            if (!d.date) return false;
            const date = parseISO(d.date);
            return date >= fromDate && date <= toDate;
        });

        let newChartData: ChartPoint[] = [];
        let newXAxisKey: TimeRange = "week";

        // Xác định đơn vị thời gian và nhóm dữ liệu
        if (days <= 7) {
            newXAxisKey = "date";
            newChartData = filtered.map((item) => ({
                label: format(parseISO(item.date), "EEEE", { locale: vi }),
                value: currentChart === "visited" 
                        ? item.visits || 0 
                        : currentChart === "members" 
                        ? item.members || 0 
                        : item.total_amount || 0
            }));
        } else if (days <= 57) {
            newXAxisKey = "week";
            const grouped: Record<string, number> = {};

            filtered.forEach((item) => {
                if (!item.date) return;
                const week = `Tuần ${getWeek(parseISO(item.date), { locale: vi })}`;
                grouped[week] = (grouped[week] || 0) + (currentChart === "visited"
                                                            ? item.visits || 0 
                                                            : currentChart === "members" 
                                                            ? item.members || 0 
                                                            : item.total_amount || 0
                );
            });

            newChartData = Object.entries(grouped).map(([label, value]) => ({ label, value }));
        } else {
            newXAxisKey = "month";
            const grouped: Record<string, number> = {};   

            filtered.forEach((item) => {
                if (!item.date) return;
                const month = format(parseISO(item.date), "'Tháng' M", { locale: vi });
                grouped[month] = (grouped[month] || 0) + (currentChart === "visited" 
                                                            ? item.visits || 0 
                                                            : currentChart === "members" 
                                                            ? item.members || 0 
                                                            : item.total_amount || 0
                );
            });

            newChartData = Object.entries(grouped).map(([label, value]) => ({ label, value }));
        }
        return { chartData: newChartData, xAxisKey: newXAxisKey, error: null };
    }, [data, fromDate, toDate, currentChart]); // Chỉ phụ thuộc vào data, currentChart, fromDate và toDate

    // Cập nhật state dựa trên kết quả từ useMemo
    useEffect(() => {
        // Only update state if the data has actually changed
        if (
            JSON.stringify(chartData) !== JSON.stringify(processedData.chartData) ||
            xAxisKey !== processedData.xAxisKey ||
            error !== processedData.error
        ) {
            setChartData(processedData.chartData);
            setXAxisKey(processedData.xAxisKey);
            setError(processedData.error);
        }
    }, [processedData, chartData, xAxisKey, error]);
    return { chartData, xAxisKey, error };
};