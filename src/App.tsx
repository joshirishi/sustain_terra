import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ContentProvider } from '@/lib/content';
import { Home } from '@/pages/Home';
import { LearningDevelopment } from '@/pages/LearningDevelopment';
import { Consulting } from '@/pages/Consulting';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';

/** Route changes start at the top; in-page hashes still scroll to their anchor. */
function ScrollBehaviour() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ContentProvider>
        <ScrollBehaviour />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learning-and-development" element={<LearningDevelopment />} />
            <Route path="/consulting" element={<Consulting />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </ContentProvider>
    </BrowserRouter>
  );
}
