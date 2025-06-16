import { LoadingSpinner } from "@/components/common/loading";
import MainLayout from "@/components/layouts/MainLayout";
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import GuestRoute from "./GuestRoute";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoute";
import { AdminLayout } from "@/components/layouts/AdminLayout";


// Lazy load auth pages
const RegisterPage = lazy(() => import('@/pages/auth/register/RegisterPage'));
const LoginPage = lazy(() => import('@/pages/auth/login/LoginPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgot-password/ForgotPassword'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/reset-password/ResetPassword'));

const Dashboard = lazy(() => import('@/pages/auth/manage-dashboard/Dashboard'));
const Member = lazy(() => import('@/pages/auth/manage-user/UserManage'));

// Lazy load pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const MealPage = lazy(() => import('@/pages/MealPage'));
const MealDetailModal = lazy(() => import('@/components/meal-page/meal-detail/MealDetailModal'));
const MealPlannerPage = lazy(() => import('@/pages/MealPlannerPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const ReviewPage = lazy(() => import('@/pages/ReviewPage'));
const FavoritePage = lazy(() => import('@/pages/FavoritePage'));


const AppRoute = () => {
    return (
        <React.Fragment>
            <Toaster
                containerStyle={{
                    zIndex: 999999999,
                }}
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        style: {
                        background: '#10b981',
                        },
                    },
                    error: {
                        style: {
                        background: '#ef4444',
                        },
                    },
                }}
            />
            <Suspense fallback={<LoadingSpinner fullScreen />}>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="meal-menu" element={<MealPage />} />
                        <Route path="/meal-menu/:mealId" element={
                            <MealDetailModal 
                                returnPath="/meal-menu" 
                                showBackground={<MealPage />} 
                            />
                        } />
                        <Route path="meal-plan" element={<MealPlannerPage />} />
                        <Route path="contact" element={<ContactPage />} />
                        <Route path="reviews" element={<ReviewPage />} />
                        <Route path="favorites" element={<FavoritePage />} />
                        <Route path="/favorites/:mealId" element={
                            <MealDetailModal 
                                returnPath="/favorites" 
                            />
                        } />
                    </Route>

                    {/* Chỉ dành cho các trang mà người dùng đã đăng nhập KHÔNG NÊN vào lại như /login, /register */}
                    <Route element={<GuestRoute />}>
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="reset-password/:token" element={<ResetPasswordPage />} />
                    </Route>

                    {/* Admin */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="admin" element={<AdminLayout />} >
                            <Route index element={<Dashboard />} />
                            <Route path="members" element={<Member />} />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </React.Fragment>
    )
}
export default AppRoute;