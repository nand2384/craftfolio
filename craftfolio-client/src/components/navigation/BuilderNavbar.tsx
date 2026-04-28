import { Code2, RotateCcw, ChevronLeft, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTemplate, updateCraftName, saveCraft } from '../../redux/features/preview/dataSlice';
import type { RootState, AppDispatch } from '../../redux/store';
import { templateDataMap } from '../../utils/templateDataRegistry';
import { toast } from 'sonner';
import { useState } from 'react';

export default function BuilderNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isSaving, setIsSaving] = useState(false);
  
  const { templateId } = useParams<{ templateId: string }>();
  const { craftName, templateId: currentTemplateId } = useSelector((state: RootState) => state.data);

  const handleReset = () => {
    // Determine which template to reset based on the URL or the current state
    const targetId = templateId || currentTemplateId;
    const defaultData = templateDataMap[targetId];
    
    if (defaultData) {
      dispatch(setTemplate({ 
        templateId: targetId, 
        data: JSON.parse(JSON.stringify(defaultData.data)), // Deep copy to prevent reference issues
        links: JSON.parse(JSON.stringify(defaultData.links)) 
      }));
      toast.success("Template data reset to default");
    } else {
      toast.error("Default data not found for this template");
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await dispatch(saveCraft()).unwrap();
      setIsSaving(false);
      toast.success("Draft updated");
    } catch (error) {
      setIsSaving(false);
      toast.error("Failed to update draft");
    }
  };

  return (
    <header className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-white shrink-0 z-50 font-sans shadow-sm">
      <div className="flex items-center gap-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 p-2 px-3 hover:bg-slate-50 rounded-xl transition-all group border border-slate-100"
        >
          <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:-translate-x-0.5 transition-all" />
          <span className="text-xs font-black text-slate-500 group-hover:text-slate-900 tracking-widest">BACK</span>
        </button>

        <div className="h-6 w-px bg-slate-100"></div>

        {/* Craft Name Editor */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-md">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col -gap-1">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-tight">Project Name</span>
             <input 
                type="text" 
                value={craftName ?? ''}
                onChange={(e) => dispatch(updateCraftName(e.target.value))}
                className="bg-transparent border-none p-0 m-0 text-sm font-black text-slate-900 focus:ring-0 outline-none w-48 placeholder-slate-300"
                placeholder="Untitled draft"
             />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Save Draft Button */}
        <button 
          className="h-10 px-4 rounded-xl text-xs font-black flex items-center gap-2 text-slate-500 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all active:scale-95 tracking-widest disabled:opacity-50"
          onClick={handleSave}
          disabled={isSaving}
        >
          <Save className={`w-3.5 h-3.5 ${isSaving ? 'animate-pulse text-black' : ''}`} />
          {isSaving ? 'SAVING...' : 'SAVE DRAFT'}
        </button>

        <button className="h-10 px-4 rounded-xl text-xs font-black flex items-center gap-2 text-slate-500 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all active:scale-95 tracking-widest"
          onClick={handleReset}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          RESET
        </button>
        
        <button 
          onClick={() => navigate(`/final-preview/${templateId}`)}
          className="h-10 px-6 rounded-xl text-xs font-black flex items-center gap-2 bg-[#4CAF7D] text-white hover:bg-[#3d8b63] shadow-lg shadow-[#4CAF7D]/20 transition-all active:scale-95 tracking-widest"
        >
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          REVIEW CHANGES
        </button>
      </div>
    </header>
  );
}
