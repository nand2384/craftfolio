import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Monitor, Smartphone, Tablet, Download } from 'lucide-react';
import { useState, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { fetchTemplates } from '../../redux/features/templates/templateSlice';
import { templateMap } from '../../utils/templateRegistry';

const PostBuilderPreviewPage = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { templates } = useSelector((state: RootState) => state.templates);
  const [view, setView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    if (templates.length === 0) {
      dispatch(fetchTemplates());
    }
  }, [dispatch, templates.length]);

  const templateData = templates.find((t) => String(t.template_id) === String(templateId));
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
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans relative overflow-x-hidden">
      {/* Floating Minimalist Control Island */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 p-2 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] group/island">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all"
          title="Back to Editor"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="w-px h-6 bg-slate-200 mx-1"></div>

        {/* Device Toggles */}
        <div className="flex items-center gap-1">
          {(['desktop', 'tablet', 'mobile'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`p-3 rounded-2xl transition-all ${view === v ? 'bg-[#4CAF7D] text-white shadow-lg shadow-[#4CAF7D]/20' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
              title={v.charAt(0).toUpperCase() + v.slice(1)}
            >
              {v === 'desktop' && <Monitor size={20} />}
              {v === 'tablet' && <Tablet size={20} />}
              {v === 'mobile' && <Smartphone size={20} />}
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-slate-200 mx-1"></div>

        {/* Action Button */}
        <button
          onClick={() => alert('Exporting Optimized React 19 Source Code...')}
          className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs transition-all hover:bg-slate-800 shadow-xl shadow-black/10 tracking-widest active:scale-95 group/btn"
        >
          <Download size={16} className="group-hover/btn:translate-y-0.5 transition-transform" />
          EXPORT REACT CODE
        </button>
      </div>

      {/* Main Full-Page Preview Area */}
      <main className="flex-1 bg-slate-100/50 flex justify-center items-start pt-32 pb-16 px-4 md:px-8">
        <motion.div
           layout
           className={`${viewWidths[view]} bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-slate-200 overflow-hidden min-h-[calc(100vh-160px)] transition-all duration-500 ease-in-out relative group flex flex-col`}
        >
          <Suspense fallback={
            <div className="flex-1 flex flex-col items-center justify-center bg-white space-y-4 min-h-[500px]">
               <div className="w-12 h-12 border-4 border-slate-100 border-t-[#4CAF7D] rounded-full animate-spin"></div>
               <p className="text-xs font-black tracking-widest text-slate-400 animate-pulse uppercase">Finalizing Preview...</p>
            </div>
          }>
            <SelectedTemplate device={view} />
          </Suspense>
        </motion.div>
      </main>

      {/* Styled scrollbar for the minimalist view */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
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

export default PostBuilderPreviewPage;
