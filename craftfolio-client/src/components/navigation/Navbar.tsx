import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Code2, User, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { removeAuthData } from '../../redux/features/auth/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jwt, userData } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(removeAuthData());
    toast.success("Logged out successfully");
    navigate('/');
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 w-full h-18 border-b border-slate-100 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 md:px-16 z-[100] font-sans"
    >
      <div className="flex items-center gap-10">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-black/10 group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tight text-slate-900">Craftfolio</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {['Features', 'Showcase', 'Templates', 'Pricing'].map((item) => (
            <Link 
              key={item} 
              to="#" 
              className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        {jwt ? (
          <div className="flex items-center gap-6">
            <Link 
              to="/profile" 
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full hover:bg-slate-100 transition-all group"
            >
              <div className="w-8 h-8 bg-[#4CAF7D]/10 rounded-full flex items-center justify-center text-[#4CAF7D]">
                <User size={18} />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                {userData.first_name || 'Profile'}
              </span>
            </Link>
            
            <button 
              onClick={handleLogout}
              className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all group hover:cursor-pointer"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="hidden sm:block text-sm font-bold text-slate-900 hover:text-[#4CAF7D] transition-colors">
              Sign In
            </Link>
            <button 
              onClick={() => navigate('/register')}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#4CAF7D] text-white rounded-full font-bold text-sm hover:bg-[#3d8b63] transition-all shadow-md shadow-[#4CAF7D]/10 group hover:cursor-pointer"
            >
              Register
            </button>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
