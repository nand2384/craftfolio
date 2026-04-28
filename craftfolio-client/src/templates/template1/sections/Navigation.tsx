import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { data } from "../data/data";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

export function Navigation({ device }: { device?: 'desktop' | 'tablet' | 'mobile' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const forceMobile = device === 'mobile' || device === 'tablet';
  const forceDesktop = device === 'desktop';

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -50% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  }, []);

  const thisData = useSelector((state: RootState) => state.data.data) ?? data;

  if (!thisData?.sections?.navigation) return null;

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-2 transition-all duration-300 border-none ${
        isScrolled || isMobileMenuOpen
          ? "bg-(--color-bg-section) shadow-sm border-b border-gray-100 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => scrollToSection("hero")}
            className="text-2xl font-bold text-(--color-text-main) hover:text-(--color-highlight) transition-all tracking-tight"
          >
            {thisData.profile.logoText}
          </motion.button>

          {/* Desktop Navigation */}
          <div className={`${forceMobile ? 'hidden' : 'hidden md:flex'} items-center gap-10`}>
            {data.navigation.items.map((link: { id: string, name: string }, index: number) =>{ 
              if(!(thisData.sections as any)?.[link.id]) return null;
              return (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => scrollToSection(link.id)}
                className={`group relative transition-colors duration-300 text-base font-medium py-2 ${
                  activeSection === link.id
                    ? "text-(--color-highlight)"
                    : "text-(--color-text-muted) hover:text-(--color-highlight)"
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-(--color-highlight) transition-all duration-300 rounded-full ${
                    activeSection === link.id
                      ? "width-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </motion.button>
            )})}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${forceDesktop ? 'hidden' : (forceMobile ? 'flex' : 'md:hidden')} text-(--color-text-muted) hover:text-(--color-highlight) transition-colors bg-(--color-bg-page) p-2 rounded-lg`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className={`${forceDesktop ? 'hidden' : (forceMobile ? 'block' : 'md:hidden')} pb-6 pt-2 h-screen`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {data.navigation.items.map((link, index) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-center py-4 rounded-lg transition-colors text-base font-medium mb-2 ${
                    activeSection === link.id
                      ? "text-(--color-highlight) bg-(--color-bg-soft)"
                      : "text-(--color-text-muted) hover:text-(--color-highlight) hover:bg-(--color-bg-soft)/50"
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
