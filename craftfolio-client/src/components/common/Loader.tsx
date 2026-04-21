import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  isLoading: boolean;
  text?: string;
}

const Loader = ({ isLoading, text = "Processing..." }: LoaderProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md"
        >
          <div className="relative">
            {/* Main Spinner Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-16 h-16 border-4 border-slate-100 border-t-[#4CAF7D] rounded-full shadow-lg"
            />
            
            {/* Center Pulsing Dot */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#4CAF7D] rounded-full shadow-xl shadow-[#4CAF7D]/40"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex flex-col items-center"
          >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-800 animate-pulse">
              {text}
            </p>
            <div className="flex gap-1 mt-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                  className="w-1 h-1 bg-[#4CAF7D] rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
