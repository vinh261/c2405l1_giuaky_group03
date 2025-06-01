import { memo } from "react";
import type { CalendarButtonProps } from "../../../types/models.types";


const CalendarButton: React.FC<CalendarButtonProps> = ({onConfirm, onCancel}) => {
    return (
        <div className="flex items-center h-14 justify-end">
            <div className="content-center flex justify-evenly w-[60%]">
                <button onClick={onConfirm} className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400">
                    Xác nhận
                </button>
                <button onClick={onCancel} className="text-stone-600 hover:text-stone-500 dark:text-stone-500 dark:hover:text-stone-400">
                    Hủy
                </button>
            </div>
        </div>
    );
}
export default memo(CalendarButton);