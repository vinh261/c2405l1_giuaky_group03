import type { FilterProps } from "@/types/models.types";
import React, { useEffect, useRef, useState } from "react";
import { Filter as FilterIcon, X } from "lucide-react";
import useClickOutSide from "@/hooks/useClickOutSide";
import { cn } from "@/libs/utils";


const Filter: React.FC<FilterProps> = ({ 
    filterConfig, 
    onApplyFilter,
    buttonText = "Lọc",
    modalTitle = "Bộ lọc"
}) => {
    const [ showFilter, setShowFilter ] = useState(false);
    const clickOutSideRef = useRef(null);
    const [ filtered, setFiltered ] = useState<Record<string, unknown>>({});

    // Initialize filters
    useEffect(() => {
        const initialFilters: Record<string, unknown> = {};
        filterConfig.forEach(config => {
        if (config.type === 'buttons') {
            initialFilters[config.id] = [];
        } else if (config.type === 'range') {
            initialFilters[config.id] = { 
            min: config.min || 0, 
            max: config.max || 100 
            };
        }
        });
        setFiltered(initialFilters);
    }, [filterConfig]);

    // Toggle button selection
    const toggleButton = (configId: string, value: string) => {
        const currentValues = Array.isArray(filtered[configId]) ? filtered[configId] as string[] : [];
        if (currentValues.includes(value)) {
            setFiltered({
                ...filtered,
                [configId]: currentValues.filter((v: string) => v !== value)
            });
        } else {
            setFiltered({
                ...filtered,
                [configId]: [...currentValues, value]
            });
        }
    }

     // Update range
    const updateRange = (configId: string, type: 'min' | 'max', value: number) => {
        const { min = 0, max = 100 } = (filtered[configId] as { min?: number; max?: number }) || {};
        const currentRange = { min, max };
        
        if (type === 'min' && value <= currentRange.max) {
            setFiltered({
                ...filtered,
                [configId]: { ...currentRange, min: value }
            });
        } else if (type === 'max' && value >= currentRange.min) {
            setFiltered({
                ...filtered,
                [configId]: { ...currentRange, max: value }
            });
        }
    };

    // Apply filters
    const handleApplyFilter = () => {
        onApplyFilter(filtered);
        setShowFilter(false);
    };

    // Reset filters
    const handleReset = () => {
        const resetFilters: Record<string, unknown> = {};
        filterConfig.forEach(config => {
            if (config.type === 'buttons') {
                resetFilters[config.id] = [];
            } else if (config.type === 'range') {
                resetFilters[config.id] = { 
                min: config.min || 0, 
                max: config.max || 100 
                };
            }
        });
        setFiltered(resetFilters);
    };

    useClickOutSide([clickOutSideRef], () => setShowFilter(false));

    return (
        <React.Fragment>
            {/* Nút Lọc */}
            <button
                onClick={() => setShowFilter(true)}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-200"
            >
                <FilterIcon size={20} />
                <span>{buttonText}</span>
            </button>

            {/* Modal Filter */}
            {showFilter && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div ref={clickOutSideRef} className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-xl font-semibold">{modalTitle}</h2>
                            <button
                                onClick={() => setShowFilter(false)}
                                className="p-1 hover:bg-gray-100 rounded">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-6">
                            {filterConfig.map(config => (
                                <div key={config.id}>
                                    <h3 className="font-medium mb-3">{config.label}</h3>
                                    
                                    {/* Buttons type */}
                                    {config.type === 'buttons' && config.options && (
                                        <div className={`grid grid-cols-${config.columns || 2} gap-2`}>
                                            {config.options.map(option => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => toggleButton(config.id, option.value)}
                                                    className={cn("py-2 px-3 rounded-lg border text-sm transition-colors",
                                                        (filtered[config.id] as string[])?.includes(option.value)
                                                        ? 'bg-blue-500 text-white border-blue-500'
                                                        : 'bg-white border-gray-300 hover:bg-gray-50'
                                                    )}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {/* Range type */}
                                    {config.type === 'range' && (
                                        <div className="space-y-4">
                                            {/* Input fields */}
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="number"
                                                    value={(filtered[config.id] as { min?: number })?.min ?? config.min ?? 0}
                                                    onChange={(e) => updateRange(config.id, 'min', parseInt(e.target.value) || 0)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                    placeholder="Từ"
                                                />

                                                <span className="text-gray-500">-</span>

                                                <input
                                                    type="number"
                                                    value={(filtered[config.id] as { max?: number })?.max ?? config.max ?? 100}
                                                    onChange={(e) => updateRange(config.id, 'max', parseInt(e.target.value) || 100)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                    placeholder="Đến"
                                                />
                                            </div>
                                        
                                            {/* Range slider */}
                                            <div className="relative h-2">
                                                {/* Background track */}
                                                <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 rounded-lg"></div>
                                                
                                                {/* Active track */}
                                                <div 
                                                    className="absolute top-0 h-2 bg-blue-500 rounded-lg transition-all"
                                                    style={{
                                                        left: `${(((filtered[config.id] as { min?: number })?.min ?? 0) / (config.max || 100)) * 100}%`,
                                                        width: `${((((filtered[config.id] as { max?: number })?.max ?? config.max ?? 100) - ((filtered[config.id] as { min?: number })?.min ?? 0)) / (config.max || 100)) * 100}%`
                                                    }}
                                                ></div>
                                                
                                                {/* Min slider */}
                                                <input
                                                    type="range"
                                                    min={config.min || 0}
                                                    max={config.max || 100}
                                                    value={(filtered[config.id] as { min?: number })?.min ?? config.min ?? 0}
                                                    onChange={(e) => updateRange(config.id, 'min', parseInt(e.target.value))}
                                                    className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider z-20"
                                                />
                                                
                                                {/* Max slider */}
                                                <input
                                                    type="range"
                                                    min={config.min || 0}
                                                    max={config.max || 100}
                                                    value={(filtered[config.id] as { max?: number })?.max ?? config.max ?? 100}
                                                    onChange={(e) => updateRange(config.id, 'max', parseInt(e.target.value))}
                                                    className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider z-20"
                                                />
                                            </div>
                                        
                                            {/* Values display */}
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium text-blue-600">
                                                    {(filtered[config.id] as { min?: number })?.min ?? config.min ?? 0} {config.unit}
                                                </span>
                                                <span className="text-sm font-medium text-blue-600">
                                                    {(filtered[config.id] as { max?: number })?.max ?? config.max ?? 100} {config.unit}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="flex gap-3 p-4 border-t">
                            <button
                                onClick={handleReset}
                                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Đặt lại
                            </button>
                            <button
                                onClick={handleApplyFilter}
                                className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Áp dụng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
export default Filter;