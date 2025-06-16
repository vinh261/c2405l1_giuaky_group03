import { useLogout } from "@/hooks/react-query/useAuthQuery";
import useClickOutSide from "@/hooks/useClickOutSide";
import { useAuthStore } from "@/stores/authStore";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";


export const useHeaderLogic = () => {
    const navigate = useNavigate();

    // open - close profile dropdown
    const [ openProfile, setOpenProfile ] = useState(false);
    const refProfile = useRef(null);

    const isLogged = useAuthStore((state) => state.isLogged);
    const user = useAuthStore((state) => state.user);

    // Lấy mutation để đăng xuất từ React Query
    const logoutMutation = useLogout();

    const handleLogout = () => {
        logoutMutation.mutate(); // Gọi hàm mutate để thực hiện đăng xuất
    };

    useClickOutSide([refProfile], () => setOpenProfile(!openProfile));

    return {
        navigate, isLogged, user, handleLogout, openProfile
    }
}