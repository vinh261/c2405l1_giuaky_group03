import { useCallback, useRef, useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import { ChartContext } from "./ChartContext";
import { createChartData } from "../../utils/createChartData";
import type { ChartProviderProps, DateRange } from "../../../types/models.types";
import useClickOutSide from "../../../hooks/useClickOutSide";


export const ChartProvider = ({children}: ChartProviderProps) => {
    const chartOptions = [
        { value: "total_amount", label: "Tổng quan thu nhập" },
        { value: "visited", label: "Số lượng truy cập" },
        { value: "members", label: "Số lượng thành viên" },
    ];
    const labelFilter = [
        { label: "Tên thành viên" }
    ]
    
    const {theme} = useTheme();
    const [currentChart, setCurrentChart] = useState("total_amount");
    const [isOpen, setIsOpen] = useState(false);
    const [range, setRange] = useState<DateRange>({from: null, to: null});
    const [tempRange, setTempRange] = useState<DateRange>({ from: null, to: null });
    const [openCalendar, setOpenCalendar] = useState(false);
    const [filteredData, setFilteredData] = useState(createChartData);

    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const calendarRef = useRef(null);
    const footerRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

    const currentOption = chartOptions.find(opt => opt.value === currentChart);
    const currentFilter = labelFilter.find(fil => fil.label);
    const toggleDropdown = useCallback(() => setIsOpen(!isOpen), [isOpen]);
    const toggleButton = useCallback(() => setOpenCalendar(!openCalendar), [openCalendar]);

    const handleSelect = useCallback((value: string) => {
        setCurrentChart(value);
        setIsOpen(false);
    }, []);

    // Sử dụng useCallback để đảm bảo hàm này không bị tạo lại mỗi lần render
    const handleConfirm = useCallback(() => {
        // Ensure both from and to dates are selected and different
        if (
            !tempRange.from ||
            !tempRange.to ||
            !(tempRange.from instanceof Date) ||
            !(tempRange.to instanceof Date) ||
            tempRange.from.getTime() === tempRange.to.getTime()
        ) {
            setOpenCalendar(false);
            return;
        }

        // Cập nhật range và lọc dữ liệu
        setRange({ from: new Date(tempRange.from), to: new Date(tempRange.to) });

        const filtered = createChartData.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate >= tempRange.from! && itemDate <= tempRange.to!;
        });
        
        // setFilteredData(transformedData);
        setFilteredData(filtered); // giu nguyen data
        setTempRange({ from: null, to: null });
        setOpenCalendar(false);
    }, [tempRange]);


    // Sử dụng useCallback cho handleCancel
    const handleCancel = useCallback(() => {
        setRange({ from: null, to: null });
        setTempRange({ from: null, to: null });
        setFilteredData(createChartData);
        setOpenCalendar(false);
    }, []);

    // Sử dụng useCallback cho handleClickOutside
    const handleClickOutsideCalendar = useCallback(() => {
        // Reset tempRange khi click outside
        setTempRange({ from: null, to: null });
        setOpenCalendar(false);
    }, []);

    const handleClickOutsideDropdown = useCallback(() => {
        setIsOpen(false);
    }, []);

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    useClickOutSide([dropdownRef], handleClickOutsideDropdown);
    useClickOutSide([buttonRef, calendarRef, footerRef], handleClickOutsideCalendar);

    return (
        <ChartContext.Provider value={{
            chartOptions, currentOption,
            theme, currentChart, isOpen,
            range, setRange,
            openCalendar, filteredData,
            dropdownRef, calendarRef, buttonRef,
            toggleButton, toggleDropdown,
            handleCancel, handleSelect, handleConfirm,
            today, startOfMonth,
            tempRange, setTempRange, footerRef,
            currentFilter,
        }}>
            {children}
        </ChartContext.Provider>
    );
}