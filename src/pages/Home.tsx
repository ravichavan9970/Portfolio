import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Mail, Layers, Server, Database, 
  Cpu, Smartphone, CheckCircle2, Compass, AlertTriangle,
  ExternalLink, Terminal
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import AnimatedRole from '../components/AnimatedRole';
import ProjectModal, { type ProjectModalData } from '../components/ProjectModal';
import ArchitectureModal from '../components/ArchitectureModal';
import multiVendorAsset from '../assets/MultiVendor.png';
import studySyncAsset from '../assets/StudySync (1).png';
import shivchhatraAsset from '../assets/shivchhatra-1.png';
import profileAsset from '../assets/profile.jpg';



export default function Home() {
  const [activeProjectFilter, setActiveProjectFilter] = useState<'All' | 'Full Stack' | 'React'>('All');
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectModalData | null>(null);
  const [architectureModalOpen, setArchitectureModalOpen] = useState(false);
  const [architectureDefaultTab, setArchitectureDefaultTab] = useState<'dual-cloud' | 'pessimistic-lock'>('dual-cloud');

  useEffect(() => {
    const handleOpenArch = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab?: 'dual-cloud' | 'pessimistic-lock' }>;
      if (customEvent.detail?.tab) setArchitectureDefaultTab(customEvent.detail.tab);
      setArchitectureModalOpen(true);
    };
    window.addEventListener('open-architecture-modal', handleOpenArch);
    return () => window.removeEventListener('open-architecture-modal', handleOpenArch);
  }, []);

  // Form submission states
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);


  const handleContactSubmit = async (e: React.FormEvent | React.MouseEvent, channel: 'email' | 'whatsapp' = 'email') => {
    e.preventDefault();

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setSubmitError("Please fill in all fields before sending.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    const name = formState.name;
    const email = formState.email;
    const message = formState.message;

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message, channel })
    }).catch(() => null);

    if (channel === 'whatsapp') {
      const waUrl = `https://wa.me/917447661921?text=${encodeURIComponent(`Hi Ravindra,\n\nMy name is ${name} (${email}).\n\nMessage:\n${message}`)}`;
      window.open(waUrl, '_blank');
    } else {
      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(`Sender Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`);
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=ravindrachavan265125@gmail.com&su=${subject}&body=${body}`, '_blank');
    }

    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  // Flagship Projects Catalog with Hallmark Job-Driven Specs
  const projectsList = [
    {
      title: "Shivchhatra Trekkers – Sahyadri Expeditions & Heritage Hub",
      tagline: "Enterprise Fort Expeditions, UTR Auditor & Dual-Cloud Disaster Recovery",
      desc: "Architected a full-stack expedition booking and fortress heritage platform using Java 21, Spring Boot 3.3.3, React 19, and Vite. Features dual-cloud disaster recovery replication across Render web services, dynamic UPI QR instant bookings with 12-digit UTR bank payment auditor, real-time boarding pass tracker (/track), and an encyclopedic Maratha fort guide.",
      tech: ["Java 21 LTS", "Spring Boot 3.3.3", "React 19", "Spring Data JPA", "H2 Persistent DB", "Render Cloud", "Docker"],
      categories: ["Full Stack", "React"],
      link: "https://shivchhatra-trekkers.vercel.app",
      repo: "https://github.com/ravichavan9970/SHIVCHHATRA_TREKKERS.git",
      status: "Production Ready · 99.98% SLA",
      image: shivchhatraAsset,
      isSpotlight: true,
      archTab: 'dual-cloud' as const,
      metrics: {
        sla: "99.98% Uptime",
        concurrency: "600 req/min Throttled",
        dataLoss: "0% on Cloud Outage"
      },
      problem: "Weekend registration spikes caused single-cloud outages and booking duplicate race conditions.",
      solution: "Engineered dual active-standby Render replication with cryptographic delta stream signing and dynamic slot locks."
    },
    {
      title: "MultiVendor – Marketplace & Service Booking Engine",
      tagline: "High-Concurrency Java 21 Enterprise Marketplace with Pessimistic Locking",
      desc: "Architected a full-stack multi-vendor marketplace using Java 21, Spring Boot 3.2.5, Spring Security JWT, Spring Data JPA, and MySQL. Features real-time slot booking with 10-minute hold reservation daemons, pessimistic database locking to prevent overbooking, dual-identifier 6-digit OTP auth, and vendor earnings analytics.",
      tech: ["Java 21", "Spring Boot 3", "Spring Security JWT", "MySQL 8", "React 19", "Tailwind CSS"],
      categories: ["Full Stack", "React"],
      link: "https://github.com/ravichavan9970/MultiVendor.git",
      repo: "https://github.com/ravichavan9970/MultiVendor.git",
      status: "Production Ready · Zero-Collision",
      image: multiVendorAsset,
      isSpotlight: true,
      archTab: 'pessimistic-lock' as const,
      metrics: {
        sla: "100% Stock Accuracy",
        concurrency: "PESSIMISTIC_WRITE Lock",
        holdDuration: "10-Min Auto Sweeper"
      },
      problem: "Concurrent checkouts on final inventory items caused negative stock race conditions in flash sales.",
      solution: "Implemented JPA row-level exclusive locks (SELECT ... FOR UPDATE) paired with an automated @Scheduled hold expiration daemon."
    },
    {
      title: "StudySync – Student Productivity & Analytics Suite",
      tagline: "Student Productivity Platform & Focus Command Center",
      desc: "Developed 30+ RESTful APIs across 7 modules (Authentication, Tasks, Notes, Planner, Focus Room, Analytics) using controller-service-repository architecture and JWT security. Built a Pomodoro focus timer with Chart.js analytics and containerized the application using Docker Compose.",
      tech: ["Java 21", "Spring Boot 3", "React 19", "Chart.js", "Docker Compose", "MySQL 8"],
      categories: ["Full Stack", "React"],
      link: "https://github.com/ravichavan9970/StudySync.git",
      repo: "https://github.com/ravichavan9970/StudySync.git",
      status: "Production Ready · Containerized",
      image: studySyncAsset,
      isSpotlight: false,
      archTab: 'dual-cloud' as const,
      metrics: {
        apis: "30+ REST Endpoints",
        schema: "7 Normalized Tables",
        deploy: "1-Command Docker Compose"
      },
      problem: "Fragmented student workflows lacking structured focus metrics and persistent Pomodoro session telemetry.",
      solution: "Built unified modular REST APIs with real-time Chart.js study analytics and session state synchronization."
    }
  ];

  const filteredProjects = projectsList.filter(project => {
    if (activeProjectFilter === 'All') return true;
    return project.categories.includes(activeProjectFilter);
  });

  // Timeline journey
  const milestones = [
    {
      step: "2024 – 2026",
      title: "Master of Computer Science (M.Sc. CS)",
      subtitle: "New Arts Commerce & Science College, Shevgaon · 8.5 CGPA",
      desc: "Advanced distributed computing, database management architectures, algorithm design, and transaction isolation levels.",
      tech: ["Distributed Systems", "Advanced Java", "DBMS", "Software Architecture"]
    },
    {
      step: "2021 – 2024",
      title: "Bachelor of Computer Science (B.Sc. CS)",
      subtitle: "New Arts Commerce & Science College, Shevgaon · 8.4 CGPA",
      desc: "Distinction academic foundation in data structures, relational SQL schemas, operating systems, and OOP principles.",
      tech: ["Core Java", "C/C++", "Data Structures", "SQL", "OOP"]
    },
    {
      step: "2024 – 2026",
      title: "Associate Software Engineer & Enterprise Development",
      subtitle: "Full-Stack Java 21 & Distributed Services",
      desc: "Architected high-concurrency systems (Shivchhatra Trekkers, MultiVendor Marketplace), dual-cloud disaster recovery, and pessimistic row locking pipelines.",
      tech: ["Java 21 LTS", "Spring Boot 3.3.3", "Spring Security JWT", "Docker", "React 19"]
    }
  ];

  return (
    <motion.div
      className="relative bg-bg-darkest min-h-screen text-text-main overflow-x-hidden pt-[80px] hallmark-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── 1. HALLMARK HERO: TECHNICAL BLUEPRINT MACROSTRUCTURE ───────── */}
      <section id="hero" className="relative min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] flex items-center justify-center py-6 lg:py-0 overflow-hidden z-10 border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SIDE: Architectural Specimen & Positioning */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-3.5 sm:space-y-4">
            
            {/* Specimen Status Line */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/10 font-mono text-[10px] text-primary-light uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SPECIMEN: RC-2026 // SYSTEM ARCHITECT</span>
              </span>
              <span className="text-[10px] font-mono text-text-muted hidden sm:inline-block">
                PUNE, IN · AVAILABLE FOR HIRE
              </span>
            </div>

            {/* Authoritative Headline in Space Grotesk */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white leading-none">
                Ravindra Chavan
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm sm:text-base font-mono text-cyan-300 font-semibold">
                  Full-Stack Java Engineer
                </span>
                <span className="text-text-muted">·</span>
                <AnimatedRole className="text-xs sm:text-sm font-mono text-text-muted" />
              </div>
            </div>

            {/* Substantive Engineering Statement (Anti-Slop) */}
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-xl font-sans">
              Architecting high-concurrency enterprise services with <strong className="text-white font-semibold">Java 21 LTS</strong>, <strong className="text-white font-semibold">Spring Boot 3.3</strong>, and <strong className="text-white font-semibold">React 19</strong>. Specialized in dual-cloud disaster recovery failovers, pessimistic database locking, and zero-downtime ledger synchronization.
            </p>

            {/* 4-Column Technical Specification Strip (Hallmark Blueprint) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5">
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-left">
                <span className="text-[9px] font-mono uppercase tracking-wider text-text-muted block">Runtime</span>
                <strong className="text-xs font-mono text-white mt-0.5 block">Java 21 LTS</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-left">
                <span className="text-[9px] font-mono uppercase tracking-wider text-text-muted block">Framework</span>
                <strong className="text-xs font-mono text-white mt-0.5 block">Spring Boot 3.3</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-left">
                <span className="text-[9px] font-mono uppercase tracking-wider text-text-muted block">Concurrency</span>
                <strong className="text-xs font-mono text-emerald-400 mt-0.5 block">Pessimistic Lock</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-left">
                <span className="text-[9px] font-mono uppercase tracking-wider text-text-muted block">Topology</span>
                <strong className="text-xs font-mono text-cyan-400 mt-0.5 block">Dual-Cloud DR</strong>
              </div>
            </div>

            {/* Action Controls */}
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Explore Flagship Work</span>
                <ArrowRight size={14} />
              </a>

              <button
                type="button"
                onClick={() => {
                  setArchitectureDefaultTab('dual-cloud');
                  setArchitectureModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-cyan-500/50 text-xs font-bold font-mono transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Layers size={14} className="text-cyan-400" />
                <span>Inspect Architecture</span>
              </button>

              <a
                href="/resume/Ravindra_Chavan_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] text-text-muted hover:text-white border border-white/[0.08] text-xs font-bold font-mono transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: The Engineering Dossier & Telemetry */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[330px] xl:max-w-[350px] rounded-2xl p-3.5 bg-[#0b0f19] border border-white/10 shadow-2xl space-y-2.5">
              
              {/* Dossier Header Tag */}
              <div className="flex items-center justify-between text-[10px] font-mono text-text-muted border-b border-white/[0.08] pb-2">
                <span className="flex items-center gap-1.5 text-white font-semibold">
                  <Terminal size={12} className="text-primary-light" />
                  RC_DOSSIER.json
                </span>
                <span>GEO: 18.5204° N, 73.8567° E</span>
              </div>

              {/* Framed Portrait with Hallmark Blueprint Border */}
              <div className="relative w-full h-[270px] sm:h-[285px] rounded-xl overflow-hidden border border-white/10 bg-black/40 group shadow-lg">
                <img 
                  src={profileAsset} 
                  alt="Ravindra Chavan" 
                  className="w-full h-full object-cover object-[center_38%] transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/85 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono z-10">
                  <span className="px-2 py-0.5 rounded-md bg-black/80 border border-white/15 text-white backdrop-blur-md shadow-md">
                    Ravindra Chavan, M.Sc.
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold backdrop-blur-md shadow-md">
                    8.5 CGPA
                  </span>
                </div>
              </div>

              {/* Live Telemetry Card */}
              <div className="grid grid-cols-2 gap-2 p-2 rounded-xl bg-black/50 border border-white/[0.08] text-[10px] font-mono">
                <div>
                  <span className="text-text-muted block text-[8px] uppercase">SLA Uptime</span>
                  <span className="text-emerald-400 font-bold">99.98% Guaranteed</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[8px] uppercase">Topology</span>
                  <span className="text-cyan-300 font-bold">Dual-Cloud DR</span>
                </div>
              </div>

              {/* Compact Social Dock */}
              <div className="flex items-center justify-center gap-2 pt-0.5">
                <a href="https://github.com/ravichavan9970" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/10 text-text-muted hover:text-white border border-white/5 transition cursor-pointer" title="GitHub">
                  <FaGithub size={13} />
                </a>
                <a href="https://www.linkedin.com/in/ravindra-chavan-4ba744250/" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/10 text-text-muted hover:text-blue-400 border border-white/5 transition cursor-pointer" title="LinkedIn">
                  <FaLinkedin size={13} />
                </a>
                <a href="https://wa.me/917447661921" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/10 text-text-muted hover:text-emerald-400 border border-white/5 transition cursor-pointer" title="WhatsApp">
                  <FaWhatsapp size={13} />
                </a>
                <a href="https://www.instagram.com/ravi_chavan_2002?igsh=MTBsd2dnN2N0bjlyOA==" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/10 text-text-muted hover:text-pink-400 border border-white/5 transition cursor-pointer" title="Instagram">
                  <FaInstagram size={13} />
                </a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ravindrachavan265125@gmail.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/10 text-text-muted hover:text-cyan-400 border border-white/5 transition cursor-pointer" title="Email via Gmail">
                  <Mail size={13} />
                </a>
              </div>
            </div>
          </div>

        </div></section>

      {/* ── 2. FLAGSHIP PROJECTS: JOB-DRIVEN ARCHITECTURAL CASE STUDIES ── */}
      <section id="projects" className="py-20 md:py-28 relative z-10 max-w-[1280px] mx-auto px-6 border-b border-white/[0.08]">
        <div className="space-y-12">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left border-b border-white/[0.08] pb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-primary-light font-bold">
                // ARCHITECTURAL DOSSIER //
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-1">
                Flagship Enterprise Projects
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveProjectFilter('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer ${
                  activeProjectFilter === 'All'
                    ? 'bg-white text-black font-bold'
                    : 'bg-white/[0.04] text-text-muted hover:text-white border border-white/[0.08]'
                }`}
              >
                All (3)
              </button>
              <button
                type="button"
                onClick={() => setActiveProjectFilter('Full Stack')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer ${
                  activeProjectFilter === 'Full Stack'
                    ? 'bg-white text-black font-bold'
                    : 'bg-white/[0.04] text-text-muted hover:text-white border border-white/[0.08]'
                }`}
              >
                Full Stack
              </button>
            </div>
          </div>

          {/* Project Cards (Job-Driven Layout) */}
          <div className="space-y-12">
            {filteredProjects.map((project, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/10 bg-[#0b0f19] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 hover:border-white/20 transition-all duration-300"
              >
                {/* Left: Project Details & Architectural Solution */}
                <div className="lg:col-span-7 flex flex-col justify-between text-left space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold">
                        {project.status}
                      </span>
                      <span className="text-xs font-mono text-text-muted">
                        CASE STUDY 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">
                      {project.desc}
                    </p>
                  </div>

                  {/* Problem vs Solution Comparison Box */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs font-sans">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block">
                        Problem Statement:
                      </span>
                      <p className="text-text-muted text-[11px] leading-relaxed">
                        {project.problem}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                        Engineering Solution:
                      </span>
                      <p className="text-text-muted text-[11px] leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono text-text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Bar */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {project.link.startsWith('http') && !project.link.includes('github') && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-white text-black font-bold text-xs flex items-center gap-2 hover:bg-neutral-200 transition cursor-pointer"
                      >
                        <span>Live Application</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 text-xs font-mono font-bold flex items-center gap-2 transition cursor-pointer"
                    >
                      <FaGithub size={14} />
                      <span>Source Code</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setArchitectureDefaultTab(project.archTab);
                        setArchitectureModalOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary-light border border-primary/30 text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Layers size={13} />
                      <span>View Blueprint</span>
                    </button>
                  </div>
                </div>

                {/* Right: Project Screenshot Preview */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 group relative aspect-[16/10]">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white/80">
                      <span>VERIFIED ARTIFACT</span>
                      <span>1-CLICK DEMO</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 3. SKILLS & ARCHITECTURAL STACK ───────────────────────────── */}
      <section id="skills" className="py-20 max-w-[1280px] mx-auto px-6 border-b border-white/[0.08]">
        <div className="space-y-10 text-left">
          
          <div className="border-b border-white/[0.08] pb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-primary-light font-bold">
              // ARCHITECTURAL CAPABILITIES //
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-1">
              Core Tech Stack & Engineering Discipline
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Backend */}
            <div className="p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Backend & Concurrency</span>
                <Server size={18} className="text-primary-light" />
              </div>
              <ul className="space-y-2 text-xs text-text-muted font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <strong className="text-white">Java 21 (LTS)</strong> · Virtual Threads
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <strong className="text-white">Spring Boot 3.3.3</strong> · Microservices
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <strong className="text-white">Spring Data JPA</strong> · Hibernate
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <strong className="text-white">Spring Security</strong> · JWT Stateless
                </li>
              </ul>
            </div>

            {/* Card 2: Persistence */}
            <div className="p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Persistence & Locking</span>
                <Database size={18} className="text-emerald-400" />
              </div>
              <ul className="space-y-2 text-xs text-text-muted font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <strong className="text-white">MySQL 8.0</strong> · Query Optimization
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <strong className="text-white">Pessimistic Locking</strong> · Row-Level
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <strong className="text-white">H2 Disk DB</strong> · Persistent Journal
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <strong className="text-white">HikariCP</strong> · Pool Tuning
                </li>
              </ul>
            </div>

            {/* Card 3: Frontend */}
            <div className="p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Modern Reactive UI</span>
                <Smartphone size={18} className="text-purple-400" />
              </div>
              <ul className="space-y-2 text-xs text-text-muted font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <strong className="text-white">React 19</strong> · Vite Single Page
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <strong className="text-white">TypeScript</strong> · Type Safe
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <strong className="text-white">Tailwind CSS 4</strong> · OKLCH Colors
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <strong className="text-white">Framer Motion</strong> · Kinetic Flow
                </li>
              </ul>
            </div>

            {/* Card 4: DevOps */}
            <div className="p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Cloud & Reliability</span>
                <Cpu size={18} className="text-amber-400" />
              </div>
              <ul className="space-y-2 text-xs text-text-muted font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <strong className="text-white">Dual-Cloud Failover</strong> · Render
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <strong className="text-white">Docker & Compose</strong> · Isolated
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <strong className="text-white">JUnit 5 / Mockito</strong> · Test Suites
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <strong className="text-white">Swagger / OpenAPI</strong> · Contracts
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. CHRONOLOGICAL MILESTONES (HALLMARK DOSSIER TIMELINE) ─────── */}
      <section id="journey" className="py-20 max-w-[1280px] mx-auto px-6 border-b border-white/[0.08]">
        <div className="space-y-10 text-left">
          
          <div className="border-b border-white/[0.08] pb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-primary-light font-bold">
              // CHRONOLOGY //
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-1">
              Education & Engineering Milestones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    {m.step}
                  </span>
                  <h3 className="text-base font-bold text-white font-display">
                    {m.title}
                  </h3>
                  <p className="text-[11px] font-mono text-amber-300">
                    {m.subtitle}
                  </p>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {m.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. CONTACT & HIRE ME (DIRECT CHANNELS) ────────────────────── */}
      <section id="contact" className="py-20 max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-primary-light font-bold">
                // GET IN TOUCH //
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-1">
                Initiate Conversation
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              Open to Java Full-Stack roles, distributed backend engineering, and high-concurrency cloud projects. Available for immediate onboarding.
            </p>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/10">
                <Mail size={16} className="text-cyan-400 shrink-0" />
                <span className="text-white select-all">ravindrachavan265125@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/10">
                <FaWhatsapp size={16} className="text-emerald-400 shrink-0" />
                <span className="text-white select-all">+91 74476 61921 (WhatsApp Direct)</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/10">
                <Compass size={16} className="text-purple-400 shrink-0" />
                <span className="text-text-muted">Pune, Maharashtra, India (Open to Relocation & Remote)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-[#0b0f19] border border-white/10 shadow-2xl">
              <AnimatePresence mode="wait">
                {!submitSuccess ? (
                  <form onSubmit={(e) => handleContactSubmit(e, 'email')} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="text-xs font-mono uppercase text-text-muted block mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. John Doe / Engineering Manager"
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-text-muted/50 text-xs focus:outline-none focus:border-cyan-400 font-sans"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="text-xs font-mono uppercase text-text-muted block mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. john@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-text-muted/50 text-xs focus:outline-none focus:border-cyan-400 font-sans"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="text-xs font-mono uppercase text-text-muted block mb-1.5">
                        Project Brief or Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Discuss role opportunity, architecture question, or project inquiry..."
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-text-muted/50 text-xs focus:outline-none focus:border-cyan-400 font-sans resize-none"
                      />
                    </div>

                    {submitError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono flex items-center gap-2 rounded-lg">
                        <AlertTriangle size={14} />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="py-3 px-5 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Mail size={14} />
                        <span>Send via Email</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleContactSubmit(e, 'whatsapp')}
                        disabled={isSubmitting}
                        className="py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2"
                      >
                        <FaWhatsapp size={15} />
                        <span>Send via WhatsApp</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="py-8 text-center space-y-4 font-mono">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={24} />
                    </div>
                    <h3 className="text-base font-bold text-white">Message Prepared Successfully</h3>
                    <p className="text-xs text-text-muted">
                      Your message has been initiated. You can re-open or send another message anytime.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitSuccess(false)}
                      className="px-4 py-2 rounded-xl border border-white/10 text-xs text-white hover:bg-white/5 transition cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* Modals */}
      <ProjectModal
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />

      <ArchitectureModal
        isOpen={architectureModalOpen}
        onClose={() => setArchitectureModalOpen(false)}
        defaultTab={architectureDefaultTab}
      />
    </motion.div>
  );
}
