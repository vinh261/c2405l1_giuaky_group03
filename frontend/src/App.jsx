import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './components/Header.jsx';
import About from './pages/About.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import Home from './pages/Home.jsx';
import ProductDetail from './pages/ProductDetail.jsx';

// Nếu bạn có route /san-pham, /category/:id, /product/:id, /gioi-thieu...
const DIET_CATEGORY_ID = '8068fbf5-d9c4-4459-a321-fe5d46e25f6c';

export default function App() {
  return (
    <BrowserRouter>
      {/* HEADER nằm bình thường, không cố định */}
      <Header />

      {/* Routes: Home, CategoryPage, About, ProductDetail... */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/san-pham"
          element={<CategoryPage defaultId={DIET_CATEGORY_ID} />}
        />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/gioi-thieu" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
