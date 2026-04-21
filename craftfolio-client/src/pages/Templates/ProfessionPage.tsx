import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Terminal, Palette, PenTool, Layout, Camera, Share2 } from 'lucide-react';

export interface Profession {
  id: string;
  name: string;
  description: string;
  icon: any;
}

const professions: Profession[] = [
  {
    id: 'developer',
    name: 'Developer',
    description: 'Showcase your code, projects, and technical skills.',
    icon: Terminal,
  },
  {
    id: 'designer',
    name: 'Designer',
    description: 'A visual-first layout for your portfolio and case studies.',
    icon: Palette,
  },
  {
    id: 'content-creator',
    name: 'Content Creator',
    description: 'Perfect for bloggers, vloggers, and social media influencers.',
    icon: PenTool,
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Optimized for campaigns, services, and growth stories.',
    icon: Layout,
  },
  {
    id: 'photographer',
    name: 'Photographer',
    description: 'High-resolution galleries optimized for visual impact.',
    icon: Camera,
  },
  {
    id: 'influencer',
    name: 'Influencer',
    description: 'Personal branding and social media integration.',
    icon: Share2,
  },
];

const ProfessionPage = () => {
  const navigate = useNavigate();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">

      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative">
        {/* Background Blobs (Softer for Light Mode) */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[#4CAF7D] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 z-10"
        >
          <span className="text-[#4CAF7D] font-bold tracking-widest uppercase text-xs mb-4 block">Get Started</span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 leading-tight">
            What's your <span className="text-[#4CAF7D]">Craft?</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto">
            Choose your profession to explore premium templates optimized for your specific career path.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full z-10"
        >
          {professions.map((prof) => {
            const Icon = prof.icon;
            return (
              <motion.div
                key={prof.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, translateY: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/templates/${prof.id}`)}
                className="group cursor-pointer"
              >
                <div className="h-full p-8 rounded-3xl border border-slate-200 bg-white hover:bg-slate-50/50 hover:border-[#4CAF7D]/30 transition-all duration-300 relative shadow-sm hover:shadow-xl hover:shadow-[#4CAF7D]/5">
                  <div className="relative flex flex-col items-start gap-5">
                    <div className="p-4 rounded-2xl bg-slate-50 group-hover:bg-[#4CAF7D]/10 transition-colors duration-300 text-slate-400 group-hover:text-[#4CAF7D]">
                      <Icon size={32} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-slate-800 group-hover:text-[#4CAF7D] transition-colors duration-300">
                        {prof.name}
                      </h3>
                      <p className="text-slate-500 leading-relaxed text-sm">
                        {prof.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center text-sm font-bold text-[#4CAF7D] opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                    Select <span className="ml-2">→</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfessionPage;
