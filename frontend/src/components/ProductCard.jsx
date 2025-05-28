// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { meal_id, meal_name, image, description, price } = product;

  // Nếu image tồn tại, prefix dấu '/' nếu cần; ngược lại fallback về default
  const imgSrc = image
    ? (image.startsWith('/')
        ? image
        : `/${image}`
      )
    : '/assets/images/default-meal.png';

  return (
    <div className="product-card">
      <img src={imgSrc} alt={meal_name} />

      <h3 className="product-card__name">{meal_name}</h3>

      <p className="product-card__desc">
        {description?.length > 100
          ? description.slice(0, 100) + '…'
          : description}
      </p>

      <p className="product-card__price">
        Giá: {price.toLocaleString('vi')} đ
      </p>

      {/* Đã bọc Link để điều hướng tới chi tiết */}
      <Link to={`/product/${meal_id}`} className="product-card__btn">
        Đặt hàng &gt;
      </Link>
    </div>
  );
}
