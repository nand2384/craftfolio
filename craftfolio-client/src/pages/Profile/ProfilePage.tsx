import { motion } from 'framer-motion';
import { 
  User, Settings, Layout, ArrowUpRight, 
  Search, Bell, Plus, LogOut, 
  ExternalLink, MoreVertical, Trash2, Edit3,
  Calendar, Mail
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { removeAuthData } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(removeAuthData());
    toast.success("Logged out successfully");
    navigate('/');
  };

  const projects = [
    { 
      id: 1, 
      name: "Portfolio 2026", 
      status: "Published", 
      views: "1.2k", 
      lastEdited: "2 hours ago",
      previewColor: "bg-blue-500"
    },
    { 
      id: 2, 
      name: "Digital Nomad Hub", 
      status: "Draft", 
      views: "0", 
      lastEdited: "Yesterday",
      previewColor: "bg-[#4CAF7D]"
    },
    { 
      id: 3, 
      name: "Minimalist Blog", 
      status: "Published", 
      views: "450", 
      lastEdited: "3 days ago",
      previewColor: "bg-orange-400"
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#4CAF7D] selection:text-white">

      <main className="max-w-7xl mx-auto pt-12 pb-20 px-6 sm:px-8">
        
        {/* Profile Header (Bento Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          
          {/* Main Profile Card */}
          <motion.div 
            custom={0} variants={fadeIn} initial="hidden" animate="visible"
            className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start"
          >
             <div className="relative group">
                <div className="w-32 h-32 rounded-3xl bg-slate-100 flex items-center justify-center overflow-hidden border-4 border-slate-50 group-hover:border-[#4CAF7D]/20 transition-all duration-500">
                   {/* User Avatar */}
                   {userData?.avatar_url ? (
                     <img 
                       src={userData.avatar_url} 
                       alt={`${userData.first_name}'s avatar`}
                       className="w-full h-full object-cover"
                     />
                   ) : (
                     <User size={64} className="text-slate-300" />
                   )}
                </div>
                <button className="absolute -bottom-2 -right-2 p-3 bg-slate-900 text-white rounded-2xl shadow-lg hover:scale-110 transition-transform">
                   <Edit3 size={16} />
                </button>
             </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                   <h1 className="text-4xl font-black tracking-tight">{userData.first_name} {userData.last_name || ''}</h1>
                   <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black tracking-widest uppercase w-fit mx-auto md:mx-0">User</span>
                </div>
                <p className="text-slate-500 font-medium mb-6 leading-relaxed max-w-xl">
                   Manage your creative portfolio and showcase your crafts to the world.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <Mail size={14} /> {userData.email}
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <Calendar size={14} /> Joined {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Quick Stats Card */}
          <motion.div 
            custom={1} variants={fadeIn} initial="hidden" animate="visible"
            className="lg:col-span-4 grid grid-cols-2 gap-4"
          >
             <div className="bg-slate-900 rounded-[2rem] p-6 text-white flex flex-col justify-between group cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="flex justify-between items-start">
                   <Layout size={20} className="text-[#4CAF7D]" />
                   <ArrowUpRight size={16} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                   <p className="text-3xl font-black mb-1">03</p>
                   <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Active Folios</p>
                </div>
             </div>
             <div className="bg-white border border-slate-100 rounded-[2rem] p-6 flex flex-col justify-between group cursor-pointer hover:border-[#4CAF7D]/30 transition-all">
                <div className="flex justify-between items-start">
                   <User size={20} className="text-slate-300" />
                   <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                   <p className="text-3xl font-black mb-1">1.8k</p>
                   <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Views</p>
                </div>
             </div>
             <div className="col-span-2 bg-[#4CAF7D] rounded-[2rem] p-6 text-white flex items-center justify-between group overflow-hidden relative">
                <div className="relative z-10">
                   <p className="text-lg font-black mb-1 leading-tight">Upgrade to Pro</p>
                   <p className="text-white/70 text-xs font-medium">Unlock Unlimited Exports</p>
                </div>
                <button className="relative z-10 bg-white text-[#4CAF7D] p-3 rounded-2xl shadow-lg hover:scale-110 transition-transform">
                   <Plus size={20} />
                </button>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
             </div>
          </motion.div>
        </div>

        {/* Dashboard Content */}
        <div className="flex flex-col lg:flex-row gap-10">
           
           {/* Sidebar Navigation */}
           <div className="lg:w-64 space-y-2">
               {[
                 { label: 'My Projects', icon: Layout, active: true, onClick: () => {} },
                 { label: 'Settings', icon: Settings, active: false, onClick: () => {} },
                 { label: 'Notifications', icon: Bell, active: false, onClick: () => {} },
                 { label: 'Sign Out', icon: LogOut, active: false, danger: true, onClick: handleLogout },
               ].map((item) => (
                  <button 
                   key={item.label}
                   onClick={item.onClick}
                   className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all ${
                     item.active 
                     ? 'bg-white shadow-sm border border-slate-100 text-[#4CAF7D]' 
                     : item.danger ? 'text-rose-500 hover:bg-rose-50' : 'text-slate-500 hover:bg-slate-100'
                   }`}
                  >
                     <item.icon size={18} />
                     {item.label}
                  </button>
               ))}
           </div>

           {/* Content Area */}
           <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-2xl font-black">My Projects</h2>
                 <div className="flex gap-4">
                    <div className="relative hidden sm:block">
                       <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input 
                        type="text" 
                        placeholder="Search projects..." 
                        className="pl-10 pr-4 py-2 bg-white border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF7D]/20 w-64"
                       />
                    </div>
                    <button className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2">
                       <Plus size={16} /> New <span className="hidden sm:inline">Project</span>
                    </button>
                 </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {projects.map((p, i) => (
                    <motion.div 
                      key={p.id}
                      custom={i + 2} variants={fadeIn} initial="hidden" animate="visible"
                      className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-[#4CAF7D]/5 transition-all group"
                    >
                       <div className={`w-full aspect-[16/9] ${p.previewColor} rounded-[1.5rem] mb-6 relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                             <button className="bg-white p-4 rounded-2xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all shadow-xl">
                                <ExternalLink size={20} className="text-slate-900" />
                             </button>
                          </div>
                          {p.status === 'Published' && (
                             <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                                Live
                             </div>
                          )}
                       </div>
                       
                       <div className="flex items-start justify-between">
                          <div>
                             <h3 className="text-lg font-black mb-1">{p.name}</h3>
                             <p className="text-slate-400 text-xs font-medium">Last edited {p.lastEdited}</p>
                          </div>
                          <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                             <MoreVertical size={20} />
                          </button>
                       </div>

                       <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                          <div className="flex gap-4">
                             <div className="text-center">
                                <p className="text-xs font-black">{p.views}</p>
                                <p className="text-[10px] font-bold text-slate-300 uppercase">Views</p>
                             </div>
                             <div className="w-[1px] h-6 bg-slate-100"></div>
                             <div className="text-center">
                                <p className="text-xs font-black">{p.status}</p>
                                <p className="text-[10px] font-bold text-slate-300 uppercase">Status</p>
                             </div>
                          </div>
                          <div className="flex gap-2">
                             <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                                <Trash2 size={16} />
                             </button>
                             <button className="bg-slate-50 text-slate-900 px-4 py-2 rounded-xl font-bold text-xs hover:bg-slate-100 transition-colors">
                                Edit Folio
                             </button>
                          </div>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
