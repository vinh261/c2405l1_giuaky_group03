import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api.ts';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/meals/${id}`)
      .then(res => {
        setMeal(res.data);            // API trả về object ngay trong res.data
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Đang tải…</p>;
  if (error)   return <p>Lỗi: {error}</p>;
  if (!meal)   return <p>Không tìm thấy sản phẩm.</p>;

  return (
    <div className="product-detail-container">
      {/* Tiêu đề chính */}
      <h2 className="product-detail__title">Chi Tiết Package</h2>

      <div className="product-detail">
        {/* Ảnh bên trái */}
        <div className="product-detail__img">
          <img
            className="meal-image"
            src={
              meal.image
                ? (meal.image.startsWith('/')
                    ? meal.image
                    : `/${meal.image}`
                  )
                : '/assets/images/default-meal.png'
            }
            alt={meal.meal_name}
          />
        </div>

        {/* Thông tin bên phải */}
        <div className="product-detail__info">
          <h3 className="product-detail__name">{meal.meal_name}</h3>
          <p className="product-detail__price">
            Giá: {meal.price.toLocaleString('vi')} đ
          </p>

          <p className="product-detail__desc">{meal.description}</p>

          <div className="product-detail__quantity">
            <label htmlFor="quantity">Số lượng:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              defaultValue={1}
              min={1}
            />
          </div>

          <div className="product-detail__contact">
            <h4>Đặt ngay qua</h4>
            <div className="contact-buttons">
              <a href="#" className="fb-btn">FACEBOOK</a>
              <a href="#" className="zalo-btn">ZALO</a>
              <a href="sms:0786631194" className="sms-btn">SMS: 078 910 1112</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
