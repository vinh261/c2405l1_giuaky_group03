// src/components/Header.jsx
import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { HiOutlineHome } from 'react-icons/hi';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/images/LOGO-healthy.png';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        {/* logo */}
        <Link to="/" className="header__logo">
          <img src={logo} alt="Healthy Eating" />
        </Link>

        {/* nav */}
        <nav className="header__nav">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/" end>
                <HiOutlineHome size={20} />
              </NavLink>
            </li>
            <li className="nav__item"><NavLink to="/gioi-thieu">Giới thiệu</NavLink></li>
            <li className="nav__item"><NavLink to="/ket-qua">Kết quả</NavLink></li>
            <li className="nav__item"><NavLink to="/san-pham">Sản phẩm ăn giảm cân</NavLink></li>

            {/* dropdown “Công cụ” */}
            <li className="nav__item nav__item--dropdown">
              <span className="dropdown__toggle">Công cụ</span>
              <ul className="dropdown__list">
                <li className="dropdown__item"><Link to="/cong-cu/bmi">Công cụ tính BMI</Link></li>
                <li className="dropdown__item"><Link to="/cong-cu/can-nang-chuan">Công cụ cân nặng chuẩn</Link></li>
                <li className="dropdown__item"><Link to="/cong-cu/bmr-idee">Công cụ tính BMR & TDEE</Link></li>
              </ul>
            </li>

            <li className="nav__item"><NavLink to="/blog">Blog giảm cân</NavLink></li>
          </ul>
        </nav>

        {/* hotline */}
        <div className="header__hotline">
          <FaPhoneAlt className="hotline__icon" />
          <a href="tel:0786631194" className="hotline__number">078 663 1194</a>
        </div>

        {/* auth */}
        <div className="header__auth">
          <Link to="/dang-nhap" className="auth__link">Đăng nhập</Link>
          <Link to="/dang-ky"   className="auth__link auth__link--primary">Đăng ký</Link>
        </div>
      </div>
    </header>
  );
}
