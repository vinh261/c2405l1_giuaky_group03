// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import './CategoryPage.css';

export default function CategoryPage({ defaultId }) {
  // Nếu có defaultId (ví dụ từ /san-pham), ưu tiên dùng, ngược lại lấy param
  const { id: paramId } = useParams();
  const categoryId = defaultId || paramId;

  // Khởi meals luôn là mảng trống
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (!categoryId) return;

    api
      .get(`/meals?category=${categoryId}`)
      .then(res => {
        // Xử lý cả hai dạng trả về của API:
        // - Nếu API trả trực tiếp mảng: res.data là mảng
        // - Nếu API trả { data: [...] }: res.data.data là mảng
        let payload = [];
        if (Array.isArray(res.data)) {
          payload = res.data;
        } else if (Array.isArray(res.data.data)) {
          payload = res.data.data;
        }
        setMeals(payload);
      })
      .catch(err => {
        console.error(err);
        setMeals([]); // đảm bảo meals luôn mảng
      });
  }, [categoryId]);  // chạy lại khi categoryId thay đổi

  return (
    <div className="container">
      <h2 className="category-title">SẢN PHẨM ĂN GIẢM CÂN</h2>
      <div className="product-grid">
        {meals.length > 0 ? (
          meals.map(meal => (
            <ProductCard key={meal.meal_id} product={meal} />
          ))
        ) : (
          <p>Đang tải hoặc không có sản phẩm...</p>
        )}
      </div>
    </div>
  );
}
