import { Navigate, Outlet } from 'react-router-dom';
import { useToDo } from '../../../hooks/useToDo';


const ProtectedRoute = () => {
    const { isLogged, authCheck } = useToDo();

    if (authCheck) {
        return <div>Đang tải, vui lòng chờ...</div>; // Hoặc một spinner/loading component
    }

    return isLogged ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;