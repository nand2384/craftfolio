import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { motion } from "motion/react";
import { data } from "../data/data";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

export function Projects({ device }: { device?: 'desktop' | 'tablet' | 'mobile' }) {
  const isMobileView = device === 'mobile';
  const thisData = useSelector((state: RootState) => state.data.data) ?? data;

  if (!thisData?.sections?.projects) return null;

  const { projects } = thisData;

  return (
    <section id="projects" className="py-24 bg-[var(--color-bg-page)] relative border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-main)] mb-4 tracking-tight">
            {projects.title}
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl">
            {projects.description}
          </p>
        </motion.div>

        <div className={`grid grid-cols-1 ${isMobileView ? '' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
          {projects.items.map((project: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`group bg-[var(--color-bg-section)] rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Image Container */}
              <div className={`relative overflow-hidden ${index === 0 ? "h-60 sm:h-72 lg:h-60" : "h-60"}`}>
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 border-b border-gray-200 pointer-events-none z-10"></div>
                
                {/* Optional "Top Pick" badge for the first project */}
                {index === 0 && (
                  <div className="absolute top-4 left-4 bg-[var(--color-bg-section)]/90 backdrop-blur text-[var(--color-text-main)] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm z-20 flex items-center gap-1.5 border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-highlight)] animate-pulse"></span>
                    Top Pick
                  </div>
                )}
              </div>
              
              {/* Content Container */}
              <div className="p-8 flex flex-col grow">
                <h3 className="text-xl font-bold text-[var(--color-text-main)] mb-3 group-hover:text-[var(--color-highlight)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[var(--color-text-muted)] text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-2 mb-8 grow">
                  {project.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start text-sm text-[var(--color-text-main)]">
                      <span className="text-[var(--color-highlight)] mr-2.5 text-base leading-tight">•</span>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech: string, techIndex: number) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-[var(--color-bg-page)] text-[var(--color-text-muted)] rounded-full text-xs font-medium border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6 mt-auto pt-6 border-t border-[var(--color-bg-page)]">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-highlight)] transition-colors font-medium text-sm group/link"
                  >
                    <Github size={18} className="group-hover/link:-translate-y-0.5 transition-transform" />
                    View Code
                  </a>
                  {project.live && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-highlight)] transition-colors font-medium text-sm group/link"
                  >
                    <ExternalLink size={18} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                    Live Demo
                  </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
