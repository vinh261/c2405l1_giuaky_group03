import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import './About.css';

// Tạo mảng 10 ảnh banner
const images = Array.from({ length: 10 }, (_, i) =>
  `/assets/images/HealthyEatingBanner${i + 1}.jpg`
);

export default function About() {
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
          <b>Healthy Eating</b> là xưởng chuyên cung cấp các gói ăn giảm cân (Keto, Eat Clean) phục vụ nhu cầu giảm cân lành mạnh hàng tuần giúp bạn duy trì một lối sống khỏe.
          Chúng tôi tập trung vào chế độ ăn cân bằng, menu được thiết kế độc quyền nhằm hỗ trợ các bạn kiểm soát cân nặng một cách hiệu quả, tối ưu nhất.
        </p>
        <p>
          Nếu bạn đang tìm kiếm những bữa ăn ngon, chất lượng và tốt cho sức khỏe thì Healthy Eating là lựa chọn tuyệt vời.
          Thực đơn đa dạng với hơn <b>250+ món ăn Á Âu</b> được chế biến phù hợp với khẩu vị người Việt Nam.
        </p>
        <p>
          Đến với Healthy Eating chúng tôi có thể giúp bạn thưởng thức những món ăn mới lạ, độc đáo mà không quá khô khan như những nơi khác.
        </p>
        <p>
          Nguồn nguyên liệu chúng tôi sử dụng là nguyên liệu <b>cao cấp, tươi mới mỗi ngày</b> được chọn lọc kỹ càng ở siêu thị.
          Gia vị dùng cho mỗi bữa ăn đều là những loại gia vị đặc biệt, chuyên dụng cho chế độ ăn giảm cân do chính Healthy Eating sản xuất.
          Đảm bảo mang đến cho bạn một bữa ăn đầy dinh dưỡng và xanh nhất có thể.
        </p>

        <h2 className="about-section-title">
          II. NHỮNG LỢI ÍCH MÀ CHẾ ĐỘ ĂN GIẢM CÂN KHOA HỌC MANG LẠI
        </h2>
        <ul>
          <li>
            <b>Giúp bạn giảm cân nhanh chóng, lấy lại vóc dáng hoàn hảo:</b> Giảm cân, lấy lại vóc dáng là mục tiêu hàng đầu mà Healthy Eating luôn hướng tới.
            Giúp bạn giảm cảm giác thèm ăn, lâu bị đói. Các chuyên gia tại Healthy Eating đã nghiên cứu và chứng minh rằng:
            “Khi bạn ăn đúng theo chế độ giảm cân khoa học mà chúng tôi cung cấp giúp bạn giảm cân nhanh hơn 2,2 lần so với khi không tập luyện.
            Và giảm cân nhanh hơn đến 3 lần khi kết hợp tập luyện, vận động nhẹ”.
          </li>
          <li>
            <b>Ngăn ngừa nguy cơ mắc bệnh tiểu đường:</b> Chế độ ăn giảm cân khoa học là lựa chọn tuyệt vời giúp ngăn ngừa nguy cơ mắc bệnh tiểu đường.
            Ngoài ra còn giúp cải thiện sức khỏe, vóc dáng, loại bỏ mỡ thừa trên cơ thể, cải thiện đến 75% độ nhạy Insulin.
          </li>
          <li>
            <b>Hỗ trợ, điều trị bệnh động kinh:</b> Chế độ ăn khoa học giúp gan chuyển hóa chất béo thành Axit Béo và Xetonic,
            từ đó giảm tần suất động kinh và hỗ trợ điều trị các bệnh lý rối loạn khác như Parkinson và Alzheimer.
          </li>
          <li>
            <b>Điều trị rối loạn chức năng của não bộ:</b> Giúp giảm đến hơn 50% số cơn động kinh, cải thiện các bệnh lý rối loạn, tăng cường năng lượng cho não bộ.
          </li>
          <li>
            <b>Một số lợi ích khác:</b> Cải thiện tình trạng da mụn, hỗ trợ điều trị ung thư, tốt cho tim mạch, cải thiện hội chứng buồng trứng đa nang ở nữ giới.
          </li>
        </ul>
      </div>

      <Footer />
    </>
  );
}
