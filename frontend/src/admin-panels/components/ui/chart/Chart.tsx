import React, { useMemo } from "react";
import { useChart } from "../../../hooks/useChart";
import { CalendarDays, ChevronDown, ChevronUp } from "lucide-react";
import { vi } from "date-fns/locale";
import { useProcessedChartData } from "../../../hooks/useProcessedChartData";
import { formatDate } from "../../../utils/formatData";
import CalendarButton from "../CalendarButton";
import VisitedChart from "./VisitedChart";
import MemberChart from "./MemberChart";
import { cn } from "../../../../types/cn";
import { Calendar } from "../../../../libs/shadcn/Calendar";


const Chart = () => {
    const {
        isOpen, theme, openCalendar,
        calendarRef, buttonRef,
        toggleButton, today, startOfMonth,
        tempRange, setTempRange, dropdownRef, 
        toggleDropdown,currentOption,
        chartOptions, currentChart,
        handleSelect, range, filteredData,
        handleCancel, handleConfirm, footerRef,
    } = useChart();

    // Chuyển đổi range để đảm bảo tính nhất quán khi truyền vào hooks:
    const normalizedRange = {
        from: range.from ? new Date(range.from) : undefined,
        to: range.to ? new Date(range.to) : undefined,
    };
    const { chartData, xAxisKey, error } = useProcessedChartData(filteredData, normalizedRange, currentChart);

    // Tính toán giá trị hiển thị cho date range
    const displayDateRange = useMemo(() => {
        const fromDate = range.from ? new Date(range.from) : startOfMonth;
        const toDate = range.to ? new Date(range.to) : today;
        return `${formatDate(fromDate)} - ${formatDate(toDate)}`;
    }, [range.from, range.to, startOfMonth, today]);

    return (
        <React.Fragment>
            <div className="card-header px-4 justify-between">
                {/* Dropdown */}
                <div ref={dropdownRef} className={cn("relative w-46 py-1 px-3 border border-slate-300 rounded-md", theme === "light" ? "text-slate-900" : "text-slate-50")}>
                    <button onClick={toggleDropdown} className="cursor-pointer w-full flex items-center justify-between">
                        {currentOption?.label}
                        <ChevronDown size={20} />
                    </button>
                    {isOpen && (
                        <ul className="absolute mt-3 -ml-3 w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-md z-10">
                            {chartOptions.filter(opt => opt.value !== currentChart)
                                .map((opt, index, filtered) => (
                                    <li key={opt.value} onClick={() => handleSelect(opt.value)} className={cn("px-4 py-2 hover:bg-blue-100 dark:hover:bg-slate-700 cursor-pointer transition-colors", index < filtered.length - 1 && "border-b border-slate-300 dark:border-slate-600")}>
                                        {opt.label}
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>

                {/* day picker */}
                <div className="relative">
                    <div
                    className={cn("border w-70 py-1 px-3 border-slate-300 rounded-md", theme === "light" ? "text-slate-900" : "text-slate-50")}
                    ref={buttonRef}
                    >
                        <button className="flex items-center justify-evenly w-full transition-colors" onClick={toggleButton} aria-expanded={openCalendar}>
                            <CalendarDays size={20} />
                            {displayDateRange}
                            {openCalendar ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                    </div>

                    {openCalendar && (
                        <div className="w-fit absolute top-10 right-0 z-1" ref={calendarRef}>
                            <Calendar
                                mode="range"
                                selected={{
                                    from: tempRange.from ? new Date(tempRange.from) : undefined,
                                    to: tempRange.to ? new Date(tempRange.to) : undefined
                                }} 
                                onSelect={(selectedRange) => setTempRange({
                                    from: selectedRange?.from ?? null,
                                    to: selectedRange?.to ?? null
                                })}
                                className={cn("rounded-md pb-0 border border-slate-300 bg-slate-100/95 dark:bg-slate-900/95 dark:text-slate-50")}
                                locale={vi}
                                disabled={{ after: today }}
                                components={{
                                    Footer: () => (
                                        <div ref={footerRef}>
                                            <CalendarButton onConfirm={handleConfirm} onCancel={handleCancel} />
                                        </div>
                                    )
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="card-body p-0">
                {currentChart === "visited" && <VisitedChart data={chartData} xAxisKey={xAxisKey} error={error} />}
                {currentChart === "total_amount" && <VisitedChart data={chartData} xAxisKey={xAxisKey} error={error} />}
                {currentChart === "members" && <MemberChart data={chartData} xAxisKey={xAxisKey} error={error} />}
            </div>
        </React.Fragment>
    );
};

export default Chart;