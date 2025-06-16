import Button from "@/components/common/button/ButtonCustom";
import ContactForm from "@/components/contact-page/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";


const ContactPage = () => {
    const [showContactForm, setShowContactForm] = useState(false);

    return (
        <section className="container mt-20 mb-10 m-auto">
            <div className="bg-[url(@/assets/images/banner-contact.jpg)] h-40 bg-cover bg-center mb-6 rounded-xl"></div>

            <div className="relative h-88 bg-slate-800 overflow-hidden">
                <div className="relative h-full flex flex-col items-center justify-center text-slate-100 px-4">
                    <h1 className="text-5xl font-bold mb-4">Liên hệ với chúng tôi</h1>
                    <p className="text-xl text-gray-300">
                        Chúng tôi rất mong nhận được phản hồi từ bạn
                    </p>
                </div>
            </div>

            {/* Contact Info Section */}
            <div className="py-16 px-4 text-slate-700">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 mb-12 border border-slate-300 py-4 bg-slate-100 rounded-xl">
                        {/* Phone */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="text-red-500" size={24} />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">
                                Điện thoại
                            </h3>
                            <p className="text-gray-600">0123 456 789</p>
                            <p className="text-gray-600">0987 654 321</p>
                        </div>

                        {/* Email */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="text-red-500" size={24} />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">
                                Email
                            </h3>
                            <p className="text-gray-600">
                                abc@nutriplanner.com
                            </p>
                            <p className="text-gray-600">
                                def@nutriplanner.com
                            </p>
                        </div>

                        {/* Address */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="text-red-500" size={24} />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">
                                Địa chỉ
                            </h3>
                            <p className="text-gray-600">
                                123/456 Abc
                            </p>
                            <p className="text-gray-600">
                                Quận Abc, Tp. Hồ Chí Minh
                            </p>
                        </div>
                    </div>

                    {/* Contact Button */}
                    <div className="text-center">
                        <Button
                            onClick={() => setShowContactForm(true)}
                            className="px-8 py-6 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-colors transform hover:scale-105">
                            Gửi phản hồi
                        </Button>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <section className="h-96 border border-slate-300 rounded-xl">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4246246161!2d106.69908131411659!3d10.778834792320066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f385570472f%3A0x2e94fd47b5a4a5a5!2sNguyen%20Hue%20Walking%20Street!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                />
            </section>

            {/* Contact Form Modal */}
            <ContactForm
                isOpen={showContactForm}
                onClose={() => setShowContactForm(false)}
            />
        </section>
    );
};
export default ContactPage;
