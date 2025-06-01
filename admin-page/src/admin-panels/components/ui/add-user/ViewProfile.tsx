import { useState, useEffect } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "../../../../libs/shadcn/Dialog";
import { formatData, formatDate, formatImage } from "../../../utils/formatData";
import { Button } from "../../../../libs/shadcn/Button";
import type { FormProps } from "../../../../types/models.types";
import { useToDo } from "../../../../hooks/useToDo";

interface ViewMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    memberData: FormProps | null;
}

const InputField = ({
    label,
    value,
    isEditing,
    type = "text",
    onChange,
    options,
}: {
    label: string;
    value: string | number | undefined;
    isEditing: boolean;
    type?: string;
    onChange: (value: string | number) => void;
    options?: { value: string; label: string }[];
}) => {
    if (!isEditing) {
        if (type === "date") {
            return (
                <div>
                    <p>{label}</p>
                    <div>
                        {formatDate(
                            typeof value === "number" ? value.toString() : value
                        )}
                    </div>
                </div>
            );
        }
        return (
            <div>
                <p>{label}</p>
                <div>
                    {formatData(value !== undefined ? String(value) : "")}
                </div>
            </div>
        );
    }

    if (type === "select" && options) {
        return (
            <div>
                <p>{label}</p>
                <select
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    className="bg-slate-100 dark:bg-slate-700 rounded px-2 py-1 text-black dark:text-white">
                    <option value="">Chọn {label.toLowerCase()}</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    return (
        <div>
            <p>{label}</p>
            <input
                type={type}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className="bg-slate-100 dark:bg-slate-700 rounded px-2 py-1 text-black dark:text-white"
            />
        </div>
    );
};

const ViewProfile = ({ isOpen, onClose, memberData }: ViewMemberModalProps) => {
    const {
        isEditing,
        setIsEditing,
        editedData,
        setEditedData,
        memberList,
        setMemberList,
        setMemberView,
        deleteMember,
    } = useToDo();

    const [localData, setLocalData] = useState<FormProps | null>(null);

    useEffect(() => {
        if (memberData) {
            setLocalData(memberData);
            setEditedData(memberData);
            setIsEditing(false);
        }
    }, [memberData, setEditedData, setIsEditing]);

    if (!localData) {
        return null; // Không render gì nếu localData là null
    }

    const handleChange = (field: keyof FormProps, value: unknown) => {
        if (!localData) return;
        const updated = { ...localData, [field]: value };
        setLocalData(updated);
        setEditedData(updated);
    };

    const handleSave = () => {
        if (!editedData) return;
        // Cập nhật memberList với dữ liệu đã chỉnh sửa
        const updatedList = memberList.map((member) =>
            member.profile_id === editedData.profile_id ? editedData : member
        );
        setMemberList(updatedList);
        setMemberView(editedData);
        setIsEditing(false);
        alert("Chỉnh sửa thành công!");
        onClose();
    };

    const handleCancel = () => {
        setLocalData(memberData);
        setEditedData(memberData);
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (!localData) return;
        if (window.confirm("Bạn có chắc chắn muốn xóa thành viên này không?")) {
            deleteMember(localData.profile_id);
            onClose();
        }
    };

    return (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
                <DialogContent className="sm:max-w-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 p-10 border rounded-xl">
                    <DialogHeader>
                        <DialogTitle>Chi Tiết Thành Viên</DialogTitle>
                        <DialogDescription className="dialog-description">
                            <div className="">
                                <img
                                    src={formatImage(localData.image)}
                                    alt="Avatar"
                                    className="w-32 h-32 object-cover rounded-full"
                                />
                            </div>

                            <div>
                                <div className="text-[12px]">
                                    ID: {formatData(localData.profile_id)}
                                </div>

                                <div className="text-xl uppercase">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={localData.user_name || ""}
                                            onChange={(e) =>
                                                handleChange(
                                                    "user_name",
                                                    e.target.value
                                                )
                                            }
                                            className="bg-slate-100 dark:bg-slate-700 rounded px-2 py-1 text-black dark:text-white"
                                        />
                                    ) : (
                                        formatData(localData.user_name)
                                    )}
                                </div>

                                <div className="italic text-slate-500">
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={localData.user?.email || ""}
                                            onChange={(e) => {
                                                const updatedUser = {
                                                    ...localData.user,
                                                    email: e.target.value,
                                                };
                                                handleChange(
                                                    "user",
                                                    updatedUser
                                                );
                                            }}
                                            className="bg-slate-100 dark:bg-slate-700 rounded px-2 py-1 text-black dark:text-white"
                                        />
                                    ) : (
                                        formatData(localData.user?.email)
                                    )}
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="dialog-view-profile">
                        <InputField
                            label="Số điện thoại"
                            value={localData.phone}
                            isEditing={isEditing}
                            onChange={(val) => handleChange("phone", val)}
                        />
                        <InputField
                            label="Ngày sinh"
                            value={
                                localData.dob instanceof Date
                                    ? localData.dob.toISOString().slice(0, 10)
                                    : localData.dob ?? undefined
                            }
                            isEditing={isEditing}
                            type="date"
                            onChange={(val) => handleChange("dob", val)}
                        />
                        <InputField
                            label="Địa chỉ"
                            value={localData.address}
                            isEditing={isEditing}
                            onChange={(val) => handleChange("address", val)}
                        />
                        <InputField
                            label="Công việc"
                            value={localData.job}
                            isEditing={isEditing}
                            onChange={(val) => handleChange("job", val)}
                        />
                        <InputField
                            label="Chiều cao (cm)"
                            value={localData.height}
                            isEditing={isEditing}
                            type="number"
                            onChange={(val) => handleChange("height", val)}
                        />
                        <InputField
                            label="Cân nặng (kg)"
                            value={localData.weight}
                            isEditing={isEditing}
                            type="number"
                            onChange={(val) => handleChange("weight", val)}
                        />
                        <InputField
                            label="Giới tính"
                            value={localData.gender}
                            isEditing={isEditing}
                            type="select"
                            options={[
                                { value: "male", label: "Nam" },
                                { value: "female", label: "Nữ" },
                                { value: "other", label: "Khác" },
                            ]}
                            onChange={(val) => handleChange("gender", val)}
                        />
                        <InputField
                            label="Trạng thái"
                            value={localData.status}
                            isEditing={isEditing}
                            onChange={(val) => handleChange("status", val)}
                        />
                        <InputField
                            label="Vai trò"
                            value={localData.role}
                            isEditing={isEditing}
                            onChange={(val) => handleChange("role", val)}
                        />
                        <InputField
                            label="Ngày tham gia"
                            value={
                                localData.created_at instanceof Date
                                    ? localData.created_at.toISOString().slice(0, 10)
                                    : localData.created_at ?? undefined
                            }
                            isEditing={isEditing}
                            type="date"
                            onChange={(val) => handleChange("created_at", val)}
                        />
                    </div>
                    <DialogFooter>
                        {isEditing ? (
                            <>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                    className="hover:bg-slate-300 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-700 transition-colors mr-2">
                                    Hủy
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleSave}
                                    className="bg-sky-500 hover:bg-sky-600 dark:bg-sky-700 dark:hover:bg-sky-800">
                                    Lưu
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="mr-2 bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-700">
                                    Chỉnh sửa
                                </Button>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={handleDelete}
                                    className="mr-auto">
                                    Xóa
                                </Button>
                                <DialogClose asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={onClose}
                                        className="hover:bg-slate-300 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-700 transition-colors">
                                        Đóng
                                    </Button>
                                </DialogClose>
                            </>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ViewProfile;
