import { type UseFormReturn } from "react-hook-form";
import { type typeForm } from "../../../utils/formSchema";
import React from "react";
import Select from "react-select";
import { useCustomStyles } from "../../../utils/customStyleSelectReact";
import { cities, countries, districts, wards } from "../../data/add-user/LocationData";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../libs/shadcn/Form";
import { Input } from "../../../../libs/shadcn/Input";
import { Button } from "../../../../libs/shadcn/Button";
import { Textarea } from "../../../../libs/shadcn/Textarea";
import { ArrowLeft } from "lucide-react";


type AddFormType = {
    form: UseFormReturn<typeForm>,
    onSubmit: (value: typeForm) => void
}

const genderOptions = [
    { value: 'male', label: 'Nam' },
    { value: 'female', label: 'Nữ' },
    { value: 'other', label: 'Khác' },
];

const AddForm = ({ form, onSubmit }: AddFormType) => {
    const customStyles = useCustomStyles();

    return (
        <React.Fragment>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 grid-rows-auto col-span-5 gap-4 h-full text-slate-900 dark:text-slate-50 border-slate-300 dark:border-slate-700 rounded-xl overflow-auto [scrollbar-width:none]">
                    <div className="col-span-2 flex justify-between items-center">
                        <p className="title">Thêm thành viên</p>
                        <a href="/admin/members" className="flex items-center gap-x-2 transition-colors duration-300 hover:text-indigo-500 dark:hover:text-indigo-300"> <ArrowLeft size={20} /> Quay lại danh sách</a>
                    </div>

                    {/* NAME */}
                    <FormField
                        control={form.control}
                        name="user_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Họ và tên:</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="text"
                                        className="placeholder:text-slate-600/70 dark:placeholder:text-slate-400/70 focus-visible:ring-0  border-slate-400 dark:border-slate-700" 
                                        placeholder="hehehe" 
                                        value={field.value || ""}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                </FormControl>
                                <FormMessage className="form-message" />
                            </FormItem>
                        )}
                    />

                    {/* PHONE */}
                    <div className="grid grid-cols-2 gap-x-4">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Số điện thoại:</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="text"
                                            className="placeholder:text-slate-600/70 dark:placeholder:text-slate-400/70 focus-visible:ring-0  border-slate-400 dark:border-slate-700" 
                                            placeholder="0123 456 789"
                                            value={field.value || ""}
                                            onChange={(e) => field.onChange(e.target.value)} 
                                        />
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />

                        {/* BIRTH */}
                        <FormField 
                            control={form.control} 
                            name="dob" 
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Sinh nhật:</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="date"
                                            value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                                            onChange={(e) => field.onChange(e.target.value)}
                                            className="placeholder:text-slate-600/70 dark:placeholder:text-slate-400/70 focus-visible:ring-0  border-slate-400 dark:border-slate-700"
                                        />
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* MAIL */}
                    <FormField 
                        control={form.control} 
                        name="email" 
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email:</FormLabel>
                                <FormControl>
                                    <Input 
                                    type="email"
                                    placeholder="hld@shadcn.com" 
                                    value={field.value || ""}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    className="placeholder:text-slate-600/70 dark:placeholder:text-slate-400/70 focus-visible:ring-0  border-slate-400 dark:border-slate-700"
                                />
                                </FormControl>
                                <FormMessage className="form-message" />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-between gap-x-4">
                        {/* WEIGHT */}
                        <FormField
                            control={form.control}
                            name="weight"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Cân nặng (kg)</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="string" 
                                        value={field.value || ""}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        className="placeholder:text-slate-600/70 dark:placeholder:text-slate-400/70 focus-visible:ring-0  border-slate-400 dark:border-slate-700"
                                        placeholder="60"
                                />
                                </FormControl>
                                <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />

                        {/* HEIGHT */}
                        <FormField
                            control={form.control}
                            name="height"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Chiều cao (cm)</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="string" 
                                        value={field.value || ""}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        className="placeholder:text-slate-600/70 dark:placeholder:text-slate-400/70 focus-visible:ring-0  border-slate-400 dark:border-slate-700" 
                                        placeholder="170"
                                    />
                                </FormControl>
                                <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* PASSWORD */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                                <Input 
                                    type="password" 
                                    value={field.value || ""}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    className="placeholder:text-slate-600/70 dark:placeholder:text-slate-400/70 focus-visible:ring-0  border-slate-400 dark:border-slate-700" 
                                />
                            </FormControl>
                            <FormMessage className="form-message" />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-x-4">
                        {/* JOB */}
                        <FormField
                            control={form.control}
                            name="job"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Công việc</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="text"
                                        placeholder="Nhân viên văn phòng" 
                                        value={field.value || ""}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        className="placeholder:text-slate-600/70 dark:placeholder:text-slate-400/70 focus-visible:ring-0  border-slate-400 dark:border-slate-700" 
                                    />
                                </FormControl>
                                <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />

                        {/* GENDER */}
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Giới tính</FormLabel>
                                <FormControl>
                                <Select
                                    options={genderOptions}
                                    onChange={(option) => field.onChange(option?.value)}
                                    value={genderOptions.find((opt) => opt.value === field.value) || null}
                                    styles={customStyles}
                                    placeholder="Chọn giới tính"
                                    className="placeholder:text-slate-600/70 dark:placeholder:text-slate-400/70 focus-visible:ring-0  border-slate-400 dark:border-slate-700 whitespace-nowrap"
                                    isClearable // Cho phép xóa lựa chọn
                                />
                                </FormControl>
                                <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Quốc gia */}
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem className="placeholder:text-slate-600/70 dark:placeholder:text-slate-400/70 focus-visible:ring-0  border-slate-400 dark:border-slate-700 bg-transparent" >
                            <FormLabel>Quốc gia</FormLabel>
                            <FormControl>
                                <Select
                                    options={countries}
                                    onChange={(option) => field.onChange(option?.value)}
                                    value={countries.find((opt) => opt.value === field.value) || null}
                                    styles={customStyles}
                                    isClearable
                                />
                            </FormControl>
                            <FormMessage className="form-message" />
                            </FormItem>
                        )}
                    />

                    {/* Thành phố */}
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Tỉnh/Thành phố</FormLabel>
                            <FormControl>
                                <Select
                                    options={cities}
                                    onChange={(option) => field.onChange(option?.value)}
                                    value={cities.find((opt) => opt.value === field.value) || null}
                                    styles={customStyles}
                                    isClearable
                                />
                            </FormControl>
                            <FormMessage className="form-message" />
                            </FormItem>
                        )}
                    />

                    {/* Quận */}
                    <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Quận/Huyện</FormLabel>
                            <FormControl>
                                <Select
                                    options={districts}
                                    onChange={(option) => field.onChange(option?.value)}
                                    value={districts.find((opt) => opt.value === field.value) || null}
                                    styles={customStyles}
                                    isClearable
                                />
                            </FormControl>
                            <FormMessage className="form-message" />
                            </FormItem>
                        )}
                    />

                    {/* Phường */}
                    <FormField
                        control={form.control}
                        name="ward"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Phường/Xã</FormLabel>
                            <FormControl>
                                <Select
                                    options={wards}
                                    onChange={(option) => field.onChange(option?.value)}
                                    value={wards.find((opt) => opt.value === field.value) || null}
                                    styles={customStyles}
                                    isClearable
                                />
                            </FormControl>
                            <FormMessage className="form-message" />
                            </FormItem>
                        )}
                    />

                    {/* Ghi chú */}
                    <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                            <FormLabel>Ghi chú</FormLabel>
                            <FormControl>
                                <Textarea 
                                    rows={4} 
                                    placeholder="Nhập ghi chú nếu có..." 
                                    value={field.value || ""}
                                    className="border-slate-400 dark:border-slate-700 focus-visible:ring-0"
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            </FormControl>
                            <FormMessage className="form-message" />
                            </FormItem>
                        )}
                    />

                    <Button 
                        type="submit" 
                        className="col-span-2 w-fit m-auto py-6 px-12 bg-sky-500/80 dark:bg-sky-800/70 font-bold text-base hover:bg-sky-500 dark:hover:bg-sky-800"
                    >
                        Thêm thành viên
                    </Button>
                </form>
            </Form>
        </React.Fragment>
    )
};

export default AddForm;

