import { ArrowDown, ArrowUp, CircleCheck, Contact, PencilLine, Plus, Search, Trash } from "lucide-react";
import { cn } from "../../../../types/cn";
import { useToDo } from "../../../../hooks/useToDo";
import { formatData, formatDate, formatImage } from "../../../utils/formatData";
import SearchDropdown from "../../../../components/ui/SearchDropdown";
import { useNavigate } from "react-router";
import type { FormProps } from "../../../../types/models.types";
import SkeletonPage from "../../../../components/Skeleton";

const MemberList = (props: { handleViewMember: (member: FormProps) => void }) => {
    const tableHeader = [
        "#", "Họ tên", "ID", "Ngày tham gia", "Công việc", "Địa chỉ", "Trạng thái", "Tùy chọn"
    ]
    const sortOptions = [
        { value: "user_name", label: "Tên" },
        { value: "created_at", label: "Ngày tham gia" },
        { value: "address", label: "Địa chỉ" },
        // { value: "status", label: "Trạng thái" },
    ]
    const { 
        search, handleSearch, displayedMembers,
        setIsOpen, suggestions, handleSuggest, 
        isOpen, sortField, 
        handleSort, sortOrder,
        deleteMember,
        loading,
        errorMessage,
    } = useToDo();
    const navigate = useNavigate();

    if (loading) {
        return <SkeletonPage />;
    }

    if (errorMessage) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong>Lỗi: </strong>{errorMessage}
            </div>
        );
    }

    return (
        <div className="card h-full gap-y-2! relative">
            <div className="card-header justify-between px-5">
                <p className="card-title text-base">danh sách thành viên</p>

                <div className="flex justify-between gap-x-2">
                    {/* SEARCH */}
                    <div className="input h-9! relative">
                        <Search size={20} className="text-slate-400" />
                        <input
                            id="search"
                            name="search"
                            type="text"
                            placeholder="Tìm thành viên..."
                            className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-400 text-sm placeholder:text-sm dark:text-slate-50"
                            onChange={e => handleSearch(e.target.value)}
                            onFocus={() => { // Hiện gợi ý khi focus nếu có sẵn text và suggestions
                                if (search.length > 0 && suggestions.length > 0) {
                                    setIsOpen(true);
                                }
                            }}
                            onBlur={() => {
                                // Thêm độ trễ nhỏ để sự kiện click trên item của dropdown kịp xử lý
                                setTimeout(() => {
                                    setIsOpen(false); // Ẩn gợi ý khi mất focus
                                }, 150); // 150ms, có thể điều chỉnh nếu cần
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault(); // Ngăn hành vi mặc định của Enter
                                    console.log("Enter pressed:", search); // Thực hiện hành động mong muốn
                                    handleSearch(search);
                                }
                            }}
                            value={search}
                            autoComplete="off"
                        />

                        {isOpen && (
                            <SearchDropdown
                                suggestions={suggestions}
                                isOpen={isOpen}
                                onSelect={handleSuggest}
                                className="w-full max-h-60 overflow-auto absolute left-0 top-full "
                            />
                        )}
                    </div>

                    {/* BUTTON ADD */}
                    <button 
                        type="button"
                        className="flex gap-x-1 items-center justify-between px-3 rounded-lg text-slate-50 bg-cyan-700 hover:bg-cyan-600 dark:text-late-600 dark:bg-cyan-800 dark:hover:bg-cyan-700" 
                        onClick={() => navigate('/admin/add_user')
                    }>
                        <Plus size={18} />
                        Thêm thành viên
                    </button>
                </div>
            </div>

            {/* SORT */}
            <div className="flex text-slate-900 dark:text-slate-50 px-2 py-1 mr-2 place-self-end items-center gap-x-8">
                <p>Sắp xếp theo: </p>

                <div className="flex w-fit gap-x-4">
                    {sortOptions.map(option => (
                        <button
                            type="button"
                            key={option.value}
                            className={cn("py-2 cursor-pointer flex justify-center",
                                sortField === option.value
                                ? "text-indigo-500 underline underline-offset-4 dark:text-indigo-300"
                                : ""
                            )}
                            onClick={() => handleSort(option.value)}
                        >
                            <p className="mx-2">{option.label}</p>
                            <span className="w-5 h-5 flex items-center justify-center">
                                {sortField === option.value && (
                                sortOrder === "asc" 
                                ? <ArrowUp size={20} /> 
                                : <ArrowDown size={20} />)}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* TABLE */}
            <div className="card-body pt-0! overflow-auto [scrollbar-width:_thin]">
                <table className="table">
                    <thead className="table-header">
                        <tr className="table-row">
                            {tableHeader.map((item, index) => (
                                <th key={index} className={cn("table-header-item")}>{item}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="table-body">
                        {displayedMembers.map((items, index) => (
                            <tr key={index} className={cn("table-row", index < displayedMembers.length - 1 && "border-b border-dashed border-slate-300 dark:border-slate-600")}>
                                <td className="table-body-item">{index + 1}</td>
                                <td className="table-body-item">
                                    <div className="flex w-max gap-x-4">
                                        <img src={formatImage(items.image)} alt={formatData(items.user_name)} className="size-14 rounded-full object-cover" />
                                        <div className="flex flex-col justify-center gap-y-1">
                                            <p>{formatData(items.user_name)}</p>
                                            <p className="font-normal text-[13px] text-slate-600 dark:text-slate-400">{formatData(items.user.email)}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="table-body-item">{formatData(items.profile_id)}</td>
                                <td className="table-body-item">{formatDate(items.created_at)}</td>
                                <td className="table-body-item">{formatData(items.job)}</td>
                                <td className="table-body-item">{formatData(items.address)}</td>
                                <td className="table-body-item">
                                    <div className="flex items-center gap-x-2">
                                        <CircleCheck size={18} className={items.status === 'active' ? 'text-green-600' : 'text-red-600'} />
                                        {formatData(items.status)}
                                    </div>
                                </td>
                                <td className="table-body-item">
                                    <div className="flex items-center gap-x-4">
                                        <button type="button" className="text-teal-500 dark:text-teal-600" onClick={() => props.handleViewMember(items)}>
                                            <Contact size={18} />
                                        </button>
                                        <button type="button" className="text-blue-500 dark:text-blue-600">
                                            <PencilLine size={18} />
                                        </button>
                                    <button type="button" className="text-red-500" onClick={() => deleteMember(items.profile_id)}>
                                        <Trash size={18} />
                                    </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default MemberList;
