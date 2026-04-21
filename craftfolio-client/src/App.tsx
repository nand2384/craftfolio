import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AllRoutes from './AllRoutes';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return (
    <div className="w-full min-h-screen font-sans">
      <AllRoutes />
    </div>
  );
}

export default App;
