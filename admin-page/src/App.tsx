import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./admin-panels/Layout";
import Dashboard from "./admin-panels/pages/DashboardPage";
import Analysis from "./admin-panels/pages/AnalysisPage";
import MemberPage from "./admin-panels/pages/MemberPage";
import AddUser from "./admin-panels/pages/AddUserPage";
import CategoryPage from "./admin-panels/pages/CategoryPage";
import RecipePage from "./admin-panels/pages/RecipePage";
import MealPage from "./admin-panels/pages/MealPage";
import { CollapsedProvider } from "./admin-panels/contexts/collapsed/CollapsedProvider";
import { ThemeProvider } from "./contexts/theme/ThemeProvider";
import Header from "./layouts/Header";
import ToDoProvider from "./contexts/todo/ToDoProvider";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProfilePage from "./pages/auth/ProfilePage";
import ResetPassword from "./pages/auth/ResetPassword";
import GuestRoute from "./admin-panels/components/auth/GuestRoute";
import ProtectedRoute from "./admin-panels/components/auth/ProtectedRoute";


const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Header />
        },
        {
            element: <GuestRoute />,
            children: [
                {
                    path: 'register',
                    element: <Register />
                },
                {
                    path: 'login',
                    element: <Login />
                },
            ]
        },
        {
            path: 'reset-password/:token',
            element: <ResetPassword />
        },
        {
            element: <ProtectedRoute />,
            children: [
                {
                    path: 'profile',
                    element: <ProfilePage />
                },
                {
                    path: 'admin',
                    element: <Layout />,
                    children: [
                        {
                            index: true,
                            element: <Dashboard />
                        },
                        {
                            path: 'analysis',
                            element: <Analysis />
                        },
                        {
                            path: 'members',
                            element: <MemberPage />
                        },
                        {
                            path: 'add_user',
                            element: <AddUser />
                        },
                        {
                            path: 'meals',
                            element: <MealPage />
                        },
                        {
                            path: 'categories',
                            element: <CategoryPage />
                        },
                        {
                            path: 'recipes',
                            element: <RecipePage />
                        }
                    ]
                }
            ]
        }
    ]);

    return (
        <ThemeProvider>
            <ToDoProvider>
                <CollapsedProvider>
                    <RouterProvider router={router} />
                </CollapsedProvider>
            </ToDoProvider>
        </ThemeProvider>
    );
};

export default App;
