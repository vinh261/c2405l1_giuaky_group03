## Các bước cài đặt và run source

### Yêu cầu hệ thống

- Web local: Xampp [Download](https://www.apachefriends.org/download.html)
- IDE: VSCode [Download](https://code.visualstudio.com/)
- Cơ sở dữ liệu: MySQL
- Công cụ quản lý database: Dbeaver [Download](https://dbeaver.io/download/)
- ReactJS: phiên bản tối thiểu 19 - [Install](https://react.dev/)
- Node.js và npm - [Download](https://nodejs.org/en)
- Laravel: phiên bản tối thiêu 12 - [Download](https://laravel.com/)
- Composer - [Download](https://getcomposer.org/)
- Github - [Github](https://github.com/)

### Các bước cài đặt

#### 1. Clone source code:

Mở VSCode, chọn File -> Open Folder (ctrl+O), truy cập vào thư mục *htdocs* nằm trong Xampp (vd đường dẫn: C:\xampp\htdocs), chạy từng lệnh sau:

    git clone https://github.com/vinh261/c2405l1_giuaky_group03.git
    cd c2405l1_giuaky_group03

#### 2. Cấu hình thư mục backend:

Di chuyển vào thư mục *backend* và cài đặt vendor:

    cd backend
    composer i

Copy file *.env-example*, đổi tên thành *.env*, sau đó cấu hình các thông số cần thiết trong *.env* để kết nối database:

    DB_CONNECTION=sqlite
    # DB_HOST=127.0.0.1
    # DB_PORT=3306
    # DB_DATABASE=laravel
    # DB_USERNAME=root
    # DB_PASSWORD=

Đổi thành:

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=project_group03 (tên database)
    DB_USERNAME=root
    DB_PASSWORD=

    # Cấu hình sanctum api
    SANCTUM_STATEFUL_DOMAINS=localhost:5173

Tạo khóa cho *.env*:

    php artisan key:generate

#### 3. Tạo cơ sở dữ liệu:

Mở Dbeaver -> kết nối đến MySQL -> tạo user -> vào VSCode, chạy lệnh:

    php artisan migrate

Sẽ hiện lên thông áo rằng Would you like to create it? (yes/no) [yes] -> gõ yes để tạo mới database.

#### 4. Khởi động hệ thống backend:

    php artisan serve

#### 5. Cấu hình thư mục admin-page và run source:

Tạo thêm 1 cmd, di chuyển vào thư mục *admin-page* và cài đặt node_modules, sau đó khởi động:

    cd admin-page
    npm i
    npm run dev

Truy cập [localhost:5173](http://localhost:5173/) để trải nghiệm giao diện.