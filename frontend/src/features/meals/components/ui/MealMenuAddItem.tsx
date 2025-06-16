import { Button } from "@/libs/shadcn/button";
import { Input } from "@/libs/shadcn/input";
import { Textarea } from "@/libs/shadcn/textarea";
import { Plus, Trash, Upload } from "lucide-react";
import Select from "react-select"
import { MealCustomSelect } from "../MealCustomSelect";
import { cn } from "@/libs/utils";
import { useMealContext } from "../../hooks/useMealContext";


const selectProps = [
    { value: "breakfast", label: "Ăn sáng"},
    { value: "lunch", label: "Ăn trưa"},
    { value: "dinner", label: "Ăn tối"},
    { value: "snack", label: "Ăn vặt"}
]

const nutriProps = [
    { label: "Calories*", name: "calories" as const, default: 0},
    { label: "Thời gian (phút)*", name: "cook_time" as const, default: 0},
    { label: "Khẩu phần", name: "serve" as const, default: 1},
]

const dietProps = [
    { label: "Vegan"},
    { label: "Vegetable"},
    { label: "Keto"},
    { label: "Low Carb"},
    { label: "Gluten Free"},
    { label: "Dairy Free"},
]

const ingredientProps = [
    { value: "g", label: "gram"},
    { value: "kg", label: "kilogram"},
    { value: "l", label: "lít"},
    { value: "ml", label: "mililit"},
]


const MealMenuAddItem = () => {
    const customStyles = MealCustomSelect();
    const {
        register, handleSubmit, errors, fields, append, remove, handleImageChange, toggleDietType, onFormSubmit, imagePreview,
        setImageFile, setImagePreview, dietType, onClose
    } = useMealContext();

    return (
        <div className="border fixed z-10 top-[52%] left-1/2 -translate-1/2 bg-slate-50 p-6 rounded-lg border-slate-400 overflow-auto h-[900px] [scrollbar-width:thin]">
            <form onSubmit={handleSubmit(onFormSubmit)} className="grid gap-6">
                {/* IMG */}
                <div className="grid">
                    <p>Hình ảnh món ăn*</p>
                    {imagePreview ? (
                        <button 
                            type="button" 
                            className="border border-dashed border-slate-400 w-full flex flex-col items-center py-8 rounded-lg text-slate-500 transition-colors duration-300 hover:text-slate-700 hover:bg-slate-100"
                            onClick={() => {
                                setImageFile(null);
                                setImagePreview('');
                            }}
                        >
                            <Upload />
                            <p>Click để tải ảnh lên</p>
                            <p className="text-sm text-slate-400">PNG, JPG,...</p>
                        </button>
                    ) : (
                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <Upload size={32} className="text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">Click để tải ảnh</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                    )}
                </div>

                {/* NAME */}
                <div className="grid">
                    <p>Tên món ăn*</p>
                    <Input 
                        {...register('meal_name')}
                        type="text"
                        placeholder="Nhập tên món" 
                        className="border-slate-400"
                    />
                    {errors.meal_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.meal_name.message}</p>
                    )}
                </div>

                {/* DESC */}
                <div className="grid">
                    <p>Mô tả*</p>
                    <Textarea
                        {...register('desc')}
                        placeholder="Mô tả đôi nét về món ăn"
                        className="border-slate-400 text-slate-900"
                    />
                    {errors.desc && (
                        <p className="text-red-500 text-sm mt-1">{errors.desc.message}</p>
                    )}
                </div>

                {/* CATEGORY */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="grid">
                        <p>Danh mục*</p>
                        <Select
                            options={selectProps}
                            placeholder="Chọn danh mục"
                            styles={customStyles}
                        />
                    </div>
                    
                    <div className="grid">
                        <p>Giá (VNĐ)</p>
                        <Input
                            type="text"
                            defaultValue="Miễn phí"
                            readOnly
                            className="border-slate-400"
                        />
                    </div>
                </div>
                
                {/* NUTRITION */}
                <div className="grid grid-cols-3 gap-2">
                    {nutriProps.map((item, index) => (
                        <div key={index} className="grid">
                            <p>{item.label}</p>
                            <Input 
                                {...register(item.name, { valueAsNumber: true })}
                                type="number"
                                defaultValue={item.default}
                                className="border-slate-400"
                            />
                        </div>
                    ))}
                    {errors.calories && (
                        <p className="text-red-500 text-xs mt-1">{errors.calories.message}</p>
                    )}
                    {errors.cook_time && (
                        <p className="text-red-500 text-xs mt-1">{errors.cook_time.message}</p>
                    )}
                    {errors.serve && (
                        <p className="text-red-500 text-xs mt-1">{errors.serve.message}</p>
                    )}
                </div>

                {/* DIET TYPE */}
                <div>
                    <p>Chế độ ăn</p>
                    {dietProps.map((item, index) => (
                        <Button 
                            onClick={() => toggleDietType(item.label)}
                            type="button" 
                            key={index} 
                            className={cn("border border-slate-300 mr-2",
                                dietType?.includes(item.label)
                                ? 'bg-blue-500 text-slate-50'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            )}
                        >
                            {item.label}
                            {/* {item.label.replace('-', ' ').charAt(0).toUpperCase() + item.label.slice(1).replace('-', ' ')} */}
                        </Button>
                    ))}
                </div>
                
                {/* INGREDIENT */}
                <div className="grid gap-3">
                    <div>
                        <p>Nguyên liệu*</p>

                        <div className="grid gap-1">
                            {fields.map((item, index) => (
                                <div key={item.id} className="flex justify-between gap-2 items-center">
                                    <Input 
                                        {...register(`ingredients.${index}.ingredient_name`)}
                                        placeholder="Tên nguyên liệu"
                                        className="border-slate-400"
                                    />
                                    <Input 
                                        {...register(`ingredients.${index}.quantity`)}
                                        placeholder="Số lượng"
                                        className="w-[20%] border-slate-400"
                                    />
                                    <Select 
                                        options={ingredientProps}
                                        placeholder="Đơn vị"
                                        className="w-[36%]"
                                        styles={customStyles}
                                    />
                                    <Button 
                                        type="button" 
                                        onClick={() => remove(index)} 
                                        disabled={fields.length === 1}
                                        className="border border-slate-300 hover:bg-slate-200 cursor-pointer"
                                    >
                                        <Trash className="text-red-500" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button
                        type="button"
                        onClick={() => append({ ingredient_name: '', quantity: '', unit: 'g' })}
                        className="flex items-center gap-1 hover:text-sky-600 cursor-pointer w-fit border border-slate-300"
                    >
                        <Plus size={18} />
                        Thêm nguyên liệu
                  </Button>
                </div>
                {errors.ingredients && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.ingredients.message || errors.ingredients.root?.message}
                    </p>
                )}

                {/* TUTORIAL */}
                <div>
                    <p>Hướng dẫn nấu*</p>

                    <Textarea 
                        {...register('desc_step')}
                        placeholder="1. Bước 1...&#10;2. Bước 2..."
                        className="border-slate-400 h-50"
                    />
                </div>

                {/* BUTTON */}
                <div className="flex justify-end gap-4">
                    <Button 
                        className="border border-slate-300 hover:bg-sky-600 hover:text-slate-100 transition-colors duration-300"
                        type="submit"
                    >
                        Thêm món
                    </Button>

                    <Button 
                        className="border border-slate-300 hover:bg-red-500/90 hover:text-slate-100 transition-colors duration-300"
                        type="button"
                        onClick={onClose}
                    >
                        Hủy bỏ
                    </Button>
                </div>
            </form>
        </div>
    );
};
export default MealMenuAddItem;
