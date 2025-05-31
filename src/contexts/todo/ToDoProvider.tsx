import React, {  useCallback, useEffect, useMemo, useState } from "react";
import { ToDoContext } from "./ToDoContext";
import { useTheme } from "../../hooks/useTheme";
import type { FormProps, UserData } from "../../types/models.types";
import axios from "../../types/axios";

const ToDoProvider = ({children}: {children: React.ReactNode}) => {
    const { theme, setTheme } = useTheme();
    const [ isOpen, setIsOpen ] = useState(false);

    /**
     * Trạng thái đăng nhập.
     * Role user.
     * Profile của user đang đăng nhập.
     * List users. 
     * Check đăng nhập.
     */
    const [ isLogged, setIsLogged ] = useState<boolean>(false);
    const [ role, setRole ] = useState<string | null>(null);
    const [ profile, setProfile ] = useState<FormProps | null>(null);
    const [ memberList, setMemberList ] = useState<FormProps[]>([]);
    const [ authCheck, setAuthCheck ] = useState(true); // <<< State loading xác thực

    /**
     * Search
     * Search khi submit.
     * Display rep 1-1 memberList
     */
    const [ search, setSearch ] = useState("");
    const [ suggestions, setSuggestions ] = useState<string[]>([]); // State cho danh sách gợi ý (kiểu string)
    const [ finalSearch, setFinalSearch ] = useState("");
    const [ displayedMembers, setDisplayedMembers ] = useState<FormProps[]>([]);

    /**
     * Trạng thái loading, thông báo lỗi và trạng thái quên mật khẩu.
     */
    const [ loading, setLoading ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ forgotPassword, setForgotPassword ] = useState(false);

    /**
     * Sort
     */
    const [ sortField, setSortField ] = useState<string>(''); // Ví dụ: 'user_name', 'created_at', 'status'
    const [ sortOrder, setSortOrder ] = useState<'asc' | 'desc'>('asc'); // 'asc' (tăng dần), 'desc' (giảm dần)

    const [ memberView, setMemberView ] = useState<FormProps | null>(null);
    const [ openView, setOpenView ] = useState(false);

    const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
    const [editedData, setEditedData] = useState<FormProps | null>(null); // Dữ liệu chỉnh sửa

    /**
     * Kiểm tra trạng thái đăng nhập của người dùng
     */
    const checkLogin = useCallback(async () => {
        setAuthCheck(true);
        try {
            // Return UserData.
            const response = await axios.get<UserData>("/api/me");

            setIsLogged(true);
            setProfile(response.data.profile);
            setRole(response.data.role);

        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                console.log("Not logged in (401).");
            } else {
                console.error("Error checking login status:", err);
            }

            setIsLogged(false);
            setProfile(null);
            setRole(null);

        } finally {
            setAuthCheck(false);
        }
    }, []);

    /**
     * Sử dụng useEffect để check login khi component được mount.
     */
    useEffect(() => {
        checkLogin();
    }, [checkLogin]);

    /**
     * Xử lý khi đăng nhập thành công.
     * Cập nhật trạng thái đăng nhập và thông tin người dùng.
     */
    const handleLogin = useCallback((userData: UserData) => {
        setIsLogged(true);
        setProfile(userData.profile);
        setRole(userData.role);
    }, []);

    /**
     * Xử lý đăng xuất.
     * Gọi API để đăng xuất và cập nhật trạng thái.
     */
    const handleLogout = useCallback(async () => {
        await axios.post("/api/user/logout");

        setIsLogged(false);
        setProfile(null);
        setRole(null);
        setMemberList([]); 
    }, []);

    /**
     * Xử lý click để mở/đóng menu.
     */
    const handleClick = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    /**
     * Switch theme between light and dark.
     */
    const toggleTheme = useCallback(() => {
        const currentTheme =
            theme === "system"
                ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
                : theme;

        setTheme(currentTheme === "light" ? "dark" : "light");
    }, [theme, setTheme]);

    // Cập nhật displayedMembers khi memberList gốc hoặc search thay đổi
    useEffect(() => {
        if (!memberList) {
            setDisplayedMembers([]);
            return;
        }

        if (!finalSearch) {
            setDisplayedMembers(memberList); // Nếu không có từ khóa, hiển thị tất cả
        } else {
            const lowercasedFilter = finalSearch.toLowerCase();
            const filteredData = memberList.filter(member =>
                (member.user_name?.toLowerCase().includes(lowercasedFilter)) ||
                (member.email?.toLowerCase().includes(lowercasedFilter)) ||
                (member.phone?.toLowerCase().includes(lowercasedFilter)) ||
                (member.address?.toLowerCase().includes(lowercasedFilter))
            );
            setDisplayedMembers(filteredData); // Cập nhật displayedMembers
        }
    }, [memberList, finalSearch]); // useEffect chạy lại khi memberList hoặc search cuối thay đổi

    /**
     * handle search
     */
    const handleSearch = useCallback((searchValue: string) => {
        const lowercasedSearch = searchValue.toLowerCase().trim(); // Chuyển đổi về chữ thường và loại bỏ khoảng trắng đầu cuối
        setSearch(lowercasedSearch); // Mỗi khi người dùng gõ, search thay đổi

        if (lowercasedSearch.length > 0 && memberList) {
            const filteredSuggestions = memberList
                .map(member => member.user_name) // Chỉ lấy user_name để làm gợi ý, hoặc các trường khác
                .filter(name => name?.toLowerCase().includes(lowercasedSearch)) // Lọc theo từ khóa tìm kiếm
                .slice(0, 5); // Giới hạn số lượng gợi ý

            // Loại bỏ các gợi ý trùng lặp nếu có
            setSuggestions([...new Set(filteredSuggestions)]); // Loại bỏ trùng lặp bằng Set
            setIsOpen(true);
        } else {
            setSuggestions([]);
            setIsOpen(false);
            setFinalSearch(""); // Reset finalSearch nếu không có từ khóa tìm kiếm
            // setDisplayedMembers(memberList || []); // Nếu không có từ khóa tìm kiếm, hiển thị lại toàn bộ memberList
        }
    }, [memberList]);
    
    /**
     * sugguest
     */
    const handleSuggest = useCallback((value: string) => {
        setSearch(value); // Cập nhật từ khóa tìm kiếm khi người dùng chọn gợi ý
        setFinalSearch(value); // Cập nhật từ khóa cuối cùng để kích hoạt useEffect lọc
        setSuggestions([]); // Xóa gợi ý sau khi chọn
        setIsOpen(false); // Đóng dropdown gợi ý
    }, []);

    /**
     * handle search submit
     */
    const handleSearchSubmit = useCallback(() => {
        setIsOpen(false); // Đóng dropdown gợi ý khi submit
        setFinalSearch(search); // Cập nhật từ khóa cuối cùng để kích hoạt useEffect lọc
        setSuggestions([]); // Xóa gợi ý sau khi submit
    }, [search]);

    const handleSort = useCallback((field: string) => {
        const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
        setSortField(field);
        setSortOrder(newOrder);

        // Sắp xếp danh sách hiển thị
        const sortedMembers = [...memberList].sort((a, b) => { 
            const valA = a[field as keyof typeof a];
            const valB = b[field as keyof typeof b];

            const safeValA = valA ?? '';
            const safeValB = valB ?? '';

            if (safeValA < safeValB) return newOrder === "asc" ? -1 : 1;
            if (safeValA > safeValB) return newOrder === "asc" ? 1 : -1;
            return 0;
        });
        setDisplayedMembers(sortedMembers);
    }, [ memberList, sortField, sortOrder ]);


    /**
     * Context value dùng useMemo để tránh tạo lại context mỗi lần component re-render.
     * Các functions và state được cấp cho các component con thông qua context.
     */
    const deleteMember = useCallback((profile_id: string) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa thành viên này không?")) {
            setMemberList(prevList => prevList.filter(member => member.profile_id !== profile_id));
        }
        // Optionally, add API call to delete member on backend here
    }, [setMemberList]);

    const contextValue = useMemo(() => ({
        handleClick, toggleTheme,
        isLogged, handleLogin, handleLogout,
        setIsLogged,
        loading, setLoading,
        errorMessage, setErrorMessage,
        forgotPassword, setForgotPassword,
        role, isOpen, setIsOpen, authCheck, setAuthCheck,
        profile, memberList, setProfile, setMemberList,
        handleSearch, displayedMembers, search,
        handleSearchSubmit, suggestions, handleSuggest,
        setSuggestions, sortField, setSortField, 
        sortOrder, setSortOrder, handleSort,
        memberView, setMemberView, openView, setOpenView,
        editedData, setEditedData, isEditing, setIsEditing,
        deleteMember,
    }), [
        handleClick, toggleTheme,
        isLogged, handleLogin, handleLogout,
        loading, setLoading,
        errorMessage, setErrorMessage,
        forgotPassword, setForgotPassword,
        role, isOpen, setIsOpen, 
        authCheck, setAuthCheck,
        profile, memberList, setProfile, setMemberList,
        displayedMembers, search, handleSearchSubmit,
        handleSearch, suggestions, handleSuggest,
        setSuggestions, sortField, setSortField, 
        sortOrder, setSortOrder,handleSort,
        memberView, setMemberView, openView, setOpenView,
        editedData, setEditedData, isEditing, setIsEditing,
        deleteMember,
    ]);

    return (
        <ToDoContext.Provider value={contextValue}>
            {children}
        </ToDoContext.Provider>
    )
};

export default ToDoProvider;
