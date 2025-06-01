import React from 'react';
import certIcon from '../assets/images/icon-cert.png';
import fbIcon from '../assets/images/icon-fb.png';
import instaIcon from '../assets/images/icon-insta.png';
import logo from '../assets/images/LOGO-healthy.png'; // logo Healthy Eating
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        {/* Logo */}
        <div className="footer__block footer__logo">
          <img src={logo} alt="Healthy Eating" />
        </div>

        {/* Giờ hoạt động */}
        <div className="footer__block">
          <h3>GIỜ HOẠT ĐỘNG</h3>
          <p>Từ 8:00 AM – 10:00 PM</p>
          <p>Địa chỉ: 123 Đườn ABC, Phường X, Quận Y, Tp.HCM</p>
          <p>Hotline: 078 910 1112</p>
        </div>

        {/* Thông tin liên hệ */}
        <div className="footer__block">
          <h3>THÔNG TIN LIÊN HỆ</h3>
          <ul>
            <li>Chế Độ Ăn Giảm Cân Khoa Học – Healthy Eating</li>
            <li>Chính Sách Mua Hàng</li>
            <li>Blog Giảm Cân</li>
            <li>Tin Tức</li>
          </ul>
        </div>

        {/* Theo dõi */}
        <div className="footer__block">
          <h3>THEO DÕI CHÚNG TÔI TẠI</h3>
          <div className="footer__social">
            <a href="#"><img src={fbIcon} alt="Facebook" /></a>
            <a href="#"><img src={instaIcon} alt="Instagram" /></a>
            <a href="#"><img src={certIcon} alt="Đã Thông Báo" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
