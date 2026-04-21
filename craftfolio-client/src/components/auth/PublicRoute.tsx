import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

const PublicRoute = () => {
    const { jwt } = useSelector((state: RootState) => state.auth);
    const params = new URLSearchParams(window.location.search);
    
    // Check if we are in any stage of a Google/OAuth flow
    const isAuthenticating = params.has("token") || params.has("isNewUser") || params.has("userData");

    if (jwt && !isAuthenticating) {
        // Only redirect to profile if we are fully logged in and NOT in the middle of a process
        return <Navigate to="/profile" replace />;
    }

    // If not authenticated, render the child routes (like login/register)
    return <Outlet />;
};

export default PublicRoute;
