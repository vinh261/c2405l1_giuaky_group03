// src/pages/UserDashboard.tsx

import { useAuthStore } from "@/stores/authStore";
import { Navigate } from "react-router-dom";

export default function UserDashboard() {
    const { user, role, isLogged } = useAuthStore();

    // Redirect if not logged in
    if (!isLogged) {
        return <Navigate to="/login" replace />;
    }

    // Redirect if admin
    if (role === "admin") {
        return <Navigate to="/admin" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">
                                Welcome to Your Dashboard
                            </h1>

                            <div className="mt-4">
                                <h2 className="text-lg font-medium text-gray-900">
                                    Your Information
                                </h2>
                                <dl className="mt-2 text-sm text-gray-600">
                                    <div className="py-2">
                                        <dt className="font-medium">Email:</dt>
                                        <dd>{user?.email}</dd>
                                    </div>
                                    <div className="py-2">
                                        <dt className="font-medium">
                                            User ID:
                                        </dt>
                                        <dd>{user?.user_id}</dd>
                                    </div>
                                    <div className="py-2">
                                        <dt className="font-medium">
                                            Username:
                                        </dt>
                                        <dd>
                                            {user?.profile?.user_name ||
                                                "Not set"}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="mt-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">
                                    Quick Actions
                                </h2>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                        Browse Meals
                                    </button>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                        View Favorites
                                    </button>
                                    <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                                        Nutrition Calculator
                                    </button>
                                    <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}