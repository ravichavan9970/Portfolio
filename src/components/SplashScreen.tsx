import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Premium custom geometric SVG monogram combining "N" and "B" as a single continuous path
const MonogramLogo = ({ isHovered }: { isHovered?: boolean }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_12px_rgba(124,58,237,0.3)] transition-transform duration-300"
      style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
    >
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="logo-glow" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.8" />
        </linearGradient>
        <filter id="glass-reflection" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Background glow circle */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#logo-glow)" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.35" />

      {/* Main continuous geometric path combining R and C */}
      <motion.path 
        d="M 28,72 L 28,28 C 45,28 45,46 28,46 L 45,72 M 72,32 C 54,32 50,44 50,50 C 50,56 54,68 72,68" 
        stroke="url(#logo-grad)" 
        strokeWidth="6.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.0, ease: "easeInOut" }}
      />

      {/* Metallic edge reflection highlight overlay */}
      <path 
        d="M 29,71 L 29,29 C 44,29 44,45 29,45 L 44,71 M 71,33 C 55,33 51,44 51,50 C 51,56 55,67 71,67" 
        stroke="white" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none" 
        opacity="0.32" 
        filter="url(#glass-reflection)" 
      />
    </svg>
  );
};

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  // Timeline Step States:
  // 0: Initial background (0.0s)
  // 1: Stage 1 - Centered Logo appears (0.0s - 1.2s)
  // 2: Transition 1 - Logo pulse shockwave, logo container fades and scales down (1.2s - 1.6s)
  // 3: Stage 2 - Name appears centered, logo gone (1.6s - 2.5s)
  // 4: Stage 3 - Name remains + Java Full Stack Developer role fades up (2.5s - 3.2s)
  // 5: Stage 3 - Crossfade to Spring Boot & Microservices role + Tagline (3.2s - 4.0s)
  const [step, setStep] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mouse Parallax values
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const hasCompletedRef = useRef(false);

  const triggerComplete = useCallback(() => {
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onComplete();
    }
  }, [onComplete]);

  // Sync theme status on mount
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  // Mouse movement listener for premium parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8; // max drift
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Timeline scheduler (exactly 4.0s total duration before homepage fade)
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    setStep(1); // 0.0s: Stage 1 starts, logo appears

    timers.push(setTimeout(() => {
      setStep(2);
      setPulse(true);
    }, 1200));  // 1.2s: Transition 1 starts (pulse + logo fade out)

    timers.push(setTimeout(() => setStep(3), 1600));  // 1.6s: Stage 2 starts (Name only)
    timers.push(setTimeout(() => setStep(4), 2500));  // 2.5s: Stage 3 starts (Name + Role 0)
    timers.push(setTimeout(() => setStep(5), 3200));  // 3.2s: Stage 3 crossfade (Spring Boot + Tagline)
    timers.push(setTimeout(() => triggerComplete(), 4000)); // 4.0s: Complete -> transition

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [triggerComplete]);

  // Floating background light particles matching theme properties
  const [particles] = useState(() => 
    Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 4,
      delay: Math.random() * 2,
      duration: 6 + Math.random() * 6,
    }))
  );

  // Background glows configurations matching theme properties
  const auroraGlows = isDarkMode ? [
    { color: "rgba(139, 92, 246, 0.08)", width: "50vw", height: "50vw", top: "-10%", left: "-10%", xRange: [0, 20, 0], yRange: [0, 10, 0] },
    { color: "rgba(59, 130, 246, 0.08)", width: "55vw", height: "55vw", bottom: "-10%", right: "-10%", xRange: [0, -20, 0], yRange: [0, -10, 0] },
  ] : [
    { color: "rgba(59, 130, 246, 0.06)", width: "50vw", height: "50vw", top: "-10%", left: "-10%", xRange: [0, 20, 0], yRange: [0, 10, 0] },
    { color: "rgba(139, 92, 246, 0.06)", width: "55vw", height: "55vw", bottom: "-10%", right: "-10%", xRange: [0, -20, 0], yRange: [0, -10, 0] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -30,
        filter: "blur(8px)",
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-between py-12 md:py-16 select-none overflow-hidden bg-gradient-to-tr from-[#F8FAFF] via-[#EEF5FF] to-[#F6EEFF] dark:from-[#0B1120] dark:via-[#111827] dark:to-[#1E1B4B]"
    >
      {/* Moving Ambient glowing background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {auroraGlows.map((glow, idx) => (
          <motion.div
            key={idx}
            className="absolute rounded-full pointer-events-none filter blur-[80px] sm:blur-[100px] md:blur-[130px]"
            style={{
              backgroundColor: glow.color,
              width: glow.width,
              height: glow.height,
              top: glow.top,
              left: glow.left,
              right: glow.right,
              bottom: glow.bottom,
            }}
            animate={{
              x: glow.xRange,
              y: glow.yRange,
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 10 + idx * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating particles dynamic colors */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none filter blur-[0.5px] z-0"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: isDarkMode 
              ? (p.id % 2 === 0 ? "rgba(59, 130, 246, 0.3)" : "rgba(139, 92, 246, 0.25)") // Blue/purple particles for dark theme
              : (p.id % 2 === 0 ? "rgba(255, 255, 255, 0.95)" : "rgba(224, 242, 254, 0.9)"), // White/sky blue particles for light theme
            boxShadow: isDarkMode
              ? `0 0 10px ${p.id % 2 === 0 ? "rgba(59, 130, 246, 0.3)" : "rgba(139, 92, 246, 0.25)"}`
              : `0 0 10px rgba(255, 255, 255, 0.8)`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 10 - 5, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Top Skip Button */}
      <div className="w-full max-w-[1280px] px-6 flex justify-end items-center relative z-50">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          onClick={triggerComplete}
          className="flex items-center gap-1.5 text-[10px] md:text-xs font-mono font-bold tracking-widest px-4 py-2 rounded-full transition-all duration-300 shadow-sm text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white/40 dark:bg-slate-950/40 border border-slate-200/40 dark:border-slate-800/40 backdrop-blur-md hover:bg-white/70 dark:hover:bg-slate-950/70 hover:border-slate-300 cursor-pointer pointer-events-auto"
        >
          SKIP <span>→</span>
        </motion.button>
      </div>

      {/* Center visual workspace */}
      <div className="relative flex-grow flex items-center justify-center w-full max-h-[65vh] z-20">
        <div className="relative flex flex-col items-center justify-center text-center px-6 w-full">
          
          {/* Backlight glow behind logo/typography */}
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-cyan-500/10 blur-3xl opacity-60 pointer-events-none" />

          {/* STAGE 1: Centered Logo Container */}
          <AnimatePresence>
            {step === 1 && (
              <motion.div 
                key="stage1-logo"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ 
                  scale: 1.0, 
                  opacity: 1,
                  rotate: [0, 2, -2, 0],
                  x: mousePos.x,
                  translateY: mousePos.y
                }}
                exit={{ 
                  scale: 0.85, 
                  opacity: 0,
                  transition: { duration: 0.4, ease: "easeInOut" }
                }}
                transition={{ 
                  scale: { duration: 0.6, ease: "easeOut" },
                  opacity: { duration: 0.6, ease: "easeOut" },
                  rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                  x: { type: "spring", stiffness: 100, damping: 15 },
                  translateY: { type: "spring", stiffness: 100, damping: 15 }
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative flex items-center justify-center h-[120px] w-[120px] rounded-full shadow-[0_20px_50px_rgba(124,58,237,0.12)] border border-white/40 dark:border-white/10 bg-white/65 dark:bg-slate-950/30 backdrop-blur-xl relative z-10 cursor-pointer pointer-events-auto"
              >
                {/* Orbiting particles (Stage 1) */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-16px] pointer-events-none z-0"
                >
                  <div className="absolute w-1.5 h-1.5 rounded-full bg-[#22D3EE] top-0 left-1/2 -translate-x-1/2 shadow-[0_0_8px_#22D3EE]" />
                  <div className="absolute w-1.5 h-1.5 rounded-full bg-[#A855F7] bottom-0 left-1/2 -translate-x-1/2 shadow-[0_0_8px_#A855F7]" />
                </motion.div>

                {/* Thin holographic ring (Stage 1) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 0.65, 
                    scale: 1,
                    rotate: -360
                  }}
                  transition={{ 
                    opacity: { duration: 0.5 },
                    scale: { duration: 0.5 },
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" } 
                  }}
                  className="absolute inset-[-16px] rounded-full border border-[#22D3EE]/20 border-dashed pointer-events-none z-0"
                />

                {/* Logo pulse shockwave glow (Stage 1 Transition) */}
                <AnimatePresence>
                  {pulse && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      onAnimationComplete={() => setPulse(false)}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full border-2 border-[#7C3AED] pointer-events-none z-0"
                    />
                  )}
                </AnimatePresence>

                <MonogramLogo isHovered={isHovered} />

                {/* Subtle light sweep reflection overlay */}
                <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" }}
                    className="absolute top-0 bottom-0 w-[40%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* STAGE 2 & 3: Typography Container */}
          <div className="flex flex-col items-center justify-center">
            {/* Name Reveal */}
            <div className="h-[52px] sm:h-[64px] overflow-hidden flex items-center justify-center">
              <AnimatePresence>
                {step >= 3 && (
                  <motion.h1
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)", y: 15 }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight animate-text-gradient-purple-blue pb-1 filter drop-shadow-[0_0_15px_rgba(139,92,246,0.25)]"
                    style={{ maxWidth: '900px' }}
                  >
                    Ravindra Chavan
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>

            {/* Spacing Name -> 24px -> Professional Title */}
            <div style={{ height: step >= 4 ? '24px' : '0px', transition: 'height 0.4s' }} />

            {/* Staggered Professional Title Crossfade */}
            <div className="h-8 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                {step === 4 && (
                  <motion.span
                    key="role0"
                    initial={{ opacity: 0, filter: "blur(6px)", y: 10 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    exit={{ opacity: 0, filter: "blur(6px)", y: -10 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="text-lg sm:text-xl font-medium tracking-wide text-slate-700 dark:text-slate-200"
                  >
                    Associate Software Engineer
                  </motion.span>
                )}
                {step >= 5 && (
                  <motion.span
                    key="role1"
                    initial={{ opacity: 0, filter: "blur(6px)", y: 10 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    exit={{ opacity: 0, filter: "blur(6px)", y: -10 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="text-lg sm:text-xl font-medium tracking-wide text-slate-700 dark:text-slate-200"
                  >
                    Java Full Stack Developer
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Spacing Professional Title -> 20px -> Tagline */}
            <div style={{ height: step >= 5 ? '20px' : '0px', transition: 'height 0.4s' }} />

            {/* Tagline Paragraph Reveal */}
            <div className="min-h-[28px] overflow-hidden max-w-[600px] flex items-center justify-center">
              <AnimatePresence>
                {step >= 5 && (
                  <motion.p
                    initial={{ opacity: 0, filter: "blur(6px)", y: 10 }}
                    animate={{ opacity: 0.8, filter: "blur(0px)", y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-normal leading-relaxed text-center"
                  >
                    Building Scalable Enterprise Java Applications & High-Concurrency Systems.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Layout Spacer */}
      <div className="h-[40px] pointer-events-none" />
    </motion.div>
  );
}
