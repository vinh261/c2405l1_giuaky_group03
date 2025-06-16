import { FaFacebook } from "react-icons/fa6";
import { SiZalo } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";


export const navItemHeader = [
    { label: "Trang chủ", path: "/"},
    { label: "Thực đơn", path: "meal-menu"},
    { label: "Kế hoạch", path: "meal-plan"},
    { label: "Liên hệ", path: "contact"},
]

export const navItemFooter = [
    { label: "Thực đơn", path: "menu"},
    { label: "Kế hoạch", path: "meal-plan"},
    { label: "Liên hệ", path: "contact"},
    { label: "Đánh giá", path: "reviews"}
]

export const social = [
    {
        label: <FaFacebook size={24} />,
        path: "https://facebook.com",
    },
    {
        label: <FaInstagram size={24} />,
        path: "https://instagram.com",
    },
    {
        label: <SiZalo size={24} />,
        path: "https://zalo.me",
    }
]