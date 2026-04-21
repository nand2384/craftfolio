import { motion } from 'framer-motion';

export default function AppLoader() {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-8"
      >
        <div className="relative">
          {/* Outer Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-[3px] border-slate-50 border-t-[#4CAF7D] rounded-full"
          />
          {/* Inner pulsating dot */}
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.div 
               animate={{ scale: [1, 1.2, 1] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="w-8 h-8 bg-[#4CAF7D] rounded-2xl flex items-center justify-center shadow-lg shadow-[#4CAF7D]/20 text-white"
             >
                <div className="w-3 h-3 bg-white/20 rounded-full animate-ping"></div>
             </motion.div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-xs font-black tracking-[0.5em] text-slate-900 uppercase mb-3">Craftfolio</h2>
          <div className="flex items-center gap-2">
             <motion.div 
               animate={{ width: ["0%", "100%", "0%"] }}
               transition={{ duration: 3, repeat: Infinity }}
               className="h-0.5 w-12 bg-[#4CAF7D] origin-left"
             />
             <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest whitespace-nowrap">
               Assembling Experiences
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
