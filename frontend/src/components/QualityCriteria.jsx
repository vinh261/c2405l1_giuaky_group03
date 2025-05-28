// src/components/QualityCriteria.jsx
import React from 'react';
import dinhDuong from '../assets/images/Quality.png';
import giaoHang from '../assets/images/Quality1.jpg';
import khongBot from '../assets/images/Quality2.png';
import thucPham from '../assets/images/Quality3.png';
import './QualityCriteria.css';

export default function QualityCriteria() {
  const items = [
    { label: 'Giao hàng tận nơi',         icon: giaoHang },
    { label: 'Thực phẩm tươi sạch',       icon: thucPham },
    { label: 'Không bột ngọt, ít gia vị', icon: khongBot },
    { label: 'Cung cấp đầy đủ dinh dưỡng',icon: dinhDuong },
  ];

  return (
    <section className="quality-criteria">
      <h2 className="qc__title">TIÊU CHÍ CHẤT LƯỢNG</h2>
      <div className="qc__list">
        {items.map(({ label, icon }) => (
          <div key={label} className="qc__item">
            <div className="qc__icon-wrapper">
              <img src={icon} alt={label} />
            </div>
            <p>{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
