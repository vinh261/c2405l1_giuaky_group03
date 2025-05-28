// src/components/NewsSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import news4 from '../assets/images/new.jpg';
import news2 from '../assets/images/new1.jpg';
import news3 from '../assets/images/new2.png';
import news1 from '../assets/images/new3.jpg';
import './NewsSection.css';

export default function NewsSection() {
  const articles = [
    {
      title: 'Paleo Diet Là Gì? Chế Độ Ăn Kiêng Paleo Có...',
      text: 'Chế độ ăn kiêng Paleo Diet không còn xa lạ với nhiều người...',
      img: news1,
    },
    {
      title: '3 Cách Pha Ca Cao Cốt Dừa Keto Cực Thơm...',
      text: 'Ca cao mix cốt dừa là một loại đồ uống thơm ngon và bổ dưỡng...',
      img: news2,
    },
    {
      title: 'Thử ngay 10+ thực đơn bữa sáng Keto cho...',
      text: 'Ăn sáng là bước quan trọng trong việc duy trì một lối sống lành...',
      img: news3,
    },
    {
      title: 'Cách Làm Kem Trái Cây Eat Clean Mát Lạnh...',
      text: 'Kem trái cây Eat Clean vừa ngon lại tốt cho sức khỏe...',
      img: news4,
    },
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <div className="slick-next custom-arrow" />,
    prevArrow: <div className="slick-prev custom-arrow" />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 768,  settings: { slidesToShow: 2 } },
      { breakpoint: 480,  settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="news-section">
      <h2 className="news-section__title">TIN TỨC</h2>
      <Slider {...settings} className="news-slider">
        {articles.map((a, idx) => (
          <Link key={idx} to="/blog" className="news-card">
            <div className="news-card__img-wrapper">
              <img src={a.img} alt={a.title} />
            </div>
            <h3>{a.title}</h3>
            <p>{a.text}</p>
          </Link>
        ))}
      </Slider>
    </section>
  );
}
