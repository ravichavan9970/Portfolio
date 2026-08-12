import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SEO from './components/SEO';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import BloodHandsOverlay from './components/BloodHandsOverlay';

// Page Imports
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import JourneyPage from './pages/JourneyPage';
import ContactPage from './pages/ContactPage';

// Scroll to top helper on route change
function RouteScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [pathname]);
  return null;
}

// Inner App to access mouse coordinates
function AppContent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showSplash, setShowSplash] = useState(() => {
    try {
      const hasShown = sessionStorage.getItem('portfolioIntroShown');
      return hasShown !== 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" onComplete={() => {
          sessionStorage.setItem('portfolioIntroShown', 'true');
          setShowSplash(false);
        }} />
      ) : (
        <motion.div
          key="main-layout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative min-h-screen bg-bg-darkest text-text-main selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col justify-between overflow-hidden"
        >
          {/* Dynamic SEO Tag & JSON-LD Manager */}
          <SEO />
          
          {/* Spooky Shadowy Hands Background Overlay for Blood Red Mode */}
          <BloodHandsOverlay />
          
          {/* Cursor Glow Overlay - Aurora Palette */}
          <div 
            className="pointer-events-none fixed inset-0 z-30 transition duration-200 opacity-60 hidden md:block"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.12) 0%, rgba(6, 182, 212, 0.06) 35%, rgba(236, 72, 153, 0.02) 65%, transparent 80%)`
            }}
          />

          {/* Main Navigation */}
          <Navbar />
          
          {/* Page Routing */}
          <main className="flex-grow">
            <RouteScrollManager />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/journey" element={<JourneyPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Footer Branding */}
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  // Sync the theme variable and accent colors directly on load and listen to themechange
  useEffect(() => {
    const syncTheme = () => {
      const savedMode = localStorage.getItem('portfolio-theme');
      let isDark = true;
      if (savedMode === 'light') {
        isDark = false;
      } else if (savedMode === 'dark') {
        isDark = true;
      }
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    syncTheme();
    window.addEventListener('themechange', syncTheme);

    // Set accent colors
    const savedColor = localStorage.getItem('theme-color') || 'purple';
    const themes = {
      purple: { primary: '#8B5CF6', primaryHover: '#7C3AED', primaryLight: '#A78BFA', secondary: '#EC4899', secondaryHover: '#DB2777', secondaryLight: '#F472B6' },
      blue: { primary: '#3B82F6', primaryHover: '#2563EB', primaryLight: '#60A5FA', secondary: '#06B6D4', secondaryHover: '#0891B2', secondaryLight: '#67E8F9' },
      emerald: { primary: '#10B981', primaryHover: '#059669', primaryLight: '#34D399', secondary: '#3B82F6', secondaryHover: '#2563EB', secondaryLight: '#60A5FA' },
      orange: { primary: '#F97316', primaryHover: '#EA580C', primaryLight: '#FB923C', secondary: '#EF4444', secondaryHover: '#DC2626', secondaryLight: '#F87171' },
      cyan: { primary: '#06B6D4', primaryHover: '#0891B2', primaryLight: '#67E8F9', secondary: '#8B5CF6', secondaryHover: '#7C3AED', secondaryLight: '#A78BFA' },
      rose: { primary: '#F43F5E', primaryHover: '#E11D48', primaryLight: '#FB7185', secondary: '#8B5CF6', secondaryHover: '#7C3AED', secondaryLight: '#A78BFA' },
      slate: { primary: '#64748B', primaryHover: '#475569', primaryLight: '#94A3B8', secondary: '#334155', secondaryHover: '#1E293B', secondaryLight: '#64748B' },
    };
    const activeObj = themes[savedColor as keyof typeof themes] || themes.purple;
    const root = document.documentElement;
    root.style.setProperty('--color-primary', activeObj.primary);
    root.style.setProperty('--color-primary-hover', activeObj.primaryHover);
    root.style.setProperty('--color-primary-light', activeObj.primaryLight);
    root.style.setProperty('--color-secondary', activeObj.secondary);
    root.style.setProperty('--color-secondary-hover', activeObj.secondaryHover);
    root.style.setProperty('--color-secondary-light', activeObj.secondaryLight);

    return () => window.removeEventListener('themechange', syncTheme);
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}
