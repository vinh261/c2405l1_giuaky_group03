import { cn } from "@/utils/cn";
import Button from "../button/ButtonCustom";
import { useMealPageLogic } from "@/components/meal-page/useMealPageLogic";


const Pagination = () => {
    const {
        data,
        handlePageChange,
    } = useMealPageLogic();

    const renderPagination = () => {
        if (!data || data.last_page <= 1) return null;

        const pages = [];
        const currentPage = data.current_page;
        const lastPage = data.last_page;

        // Always show first page
        pages.push(1);

        // Show dots if needed
        if (currentPage > 3) {
            pages.push("...");
        }

        // Show pages around current
        for (
            let i = Math.max(2, currentPage - 1);
            i <= Math.min(lastPage - 1, currentPage + 1);
            i++
        ) {
            if (!pages.includes(i)) {
                pages.push(i);
            }
        }

        // Show dots if needed
        if (currentPage < lastPage - 2) {
            pages.push("...");
        }

        // Always show last page
        if (lastPage > 1 && !pages.includes(lastPage)) {
            pages.push(lastPage);
        }

        return (
            <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border border-slate-300 transition-colors hover:bg-slate-200">
                    Previous
                </Button>

                {pages.map((page, index) => (
                    <div key={index}>
                        {page === "..." ? (
                            <span className="px-2">...</span>
                        ) : (
                            <Button
                                size="sm"
                                onClick={() => handlePageChange(page as number)}
                                className={cn(
                                    "min-w-[40px] border border-slate-300 transition-colors",
                                    page === currentPage
                                        ? "bg-sky-500 text-white shadow-md scale-105"
                                        : "bg-white text-slate-900 hover:bg-sky-100"
                                )}>
                                {page}
                            </Button>
                        )}
                    </div>
                ))}

                <Button
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === lastPage}
                    className="border border-slate-300 transition-colors hover:bg-slate-200">
                    Next
                </Button>
            </div>
        );
    };

    return renderPagination();
};
export default Pagination;
