import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Preloader       from './components/Preloader';
import Navbar          from './components/Navbar';
import BackgroundBlobs from './components/BackgroundBlobs';
import Hero            from './components/Hero';
import About           from './components/About';
import Experience      from './components/Experience';
import Projects        from './components/Projects';
import Certifications  from './components/Certifications';
import DesignWork      from './components/DesignWork';
import Contact         from './components/Contact';
import Footer          from './components/Footer';
import CursorStar      from './components/CursorStar';

export default function App() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {/* Preloader */}
      <AnimatePresence>
        {loading && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* Custom cursor — always mounted */}
      <CursorStar />

      {/* Main site */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative min-h-screen"
          style={{ background: '#050816' }}
        >
          <BackgroundBlobs />
          <Navbar />

          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Certifications />
            <DesignWork />
            <Contact />
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  );
}
