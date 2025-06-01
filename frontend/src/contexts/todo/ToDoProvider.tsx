import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import axios from "../../types/axios";
import type { FormProps, UserData } from "../../types/models.types";
import { ToDoContext } from "./ToDoContext";

const ToDoProvider = ({ children }: { children: React.ReactNode }) => {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [role, setRole] = useState<string | null>(null);
    const [profile, setProfile] = useState<FormProps | null>(null);
    const [memberList, setMemberList] = useState<FormProps[]>([]);
    const [authCheck, setAuthCheck] = useState(true);

    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [finalSearch, setFinalSearch] = useState("");
    const [displayedMembers, setDisplayedMembers] = useState<FormProps[]>([]);

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [forgotPassword, setForgotPassword] = useState(false);

    const [sortField, setSortField] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const [memberView, setMemberView] = useState<FormProps | null>(null);
    const [openView, setOpenView] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState<FormProps | null>(null);

    const getCSRFToken = useCallback(async () => {
        try {
            await axios.get('/sanctum/csrf-cookie');
        } catch (e) {
            console.error('Error getting CSRF token:', e);
        }
    }, []);

    const checkLogin = useCallback(async () => {
        setAuthCheck(true);
        try {
            await getCSRFToken();
            const response = await axios.get<UserData>("/me");
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
    }, [getCSRFToken]);

    useEffect(() => {
        checkLogin();
    }, [checkLogin]);

    const handleLogin = useCallback((userData: UserData) => {
        setIsLogged(true);
        setProfile(userData.profile);
        setRole(userData.role);
    }, []);

    const handleLogout = useCallback(async () => {
        await axios.post("/user/logout");
        setIsLogged(false);
        setProfile(null);
        setRole(null);
        setMemberList([]);
    }, []);

    const handleClick = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const toggleTheme = useCallback(() => {
        const currentTheme = theme === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
            : theme;
        setTheme(currentTheme === "light" ? "dark" : "light");
    }, [theme, setTheme]);

    useEffect(() => {
        if (!memberList) {
            setDisplayedMembers([]);
            return;
        }
        if (!finalSearch) {
            setDisplayedMembers(memberList);
        } else {
            const lowercasedFilter = finalSearch.toLowerCase();
            const filteredData = memberList.filter(member =>
                member.user_name?.toLowerCase().includes(lowercasedFilter) ||
                member.email?.toLowerCase().includes(lowercasedFilter) ||
                member.phone?.toLowerCase().includes(lowercasedFilter) ||
                member.address?.toLowerCase().includes(lowercasedFilter)
            );
            setDisplayedMembers(filteredData);
        }
    }, [memberList, finalSearch]);

    const handleSearch = useCallback((searchValue: string) => {
        const lowercasedSearch = searchValue.toLowerCase().trim();
        setSearch(lowercasedSearch);
        if (lowercasedSearch.length > 0 && memberList) {
            const filteredSuggestions = memberList
                .map(member => member.user_name)
                .filter(name => name?.toLowerCase().includes(lowercasedSearch))
                .slice(0, 5);
            setSuggestions([...new Set(filteredSuggestions)]);
            setIsOpen(true);
        } else {
            setSuggestions([]);
            setIsOpen(false);
            setFinalSearch("");
        }
    }, [memberList]);

    const handleSuggest = useCallback((value: string) => {
        setSearch(value);
        setFinalSearch(value);
        setSuggestions([]);
        setIsOpen(false);
    }, []);

    const handleSearchSubmit = useCallback(() => {
        setIsOpen(false);
        setFinalSearch(search);
        setSuggestions([]);
    }, [search]);

    const handleSort = useCallback((field: string) => {
        const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
        setSortField(field);
        setSortOrder(newOrder);
        const sortedMembers = [...memberList].sort((a, b) => {
            const valA = a[field as keyof typeof a] ?? '';
            const valB = b[field as keyof typeof b] ?? '';
            return valA < valB ? (newOrder === "asc" ? -1 : 1) : valA > valB ? (newOrder === "asc" ? 1 : -1) : 0;
        });
        setDisplayedMembers(sortedMembers);
    }, [memberList, sortField, sortOrder]);

    const deleteMember = useCallback((profile_id: string) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa thành viên này không?")) {
            setMemberList(prevList => prevList.filter(member => member.profile_id !== profile_id));
        }
    }, []);

    const contextValue = useMemo(() => ({
        handleClick, toggleTheme,
        isLogged, handleLogin, handleLogout,
        setIsLogged, loading, setLoading,
        errorMessage, setErrorMessage, forgotPassword, setForgotPassword,
        role, isOpen, setIsOpen, authCheck, setAuthCheck,
        profile, memberList, setProfile, setMemberList,
        handleSearch, displayedMembers, search,
        handleSearchSubmit, suggestions, handleSuggest,
        setSuggestions, sortField, setSortField,
        sortOrder, setSortOrder, handleSort,
        memberView, setMemberView, openView, setOpenView,
        editedData, setEditedData, isEditing, setIsEditing,
        deleteMember
    }), [
        handleClick, toggleTheme,
        isLogged, handleLogin, handleLogout,
        loading, setLoading,
        errorMessage, setErrorMessage,
        forgotPassword, setForgotPassword,
        role, isOpen, setIsOpen, authCheck, setAuthCheck,
        profile, memberList, setProfile, setMemberList,
        displayedMembers, search, handleSearchSubmit,
        handleSearch, suggestions, handleSuggest,
        setSuggestions, sortField, setSortField,
        sortOrder, setSortOrder, handleSort,
        memberView, setMemberView, openView, setOpenView,
        editedData, setEditedData, isEditing, setIsEditing,
        deleteMember
    ]);

    return (
        <ToDoContext.Provider value={contextValue}>
            {children}
        </ToDoContext.Provider>
    );
};

export default ToDoProvider;
