import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTemplates } from './redux/features/templates/templateSlice';
import type { AppDispatch, RootState } from './redux/store';
import AllRoutes from './AllRoutes';
import AppLoader from './components/layout/AppLoader';
import { validateUser } from './redux/features/auth/authSlice';
import { fetchUserCrafts } from './redux/features/preview/dataSlice';

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.templates);

  useEffect(() => {
    dispatch(fetchTemplates());
    dispatch(validateUser());
    dispatch(fetchUserCrafts());
  }, [dispatch, fetchTemplates, validateUser, fetchUserCrafts]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return (
    <div className="w-full min-h-screen font-sans">
      {loading ? <AppLoader /> : <AllRoutes />}
    </div>
  );
}

export default App;
