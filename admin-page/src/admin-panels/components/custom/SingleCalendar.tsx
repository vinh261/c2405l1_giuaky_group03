import { useState } from "react";
import { vi } from "date-fns/locale";
import { useChart } from "../../hooks/useChart";
import { cn } from "../../../types/cn";
import { Calendar } from "../../../libs/shadcn/Calendar";



const SingleCalendar = () => {
    const { today, calendarRef } = useChart();
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <div className="w-fit top-10 right-0 z-1" ref={calendarRef}>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className={cn("rounded-md pb-0 border border-slate-300 bg-slate-100/95 dark:bg-slate-900/95 dark:text-slate-50")}
                locale={vi}
                disabled={{ after: today }}
                fixedWeeks={true} // 6 rows
                // components={{
                //     Footer: () => (
                //         <div ref={footerRef}>
                //             <CalendarButton onConfirm={handleConfirm} onCancel={handleCancel} />
                //         </div>
                //     )
                // }}
            />
        </div>
    )
};

export default SingleCalendar;
