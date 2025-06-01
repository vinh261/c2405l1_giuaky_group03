#!/bin/bash

# Kiểm tra Composer
if ! command -v composer &> /dev/null
then
    echo "❌ Composer chưa được cài đặt. Vui lòng cài Composer trước."
    exit 1
fi

# Kiểm tra Node/NPM
if ! command -v npm &> /dev/null
then
    echo "❌ NPM chưa được cài đặt. Vui lòng cài Node.js và NPM trước."
    exit 1
fi

# Tạo file .env nếu chưa có
if [ ! -f .env ]; then
    echo "🔧 File .env chưa tồn tại. Đang tạo từ .env.example..."
    cp .env.example .env
    echo "✅ Đã tạo file .env từ .env.example."
else
    echo "ℹ️ File .env đã tồn tại. Bỏ qua bước tạo."
fi

# Cài thư viện PHP (Composer)
echo "📦 Đang cài đặt các thư viện PHP từ Composer..."
composer install

# APP_KEY cho Laravel
echo "🔑 Đang tạo APP_KEY cho Laravel..."
php artisan key:generate

# Migrate và seed dữ liệu
echo "📂 Đang chạy migration và seed dữ liệu..."
php artisan migrate:fresh --seed

# Cài thư viện frontend
echo "📦 Đang cài đặt các thư viện frontend bằng NPM..."
cd frontend
npm install

# Chạy React (Vite) ở background
echo "🚀 Đang khởi động frontend React (Vite)..."
npm run dev &

# Trở về thư mục Laravel gốc
cd ..

# Chạy Laravel server ở background
echo "🚀 Đang khởi động server Laravel..."
php artisan serve &

echo ""
echo "✅ TẤT CẢ ĐÃ SẴN SÀNG!"
echo "🔗 Laravel Backend: http://localhost:8000"
echo "🔗 React Frontend: http://localhost:5173"
