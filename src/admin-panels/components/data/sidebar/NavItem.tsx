import { Home, ChartColumn, Users, Waypoints, MessageCircleMore, SquarePen, Gift, Settings, UserPlus, Soup, CookingPot,BotMessageSquare, HandHeart } from "lucide-react";

export const NavItem = [
    {
        title: "Tổng quan",
        line: "-------",
        link: [
            {
                label: "Trang chủ",
                icon: Home,
                path: "",
            },
            {
                label: "Biểu đồ",
                icon: ChartColumn,
                path: "analysis",
            }
        ]
    },
    {
        title: "Cộng đồng",
        line: "-------",
        link: [
            {
                label: "Thành viên",
                icon: Users,
                path: "members",
            },
            {
                label: "Thêm thành viên",
                icon: UserPlus,
                path: "add_user",
            }
        ]
    },
    {
        title: "Thực đơn",
        line: "-------",
        link: [
            {
                label: "Món ăn",
                icon: Soup,
                path: "meals",
            },
            {
                label: "Danh mục",
                icon: Waypoints,
                path: "categories",
            },
            {
                label: "Công thức",
                icon: CookingPot,
                path: "recipes",
            },
            {
                label: "Đề xuất",
                icon: BotMessageSquare,
                path: "recommends",
            },
            {
                label: "Đánh giá",
                icon: HandHeart,
                path: "reviews",
            }
        ]
    },
    {
        title: "Tin tức",
        line: "-------",
        link: [
            {
                label: "Bài viết",
                icon: SquarePen,
                path: "posts",
            },
            {
                label: "Bình luận",
                icon: MessageCircleMore,
                path: "comments",
            },
        ]
    },
    {
        title: "Khác",
        line: "-------",
        link: [
            {
                label: "Mã giảm giá",
                icon: Gift,
                path: "coupons",
            },
            {
                label: "Cài đặt",
                icon: Settings,
                path: "settings",
            }
        ]
    }
];