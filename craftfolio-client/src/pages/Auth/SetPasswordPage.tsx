import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, Sparkles, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { baseURL } from '../../config/envConfig';
import Loader from '../../components/common/Loader';
import { setAuthData } from '../../redux/features/auth/authSlice';

const SetPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { jwt, userData } = useSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState(false);
    const [isSyncing, setIsSyncing] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const rawUserData = params.get("userData");
        const roleId = params.get("role_id");

        if (token && rawUserData) {
            try {
                const userData = JSON.parse(decodeURIComponent(rawUserData));
                dispatch(setAuthData({ 
                    jwt: token, 
                    userData, 
                    role_id: roleId ? parseInt(roleId) : 2 
                }));
                // Clean URL after sync to keep it clean
                window.history.replaceState({}, document.title, window.location.pathname);
            } catch (e) {
                // Ignore sync errors
            }
        }
        setIsSyncing(false);
    }, [dispatch]);

    // Safety redirect: If someone lands here without a token (and none in state)
    useEffect(() => {
        if (!isSyncing && !jwt) {
            console.log("[SetPassword] Unauthorized access attempt, redirecting to login");
            navigate('/login');
        }
    }, [isSyncing, jwt, navigate]);

    const handleSetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${baseURL}/api/auth/set-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({ password })
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Password set successfully! You can now login with email & password.");
                navigate('/profile', { replace: true });
            } else {
                toast.error(data.error || "Failed to set password");
            }
        } catch (error: any) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    if (isSyncing) {
        return <Loader isLoading={true} text="Synchronizing account..." />;
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#4CAF7D] selection:text-white">
            <Loader isLoading={loading || isSyncing} text="Securing your account..." />

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
                    {/* Header */}
                    <div className="text-center mb-10">
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center justify-center w-16 h-16 bg-[#4CAF7D] rounded-2xl shadow-xl mb-6 group mx-auto"
                        >
                            <ShieldCheck className="text-white w-8 h-8 group-hover:rotate-12 transition-transform" />
                        </motion.div>
                        <h1 className="text-4xl font-black tracking-tight mb-3">Secure Your Account</h1>
                        <p className="text-slate-500 font-medium">Hello {userData?.first_name || 'there'}! Set a password for local login.</p>
                    </div>
...

                    {/* Card */}
                    <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 relative">
                        <div className="absolute -top-4 -right-4 bg-slate-900 text-white p-2 rounded-xl shadow-lg rotate-12">
                             <Sparkles size={20} />
                        </div>

                        <form className="space-y-5" onSubmit={handleSetPassword}>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">New Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4CAF7D] transition-colors" size={20} />
                                    <input 
                                        required
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4CAF7D]/20 focus:border-[#4CAF7D] transition-all font-medium"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Confirm Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4CAF7D] transition-colors" size={20} />
                                    <input 
                                        required
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4CAF7D]/20 focus:border-[#4CAF7D] transition-all font-medium"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button 
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3 group"
                            >
                                Complete Setup <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </button>
                        </form>
                    </div>

                    <p className="text-center mt-8 text-slate-500 font-medium text-sm">
                        Prefer to do this later? <button onClick={() => navigate('/profile')} className="text-[#4CAF7D] font-black hover:underline underline-offset-4">Skip for now</button>
                    </p>
                </motion.div>
            </div>

            <footer className="py-10 text-center text-slate-400 text-xs font-bold tracking-widest uppercase">
                © 2026 Craftfolio — Security first
            </footer>
        </div>
    );
};

export default SetPasswordPage;
