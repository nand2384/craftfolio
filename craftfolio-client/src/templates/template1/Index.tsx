import { Toaster } from 'sonner';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import './App.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setTemplate } from '../../redux/features/preview/dataSlice';
import type { RootState } from '../../redux/store';
import { data, links } from './data/data';
import type { ViewMode } from '../../types';

interface IndexProps {
  device?: ViewMode;
}


function Index({ device }: IndexProps) {
  const sections = useSelector((state: RootState) => state.data.data.sections);
  const theme = useSelector((state: RootState) => state.data.data.theme);

  // Generate CSS variables from theme
  const themeStyles = theme ? {
    '--color-highlight': theme.highlight,
    '--color-highlight-dark': theme.highlightDark,
    '--color-bg-page': theme.pageBg,
    '--color-bg-section': theme.sectionBg,
    '--color-text-main': theme.textMain,
    '--color-text-muted': theme.textMuted,
    '--color-bg-soft': theme.softAccentBg,
  } as React.CSSProperties : {};

  return (
    <div className="min-h-screen bg-[var(--color-bg-page)] transition-colors duration-300" style={themeStyles}>
      <Toaster position="top-center" richColors />
      {sections?.navigation && <Navigation device={device} />}
      <main>
        {sections?.hero && <Hero device={device} />}
        {sections?.about && <About device={device} />}
        {sections?.skills && <Skills device={device} />}
        {sections?.projects && <Projects device={device} />}
        {sections?.contact && <Contact device={device} />}
      </main>
      {sections?.footer && <Footer device={device} />}
    </div>
  )
}

export default Index
