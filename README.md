# Tổng quan sơ đồ ERD

### *Bao gồm các bảng:*
- users
- profiles
- recipes
- ingredients
- nutrition_info
- meals
- categories
- tags
- recommends (1 bảng ghi tập hợp nhiều đề xuất)
- meal_plans

### *Mối quan hệ giữa các bảng:*

- users 1-1 profiles: mỗi user có 1 profile, 1 profile chỉ thuộc về 1 user.
  
- profiles 1-n recipes: mỗi user có thể tạo ra nhiều công thức, 1 công thức được tạo ra bởi 1 user.

- profiles 1-n recommends: mỗi user có thể nhận được nhiều bảng ghi đề xuất, 1 bảng ghi đề xuất chỉ dành riêng cho 1 user cụ thể.

- profiles n-n meals (pivot: favorites): mỗi user có thể tương tác (thích, mua) với nhiều món, mỗi món có thể phục vụ (được thích bởi, được mua bởi) nhiều user. (nếu có thể em sẽ mở rộng ra, thêm các phương thức thanh toán để cho user có thể shopping)

- profile 1-n meal_plans: 1 user có nhiều bảng kế hoạch, mỗi bảng kế hoạch được tạo ra bởi 1 user.

- recipes 1-1 meals: 1 công thức tạo ra 1 món ăn, 1 món ăn được tạo ra bởi 1 công thức.

- recipes n-n ingredients (pivot: recipe_ingredients): mỗi công thức cần nhiều nguyên liệu, mỗi nguyên liệu có nhiều công thức dùng.

- recipes 1-1 nutrition_info: 1 công thức có 1 bảng dinh dưỡng cụ thể, 1 bảng dinh dưỡng chỉ thuộc về 1 công thức nhất định. (tách ra để dễ làm việc, tính toán dinh dưỡng)

- meals n-n categories (pivot: category_meal): mỗi món ăn có thể nằm trong nhiều danh mục, mỗi danh mục có thể chứa nhiều món ăn.

- meals n-n tags (pivot: meal_tag): mỗi món ăn có thể gán nhiều tag, mỗi tag có thể được gán bởi nhiều món ăn.

- meals n-n recommends (pivot_recommend_detail): mỗi món ăn có thể nằm trong nhiều bộ đề xuất, mỗi bộ đề xuất bao gồm nhiều món ăn.

- meals n-n meal_plans (pivot: plan_meal_menu): mỗi món ăn có thể nằm trong nhiều bảng kế hoạch, mỗi bảng kế hoạch bao gồm nhiều món ăn.

### Hình ảnh minh họa:

#### **Drawio**
![ERD-Drawio](.public/images/erd.png)

#### **Diagram**
![ERD-Diagram](.public/images/diagram.png)
