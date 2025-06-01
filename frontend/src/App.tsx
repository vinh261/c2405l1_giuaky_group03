import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Layouts & Providers
import Layout from './admin-panels/Layout';
import { CollapsedProvider } from './admin-panels/contexts/collapsed/CollapsedProvider';
import { ThemeProvider } from './contexts/theme/ThemeProvider';
import ToDoProvider from './contexts/todo/ToDoProvider';

// Auth
import GuestRoute from './admin-panels/components/auth/GuestRoute';
import ProtectedRoute from './admin-panels/components/auth/ProtectedRoute';
import Login from './pages/auth/Login';
import ProfilePage from './pages/auth/ProfilePage';
import Register from './pages/auth/Register';
import ResetPassword from './pages/auth/ResetPassword';

// Admin Pages
import AddUser from './admin-panels/pages/AddUserPage';
import Analysis from './admin-panels/pages/AnalysisPage';
import CategoryAdmin from './admin-panels/pages/CategoryPage';
import Dashboard from './admin-panels/pages/DashboardPage';
import MealPage from './admin-panels/pages/MealPage';
import MemberPage from './admin-panels/pages/MemberPage';
import RecipePage from './admin-panels/pages/RecipePage';

// Public Pages
import Header from './components/Header';
import About from './pages/About';
import CategoryPage from './pages/CategoryPage';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

// UUID category seeding
const DIET_CATEGORY_ID = '8068fbf5-d9c4-4459-a321-fe5d46e25f6c';

export default function App() {
  return (
    <ThemeProvider>
      <ToDoProvider>
        <CollapsedProvider>
          <BrowserRouter>
            <Header />


            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/san-pham" element={<CategoryPage defaultId={DIET_CATEGORY_ID} />} />
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/gioi-thieu" element={<About />} />

              {/* Auth routes */}
              <Route element={<GuestRoute />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Route>

              <Route path="/reset-password/:token" element={<ResetPassword />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="analysis" element={<Analysis />} />
                  <Route path="members" element={<MemberPage />} />
                  <Route path="add_user" element={<AddUser />} />
                  <Route path="meals" element={<MealPage />} />
                  <Route path="categories" element={<CategoryAdmin />} />
                  <Route path="recipes" element={<RecipePage />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </CollapsedProvider>
      </ToDoProvider>
    </ThemeProvider>
  );
}
