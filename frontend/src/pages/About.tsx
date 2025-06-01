import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './About.css';

// Tạo mảng 10 ảnh banner
const images: string[] = Array.from({ length: 10 }, (_, i) =>
  `/assets/images/HealthyEatingBanner${i + 1}.jpg`
);

const About: React.FC = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="about-breadcrumb">
        <Link to="/" className="about-breadcrumb-link">Trang Chủ</Link>
        <span className="about-breadcrumb-sep">/</span>
        <span className="about-breadcrumb-current">Chế Độ Ăn Giảm Cân Khoa Học – Healthy Eating</span>
      </div>

      {/* Tiêu đề lớn */}
      <div className="about-title-section">
        <h1 className="about-title">
          Chế Độ Ăn Giảm Cân Khoa Học – Healthy Eating
        </h1>
        <div className="about-title-underline"></div>
      </div>

      {/* 10 tấm hình */}
      <div className="about-images">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Healthy Eating Banner ${idx + 1}`}
            className={`about-image about-image-${idx + 1}`}
          />
        ))}
      </div>

      {/* Khoảng cách */}
      <div style={{ marginTop: '2.3rem' }}></div>

      {/* Nội dung chữ */}
      <div className="about-content">
        <h2 className="about-section-title">
          I. TÌM HIỂU VỀ CHẾ ĐỘ ĂN GIẢM CÂN KHOA HỌC TẠI HEALTHY EATING
        </h2>
        <p>
          <b>Healthy Eating</b> là xưởng chuyên cung cấp các gói ăn giảm cân (Keto, Eat Clean)...
        </p>
        <p>
          Nếu bạn đang tìm kiếm những bữa ăn ngon, chất lượng và tốt cho sức khỏe...
        </p>
        <p>
          Đến với Healthy Eating chúng tôi có thể giúp bạn thưởng thức những món ăn mới lạ...
        </p>
        <p>
          Nguồn nguyên liệu chúng tôi sử dụng là nguyên liệu <b>cao cấp, tươi mới mỗi ngày</b>...
        </p>

        <h2 className="about-section-title">
          II. NHỮNG LỢI ÍCH MÀ CHẾ ĐỘ ĂN GIẢM CÂN KHOA HỌC MANG LẠI
        </h2>
        <ul>
          <li>
            <b>Giúp bạn giảm cân nhanh chóng...</b> Giảm cân, lấy lại vóc dáng là mục tiêu...
          </li>
          <li>
            <b>Ngăn ngừa nguy cơ mắc bệnh tiểu đường:</b> Chế độ ăn giảm cân khoa học là lựa chọn...
          </li>
          <li>
            <b>Hỗ trợ, điều trị bệnh động kinh:</b> Chế độ ăn khoa học giúp gan chuyển hóa...
          </li>
          <li>
            <b>Điều trị rối loạn chức năng của não bộ:</b> Giúp giảm đến hơn 50% số cơn động kinh...
          </li>
          <li>
            <b>Một số lợi ích khác:</b> Cải thiện tình trạng da mụn, hỗ trợ điều trị ung thư...
          </li>
        </ul>
      </div>

      <Footer />
    </>
  );
};

export default About;
