import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


const ProtectedRoute = () => {
    const { isLogged, authCheck } = useAuth();

    if (authCheck) {
        return <div>Đang tải, vui lòng chờ...</div>; // Hoặc một spinner/loading component
    }

    return isLogged ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;