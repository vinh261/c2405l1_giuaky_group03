import { cn } from "@/libs/utils";
import type { PaginationProps } from "@/types/models.types";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import React, { useMemo } from "react";



const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    showFirstLast = true,
    maxVisible = 5,
}) => {
    // Tính toán các trang hiển thị
    const pages = useMemo(() => {
        const pages: (number | string)[] = [];

        if (totalPages <= maxVisible) {
            // Hiển thị tất cả nếu ít trang
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Logic hiển thị với dấu ...
            const leftOffset = Math.floor(maxVisible / 2);
            const rightOffset = maxVisible - leftOffset - 1;

            if (currentPage <= leftOffset + 1) {
                // Near start
                for (let i = 1; i <= maxVisible - 1; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - rightOffset) {
                // Near end
                pages.push(1);
                pages.push("...");
                for (
                    let i = totalPages - (maxVisible - 2);
                    i <= totalPages;
                    i++
                ) {
                    pages.push(i);
                }
            } else {
                // Middle
                pages.push(1);
                pages.push("...");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            }
        }

        return pages;
    }, [currentPage, totalPages, maxVisible]);

    return (
        <div className="flex items-center justify-center gap-1">
            {/* First page */}
            {showFirstLast && (
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="First page">
                    <ChevronsLeft size={20} />
                </button>
            )}

            {/* Previous page */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page">
                <ChevronLeft size={20} />
            </button>

            {/* Page numbers */}
            <div className="flex gap-1">
                {pages.map((page, index) => (
                    <div key={index}>
                        {page === "..." ? (
                            <span className="px-3 py-2">...</span>
                        ) : (
                            <button
                                onClick={() => onPageChange(page as number)}
                                className={cn("min-w-[40px] px-3 py-2 rounded-lg transition-colors",
                                    currentPage === page
                                        ? "bg-blue-500 text-white font-medium"
                                        : "hover:bg-gray-100"
                                )}>
                                {page}
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Next page */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page">
                <ChevronRight size={20} />
            </button>

            {/* Last page */}
            {showFirstLast && (
                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Last page">
                    <ChevronsRight size={20} />
                </button>
            )}
        </div>
    );
};
export default Pagination;