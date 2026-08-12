import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// User provided custom audio track
import wolfAudioTrack from '../Audio/Wolf Sounds.mp3';

export default function BloodHandsOverlay() {
  const [isBloodRed, setIsBloodRed] = useState(() => {
    return document.documentElement.classList.contains('blood-red');
  });

  useEffect(() => {
    const handleThemeChange = () => {
      setIsBloodRed(document.documentElement.classList.contains('blood-red'));
    };
    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  // ── Play User Provided "Wolf Sounds.mp3" with 1-Second Post-End Repeat Delay ──
  useEffect(() => {
    let audio: HTMLAudioElement | null = null;
    let repeatTimer: ReturnType<typeof setTimeout> | null = null;

    if (isBloodRed) {
      audio = new Audio(wolfAudioTrack);
      audio.loop = false; // Native loop disabled to handle 1-second post-end delay explicitly
      audio.volume = 0.85;

      const handleEnded = () => {
        // Wait exactly 1 second after track finishes, then repeat from the beginning
        repeatTimer = setTimeout(() => {
          if (audio && document.documentElement.classList.contains('blood-red')) {
            audio.currentTime = 0;
            audio.play().catch(() => null);
          }
        }, 1000);
      };

      audio.addEventListener('ended', handleEnded);

      // Start playing
      audio.play().catch(() => null);
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.removeEventListener('ended', () => {});
      }
      if (repeatTimer) {
        clearTimeout(repeatTimer);
      }
    };
  }, [isBloodRed]);

  return (
    <AnimatePresence>
      {isBloodRed && (
        <motion.div
          key="blood-forest-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
        >
          {/* Spooky Dark Crimson Red Foggy Forest Background */}
          <motion.div
            className="absolute -inset-10 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/blood_forest_bg.jpg)',
              filter: 'contrast(1.25) brightness(0.95) saturate(1.35)',
            }}
            animate={{
              scale: [1, 1.05, 1.02, 1.06, 1],
              y: [0, -14, 8, -8, 0],
              x: [0, 10, -8, 12, 0],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />

          {/* Deep Crimson Ambient Vignette & Mist Lighting */}
          <div
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              background: `
                radial-gradient(circle at 50% 40%, rgba(255, 0, 0, 0.15) 0%, transparent 65%),
                radial-gradient(circle at 50% 50%, transparent 40%, rgba(11, 0, 2, 0.82) 95%)
              `
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
