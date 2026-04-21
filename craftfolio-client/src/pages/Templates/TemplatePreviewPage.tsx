import { motion } from 'framer-motion';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronLeft, Monitor, Smartphone, Tablet, CheckCircle, ArrowRight } from 'lucide-react';
import { templates } from './TemplateSelectionPage';
import { useState, Suspense } from 'react';
import { templateMap } from '../../utils/templateRegistry';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { toast } from 'sonner';

const TemplatePreviewPage = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { jwt } = useSelector((state: RootState) => state.auth);
  const [view, setView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleStartBuilding = () => {
    if (!jwt) {
      toast.info("Please sign up to start building your portfolio!", {
        description: "Your creative journey starts with a simple account.",
        action: {
          label: "Register",
          onClick: () => navigate('/register', { state: { from: location } })
        }
      });
      navigate('/login', { state: { from: location } });
      return;
    }
    if (templateData) navigate(`/builder/${templateData.id}`);
  };

  const templateData = templates.find((t) => t.id === templateId);
  // The identifier in templateData.template should match the folder name in src/templates/
  const SelectedTemplate = templateData ? templateMap[templateData.template] : null;

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
      <nav className="h-20 border-b border-slate-200 bg-white flex items-center justify-between px-8 sticky top-0 z-5 shadow-sm">
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

        {/* Viewport Toggles (Light Style) */}
        <div className="hidden lg:flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 gap-1">
          <button
            onClick={() => setView('desktop')}
            className={`p-2.5 rounded-xl transition-all ${view === 'desktop' ? 'bg-white text-[#4CAF7D] shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`}
          >
            <Monitor size={20} />
          </button>
          <button
            onClick={() => setView('tablet')}
            className={`p-2.5 rounded-xl transition-all ${view === 'tablet' ? 'bg-white text-[#4CAF7D] shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`}
          >
            <Tablet size={20} />
          </button>
          <button
            onClick={() => setView('mobile')}
            className={`p-2.5 rounded-xl transition-all ${view === 'mobile' ? 'bg-white text-[#4CAF7D] shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`}
          >
            <Smartphone size={20} />
          </button>
        </div>

        <div className="flex items-center gap-6">
           <div className="hidden xl:block text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selected Style</p>
              <p className="text-sm font-black text-slate-700">Modern Minimalist</p>
           </div>
          <button
            onClick={handleStartBuilding}
            className="flex items-center gap-2 px-8 py-3 bg-[#4CAF7D] hover:bg-[#3d8b63] text-white rounded-full font-black text-sm transition-all shadow-lg shadow-[#4CAF7D]/20 group"
          >
            <span>{jwt ? "START BUILDING" : "SIGN IN TO BUILD"}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Main Preview Area with Suspense for Lazy Loading */}
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

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default TemplatePreviewPage;
