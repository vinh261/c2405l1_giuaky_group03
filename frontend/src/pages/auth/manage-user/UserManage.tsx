import SearchBar from "@/components/common/search/SearchBar"
import { useManageUser } from "./useManageUser";
import { Filter, Trash2, UserCheck, UserX } from "lucide-react";
import { formatImage } from "@/utils/helpers/format.helper";
import { LoadingSpinner } from "@/components/common/loading";
import { cn } from "@/utils/cn";


const item = [
    { label: "Người dùng", value: "user" },
    { label: "Email", value: "email" },
    { label: "Vai trò", value: "role" },
    { label: "Thống kê", value: "stats" },
    { label: "Ngày tham gia", value: "joined" },
    { label: "Hành động", value: "actions" }
]

const UserManage = () => {
    const {
        users,
        isLoading,
        searchTerm,
        setSearchTerm,
        roleFilter,
        setRoleFilter,
        handleToggleRole,
        handleDeleteUser,
    } = useManageUser();

    return (
        <div className="card h-full gap-y-2! relative">
            <p className="card-title text-base">danh sách thành viên</p>

            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <SearchBar
                        value={searchTerm}
                        onChange={(value) => setSearchTerm(value)}
                        placeholder="Tìm kiếm người dùng..."
                        className="w-full rounded-lg"
                    />

                    {/* <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Thêm người dùng
                    </button> */}

                    <div className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-gray-500" />
                        <select
                            value={roleFilter}
                            onChange={(e) =>
                                setRoleFilter(e.target.value as "all" | "admin" | "user")
                            }
                            className="px-3 py-2 border border-gray-300 rounded-lg">
                            <option value="all">Tất cả</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <LoadingSpinner />
                    </div>
                ) : users.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">
                            Không tìm thấy người dùng
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                {item.map((header) => (
                                    <th
                                        key={header.value}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                                        {header.label}
                                    </th>
                                ))}
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr
                                        key={user.user_id}
                                        className="hover:bg-slate-100">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    {user.profile?.image ? (
                                                        <img
                                                            className="h-10 w-10 rounded-full"
                                                            src={formatImage(user.profile.image)}
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                            <span className="text-gray-600 font-medium">
                                                                {user.profile?.user_name?.[0]?.toUpperCase() || "U"}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {user.profile?.user_name || "No name"}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {user.user_id}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={cn(
                                                    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                                    user.profile?.role === "admin"
                                                        ? "bg-purple-100 text-purple-800"
                                                        : "bg-green-100 text-green-800"
                                                )}>
                                                {user.profile?.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center gap-4">
                                                <span>
                                                    {user.stats.meals_count} món
                                                </span>
                                                <span>
                                                    {user.stats.favorites_count}{" "}
                                                    ❤️
                                                </span>
                                                <span>
                                                    {user.stats.reviews_count}{" "}
                                                    ⭐
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(
                                                user.created_at
                                            ).toLocaleDateString("vi-VN")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleToggleRole(user)
                                                    }
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    title={
                                                        user.profile?.role ===
                                                        "admin"
                                                            ? "Chuyển thành User"
                                                            : "Chuyển thành Admin"
                                                    }>
                                                    {user.profile?.role ===
                                                    "admin" ? (
                                                        <UserX className="h-5 w-5" />
                                                    ) : (
                                                        <UserCheck className="h-5 w-5" />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user.user_id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Xóa người dùng">
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
export default UserManage;
