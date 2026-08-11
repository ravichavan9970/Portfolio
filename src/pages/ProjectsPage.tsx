import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, CheckSquare, BarChart3, 
  ExternalLink, Layers, Database, Cloud, Search, Globe, Award, CheckCircle2
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ProjectModal, { type ProjectModalData } from '../components/ProjectModal';

// Only verified projects that exist in this repository
const projectsList = [
  {
    title: "MultiVendor – Marketplace & Service Booking Platform",
    tagline: "High-Concurrency Java 21 Enterprise Marketplace",
    desc: "Architected a full-stack multi-vendor marketplace using Java 21, Spring Boot 3.2.5, Spring Security JWT, Spring Data JPA, and MySQL. Features real-time slot booking with 10-minute hold reservation daemons, pessimistic database locking to prevent overbooking, dual-identifier 6-digit OTP auth, and vendor earnings analytics.",
    tech: ["Java 21", "Spring Boot 3.2.5", "Spring Security", "JWT", "Spring Data JPA", "MySQL", "React"],
    categories: ["Full Stack"],
    github: "https://github.com/ravichavan9970/MultiVendor.git",
    demo: "https://github.com/ravichavan9970/MultiVendor.git",
    link: "https://github.com/ravichavan9970/MultiVendor.git",
    repo: "https://github.com/ravichavan9970/MultiVendor.git",
    image: "/images/multivendor-1.png",
    image2: "/images/multivendor-2.png",
    features: [
      "Dual-Identifier 6-Digit OTP Auth (Email & SMS)",
      "10-Min Hold Reservation (@Scheduled Tasks)",
      "Pessimistic Database Locking Protection",
      "Google Meet Link & Mailto Dispatch Integration"
    ],
    status: "Production Ready",
    isFlagship: true
  },
  {
    title: "StudySync – Student Productivity Web Application",
    tagline: "Student Productivity Platform & Focus Command Center",
    desc: "Developed 30+ RESTful APIs across 7 modules (Authentication, Tasks, Notes, Planner, Focus Room, Analytics) using controller-service-repository architecture and JWT security. Built a Pomodoro focus timer with Chart.js analytics and containerized the application using Docker Compose.",
    tech: ["Java 21", "Spring Boot", "React", "Docker Compose", "MySQL", "Chart.js", "OpenAPI/Swagger"],
    categories: ["Full Stack"],
    github: "https://github.com/ravichavan9970/StudySync.git",
    demo: "https://github.com/ravichavan9970/StudySync.git",
    link: "https://github.com/ravichavan9970/StudySync.git",
    repo: "https://github.com/ravichavan9970/StudySync.git",
    image: "/images/studysync-1.png",
    image2: "/images/studysync-2.png",
    features: [
      "30+ RESTful APIs across 7 Core Modules",
      "Pomodoro Timer with Chart.js Analytics",
      "Normalized 7-Table MySQL Schema",
      "One-Command Docker Compose Deployment"
    ],
    status: "Production Ready",
    isFlagship: false
  }
];

