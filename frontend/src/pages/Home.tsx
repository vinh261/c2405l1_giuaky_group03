// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import banner6 from '../assets/images/banner6.jpg';
import BannerSlider from '../components/BannerSlider';
import Footer from '../components/Footer';
import NewsSection from '../components/NewsSection';
import OrderGuide from '../components/OrderGuide';
import ProductCard from '../components/ProductCard';
import QualityCriteria from '../components/QualityCriteria';
import WeeklyMenu from '../components/WeeklyMenu';
import api from '../types/axios';
import './Home.css';

interface Meal {
  meal_id: string;
  meal_name: string;
  image?: string;
  description?: string;
  price: number;
}

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

function NextArrow({ className, style, onClick }: ArrowProps) {
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', right: '-25px' }}
      onClick={onClick}
    />
  );
}

function PrevArrow({ className, style, onClick }: ArrowProps) {
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', left: '-25px', zIndex: 1 }}
      onClick={onClick}
    />
  );
}

export default function Home() {
  const [products, setProducts] = useState<Meal[]>([]);

  useEffect(() => {
    api
      .get('/meals')
      .then((res) => {
        let list: Meal[] = [];

        // ✅ Đúng cấu trúc Laravel paginate response
        if (Array.isArray(res.data?.data?.data)) {
          list = res.data.data.data;
        }

        setProducts(list);
      })
      .catch((err) => {
        console.error(err);
        setProducts([]);
      });
  }, []);

  const productSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      <BannerSlider />
      <div className="container">
        <OrderGuide />
      </div>
      <WeeklyMenu />

      <section
        className="products-section"
        style={{
          backgroundImage: `url(${banner6})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
        }}
      >
        <div className="products-wrapper">
          <h2 className="section-title">SẢN PHẨM ĂN GIẢM CÂN</h2>
          <Slider {...productSettings} className="products-slider">
            {products.map((p) => (
              <div key={p.meal_id}>
                <ProductCard product={p} />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <QualityCriteria />
      <NewsSection />
      <Footer />
    </>
  );
}
