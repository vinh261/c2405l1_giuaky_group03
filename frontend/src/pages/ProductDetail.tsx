// src/pages/ProductDetail.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../types/axios';
import './ProductDetail.css';

interface Meal {
  meal_id: string;
  meal_name: string;
  image?: string;
  description?: string;
  price: number;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    api.get(`/meals/${id}`)
      .then(res => {
        setMeal(res.data);
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

  const imageSrc = meal.image
    ? meal.image.startsWith('/') ? meal.image : `/${meal.image}`
    : '/assets/images/default-meal.png';

  return (
    <div className="product-detail-container">
      <h2 className="product-detail__title">Chi Tiết Package</h2>

      <div className="product-detail">
        <div className="product-detail__img">
          <img
            className="meal-image"
            src={imageSrc}
            alt={meal.meal_name}
          />
        </div>

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
