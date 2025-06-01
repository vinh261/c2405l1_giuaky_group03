// src/components/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

interface Product {
  meal_id: string;
  meal_name: string;
  image?: string;
  description?: string;
  price: number;
}

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { meal_id, meal_name, image, description, price } = product;

  const imgSrc = image
    ? image.startsWith('/') ? image : `/${image}`
    : '/assets/images/default-meal.png';

  return (
    <div className="product-card">
      <img src={imgSrc} alt={meal_name} />

      <h3 className="product-card__name">{meal_name}</h3>

      <p className="product-card__desc">
        {description?.length && description.length > 100
          ? description.slice(0, 100) + '…'
          : description}
      </p>

      <p className="product-card__price">
        Giá: {price.toLocaleString('vi')} đ
      </p>

      <Link to={`/product/${meal_id}`} className="product-card__btn">
        Đặt hàng &gt;
      </Link>
    </div>
  );
};

export default ProductCard;
