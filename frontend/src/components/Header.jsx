import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { HiOutlineHome } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import logo from '../assets/images/LOGO-healthy.png';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        {/* Logo ở giữa */}
        <Link to="/" className="header__logo">
          <img src={logo} alt="Healthy Eating Logo" />
        </Link>

        {/* Menu + Hotline bên phải */}
        <nav className="header__nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/"><HiOutlineHome size={20} /></Link>
            </li>
            <li className="nav__item">
              <Link to="/gioi-thieu">Giới thiệu</Link>
            </li>
            <li className="nav__item">
              <Link to="/ket-qua">Kết quả</Link>
            </li>
            <li className="nav__item">
              <Link to="/san-pham">Sản phẩm ăn giảm cân</Link>
            </li>
            <li className="nav__item">
              <Link to="/blog">Blog giảm cân</Link>
            </li>
          </ul>
        </nav>

        <div className="header__hotline">
          <FaPhoneAlt className="hotline__icon" />
          <a href="tel:078 910 1112"> 078 910 1112</a>
        </div>
      </div>
    </header>
  );
}
