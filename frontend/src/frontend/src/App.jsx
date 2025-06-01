// src/App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './components/Header.jsx'; // ← import Header
import About from './pages/About.jsx'; // ← import About (THÊM DÒNG NÀY)
import CategoryPage from './pages/CategoryPage.jsx'; // ← import CategoryPage
import Home from './pages/Home.jsx';
import ProductDetail from './pages/ProductDetail.jsx'; // ← import ProductDetail

// UUID của category “Gói ăn giảm cân” (đã seed)
const DIET_CATEGORY_ID = '8068fbf5-d9c4-4459-a321-fe5d46e25f6c';

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar/Header luôn hiển thị */}
      <Header />

      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={<Home />} />

        {/* Alias: vào /san-pham sẽ hiển thị CategoryPage với defaultId */}
        <Route
          path="/san-pham"
          element={<CategoryPage defaultId={DIET_CATEGORY_ID} />}
        />

        {/* Route động theo category ID */}
        <Route path="/category/:id" element={<CategoryPage />} />

        {/* Chi tiết sản phẩm */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Giới thiệu */}
        <Route path="/gioi-thieu" element={<About />} /> {/* THÊM DÒNG NÀY */}
      </Routes>
    </BrowserRouter>
  );
}
