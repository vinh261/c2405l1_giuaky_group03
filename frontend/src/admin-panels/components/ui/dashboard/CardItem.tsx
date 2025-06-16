import { CircleDollarSign, FileText, SquarePen, TrendingUp, Users } from "lucide-react";

const CardItem = [
    {
        title: "lượt truy cập",
        icon: <FileText size={20} />,
        value: "1,234",
        trend: <TrendingUp size={18} />,
        percent: "25%",
    },
    {
        title: "số lượng thành viên",
        icon: <Users size={20} />,
        value: "1,234",
        trend: <TrendingUp size={18} />,
        percent: "25%",
    },
    {
        title: "bài viết đã đăng",
        icon: <SquarePen size={20} />,
        value: "1,234",
        trend: <TrendingUp size={18} />,
        percent: "25%",
    },
    {
        icon: <CircleDollarSign size={20} />,
        title: "tổng quan thu nhập",
        value: "1,234",
        trend: <TrendingUp size={18} />,
        percent: "25%",
    }
]

export default CardItem;
