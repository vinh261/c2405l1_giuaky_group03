


export const NavItem = [
    {
        label: "Trang chủ",
        path: "/",
    },
    {
        label: "Thực đơn",
        path: "menu",
        children: [
            {
                label: "Bữa sáng",
                path: "breakfast",
            },
            {
                label: "Bữa trưa",
                path: "lunch",
            },
            {
                label: "Bữa tối",
                path: "dinner",
            },
        ]
    },
    {
        label: "Kế hoạch",
        path: "meal-plan",
        children: [
            {
                label: "Công thức",
                path: "recipe",
            },
            {
                label: "Công cụ",
                path: "tool",
            },
        ]
    },
    {
        label: "Tin tức",
        path: "blog",
    },
    {
        label: "Liên hệ",
        path: "contact-us",
    },
]