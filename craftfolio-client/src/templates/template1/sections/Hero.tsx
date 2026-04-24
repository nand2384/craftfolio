import { ArrowRight, FileText } from "lucide-react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { data } from "../data/data";
import { iconMap } from "../utils/iconMap";
import { getResolvedLink } from "../utils/resolveLinks";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

export function Hero({ device }: { device?: 'desktop' | 'tablet' | 'mobile' }) {
  const isMobileView = device === 'mobile';
  const isTabletView = device === 'tablet';
  const isSmallDevice = isMobileView || isTabletView;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  const thisData = useSelector((state: RootState) => state.data.data) ?? data;

  if (!thisData?.sections?.hero) return null;

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative bg-[var(--color-bg-soft)]/20 overflow-hidden"
    >
      <motion.div
        className={`max-w-4xl mx-auto px-6 lg:px-8 ${isSmallDevice ? 'py-20' : 'py-32'} relative z-10 text-center flex flex-col items-center`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className={`${isMobileView ? 'text-4xl' : (isTabletView ? 'text-5xl' : 'text-5xl md:text-6xl lg:text-7xl')} font-bold mb-6 text-[var(--color-text-main)] tracking-tight`}
          variants={itemVariants}
        >
          Hi, I'm <span className="text-[var(--color-highlight)]">{thisData.profile.name}</span>
        </motion.h1>

        <motion.p
          className={`${isMobileView ? 'text-xl' : (isTabletView ? 'text-2xl' : 'text-2xl md:text-3xl')} text-[var(--color-text-main)] mb-8 font-medium tracking-tight`}
          variants={itemVariants}
        >
          {thisData.profile.jobTitle}
        </motion.p>

        <motion.div className="mb-14" variants={itemVariants}>
          <p className={`${isMobileView ? 'text-base' : 'text-lg md:text-xl'} text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed`}>
            {thisData.hero.description}
          </p>
        </motion.div>

        <motion.div
          className={`flex flex-col ${isSmallDevice ? 'w-full' : 'sm:flex-row'} items-center justify-center gap-5 sm:gap-6 mb-20 sm:w-auto`}
          variants={itemVariants}
        >
          <motion.button
            onClick={() => scrollToSection(data.hero.actions.primary.sectionId)}
            className="w-full sm:w-auto group px-8 py-3.5 bg-[var(--color-highlight)] text-white rounded-lg font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgba(76,175,125,0.2)] hover:shadow-[0_6px_20px_rgba(76,175,125,0.25)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {thisData.hero.actions.primary.label}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.button>

          <motion.button
            onClick={() => scrollToSection(data.hero.actions.secondary.sectionId)}
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-[var(--color-text-main)] rounded-lg font-medium hover:bg-[var(--color-bg-section)] transition-all border border-gray-200 hover:border-gray-300 shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {thisData.hero.actions.secondary.label}
          </motion.button>

          <motion.a
            href={getResolvedLink("resume").url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 flex items-center justify-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-highlight)] font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText size={18} />
            <span>View Resume</span>
          </motion.a>
        </motion.div>

        <motion.div
          className={`flex ${isMobileView ? 'gap-4' : 'gap-8'} justify-center`}
          variants={itemVariants}
        >
          {thisData.hero.socialLinks.map((key: string) => {
            const social = getResolvedLink(key);
            const Icon = iconMap[social.icon];

            if (!Icon) return null;

            return (
              <motion.a
                key={key}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-highlight)] transition-colors p-2"
                aria-label={key}
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={isMobileView ? 24 : 28} strokeWidth={1.5} />
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
