import { useState } from "react";
import type { ContactFormProps } from "../types/contact.types";
import { Send } from "lucide-react";


const ContactModal: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log("Form submitted:", formData);
            alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.");
            setFormData({ name: "", email: "", message: "" });
            setIsSubmitting(false);
            onClose();
        }, 1500);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-slate-100 rounded-2xl shadow-2xl w-full max-w-2xl">
                {/* Close Button */}
                {/* <Button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-200 hover:bg-slate-100 transition-colors">
                    <X size={24} className="text-slate-700" />
                </Button> */}

                {/* Form Content */}
                <div className="relative p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-slate-700 mb-8 text-center">
                        Liên hệ
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6 text-slate-700">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Name Input */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Tên của bạn
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Nguyen Van A"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none transition-all"
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="nguyenvan@gmail.com"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Message Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nội dung liên hệ
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                placeholder="Bạn viết gì đi..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex flex-col items-center space-y-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                                {isSubmitting ? "Đang gửi..." : "Gửi phản hồi"}
                                <Send size={18} />
                            </button>

                            <div className=" text-gray-500 flex">
                                <p className="mr-1">Hotline: </p>
                                <p className="text-red-500 font-medium">
                                    0123 456 789
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default ContactModal;
