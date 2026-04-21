import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import Loader from '../../components/common/Loader';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github, Chrome, User, CheckCircle2, Eye, EyeOff, ShieldCheck, ArrowLeft, RotateCcw } from 'lucide-react';
import type { RegisterData } from "../../types";
import { sendOtp, verifyOtp } from "../../redux/features/auth/otpSlice";
import { toast } from 'sonner';
import { registerUser, setAuthData } from '../../redux/features/auth/authSlice';
import { googleAuthUrl } from '../../config/envConfig';

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<any>();
  
  // Get the intended destination from location state, default to /profile
  const from = location.state?.from?.pathname || "/profile";
  const { loading: authLoading } = useSelector((state: RootState) => state.auth);
  const { loading: otpLoading } = useSelector((state: RootState) => state.otp);
  const loading = authLoading || otpLoading;
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(59);

  const [userData, setUserData] = useState<RegisterData>({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });
  const [isProcessingGoogle, setIsProcessingGoogle] = useState(false);

  useEffect(() => {
    // Check for Google OAuth success tokens in URL (RapidX pattern)
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
        
        toast.success("Welcome to Craftfolio! Signed in with Google.");
        
        const targetPath = isNewUser ? '/set-password' : from;
        navigate(targetPath, { replace: true });

        // Force a delay on URL cleaning so PublicRoute doesn't redirect to profile early
        setTimeout(() => {
           window.history.replaceState({}, document.title, window.location.pathname);
        }, 1000);
      } catch (e) {
        toast.error("Auth sync failed.");
      } finally {
        setIsProcessingGoogle(false);
      }
    }
  }, [dispatch, navigate, from]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  useEffect(() => {
    let timer: any;
    if (step === 2 && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const handleResendOtp = () => {
    if (timeLeft === 0) {
      // Logic for resending OTP would go here
      console.log('Resending OTP...');
      setTimeLeft(59);
    }
  };

  const slideIn = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submission attempt with:", userData);
    try {
      await dispatch(sendOtp(userData.email)).unwrap();
      toast.success("OTP sent to your email, please verify.");
      setStep(2);
    } catch (error: any) {
      console.error("sendOtp error:", error);
      toast.error(error || "Something went wrong, please try again.");
      setStep(1);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Verification attempt with OTP:", otp.join(''));
    try {
      await dispatch(verifyOtp({ email: userData.email, otp: Number(otp.join('')) })).unwrap();
      await dispatch(registerUser(userData as any)).unwrap();
      toast.success("Account created successfully.");
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("OTP Verification/Registration error:", error);
      toast.error(error || "Something went wrong, please try again.");
      setStep(1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#4CAF7D] selection:text-white">
      <Loader isLoading={loading || isProcessingGoogle} text={isProcessingGoogle ? "Syncing Google Account..." : "Preparing your creative workspace..."} />


      <div className="pt-10 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-200 bg-slate-200/40 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#4CAF7D]/5 rounded-full blur-[100px] -z-10"></div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="w-full max-w-xl"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              {step === 1 ? <>Start your <span className="text-[#4CAF7D]">Craft.</span></> : <>Verify your <span className="text-[#4CAF7D]">Identity.</span></>}
            </h1>
            <p className="text-slate-500 font-medium text-lg">
              {step === 1 ? 'Join 5,000+ creators building world-class portfolios.' : 'We\'ve sent a 6-digit code to your email.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
             {/* Left: Perks */}
             <div className="lg:col-span-4 space-y-8 hidden lg:block py-10 text-left">
                {[
                  { title: 'Free Hosting', desc: 'Deploy your portfolio instantly.' },
                  { title: 'Weekly Themes', desc: 'Stay fresh with new designs.' },
                  { title: 'Zero Code', desc: 'Focus on your achievements.' }
                ].map((perk, i) => (
                   <motion.div 
                    key={perk.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="flex gap-4 items-start"
                   >
                      <div className="mt-1 shrink-0">
                         <CheckCircle2 size={18} className="text-[#4CAF7D]" />
                      </div>
                      <div>
                         <h3 className="font-black text-sm uppercase tracking-wider">{perk.title}</h3>
                         <p className="text-slate-400 text-xs mt-1 leading-relaxed">{perk.desc}</p>
                      </div>
                   </motion.div>
                ))}
             </div>

             {/* Right: Register/OTP Card */}
             <div className="lg:col-span-8 bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 min-h-112.5 flex flex-col justify-center">
               <AnimatePresence mode="wait">
                 {step === 1 ? (
                   <motion.div 
                     key="step1"
                     initial="hidden"
                     animate="visible"
                     exit="exit"
                     variants={slideIn}
                   >
                     <form className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">First Name</label>
                              <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4CAF7D] transition-colors" size={18} />
                                <input 
                                  required
                                  type="text"
                                  placeholder="Alex"
                                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4CAF7D]/20 focus:border-[#4CAF7D] transition-all font-medium text-sm"
                                  value={userData.first_name}
                                  onChange={(e) => setUserData({...userData, first_name: e.target.value})}
                                />
                              </div>
                           </div>
                           <div>
                              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Last Name</label>
                              <input 
                                required
                                type="text" 
                                placeholder="Smith"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4CAF7D]/20 focus:border-[#4CAF7D] transition-all font-medium text-sm"
                                value={userData.last_name}
                                onChange={(e) => setUserData({...userData, last_name: e.target.value})}
                              />
                           </div>
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email Address</label>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4CAF7D] transition-colors" size={18} />
                            <input 
                              required
                              type="email" 
                              placeholder="alex@example.com"
                              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4CAF7D]/20 focus:border-[#4CAF7D] transition-all font-medium text-sm"
                              value={userData.email}
                              onChange={(e) => setUserData({...userData, email: e.target.value})}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Password</label>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4CAF7D] transition-colors" size={18} />
                            <input 
                              required
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a strong password"
                              className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4CAF7D]/20 focus:border-[#4CAF7D] transition-all font-medium text-sm"
                              value={userData.password}
                              onChange={(e) => setUserData({...userData, password: e.target.value})}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>

                        <p className="text-[10px] text-slate-400 font-medium px-1">
                          By clicking "Create Account", you agree to our <span className="underline cursor-pointer">Terms</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
                        </p>

                        <button 
                          type="button"
                          className="w-full py-4 bg-[#4CAF7D] text-white rounded-2xl font-black text-lg hover:bg-[#3d8b63] transition-all shadow-xl shadow-[#4CAF7D]/20 flex items-center justify-center gap-3 group"
                          onClick={handleRegisterSubmit}
                        >
                          Create Account <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </button>
                     </form>

                     <div className="relative my-8 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-300">
                        <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 -z-10"></div>
                        <span className="bg-white px-4">Instant Setup with</span>
                     </div>

                     <div className="grid grid-cols-2 gap-4 mt-8">
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
                   </motion.div>
                 ) : (
                   <motion.div 
                     key="step2"
                     initial="hidden"
                     animate="visible"
                     exit="exit"
                     variants={slideIn}
                     className="text-center"
                   >
                     <div className="mb-8 flex justify-center">
                       <div className="w-16 h-16 bg-[#4CAF7D]/10 rounded-full flex items-center justify-center text-[#4CAF7D]">
                         <ShieldCheck size={32} />
                       </div>
                     </div>

                     <form className="space-y-8" onSubmit={handleVerifyOtp}>
                        <div className="flex gap-2 justify-center">
                          {otp.map((digit, i) => (
                            <input
                              key={i}
                              id={`otp-${i}`}
                              type="text"
                              value={digit}
                              maxLength={1}
                              onChange={(e) => handleOtpChange(i, e.target.value)}
                              onKeyDown={(e) => handleKeyDown(i, e)}
                              className="w-11 h-14 bg-slate-50 border border-slate-200 rounded-xl text-center text-xl font-black focus:ring-2 focus:ring-[#4CAF7D]/20 focus:border-[#4CAF7D] focus:outline-none transition-all"
                            />
                          ))}
                        </div>

                        <div className="space-y-4">
                          <button 
                            type="submit"
                            className="w-full py-4 bg-[#4CAF7D] text-white rounded-2xl font-black text-lg hover:bg-[#3d8b63] transition-all shadow-xl shadow-[#4CAF7D]/20 flex items-center justify-center gap-3 group"
                          >
                            Verify & Complete <CheckCircle2 size={20} />
                          </button>
                          
                          <button 
                            type="button"
                            disabled={timeLeft > 0}
                            onClick={handleResendOtp}
                            className={`flex items-center justify-center gap-2 w-full font-bold text-xs uppercase tracking-widest transition-colors ${timeLeft > 0 ? 'text-slate-300 cursor-not-allowed' : 'text-[#4CAF7D] hover:text-[#3d8b63]'}`}
                          >
                            <RotateCcw size={14} /> {timeLeft > 0 ? `Resend OTP in 00:${timeLeft.toString().padStart(2, '0')}` : 'Resend OTP'}
                          </button>
                        </div>
                     </form>

                     <button 
                       onClick={() => setStep(1)}
                       className="mt-10 flex items-center justify-center gap-2 w-full text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition-colors"
                     >
                       <ArrowLeft size={14} /> Change Email or Details
                     </button>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </div>

          <p className="text-center mt-10 text-slate-500 font-medium text-sm">
            Already have an account? <Link to="/login" state={{ from: location.state?.from }} className="text-slate-900 font-black hover:underline underline-offset-4">Log in</Link>
          </p>
        </motion.div>
      </div>

      <footer className="py-10 text-center text-slate-400 text-xs font-bold tracking-widest uppercase">
        © 2026 Craftfolio — Powered by your vision
      </footer>
    </div>
  );
};

export default RegisterPage;
