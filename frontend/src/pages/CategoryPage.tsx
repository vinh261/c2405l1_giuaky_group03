// src/pages/CategoryPage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../types/axios';
import './CategoryPage.css';

interface Meal {
  meal_id: string;
  meal_name: string;
  image?: string;
  description?: string;
  price: number;
}

interface CategoryPageProps {
  defaultId?: string;
}

export default function CategoryPage({ defaultId }: CategoryPageProps) {
  const { id: paramId } = useParams<{ id: string }>();
  const categoryId = defaultId || paramId;

  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    if (!categoryId) return;

    api
      .get(`/meals?category=${categoryId}`)
      .then((res) => {
        let payload: Meal[] = [];
        if (Array.isArray(res.data)) {
          payload = res.data;
        } else if (Array.isArray(res.data.data)) {
          payload = res.data.data;
        }
        setMeals(payload);
      })
      .catch((err) => {
        console.error(err);
        setMeals([]);
      });
  }, [categoryId]);

  return (
    <div className="container">
      <h2 className="category-title">SẢN PHẨM ĂN GIẢM CÂN</h2>
      <div className="product-grid">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <ProductCard key={meal.meal_id} product={meal} />
          ))
        ) : (
          <p>Đang tải hoặc không có sản phẩm...</p>
        )}
      </div>
    </div>
  );
}
