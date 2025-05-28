// src/components/WeeklyMenu.jsx
import React, { useState } from 'react';
import bannerBg from '../assets/images/bannermenu.jpg'; // hình banner nền
import veganMenu from '../assets/images/menutuan1.jpg';
import ketoMenu from '../assets/images/menutuan2.jpg';
import './WeeklyMenu.css';

export default function WeeklyMenu() {
    const [timePeriod, setTimePeriod] = useState('trua');

    return (
      <section
        className="weekly-menu"
        style={{ backgroundImage: `url(${bannerBg})` }}
      >
        <div className="weekly-menu__overlay" />



        <div className="weekly-menu__cards">
          {/* LEFT: vegan */}
          <div className="weekly-menu__card">
            <div className="weekly-menu__card-label">MENU CHAY</div>
            <img
              src={veganMenu}
              alt={`Menu Chay (${timePeriod})`}
            />
          </div>

          {/* RIGHT: keto */}
          <div className="weekly-menu__card">
            <div className="weekly-menu__card-label">
              CHẾ ĐỘ ĂN GIẢM CÂN EAT CLEAN
            </div>
            <img
              src={ketoMenu}
              alt={`Gói tuần EatClean (${timePeriod})`}
            />
          </div>
        </div>
      </section>
    );
  }
