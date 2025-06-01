// src/components/OrderGuide.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import chongoian from '../assets/images/chongoian.png';
import chonlichan from '../assets/images/chonlichan.png';
import dathang from '../assets/images/dathang.png';
import giaohang from '../assets/images/giaohang.png';
import './OrderGuide.css';

export default function OrderGuide() {
  const steps = [
    { label: 'Chọn gói ăn', icon: chongoian, to: '/#' },
    { label: 'Chọn lịch ăn', icon: chonlichan, to: '/#' },
    { label: 'Đặt hàng',    icon: dathang,    to: '/#' },
    { label: 'Giao hàng',   icon: giaohang,   to: '/#' },
  ];

  return (
    <section className="order-guide">
      <h2 className="order-guide__title">HƯỚNG DẪN ĐẶT HÀNG</h2>
      <div className="order-guide__steps">
        {steps.map(({ label, icon, to }) => (
          <Link
            key={label}
            to={to}
            className="order-guide__step"
          >
            <div className="og__icon-wrapper">
              <img src={icon} alt={label} />
            </div>
            <p>{label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
