import { useState, Suspense, useEffect } from 'react';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { templateMap } from '../../utils/templateRegistry';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { fetchTemplates } from '../../redux/features/templates/templateSlice';
import { templateDataMap } from '../../utils/templateDataRegistry';
import { setTemplate } from '../../redux/features/preview/dataSlice';

interface PreviewCanvasProps {
  templateId?: string;
}

export default function PreviewCanvas({ templateId }: PreviewCanvasProps) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const dispatch = useDispatch<AppDispatch>();
  const { templates } = useSelector((state: RootState) => state.templates);
  const currentReduxTemplateId = useSelector((state: RootState) => state.data.templateId);

  
  useEffect(() => {
    if (templates.length === 0) {
      dispatch(fetchTemplates());
    }
  }, [dispatch, templates.length]);
  
  const templateData = templates.find(t => String(t.template_id) === String(templateId));
  const SelectedTemplate = templateData ? templateMap[templateData.blueprint_key] : null;
  
  useEffect(() => {
    if (templateData && !currentReduxTemplateId) {
      const defaultData = templateDataMap[templateData.blueprint_key];

      if(defaultData) {
        dispatch(setTemplate({
          templateId: templateData.template_id,
          data: defaultData.data,
          links: defaultData.links
        }));
      }
    }
  }, [templateData, currentReduxTemplateId, dispatch])
 
  const getWidth = () => {
    switch (device) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };
  
  const getHeight = () => {
    switch (device) {
      case 'mobile': return '667px';
      case 'tablet': return '1024px';
      default: return '100%';
    }
  };

  return (
    <div className="h-full bg-[#f8f9fa] flex flex-col pt-0 relative overflow-hidden group/canvas">
      {/* Floating Device Switcher */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
        <div className="bg-white/80 backdrop-blur-md p-1 rounded-[18px] border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-1 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
          <button 
            onClick={() => setDevice('desktop')}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${device === 'desktop' ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            <Monitor className="w-4.5 h-4.5" />
          </button>
          <button 
            onClick={() => setDevice('tablet')}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${device === 'tablet' ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            <Tablet className="w-4.5 h-4.5" />
          </button>
          <button 
            onClick={() => setDevice('mobile')}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${device === 'mobile' ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            <Smartphone className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center overflow-auto custom-scrollbar pt-6 pb-20 scroll-smooth">
        <motion.div 
          animate={{ width: getWidth(), minHeight: device === 'desktop' ? '100%' : getHeight() }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.04)] overflow-hidden origin-top mb-10 flex flex-col"
        >
          <Suspense fallback={
            <div className="flex-1 flex flex-col items-center justify-center bg-white min-h-[400px]">
               <div className="w-10 h-10 border-4 border-slate-100 border-t-black rounded-full animate-spin"></div>
            </div>
          }>
            {SelectedTemplate ? (
              <SelectedTemplate device={device} />
            ) : (
              <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                Canvas Not Ready
              </div>
            )}
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
}