export default function ProjectsPage() {
  const [activeProjectFilter, setActiveProjectFilter] = useState<'All' | 'Full Stack'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Flagship project tabs for both projects
  const [multiVendorTab, setMultiVendorTab] = useState<'preview' | 'architecture' | 'features' | 'roadmap'>('preview');
  const [studySyncTab, setStudySyncTab] = useState<'preview' | 'architecture' | 'features' | 'roadmap'>('preview');
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectModalData | null>(null);

  // Filter projects by category and search query
  const filteredProjects = projectsList.filter((project) => {
    const matchesCategory = activeProjectFilter === 'All' || project.categories.includes(activeProjectFilter);
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.tech.some(tVal => tVal.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const multiVendor = projectsList[0];
  const studySync = projectsList[1];

  const multiVendorFeatures = [
    { icon: <Users size={16} className="text-primary-light" />, title: "Dual OTP Auth & RBAC", desc: "Dual-identifier 6-digit OTP auth (Email & SMS) with BCrypt password hashing & role authorization." },
    { icon: <CheckSquare size={16} className="text-secondary-light" />, title: "10-Min Hold Daemons", desc: "High-concurrency booking engine featuring 10-minute hold daemons (@Scheduled background tasks)." },
    { icon: <Award size={16} className="text-emerald-400" />, title: "Pessimistic DB Locks", desc: "Pessimistic database locking to prevent overbooking and double-reservations under load." },
    { icon: <BarChart3 size={16} className="text-yellow-400" />, title: "Vendor Hub Analytics", desc: "Real-time earnings analytics, batch recurring slot generator, and instant receipt modals." }
  ];

  const studySyncFeatures = [
    { icon: <Layers size={16} className="text-primary-light" />, title: "30+ REST APIs & 7 Modules", desc: "Authentication, Tasks, Notes, Planner, Focus Room, Analytics modules with JWT security." },
    { icon: <BarChart3 size={16} className="text-secondary-light" />, title: "Pomodoro Focus Timer", desc: "Real-time focus timer with Chart.js productivity tracking & streak analytics." },
    { icon: <Database size={16} className="text-emerald-400" />, title: "7-Table MySQL Schema", desc: "Normalized relational schema with indexed lookups for fast retrieval." },
    { icon: <Cloud size={16} className="text-yellow-400" />, title: "One-Command Docker Setup", desc: "Containerized multi-container setup with Docker Compose & Swagger UI docs." }
  ];

  return (
    <motion.div 
      className="py-24 relative overflow-hidden bg-bg-darkest min-h-screen text-text-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-1/4 left-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1450px] mx-auto px-6 relative z-10 space-y-24">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary-light uppercase tracking-wider">
            Featured Projects Spotlight
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-text-title tracking-tight mt-4">
            Engineering Projects Case Studies
          </h2>
          <p className="text-text-muted mt-4 max-w-2xl mx-auto text-xs md:text-sm leading-relaxed">
            Projects I have built from scratch — each with a real codebase, enterprise Java stack, and complete UI.
          </p>
        </div>

        {/* ======================================================== */}
        {/* SPOTLIGHT 1: MULTIVENDOR MARKETPLACE                     */}
        {/* ======================================================== */}
        <div className="space-y-10 max-w-6xl mx-auto border-b border-white/10 pb-20">
          <div className="text-left border-l-4 border-primary pl-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">Flagship Project Spotlight 01</span>
            <h3 className="text-2xl md:text-3xl font-bold font-display text-text-title mt-1">{multiVendor.title}</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Details */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {multiVendor.tech.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-text-muted text-[10px] font-bold font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {multiVendor.desc}
                </p>
              </div>

              {/* Features list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {multiVendorFeatures.map((feat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex gap-3 shadow-sm hover:border-primary/20 transition-all">
                    <div className="p-2 h-fit rounded-lg bg-bg-dark border border-white/5 shrink-0">
                      {feat.icon}
                    </div>
                    <div>
                      <h5 className="text-[11px] font-bold text-text-title mb-1 font-display leading-tight">{feat.title}</h5>
                      <p className="text-[9px] text-text-muted leading-normal">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setSelectedModalProject(multiVendor as any)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  View Case Study Details
                  <ExternalLink size={12} />
                </button>
                <a
                  href={multiVendor.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/5 text-text-title text-xs font-bold border border-white/5 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <FaGithub size={12} />
                  Code Repository
                </a>
              </div>
            </div>

            {/* Right Interactive panel */}
            <div className="lg:col-span-7">
              {/* Tab Selector */}
              <div className="flex flex-wrap items-center gap-1.5 mb-5 border-b border-white/5 pb-2">
                {[
                  { id: 'preview', label: 'Marketplace UI', icon: <Layers size={12} /> },
                  { id: 'architecture', label: 'Vendor Hub UI', icon: <Database size={12} /> },
                  { id: 'features', label: 'Challenges Solved', icon: <CheckSquare size={12} /> },
                  { id: 'roadmap', label: 'Architecture Roadmap', icon: <Cloud size={12} /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setMultiVendorTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all border cursor-pointer ${
                      multiVendorTab === tab.id 
                        ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30 text-text-title shadow-sm' 
                        : 'text-text-muted border-transparent hover:text-text-title'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content box */}
              <div className="glass-aurora rounded-2xl overflow-hidden border border-white/5 min-h-[350px] shadow-2xl shadow-indigo-950/20">
                <AnimatePresence mode="wait">
                  
                  {/* 1. Marketplace UI */}
                  {multiVendorTab === 'preview' && (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col justify-between h-full min-h-[350px] bg-[#0F172A] text-slate-200 select-none overflow-hidden"
                    >
                      <div className="flex items-center justify-between bg-slate-900 border-b border-slate-800 py-2.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block shadow-sm" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block shadow-sm" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block shadow-sm" />
                        </div>
                        <span className="text-[9px] bg-slate-950 border border-slate-800 rounded px-6 py-0.5 text-slate-400 font-mono truncate w-[45%] text-center shadow-inner">
                          multivendor.app/marketplace
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-300 border border-emerald-500/30 text-[9px] font-mono font-bold uppercase shadow-sm">
                          PRODUCTION
                        </span>
                      </div>

                      <div 
                        onClick={() => setSelectedModalProject(multiVendor as any)}
                        className="relative w-full h-[320px] overflow-hidden group cursor-pointer"
                        title="Click to view full project details"
                      >
                        <img 
                          src="/images/multivendor-1.png" 
                          alt="MultiVendor Marketplace Screen" 
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* 2. Vendor Hub UI */}
                  {multiVendorTab === 'architecture' && (
                    <motion.div
                      key="architecture"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col justify-between h-full min-h-[350px] bg-[#0F172A] text-slate-200 select-none overflow-hidden"
                    >
                      <div className="flex items-center justify-between bg-slate-900 border-b border-slate-800 py-2.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block shadow-sm" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block shadow-sm" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block shadow-sm" />
                        </div>
                        <span className="text-[9px] bg-slate-950 border border-slate-800 rounded px-6 py-0.5 text-slate-400 font-mono truncate w-[45%] text-center shadow-inner">
                          multivendor.app/vendor-hub
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-300 border border-emerald-500/30 text-[9px] font-mono font-bold uppercase shadow-sm">
                          VENDOR HUB
                        </span>
                      </div>

                      <div 
                        onClick={() => setSelectedModalProject(multiVendor as any)}
                        className="relative w-full h-[320px] overflow-hidden group cursor-pointer"
                        title="Click to view full project details"
                      >
                        <img 
                          src="/images/multivendor-2.png" 
                          alt="MultiVendor Vendor Hub Screen" 
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* 3. Challenges */}
                  {multiVendorTab === 'features' && (
                    <motion.div
                      key="features"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-6 text-left space-y-6"
                    >
                      <h5 className="text-sm font-bold text-text-title uppercase tracking-widest border-b border-white/5 pb-2">
                        ENGINEERING RESOLUTIONS
                      </h5>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-primary-light block">Concurrency & Read Speeds</span>
                          <p className="text-[11px] text-text-muted leading-relaxed">
                            Optimized student lookups by creating index structures on relational columns.
                          </p>
                          <span className="text-[10px] font-mono font-bold text-emerald-400 block">Relational Indexes</span>
                        </div>
                        
                        <div className="space-y-1 pt-2 border-t border-white/5">
                          <span className="text-[11px] font-bold text-primary-light block">Granular Role Enforcements</span>
                          <p className="text-[11px] text-text-muted leading-relaxed">
                            Implemented robust auth middleware checks via JWT claims on every endpoint.
                          </p>
                          <span className="text-[10px] font-mono font-bold text-emerald-400 block">JWT Middleware</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* 4. Roadmap */}
                  {multiVendorTab === 'roadmap' && (
                    <motion.div
                      key="roadmap"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-6 space-y-5 text-left"
                    >
                      <h5 className="text-sm font-bold text-text-title mb-1.5 flex items-center gap-2">
                        <Cloud size={14} className="text-primary-light" />
                        Architecture Roadmap
                      </h5>
                      <div className="relative border-l border-white/5 pl-6 space-y-4 text-left">
                        {[
                          { title: "Spring Boot 3 REST Controllers & DTOs", desc: "Clean controller-service-repository architecture with validation annotations." },
                          { title: "Pessimistic DB Locks & Reservation Daemons", desc: "Pessimistic locking to protect booking slots with 10-minute hold daemons." },
                          { title: "Dual OTP Auth & JWT Security", desc: "Dual-identifier 6-digit OTP verification with JWT stateless session security." }
                        ].map((item, index) => (
                          <div key={index} className="relative">
                            <span className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-cyan-400 border border-bg-card" />
                            <h6 className="text-xs font-bold text-text-title leading-tight">{item.title}</h6>
                            <p className="text-[9px] text-text-muted mt-0.5 leading-normal">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SPOTLIGHT 2: STUDYSYNC STUDENT PRODUCTIVITY APP           */}
        {/* ======================================================== */}
        <div className="space-y-10 max-w-6xl mx-auto">
          <div className="text-left border-l-4 border-secondary pl-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-secondary">Flagship Project Spotlight 02</span>
            <h3 className="text-2xl md:text-3xl font-bold font-display text-text-title mt-1">{studySync.title}</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Details */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {studySync.tech.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-text-muted text-[10px] font-bold font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {studySync.desc}
                </p>
              </div>

              {/* Features list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {studySyncFeatures.map((feat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex gap-3 shadow-sm hover:border-secondary/20 transition-all">
                    <div className="p-2 h-fit rounded-lg bg-bg-dark border border-white/5 shrink-0">
                      {feat.icon}
                    </div>
                    <div>
                      <h5 className="text-[11px] font-bold text-text-title mb-1 font-display leading-tight">{feat.title}</h5>
                      <p className="text-[9px] text-text-muted leading-normal">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setSelectedModalProject(studySync as any)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-secondary to-primary text-white text-xs font-bold shadow-md shadow-secondary/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  View Case Study Details
                  <ExternalLink size={12} />
                </button>
                <a
                  href={studySync.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/5 text-text-title text-xs font-bold border border-white/5 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <FaGithub size={12} />
                  Code Repository
                </a>
              </div>
            </div>

            {/* Right Interactive panel */}
            <div className="lg:col-span-7">
              {/* Tab Selector */}
              <div className="flex flex-wrap items-center gap-1.5 mb-5 border-b border-white/5 pb-2">
                {[
                  { id: 'preview', label: 'Student Workspace UI', icon: <Layers size={12} /> },
                  { id: 'architecture', label: 'Pomodoro Focus UI', icon: <Database size={12} /> },
                  { id: 'features', label: 'Challenges Solved', icon: <CheckSquare size={12} /> },
                  { id: 'roadmap', label: 'Architecture Roadmap', icon: <Cloud size={12} /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStudySyncTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all border cursor-pointer ${
                      studySyncTab === tab.id 
                        ? 'bg-gradient-to-r from-secondary/20 to-primary/20 border-secondary/30 text-text-title shadow-sm' 
                        : 'text-text-muted border-transparent hover:text-text-title'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content box */}
              <div className="glass-aurora rounded-2xl overflow-hidden border border-white/5 min-h-[350px] shadow-2xl shadow-indigo-950/20">
                <AnimatePresence mode="wait">
                  
                  {/* 1. Student Workspace UI */}
                  {studySyncTab === 'preview' && (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col justify-between h-full min-h-[350px] bg-[#0F172A] text-slate-200 select-none overflow-hidden"
                    >
                      <div className="flex items-center justify-between bg-slate-900 border-b border-slate-800 py-2.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block shadow-sm" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block shadow-sm" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block shadow-sm" />
                        </div>
                        <span className="text-[9px] bg-slate-950 border border-slate-800 rounded px-6 py-0.5 text-slate-400 font-mono truncate w-[45%] text-center shadow-inner">
                          studysync.app/student-dashboard
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-300 border border-emerald-500/30 text-[9px] font-mono font-bold uppercase shadow-sm">
                          PRODUCTION
                        </span>
                      </div>

                      <div 
                        onClick={() => setSelectedModalProject(studySync as any)}
                        className="relative w-full h-[320px] overflow-hidden group cursor-pointer"
                        title="Click to view full project details"
                      >
                        <img 
                          src="/images/studysync-1.png" 
                          alt="StudySync Student Dashboard Screen" 
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* 2. Pomodoro Focus UI */}
                  {studySyncTab === 'architecture' && (
                    <motion.div
                      key="architecture"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col justify-between h-full min-h-[350px] bg-[#0F172A] text-slate-200 select-none overflow-hidden"
                    >
                      <div className="flex items-center justify-between bg-slate-900 border-b border-slate-800 py-2.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block shadow-sm" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block shadow-sm" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block shadow-sm" />
                        </div>
                        <span className="text-[9px] bg-slate-950 border border-slate-800 rounded px-6 py-0.5 text-slate-400 font-mono truncate w-[45%] text-center shadow-inner">
                          studysync.app/focus-room
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-300 border border-emerald-500/30 text-[9px] font-mono font-bold uppercase shadow-sm">
                          FOCUS ROOM
                        </span>
                      </div>

                      <div 
                        onClick={() => setSelectedModalProject(studySync as any)}
                        className="relative w-full h-[320px] overflow-hidden group cursor-pointer"
                        title="Click to view full project details"
                      >
                        <img 
                          src="/images/studysync-2.png" 
                          alt="StudySync Focus Room Screen" 
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* 3. Challenges */}
                  {studySyncTab === 'features' && (
                    <motion.div
                      key="features"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-6 text-left space-y-6"
                    >
                      <h5 className="text-sm font-bold text-text-title uppercase tracking-widest border-b border-white/5 pb-2">
                        ENGINEERING RESOLUTIONS
                      </h5>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-secondary-light block">Pomodoro Timer State Sync</span>
                          <p className="text-[11px] text-text-muted leading-relaxed">
                            Synced background focus timer intervals across tab switches using Web Workers & React Custom Hooks.
                          </p>
                          <span className="text-[10px] font-mono font-bold text-emerald-400 block">Web Workers & Hooks</span>
                        </div>
                        
                        <div className="space-y-1 pt-2 border-t border-white/5">
                          <span className="text-[11px] font-bold text-secondary-light block">Aggregated Productivity Metrics</span>
                          <p className="text-[11px] text-text-muted leading-relaxed">
                            Optimized MySQL queries and Chart.js datasets to calculate weekly focus time & completion trends.
                          </p>
                          <span className="text-[10px] font-mono font-bold text-emerald-400 block">Chart.js Analytics</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* 4. Roadmap */}
                  {studySyncTab === 'roadmap' && (
                    <motion.div
                      key="roadmap"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-6 space-y-5 text-left"
                    >
                      <h5 className="text-sm font-bold text-text-title mb-1.5 flex items-center gap-2">
                        <Cloud size={14} className="text-secondary-light" />
                        Architecture Roadmap
                      </h5>
                      <div className="relative border-l border-white/5 pl-6 space-y-4 text-left">
                        {[
                          { title: "30+ RESTful APIs across 7 Modules", desc: "Clean controller-service-repository architecture covering Tasks, Notes, Planner & Analytics." },
                          { title: "Pomodoro Timer & Chart.js Integration", desc: "Interactive timer with Chart.js analytics for focus sessions and study streaks." },
                          { title: "Docker Compose & OpenAPI/Swagger Docs", desc: "Containerized deployment with full OpenAPI Swagger documentation." }
                        ].map((item, index) => (
                          <div key={index} className="relative">
                            <span className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-emerald-400 border border-bg-card" />
                            <h6 className="text-xs font-bold text-text-title leading-tight">{item.title}</h6>
                            <p className="text-[9px] text-text-muted mt-0.5 leading-normal">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* PROJECT GRID WITH SEARCH AND FILTERS                     */}
        {/* ======================================================== */}
        <div className="border-t border-white/5 pt-16 space-y-12">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'All', label: 'All' },
                { id: 'Full Stack', label: 'Full Stack' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveProjectFilter(filter.id as any)}
                  className={`px-4.5 py-2 text-xs font-bold rounded-full transition-all duration-300 border cursor-pointer ${
                    activeProjectFilter === filter.id 
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30 text-text-title shadow-sm font-extrabold'
                      : 'border-white/5 text-text-muted hover:text-text-title hover:bg-white/5'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                <Search size={14} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by technology, name, or keywords..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 focus:border-primary/50 outline-none text-xs text-text-title transition-all duration-300 shadow-inner"
              />
            </div>

          </div>

          {/* Grid display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  className="p-6 rounded-[24px] glass-aurora border border-white/5 flex flex-col justify-between shadow-md hover:shadow-[0_20px_40px_rgba(0,0,0,0.45)] hover:shadow-primary/5 hover:border-primary/40 text-left h-full group transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Visual mockup block */}
                  <div className="w-full rounded-xl border border-slate-200/10 bg-slate-50 shadow-lg shadow-black/20 overflow-hidden relative mb-4 select-none">
                    <div className="bg-slate-100 border-b border-slate-200 py-2 px-3 flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                      </div>
                      <span className="text-[8px] font-mono text-slate-400 truncate w-[60%] text-center">
                        {project.title.toLowerCase().replace(/\s+/g, '-')}.ravindra.dev
                      </span>
                      <div className="w-3" />
                    </div>
                    
                    {project.image ? (
                      <div 
                        onClick={() => setSelectedModalProject(project as any)}
                        className="w-full h-[180px] relative overflow-hidden bg-slate-900 group cursor-pointer"
                        title="Click to view full project details"
                      >
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="p-6 min-h-[90px] bg-[#070b1e]/90 flex flex-col justify-center items-center relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
                        <span className="text-[10px] font-bold text-text-title font-display relative z-10">{project.title}</span>
                        <span className="text-[8px] text-text-muted block mt-0.5 relative z-10">{project.tagline}</span>
                      </div>
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="space-y-4 flex-grow">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded bg-white/[0.01] border border-white/5 text-text-muted text-[8px] font-bold font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div>
                      <h4 className="text-base font-bold text-text-title font-display group-hover:text-primary-light transition-colors duration-200">
                        {project.title}
                      </h4>
                      <p className="text-[11px] text-text-muted mt-2 leading-relaxed">
                        {project.desc}
                      </p>
                    </div>

                    <div className="space-y-1.5 border-t border-white/5 pt-3">
                      {project.features.slice(0, 2).map((feat, fidx) => (
                        <div key={fidx} className="flex items-center gap-1.5 text-[9px] text-text-muted font-bold font-mono">
                          <CheckCircle2 size={10} className="text-emerald-400" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-5 text-[9px] font-bold font-mono">
                    <div className="flex gap-2">
                      <a href={project.demo} target="_blank" rel="noreferrer" className="text-primary-light hover:text-primary transition-colors flex items-center gap-1">
                        Explore Live Demo
                        <ExternalLink size={10} />
                      </a>
                      <a href={project.github} target="_blank" rel="noreferrer" className="text-text-muted hover:text-text-title transition-colors flex items-center gap-1">
                        Repository
                        <FaGithub size={10} />
                      </a>
                    </div>
                    <span className="text-text-muted">{project.status}</span>
                  </div>

                </motion.div>
              ))}
              
              {filteredProjects.length === 0 && (
                <div className="col-span-full py-16 text-center text-text-muted space-y-2">
                  <Globe className="mx-auto text-text-muted/40" size={36} />
                  <p className="text-sm font-bold text-text-title">No Projects Found</p>
                  <p className="text-xs">Try searching with another term or keyword.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
      {/* Project Case Study Modal */}
      <ProjectModal
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />
    </motion.div>
  );
}
