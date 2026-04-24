import { motion } from "motion/react";
import { iconMap } from "../utils/iconMap";
import { data } from "../data/data";
import { Code } from "lucide-react";
import type { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

export function Skills({ device }: { device?: 'desktop' | 'tablet' | 'mobile' }) {
  const isMobileView = device === 'mobile';

  const thisData = useSelector((state: RootState) => state.data.data) ?? data;

  if (!thisData?.sections?.skills) return null;

  const { skills } = thisData;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="skills" className="py-24 bg-[var(--color-bg-page)] relative border-t border-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-main)] mb-4 tracking-tight">
            Tech Stack & Expertise
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            Technologies and tools I use to design and build modern web applications.
          </p>
        </motion.div>

        {/* Top Area: Tech Grid */}
        <motion.div 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className={`grid ${isMobileView ? 'grid-cols-2 shadow-sm' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'} gap-4`}>
            {skills.items.map((tech: any, index: number) => {
              const Icon = iconMap[tech.icon];

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group bg-[var(--color-bg-section)] rounded-2xl border border-gray-200 p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-highlight)] hover:shadow-[0_4px_20px_rgba(76,175,125,0.15)] cursor-default"
                >
                  <div className="text-gray-400 group-hover:text-[var(--color-highlight)] transition-colors duration-300">
                    {Icon && <Icon size={32} strokeWidth={1.5} />}
                  </div>
                  <span className="text-sm font-medium text-[var(--color-text-main)] group-hover:text-[var(--color-highlight)] transition-colors duration-300">
                    {tech.name}
                  </span>
                </motion.div>
              )
            }
            )}
            </div>
            </motion.div>

        {/* Bottom Area: Expertise Cards */}
        <div className={`grid ${isMobileView ? 'grid-cols-1' : 'md:grid-cols-3'} gap-8`}>
          {skills.categories.map((category: any, index: number) => {
            const Icon = iconMap[category.icon];

            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-[var(--color-bg-section)] rounded-2xl border border-gray-200 shadow-sm hover:shadow-[0_8px_30px_rgba(76,175,125,0.1)] hover:-translate-y-1 transition-all duration-300 p-8 flex flex-col h-full group"
            >
              <div className="w-12 h-12 bg-[var(--color-bg-page)] border border-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:border-[var(--color-highlight)] transition-colors duration-300">
                {Icon && <Icon className="text-[var(--color-highlight)]" size={24} />}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-[var(--color-text-main)]">
                {category.title}
              </h3>
              
              <p className="text-sm text-[var(--color-text-muted)] mb-6 leading-relaxed grow">
                {category.description}
              </p>
              
              <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="flex items-start gap-2">
                  <Code size={16} className="text-[var(--color-highlight)] mt-0.5 shrink-0" />
                  <span className="text-sm font-medium text-[var(--color-text-main)] leading-relaxed">
                    {category.tech}
                  </span>
                </div>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}
