import { NavItemFooter, Social } from "@/components/ui/header/NavItem";
import { Link } from "react-router";
import logo from "@/assets/images/logo-healthy.png"


const Footer = () => {
    return (
        <footer className="bg-slate-900/90 pt-30">

            <div className="grid  py-10 gap-10 text-slate-300 container relative">
                <p className="absolute -top-1/4 w-[80%] italic border py-2 px-4 border-red-50 rounded-lg">
                    <strong className="underline text-red-300">Lưu ý: </strong> 
                    Thông tin trên chỉ được cung cấp cho mục đích thông tin và tham khảo. Các công thức nấu ăn, tư vấn dinh dưỡng, và nội dung liên quan không nhằm mục đích thay thế cho lời khuyên y tế từ bác sĩ hoặc chuyên gia dinh dưỡng. Sản phẩm và dịch vụ của HealthyVN, bao gồm công thức nấu ăn, không được thiết kế để chẩn đoán, điều trị, chữa khỏi hoặc ngăn ngừa bất kỳ bệnh lý nào.
                </p>

                <img src={logo} alt="" className="h-[60px]" />

                <div className="flex justify-evenly w-1/3">
                    {NavItemFooter.map((item, index) => (
                        <div key={index} className="text-lg font-semibold hover:text-[var(--nav-hover)]">
                            <Link to={item.path}>{item.label}</Link>
                        </div>
                    ))}
                </div>

                <div className="grid gap-4 place-items-center">
                    <p className="text-xl font-semibold">Kết nối với chúng tôi</p>

                    <div className="flex justify-evenly w-1/2">
                        {Social.map((item, index) => (
                            <a 
                                key={index} 
                                href={item.path} 
                                target="_blank"
                                className="text-slate-400 hover:text-[var(--nav-hover)]"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <p className="text-lg text-slate-500">&copy; 2025 Đồ án NutriPlanner - Author: Lê Đức Hiếu</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
