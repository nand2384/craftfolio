import { motion } from 'framer-motion';
import { 
  User, Settings, Layout, ArrowUpRight, 
  Search, Bell, Plus, LogOut, 
  ExternalLink, MoreVertical, Trash2, Edit3,
  Calendar, Mail, Loader2, Clock
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { removeAuthData } from '../../redux/features/auth/authSlice';
import { fetchUserCrafts, setTemplate } from '../../redux/features/preview/dataSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useEffect } from 'react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.auth);
  const { userCrafts, loadingCrafts } = useSelector((state: RootState) => state.data);
  const { templates } = useSelector((state: RootState) => state.templates);

  useEffect(() => {
    dispatch(fetchUserCrafts());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(removeAuthData());
    toast.success("Logged out successfully");
    navigate('/');
  };

  const handleEditCraft = (craft: any) => {
    // Find the blueprint key for this template
    const template = templates.find(t => t.template_id === craft.template_id);
    if (template) {
      // Set the template data in Redux
      dispatch(setTemplate({
        templateId: template.blueprint_key,
        craftId: craft.craft_id,
        craftName: craft.craft_name,
        data: craft.data,
        links: craft.links
      }));
      // Navigate to builder
      navigate(`/builder/${template.blueprint_key}`);
    } else {
      toast.error("Template definition not found");
    }
  };

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
        
        {/* Profile Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <motion.div 
            custom={0} variants={fadeIn} initial="hidden" animate="visible"
            className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start"
          >
             <div className="relative group">
                <div className="w-32 h-32 rounded-3xl bg-slate-100 flex items-center justify-center overflow-hidden border-4 border-slate-50 group-hover:border-[#4CAF7D]/20 transition-all duration-500">
                   {userData?.avatar_url ? (
                     <img src={userData.avatar_url} alt="avatar" className="w-full h-full object-cover" />
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
                   <h1 className="text-4xl font-black tracking-tight">{userData?.first_name} {userData?.last_name || ''}</h1>
                   <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black tracking-widest uppercase w-fit mx-auto md:mx-0">User</span>
                </div>
                <p className="text-slate-500 font-medium mb-6 leading-relaxed max-w-xl">
                   Manage your creative portfolio and showcase your crafts to the world.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <Mail size={14} /> {userData?.email}
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <Calendar size={14} /> Joined {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div custom={1} variants={fadeIn} initial="hidden" animate="visible" className="lg:col-span-4 grid grid-cols-2 gap-4">
             <div className="bg-slate-900 rounded-4xl p-6 text-white flex flex-col justify-between group cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="flex justify-between items-start">
                   <Layout size={20} className="text-[#4CAF7D]" />
                   <ArrowUpRight size={16} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                   <p className="text-3xl font-black mb-1">{userCrafts?.length || 0}</p>
                   <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Active Crafts</p>
                </div>
             </div>
             <div className="bg-white border border-slate-100 rounded-4xl p-6 flex flex-col justify-between group cursor-pointer hover:border-[#4CAF7D]/30 transition-all">
                <div className="flex justify-between items-start">
                   <User size={20} className="text-slate-300" />
                   <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                   <p className="text-3xl font-black mb-1">0</p>
                   <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Views</p>
                </div>
             </div>
             <div className="col-span-2 bg-[#4CAF7D] rounded-4xl p-6 text-white flex items-center justify-between group overflow-hidden relative">
                <div className="relative z-10">
                   <p className="text-lg font-black mb-1 leading-tight">Create New Craft</p>
                   <p className="text-white/70 text-xs font-medium">Start building with a fresh template</p>
                </div>
                <button 
                  onClick={() => navigate('/select-profession')}
                  className="relative z-10 bg-white text-[#4CAF7D] p-3 rounded-2xl shadow-lg hover:scale-110 transition-transform"
                >
                   <Plus size={20} />
                </button>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
             </div>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
           {/* Sidebar */}
           <div className="lg:w-64 space-y-2">
               {[
                 { label: 'My Crafts', icon: Layout, active: true, onClick: () => {} },
                 { label: 'Settings', icon: Settings, active: false, onClick: () => {} },
                 { label: 'Notifications', icon: Bell, active: false, onClick: () => {} },
                 { label: 'Sign Out', icon: LogOut, active: false, danger: true, onClick: handleLogout },
               ].map((item) => (
                  <button 
                   key={item.label} onClick={item.onClick}
                   className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all ${
                     item.active ? 'bg-white shadow-sm border border-slate-100 text-[#4CAF7D]' : item.danger ? 'text-rose-500 hover:bg-rose-50' : 'text-slate-500 hover:bg-slate-100'
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
                 <h2 className="text-2xl font-black">Saved Drafts</h2>
                 <button 
                  onClick={() => navigate('/select-profession')}
                  className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
                 >
                    <Plus size={16} /> New <span className="hidden sm:inline">Craft</span>
                 </button>
              </div>

              {loadingCrafts ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-slate-100 border-dashed">
                  <Loader2 className="w-10 h-10 text-[#4CAF7D] animate-spin mb-4" />
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading your crafts...</p>
                </div>
              ) : userCrafts?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userCrafts.map((craft, i) => (
                    <motion.div 
                      key={craft.craft_id}
                      custom={i + 2} variants={fadeIn} initial="hidden" animate="visible"
                      className="bg-white border border-slate-100 rounded-4xl p-6 shadow-sm hover:shadow-xl hover:shadow-[#4CAF7D]/5 transition-all group flex flex-col h-full"
                    >
                       <div className="w-full aspect-video bg-slate-50 rounded-3xl mb-6 relative overflow-hidden border border-slate-100">
                          {craft.template_thumbnail ? (
                             <img src={craft.template_thumbnail} alt="preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center"><Layout className="text-slate-200" size={48} /></div>
                          )}
                          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all flex items-center justify-center">
                             <button 
                              onClick={() => handleEditCraft(craft)}
                              className="bg-white px-6 py-3 rounded-2xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all shadow-xl font-black text-xs text-slate-900 flex items-center gap-2"
                             >
                                <Edit3 size={16} /> CONTINUE EDITING
                             </button>
                          </div>
                          <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-sm">
                             {craft.template_name}
                          </div>
                       </div>
                       
                       <div className="flex items-start justify-between mb-4">
                          <div className="flex-1 min-w-0 pr-4">
                             <h3 className="text-lg font-black mb-1 truncate">{craft.craft_name}</h3>
                             <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                                <Clock size={12} />
                                <span>Edited {new Date(craft.updated_at).toLocaleDateString()}</span>
                             </div>
                          </div>
                          <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                             <MoreVertical size={20} />
                          </button>
                       </div>

                       <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Draft</span>
                          </div>
                          <div className="flex gap-2">
                             <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                                <Trash2 size={16} />
                             </button>
                             <button 
                               onClick={() => handleEditCraft(craft)}
                               className="bg-[#4CAF7D]/10 text-[#4CAF7D] px-4 py-2 rounded-xl font-bold text-xs hover:bg-[#4CAF7D] hover:text-white transition-all"
                             >
                                Edit Craft
                             </button>
                          </div>
                       </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-slate-100 border-dashed">
                  <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 text-slate-200">
                    <Layout size={40} />
                  </div>
                  <h3 className="text-xl font-black mb-2">No Crafts Found</h3>
                  <p className="text-slate-400 text-sm font-medium mb-8 text-center max-w-xs">
                    You haven't saved any portfolio drafts yet. Start building your first one!
                  </p>
                  <button 
                    onClick={() => navigate('/select-profession')}
                    className="bg-[#4CAF7D] text-white px-8 py-3 rounded-2xl font-black text-sm shadow-lg shadow-[#4CAF7D]/20 hover:scale-105 transition-all"
                  >
                    Start Building
                  </button>
                </div>
              )}
           </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
