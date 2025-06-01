import { useEffect } from "react";
import { useToDo } from "../../../../hooks/useToDo";
// import type { ProfileResponse } from "../../../../types/models.types";
import axios from "../../../../types/axios";


const MemberData = () => {
    const { 
        setLoading, errorMessage, setErrorMessage, setMemberList,
    } = useToDo();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setErrorMessage("");

                const response = await axios.get("/api/admin/profile");
                console.log("Response MemberData:", response.data);

                if (response.data.success) {
                    setMemberList(response.data.data.data); // Lưu dữ liệu memberList vào state
                } else {
                    setErrorMessage(response.data.message || "Không thể tải dữ liệu");
                }

            } catch (err: unknown) {
                console.error("Lỗi khi lấy dữ liệu:", err);
                setErrorMessage("Có lỗi xảy ra khi tải dữ liệu");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [setMemberList, setLoading, setErrorMessage]);

    /**
     * Hiển thị thông báo lỗi nếu có
     */
    if (errorMessage) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong>Lỗi: </strong>{errorMessage}
            </div>
        );
    }

    return;
};

export default MemberData;