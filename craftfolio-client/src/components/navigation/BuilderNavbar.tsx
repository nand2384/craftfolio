import { Code2, RotateCcw, ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function BuilderNavbar() {
  const navigate = useNavigate();
  const { templateId } = useParams<{ templateId: string }>();

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

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-md">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-sm tracking-tight text-slate-900">Craftfolio <span className="text-slate-400 font-medium">Builder</span></span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="h-10 px-4 rounded-xl text-xs font-black flex items-center gap-2 text-slate-500 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all active:scale-95 tracking-widest">
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
