import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import Loader from '../../components/common/Loader';
import { motion } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github, Chrome, Code2, Sparkles, Eye, EyeOff } from 'lucide-react';
import { loginUser, setAuthData } from '../../redux/features/auth/authSlice';
import { toast } from 'sonner';
import { googleAuthUrl } from '../../config/envConfig';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<any>();
  
  // Get the intended destination from location state, default to /profile
  const from = location.state?.from?.pathname || "/profile";
  const { loading } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [isProcessingGoogle, setIsProcessingGoogle] = useState(false);

  useEffect(() => {
    // Check for Google OAuth success tokens in URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const rawUserData = params.get("userData");
    const roleId = params.get("role_id");
    const isNewUserParam = params.get("isNewUser");
    const isNewUser = isNewUserParam === "true";
    const error = params.get("error");

    if (error) {
      toast.error("Google authentication failed. Please try again.");
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    if (token && rawUserData) {
      try {
        setIsProcessingGoogle(true);
        const userData = JSON.parse(decodeURIComponent(rawUserData));
        
        dispatch(setAuthData({ 
            jwt: token, 
            userData, 
            role_id: roleId ? parseInt(roleId) : 2 
        }));
        
        toast.success("Signed in successfully with Google!");
        
        const targetPath = isNewUser ? '/set-password' : from;
        
        navigate(targetPath, { replace: true });
        
        // Delay URL cleansing so PublicRoute sees the params for the duration of the transition
        setTimeout(() => {
          window.history.replaceState({}, document.title, window.location.pathname);
        }, 1000);

      } catch (e) {
        toast.error("Auth sync failed. Please try again.");
      } finally {
        setIsProcessingGoogle(false);
      }
    }
  }, [dispatch, navigate, from]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(loginData)).unwrap();
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#4CAF7D] selection:text-white">
      <Loader isLoading={loading || isProcessingGoogle} text={isProcessingGoogle ? "Syncing Google Account..." : "Signing you in..."} />

      <div className="pt-10 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#4CAF7D]/5 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-slate-200/50 rounded-full blur-[100px] -z-10"></div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="w-full max-w-md"
        >
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-2xl shadow-xl mb-6 group mx-auto"
            >
              <Code2 className="text-white w-8 h-8 group-hover:rotate-12 transition-transform" />
            </motion.div>
            <h1 className="text-4xl font-black tracking-tight mb-3">Welcome Back</h1>
            <p className="text-slate-500 font-medium">Continue your creative journey on Craftfolio</p>
          </div>

          {/* Login Card */}
          <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 relative">
            <div className="absolute -top-4 -right-4 bg-[#4CAF7D] text-white p-2 rounded-xl shadow-lg rotate-12">
               <Sparkles size={20} />
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4CAF7D] transition-colors" size={20} />
                  <input 
                    required
                    type="email" 
                    placeholder="name@company.com"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4CAF7D]/20 focus:border-[#4CAF7D] transition-all font-medium"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2 ml-1">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Password</label>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#4CAF7D] hover:underline hover:cursor-pointer">Forgot password?</span>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4CAF7D] transition-colors" size={20} />
                  <input 
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4CAF7D]/20 focus:border-[#4CAF7D] transition-all font-medium"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button 
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3 group"
              >
                Sign In <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </form>

            <div className="relative my-8 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-300">
               <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-100 -z-10"></div>
               <span className="bg-white px-4">Or sign in with</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <button 
                type="button"
                onClick={() => window.location.href = googleAuthUrl}
                className="flex items-center justify-center gap-3 py-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors font-bold text-sm"
               >
                  <Chrome size={18} className="text-slate-600" /> Google
               </button>
               <button className="flex items-center justify-center gap-3 py-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors font-bold text-sm">
                  <Github size={18} className="text-slate-600" /> GitHub
               </button>
            </div>
          </div>

          <p className="text-center mt-8 text-slate-500 font-medium text-sm">
            Don't have an account? <Link to="/register" state={{ from: location.state?.from }} className="text-[#4CAF7D] font-black hover:underline underline-offset-4">Create account</Link>
          </p>
        </motion.div>
      </div>

      {/* Footer minimal */}
      <footer className="py-10 text-center text-slate-400 text-xs font-bold tracking-widest uppercase">
        © 2026 Craftfolio — Your professional frame
      </footer>
    </div>
  );
};

export default LoginPage;
