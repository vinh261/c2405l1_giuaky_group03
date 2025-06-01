import { Navigate, Outlet } from 'react-router-dom';
import { useToDo } from '../../../hooks/useToDo';


const GuestRoute = () => {
    const { isLogged, authCheck } = useToDo();

    if (authCheck) {
        return <div>Đang tải, vui lòng chờ...</div>; // Hoặc một spinner/loading component
    }

    return !isLogged ? <Outlet /> : <Navigate to="/" replace />;
};

export default GuestRoute;