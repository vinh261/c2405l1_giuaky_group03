import { useEffect, useState } from 'react';
import './BannerSlider.css';

// Lưu ý tên file có khoảng trắng, import đúng tên
import banner1 from '../assets/images/banner 1.jpg';
import banner2 from '../assets/images/banner 2.jpg';
import banner3 from '../assets/images/banner 3.jpg';
import banner4 from '../assets/images/banner 4.jpg';
import banner5 from '../assets/images/banner 5.jpg';

const banners: string[] = [banner1, banner2, banner3, banner4, banner5];

export default function BannerSlider(): JSX.Element {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev: number) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="banner-slider">
      {banners.map((src: string, idx: number) => (
        <div
          key={idx}
          className={`slide ${idx === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
    </div>
  );
}
