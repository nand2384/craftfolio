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
  const dispatch = useDispatch();
  const currentTemplateId = useSelector((state: RootState) => state.data.templateId);
  const sections = useSelector((state: RootState) => state.data.data.sections);

  useEffect(() => {
    // Only set template data if it's not already loaded or if a different template was loaded
    if (currentTemplateId !== "template1") {
      dispatch(setTemplate({ templateId: "template1", data, links }));
    }
  }, [dispatch, currentTemplateId]);

  return (
    <div className="min-h-screen bg-[#FDFBF6]">
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
