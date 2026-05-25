import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronLeft, Monitor, Smartphone, Tablet, CheckCircle, ArrowRight, Clock, Plus, X } from 'lucide-react';
import { useState, Suspense, useEffect } from 'react';
import { templateMap } from '../../utils/templateRegistry';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { fetchTemplates } from '../../redux/features/templates/templateSlice';
import { fetchUserCrafts, setTemplate } from '../../redux/features/preview/dataSlice';
import { toast } from 'sonner';
import { templateDataMap } from '../../utils/templateDataRegistry';

const TemplatePreviewPage = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  
  const { jwt } = useSelector((state: RootState) => state.auth);
  const { templates } = useSelector((state: RootState) => state.templates);
  const { userCrafts } = useSelector((state: RootState) => state.data);
  
  const [view, setView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showDraftModal, setShowDraftModal] = useState(false);

  useEffect(() => {
    if (templates.length === 0) {
      dispatch(fetchTemplates());
    }
    if (jwt && userCrafts.length === 0) {
      dispatch(fetchUserCrafts());
    }
  }, [dispatch, templates.length, jwt, userCrafts.length]);

  const templateData = templates.find((t) => String(t.template_id) === String(templateId));
  const existingCraft = userCrafts.find(c => String(c.template_id) === String(templateId));

  const handleStartBuilding = () => {
    if (!jwt) {
      toast.info("Please sign up to start building your portfolio!");
      navigate('/login', { state: { from: location } });
      return;
    }

    if (existingCraft) {
      setShowDraftModal(true);
    } else {
      startFresh();
    }
  };

  const startFresh = () => {
    if (templateData) {
      const defaultData = templateDataMap[templateData.blueprint_key];
      dispatch(setTemplate({
        templateId: templateData.template_id,
        craftId: null,
        craftName: templateData.name,
        data: defaultData?.data || {},
        links: defaultData?.links || {}
      }));
      navigate(`/builder/${templateData.template_id}`);
    }
  };

  const resumeDraft = () => {
    if (existingCraft && templateData) {
      dispatch(setTemplate({
        templateId: templateData.template_id,
        craftId: existingCraft.craft_id,
        craftName: existingCraft.craft_name,
        data: existingCraft.data,
        links: existingCraft.links
      }));
      navigate(`/builder/${templateData.template_id}`);
    }
  };

  const SelectedTemplate = templateData ? templateMap[templateData.blueprint_key] : null;

  if (!templateData || !SelectedTemplate) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-center font-sans">
        <p className="text-xl font-bold mb-4">Template not found.</p>
        <button onClick={() => navigate('/')} className="text-[#4CAF7D] font-bold">Return Home</button>
      </div>
    );
  }

  const viewWidths = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]',
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      {/* Light Preview Navbar */}
      <nav className="h-20 border-b border-slate-200 bg-white flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-black text-xs tracking-widest"
          >
            <ChevronLeft size={18} />
            BACK
          </button>
          
          <div className="h-8 w-px bg-slate-200"></div>

          <div className="flex flex-col">
            <h2 className="text-lg font-black tracking-tight text-slate-900">{templateData.name}</h2>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <CheckCircle size={10} className="text-[#4CAF7D]" />
              Premium Design
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 gap-1">
          {['desktop', 'tablet', 'mobile'].map((v: any) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`p-2.5 rounded-xl transition-all ${view === v ? 'bg-white text-[#4CAF7D] shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`}
            >
              {v === 'desktop' && <Monitor size={20} />}
              {v === 'tablet' && <Tablet size={20} />}
              {v === 'mobile' && <Smartphone size={20} />}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={handleStartBuilding}
            className="flex items-center gap-2 px-8 py-3 bg-[#4CAF7D] hover:bg-[#3d8b63] text-white rounded-full font-black text-sm transition-all shadow-lg shadow-[#4CAF7D]/20 group"
          >
            <span>{jwt ? "START BUILDING" : "SIGN IN TO BUILD"}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      <main className="flex-1 bg-slate-100/50 p-6 md:p-12 flex justify-center items-start">
        <motion.div
           layout
           className={`${viewWidths[view]} bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-200 overflow-hidden min-h-[calc(100vh-160px)] transition-all duration-500 ease-in-out relative group flex flex-col`}
        >
          <Suspense fallback={
            <div className="flex-1 flex flex-col items-center justify-center bg-white space-y-4">
               <div className="w-12 h-12 border-4 border-slate-100 border-t-[#4CAF7D] rounded-full animate-spin"></div>
               <p className="text-xs font-black tracking-widest text-slate-400 animate-pulse uppercase">Assembling Foundation...</p>
            </div>
          }>
            <SelectedTemplate device={view} />
          </Suspense>
        </motion.div>
      </main>

      {/* Draft Selection Modal */}
      <AnimatePresence>
        {showDraftModal && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDraftModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-[#4CAF7D]/10 rounded-2xl flex items-center justify-center">
                    <Clock className="text-[#4CAF7D]" size={24} />
                  </div>
                  <button 
                    onClick={() => setShowDraftModal(false)}
                    className="p-2 hover:bg-slate-50 rounded-xl transition-colors"
                  >
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <h3 className="text-2xl font-black mb-2 tracking-tight">Draft Detected</h3>
                <p className="text-slate-500 font-medium mb-8">
                  You already have a saved draft for <span className="text-slate-900 font-bold">"{existingCraft?.craft_name}"</span>. How would you like to proceed?
                </p>

                <div className="space-y-4">
                  <button
                    onClick={resumeDraft}
                    className="w-full flex items-center justify-between p-6 bg-slate-900 text-white rounded-3xl hover:bg-slate-800 transition-all group"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <ArrowRight size={20} className="text-[#4CAF7D]" />
                      </div>
                      <div>
                        <p className="font-black text-sm uppercase tracking-widest">Resume Project</p>
                        <p className="text-white/50 text-xs font-medium">Continue from where you left off</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={startFresh}
                    className="w-full flex items-center justify-between p-6 bg-white border-2 border-slate-100 text-slate-900 rounded-3xl hover:border-[#4CAF7D]/30 transition-all group"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                        <Plus size={20} className="text-slate-400" />
                      </div>
                      <div>
                        <p className="font-black text-sm uppercase tracking-widest text-slate-900">Start Fresh</p>
                        <p className="text-slate-400 text-xs font-medium">Create a brand new portfolio</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="px-8 py-4 bg-slate-50 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Your drafts are automatically saved to your profile
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default TemplatePreviewPage;
