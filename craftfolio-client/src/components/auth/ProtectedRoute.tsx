import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

const ProtectedRoute = () => {
    const { jwt } = useSelector((state: RootState) => state.auth);
    const location = useLocation();

    if (!jwt) {
        // Redirect to login if no JWT is found, passing the current location in state
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If authenticated, render the child routes
    return <Outlet />;
};

export default ProtectedRoute;
