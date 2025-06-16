// src/components/common/LoadingSpinner/LoadingSpinner.tsx

import { cn } from "@/utils/cn";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    fullScreen?: boolean;
    className?: string;
}

export function LoadingSpinner({
    size = "md",
    fullScreen = false,
    className,
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12",
    };

    const spinner = (
        <div
            className={cn(
                "inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
                sizeClasses[size],
                className
            )}
            role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                {spinner}
            </div>
        );
    }

    return spinner;
}

// Export from index
export { LoadingSpinner as default };