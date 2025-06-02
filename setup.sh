#!/bin/bash

echo "=== 🚀 Bắt đầu cài đặt dự án ==="

# 1. Cài đặt FRONTEND (React)
echo "--- 🔧 Đang cài đặt frontend ---"
cd admin-page || { echo "Không tìm thấy thư mục admin-page"; exit 1; }
npm install --legacy-peer-deps --silent
npm run dev &

# 2. Cài đặt BACKEND (Laravel)
echo "--- 🔧 Đang cài đặt backend ---"
cd ../backend || { echo "Không tìm thấy thư mục backend"; exit 1; }

composer install --no-interaction

if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "--- 🔑 Đã tạo file .env"
fi

php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve &

echo "=== ✅ Hoàn tất. Frontend chạy tại http://localhost:5173 và Backend tại http://localhost:8000 ==="
