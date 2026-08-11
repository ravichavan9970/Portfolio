import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaDocker, FaJava 
} from 'react-icons/fa';
import { 
  SiTypescript, SiSpringboot, SiMysql, SiTailwindcss 
} from 'react-icons/si';
import { MapPin, Mail } from 'lucide-react';
import AnimatedRole from '../components/AnimatedRole';

export default function AboutPage() {
  // Typewriter effect
  const typewriterTexts = useMemo(() => [
    "Enterprise Java Applications",
    "Spring Boot & Microservices",
    "High-Concurrency Systems",
    "REST API Architectures"
  ], []);
  const [typewriterText, setTypewriterText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleType = () => {
      const currentFullText = typewriterTexts[textIndex];
      if (!isDeleting) {
        setTypewriterText(currentFullText.slice(0, typewriterText.length + 1));
        setTypingSpeed(60);
        
        if (typewriterText === currentFullText) {
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        setTypewriterText(currentFullText.slice(0, typewriterText.length - 1));
        setTypingSpeed(30);
        
        if (typewriterText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % typewriterTexts.length);
          setTypingSpeed(400);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting, textIndex, typingSpeed, typewriterTexts]);

  // 4 True recruiter-friendly developer cards
  const infoCards = [
    {
      title: "Current Focus",
      desc: "MultiVendor Marketplace & StudySync",
      icon: "🚀",
      color: "hover:border-primary-light/35 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
    },
    {
      title: "Deep Dive Learning",
      desc: "Microservices & Spring Security",
      icon: "🌱",
      color: "hover:border-secondary-light/35 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]"
    },
    {
      title: "Recent Activity",
      desc: "Java 21 & MySQL Schemas",
      icon: "💻",
      color: "hover:border-emerald-500/35 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
    },
    {
      title: "Location",
      desc: "Pune, Maharashtra, India",
      icon: "📍",
      color: "hover:border-secondary/35 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
    }
  ];

  // Floating tech stack around avatar
  const floatingBadges = [
    { name: "Java 21", icon: <FaJava className="text-[#007396]" />, pos: { top: '8%', left: '8%' }, x: [0, 8, -6, 0], y: [0, -12, 10, 0], duration: 6, delay: 0, glow: "rgba(0,115,150,0.25)" },
    { name: "Spring Boot", icon: <SiSpringboot className="text-[#6DB33F]" />, pos: { top: '8%', right: '8%' }, x: [0, -10, 8, 0], y: [0, -8, 12, 0], duration: 7, delay: 0.5, glow: "rgba(109,179,63,0.25)" },
    { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" />, pos: { bottom: '10%', left: '8%' }, x: [0, 6, -8, 0], y: [0, 10, -12, 0], duration: 8, delay: 0.2, glow: "rgba(68,121,161,0.25)" },
    { name: "React", icon: <FaReact className="text-[#61DAFB]" />, pos: { bottom: '10%', right: '8%' }, x: [0, -8, 6, 0], y: [0, 8, -10, 0], duration: 6.5, delay: 1.0, glow: "rgba(97,218,251,0.25)" },
    { name: "Docker", icon: <FaDocker className="text-[#2496ED]" />, pos: { top: '48%', left: '-12%' }, x: [0, 10, -8, 0], y: [0, -6, 8, 0], duration: 7.5, delay: 0.8, glow: "rgba(36,150,237,0.25)" },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" />, pos: { top: '48%', right: '-12%' }, x: [0, -6, 10, 0], y: [0, 12, -8, 0], duration: 8.5, delay: 1.2, glow: "rgba(49,120,198,0.25)" },
  ];

  return (
    <motion.div 
      className="py-24 relative overflow-hidden bg-bg-darkest min-h-screen text-text-main pt-[80px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-10] select-none">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full orb-purple blur-[140px] opacity-70" />
        <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] rounded-full orb-cyan blur-[130px] opacity-75" />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 relative z-10 space-y-24">
        
        {/* Section 1: Hero split (50% / 50% Balance) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Panel: Branding & Profile Copy */}
          <motion.div 
            className="lg:col-span-6 text-left space-y-6 flex flex-col justify-center"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-fit">
              <span className="px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary-light uppercase tracking-wider">
                About the Developer
              </span>
            </div>
            
            {/* Massive Heading with Reveal and Underline */}
            <div className="relative pb-4">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl lg:text-[72px] font-black font-display leading-[0.9] tracking-[-0.04em] bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent bg-300% animate-gradient-flow relative select-none cursor-default flex flex-col lg:flex-row lg:flex-nowrap lg:gap-x-4 lg:whitespace-nowrap glow-pulse pb-1"
              >
                <span className="whitespace-nowrap">Ravindra</span>
                <span className="whitespace-nowrap">Chavan</span>
              </motion.h1>
              <motion.div 
                className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-primary to-secondary rounded"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              />
            </div>

            {/* Subtitle/Role with rotating professional titles and typewriter */}
            <div className="space-y-1.5 text-left pb-1">
              {/* Rotating Title */}
              <div className="relative h-[24px] md:h-[30px] overflow-hidden w-full">
                <AnimatedRole className="text-lg md:text-xl absolute left-0 top-0" />
              </div>

              {/* Typing Animation */}
              <p className="text-[10px] md:text-xs font-mono font-bold text-secondary-light/80 tracking-widest uppercase h-5 flex items-center">
                {typewriterText}
                <span className="w-[2px] h-3.5 bg-primary-light ml-1 animate-pulse inline-block" />
              </p>
            </div>
            
            {/* Authentic Copy Block */}
            <div className="space-y-4 text-sm md:text-base text-text-muted leading-relaxed">
              <p>
                Results-driven Full-Stack Java Software Engineer with hands-on experience building scalable, secure enterprise applications using Java 21, Spring Boot 3, Spring Security (JWT), and MySQL. Skilled in REST API design, high-concurrency systems with pessimistic locking, containerized deployments (Docker), and test-driven development (JUnit 5/Mockito). Experienced building responsive frontend UIs in React and collaborating in Agile teams to deliver features from design through production.
              </p>
            </div>

            {/* Quick Contact & Details */}
            <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-text-muted">
              <div className="flex items-center gap-2 bg-white/[0.02] border border-white/5 px-3.5 py-2 rounded-xl">
                <MapPin size={14} className="text-secondary" />
                <span>Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2 bg-white/[0.02] border border-white/5 px-3.5 py-2 rounded-xl">
                <Mail size={14} className="text-primary" />
                <a href="mailto:ravindrachavan265125@gmail.com" className="hover:text-text-title transition-colors">
                  ravindrachavan265125@gmail.com
                </a>
              </div>
            </div>

            {/* Action buttons (Resume CTA) */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="/resume/Ravindra_Chavan_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                📄 View Resume
              </a>
              <a
                href="/resume/Ravindra_Chavan_Resume.pdf"
                download="Ravindra_Chavan_Resume.pdf"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.03] hover:bg-white/5 text-text-title border border-white/5 hover:border-primary/20 text-xs font-bold active:scale-95 transition-all duration-300 cursor-pointer hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
              >
                📥 Download Resume
              </a>
            </div>

          </motion.div>

          {/* Right Panel: Styled profile with floating badges */}
          <motion.div 
            className="lg:col-span-6 flex justify-center relative min-h-[420px]"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Drifting Box container */}
            <div className="relative w-80 h-80 md:w-[400px] md:h-[400px] flex items-center justify-center">
              
              {/* Profile Image Frame with Smooth Animated Gradient Ring & Ambient Pulse Glow */}
              <div className="relative flex items-center justify-center z-10">
                {/* 1. Soft Ambient Pulse Glow Aura */}
                <motion.div
                  animate={{
                    scale: [1, 1.12, 1],
                    opacity: [0.35, 0.65, 0.35]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-full blur-[45px] bg-gradient-to-r from-primary via-secondary to-accent-cyan opacity-50 z-0"
                />

                {/* 2. Rotating Conic Gradient Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -inset-[4px] rounded-full z-0 p-[2px] opacity-90"
                  style={{
                    background: 'conic-gradient(from 0deg, var(--color-primary, #8B5CF6), var(--color-secondary, #EC4899), #06B6D4, #10B981, var(--color-primary, #8B5CF6))',
                    filter: 'drop-shadow(0 0 18px rgba(139,92,246,0.45))'
                  }}
                />

                {/* 3. Floating Profile Avatar Frame */}
                <div className="relative w-52 h-52 md:w-72 md:h-72 rounded-full p-[3px] bg-gradient-to-tr from-primary via-secondary to-primary-light shadow-[0_0_45px_rgba(139,92,246,0.35)] flex-shrink-0 z-10">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-bg-darkest relative bg-bg-dark flex items-center justify-center shadow-inner">
                    <img 
                      src="/images/profile.jpg" 
                      alt="Ravindra Chavan Profile" 
                      className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = "/images/Ravindra_Chavan.png";
                      }}
                    />
                    {/* Glass Reflection Highlight */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-transparent pointer-events-none rounded-full" />
                  </div>
                </div>
              </div>

              {/* Floating Tech Badges - Drift independently */}
              {floatingBadges.map((badge) => (
                <motion.div
                  key={badge.name}
                  className="absolute z-20"
                  style={badge.pos}
                  animate={{
                    x: badge.x,
                    y: badge.y
                  }}
                  transition={{
                    duration: badge.duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: badge.delay
                  }}
                >
                  <motion.div
                    className="p-2 px-3 rounded-xl bg-bg-card backdrop-blur-md border border-white/10 shadow-xl flex items-center gap-1.5 cursor-default hover:border-primary/50 transition-colors"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: `0 0 20px ${badge.glow}`,
                    }}
                  >
                    <span className="text-sm flex items-center justify-center">{badge.icon}</span>
                    <span className="text-[9px] font-bold font-mono text-text-muted">{badge.name}</span>
                  </motion.div>
                </motion.div>
              ))}

            </div>
          </motion.div>
        </div>

        {/* Section 2: Real Developer Stats & Current Status Cards (Grid 4 Columns) */}
        <div className="border-t border-white/5 pt-16 space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-text-title tracking-tight">
              Developer Overview
            </h2>
            <p className="text-xs text-text-muted mt-2">
              Real metrics and status details describing my technical focus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {infoCards.map((card, idx) => (
              <motion.div
                key={card.title}
                className={`p-6 rounded-2xl glass-aurora border border-white/5 text-left flex flex-col justify-between h-40 transition-all duration-300 ${card.color}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-muted font-mono uppercase tracking-wider">
                    {card.title}
                  </span>
                  <span className="text-xl select-none">{card.icon}</span>
                </div>
                <div className="text-base font-extrabold text-text-title font-display mt-4">
                  {card.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 3: Tech Stack Grid */}
        <div className="border-t border-white/5 pt-16 space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest">TECH STACK</span>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-text-title tracking-tight mt-2">
              Primary Development Tools
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { name: "Java 21", icon: <FaJava className="text-[#007396]" />, desc: "Core Java, OOP, Streams & Concurrency" },
              { name: "Spring Boot 3", icon: <SiSpringboot className="text-[#6DB33F]" />, desc: "MVC, REST APIs & Auto-configuration" },
              { name: "Spring Security", icon: <SiSpringboot className="text-[#6DB33F]" />, desc: "JWT Auth, OTP Enforcements & RBAC" },
              { name: "MySQL 8.0", icon: <SiMysql className="text-[#4479A1]" />, desc: "Relational Schemas, Indexing & JPA" },
              { name: "React", icon: <FaReact className="text-[#61DAFB]" />, desc: "Dynamic UIs & State Management" },
              { name: "Docker", icon: <FaDocker className="text-[#2496ED]" />, desc: "Docker Compose One-Command Setup" },
              { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38BDF8]" />, desc: "Responsive Modern Utility Styling" },
              { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" />, desc: "Type-safe Client Application Logic" }
            ].map((tech) => (
              <div key={tech.name} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3 hover:border-primary/30 transition-all duration-300 text-left">
                <span className="text-2xl shrink-0">{tech.icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-text-title">{tech.name}</h4>
                  <p className="text-[9px] text-text-muted">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Animated Learning Timeline */}
        <div className="border-t border-white/5 pt-16 pb-12 space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-mono font-bold text-secondary uppercase tracking-widest">TIMELINE</span>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-text-title tracking-tight mt-2">
              My Academic & Professional Journey
            </h2>
          </div>
          <div className="relative max-w-2xl mx-auto py-8">
            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent" />
            <div className="space-y-8 text-left">
              {[
                { year: "2021 – 2024", title: "Bachelor of Computer Science (B.Sc.)", desc: "New Arts Commerce & Science College, Shevgaon. Foundational computer science, algorithms, database systems, and object-oriented programming." },
                { year: "2024 – 2026", title: "Master of Computer Science (M.Sc.)", desc: "New Arts Commerce & Science College, Shevgaon. Advanced computer science curriculum, distributed systems, and software engineering concepts." },
                { year: "June 2026", title: "Java Full Stack Development Trainee", desc: "Naresh i Technologies, Hyderabad. Intensive practical training in Java 21, Spring Boot 3, Spring Security JWT, Microservices, Hibernate/JPA, MySQL, and React." }
              ].map((step, sidx) => (
                <div key={sidx} className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-bg-darkest border border-white/10 flex items-center justify-center text-[10px] font-bold text-text-title shadow-lg z-10">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                  </div>
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-primary-light uppercase tracking-wider">{step.year}</span>
                      <span className="text-text-muted">•</span>
                      <h4 className="text-xs font-bold text-text-title font-display">{step.title}</h4>
                    </div>
                    <p className="text-xs text-text-muted mt-2 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
