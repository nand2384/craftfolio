import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

const PublicRoute = () => {
    const { jwt } = useSelector((state: RootState) => state.auth);

    if (jwt) {
        // Redirect to profile if JWT is found
        return <Navigate to="/profile" replace />;
    }

    // If not authenticated, render the child routes (like login/register)
    return <Outlet />;
};

export default PublicRoute;
