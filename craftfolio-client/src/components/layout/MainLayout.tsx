import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
