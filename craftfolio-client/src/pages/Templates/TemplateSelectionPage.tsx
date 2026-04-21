import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronLeft, Sparkles, ArrowRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import type { RootState, AppDispatch } from '../../redux/store';
import { fetchTemplates } from '../../redux/features/templates/templateSlice';

const getProfessionName = (id: string) => {
  const names: Record<string, string> = {
    developer: 'Developer',
    designer: 'Designer',
    'content-creator': 'Content Creator',
    marketing: 'Marketing',
    photographer: 'Photographer',
    influencer: 'Influencer',
  };
  return names[id] || 'Professional';
};


const TemplateSelectionPage = () => {
  const { professionId } = useParams<{ professionId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt } = useSelector((state: RootState) => state.auth);
  const { templates: rawTemplates, loading, error } = useSelector((state: RootState) => state.templates);
  const templates = Array.isArray(rawTemplates) ? rawTemplates : [];

  const professionName = getProfessionName(professionId || '');
  // Match based on the slug returned by our DB Join
  const filteredTemplates = templates.filter((t) => {
    const slug = (t.profession_slug || '').trim().toLowerCase();
    return slug === professionId?.toLowerCase();
  });
  
  const handleUseTheme = (templateId: number) => {
     if (!jwt) {
       toast.info("Please sign up to start building your portfolio!", {
         description: "It only takes a minute to get started.",
         action: {
           label: "Sign Up",
           onClick: () => navigate('/register', { state: { from: location } })
         }
       });
       navigate('/register', { state: { from: location } });
       return;
     }
     navigate(`/builder/${templateId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Simplified Header */}
        <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-full">
             <button
              onClick={() => navigate('/select-profession')}
              className="flex items-center text-slate-400 hover:text-slate-900 transition-colors gap-2 group font-bold text-xs tracking-[0.2em] uppercase mb-8"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Change Craft
            </button>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6 leading-none">
              Explore Our <span className="text-[#4CAF7D]">{professionName}</span> Foundations.
            </h1>
            <p className="text-xl text-slate-500 font-medium">
              Carefully crafted designs ready to be personalized in minutes.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100 text-slate-500 text-xs font-black uppercase tracking-widest">
            <Sparkles size={14} className="text-[#4CAF7D]" />
            New Designs Every Week
          </div>
        </header>

        {/* Alternating Horizontal List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-32"
        >
          {loading ? (
            <div className="py-40 text-center">
               <div className="w-12 h-12 border-4 border-slate-100 border-t-[#4CAF7D] rounded-full animate-spin mx-auto mb-4"></div>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Fetching Designs...</p>
            </div>
          ) : error ? (
            <div className="py-40 text-center flex flex-col items-center">
               <p className="text-[#4CAF7D] font-black uppercase tracking-[0.3em] text-[10px] mb-4">Error Protocol</p>
               <h3 className="text-4xl font-black text-slate-900 mb-6 italic">Database Synchronization Error</h3>
               <p className="text-slate-500 font-medium mb-10 max-w-md">{error}</p>
               <button 
                onClick={() => dispatch(fetchTemplates())}
                className="px-10 py-4 bg-slate-900 text-white rounded-full font-black text-xs tracking-widest hover:bg-[#4CAF7D] transition-all"
               >
                 RETRY SYNC
               </button>
            </div>
          ) : filteredTemplates.length > 0 ? (
            filteredTemplates.map((template, index) => (
              <motion.div
                key={template.template_id}
                variants={itemVariants}
                className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${
                  index % 2 !== 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Image Side */}
                <div className="w-full md:w-3/5 group cursor-pointer" onClick={() => navigate(`/preview/${template.template_id}`)}>
                   <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-[#4CAF7D]/5">
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                      />
                      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-500 flex items-center justify-center">
                         <div className="bg-white text-slate-900 font-black text-xs tracking-widest px-8 py-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl">
                            VIEW DESIGN
                         </div>
                      </div>
                   </div>
                </div>

                {/* Info Side */}
                <div className="w-full md:w-2/5 flex flex-col gap-6">
                   <div className="flex items-center gap-3">
                      <div className="h-0.5 w-12 bg-[#4CAF7D]"></div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4CAF7D]">Foundation {String(index + 1).padStart(2, '0')}</span>
                   </div>
                   <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none group-hover:text-[#4CAF7D] transition-colors">{template.name}</h2>
                   <p className="text-lg text-slate-500 leading-relaxed font-medium">
                     {template.description}
                   </p>
                   <div className="flex items-center gap-8 mt-4">
                      <button
                        onClick={() => navigate(`/preview/${template.template_id}`)}
                        className="flex items-center gap-3 text-slate-900 font-black text-sm uppercase tracking-widest hover:text-[#4CAF7D] transition-colors group"
                      >
                         Live Preview <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={() => handleUseTheme(template.template_id)}
                        className="px-8 py-4 bg-slate-50 hover:bg-slate-100 text-slate-900 rounded-full font-black text-xs tracking-widest transition-all"
                      >
                         {jwt ? "USE THEME" : "START BUILDING"}
                      </button>
                   </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-40 text-center border-y border-slate-100 italic text-slate-300 text-2xl font-medium">
              We're polishing new designs for this craft. Check back in a few days!
            </div>
          )}
        </motion.div>
      </div>

      {/* Simple Footer for Selection Page */}
      <footer className="py-20 border-t border-slate-100 text-center">
         <p className="text-xs font-black text-slate-300 uppercase tracking-[0.5em]">Craftfolio Designer Editions</p>
      </footer>
    </div>
  );
};

export default TemplateSelectionPage;
