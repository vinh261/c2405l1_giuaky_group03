import React, { useEffect, useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { HiOutlineHome } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/LOGO-healthy.png';
import api from '../types/axios'; // Axios instance với baseURL = http://localhost:8000/api
import './Header.css';

const Header: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  // Khi component mount, đọc localStorage
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setUserName(userData.name || userData.user_name || null);
      } catch {
        setUserName(null);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Gọi API logout để Laravel xóa session hoặc token
      await api.post('/logout');
    } catch (err) {
      console.warn('Logout API failed:', err);
    }

    // Xóa local user + cập nhật giao diện
    localStorage.removeItem('user');
    setUserName(null);
    navigate('/login'); // Quay về trang login
  };

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <img src={logo} alt="Healthy Logo" />
        </Link>

        <nav className="header__nav">
          <ul className="nav__list">
            <li className="nav__item"><Link to="/"><HiOutlineHome size={20} /></Link></li>
            <li className="nav__item"><Link to="/gioi-thieu">Giới thiệu</Link></li>
            <li className="nav__item"><Link to="/ket-qua">Kết quả</Link></li>
            <li className="nav__item"><Link to="/san-pham">Sản phẩm ăn giảm cân</Link></li>
            <li className="nav__item"><Link to="/blog">Blog giảm cân</Link></li>
          </ul>
        </nav>

        <div className="header__right">
          <div className="header__hotline">
            <FaPhoneAlt className="hotline__icon" />
            <a href="tel:0789101112"> 078 910 1112</a>
          </div>

          <div className="header__auth">
            {userName ? (
              <>
                <span>👤 {userName}</span>
                <button
                  onClick={handleLogout}
                  style={{
                    marginLeft: '10px',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    color: '#e63946'
                  }}
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Đăng nhập</Link>
                <span style={{ margin: '0 5px' }}>|</span>
                <Link to="/register">Đăng ký</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
