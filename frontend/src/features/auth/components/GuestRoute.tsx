import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


const GuestRoute = () => {
    const { isLogged, authCheck } = useAuth();

    if (authCheck) {
        return <div>Đang tải, vui lòng chờ...</div>; // Hoặc một spinner/loading component
    }

    return !isLogged ? <Outlet /> : <Navigate to="/" replace />;
};

export default GuestRoute;