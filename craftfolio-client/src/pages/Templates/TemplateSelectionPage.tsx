import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronLeft, Sparkles, ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { toast } from 'sonner';

export interface Template {
  id: string;
  name: string;
  professionId: string;
  thumbnail: string;
  description: string;
  template: string;
}

export const templates: Template[] = [
  {
    id: 'template-1',
    name: 'Minimalist Dev',
    professionId: 'developer',
    thumbnail: '/template1.png',
    description: 'A clean, typography-focused template for software engineers.',
    template: "template1",
  },
  {
    id: 'template-2',
    name: 'Dark Mode Portfolio',
    professionId: 'developer',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    description: 'Modern dark aesthetic with neon accents for tech-savvy users.',
    template: "template2"
  },
  {
    id: 'template-3',
    name: 'Visual Designer',
    professionId: 'designer',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
    description: 'Grid-based layout perfect for showcasing visual assets.',
    template: "template3"
  },
  {
    id: 'template-4',
    name: 'Creative Studio',
    professionId: 'designer',
    thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=800',
    description: 'Elegant and bold design for studios and creative freelancers.',
    template: "template4"
  },
  {
    id: 'template-5',
    name: 'Editorial Blog',
    professionId: 'content-creator',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
    description: 'Focuses on readability and storytelling for written content.',
    template: "template5"
  },
  {
    id: 'template-6',
    name: 'Insta-Style Grid',
    professionId: 'influencer',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
    description: 'Mobile-first layout optimized for social media links.',
    template: "template6"
  },
];

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
  const { jwt } = useSelector((state: RootState) => state.auth);
 
  const professionName = getProfessionName(professionId || '');
  const filteredTemplates = templates.filter((t) => t.professionId === professionId);
 
  const handleUseTheme = (templateId: string) => {
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
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                variants={itemVariants}
                className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${
                  index % 2 !== 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Image Side */}
                <div className="w-full md:w-3/5 group cursor-pointer" onClick={() => navigate(`/preview/${template.id}`)}>
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
                        onClick={() => navigate(`/preview/${template.id}`)}
                        className="flex items-center gap-3 text-slate-900 font-black text-sm uppercase tracking-widest hover:text-[#4CAF7D] transition-colors group"
                      >
                         Live Preview <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={() => handleUseTheme(template.id)}
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
