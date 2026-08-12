import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ArrowRight, Mail, Layers, Code2, Server, Database, 
  Sparkles, Cpu, Smartphone, CheckCircle2, Compass, BookOpen, AlertTriangle
} from 'lucide-react';
import { FaPython, FaReact, FaNodeJs, FaDocker, FaGithub, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { SiPostgresql, SiTailwindcss, SiTypescript, SiExpress, SiPrisma } from 'react-icons/si';
import AnimatedRole from '../components/AnimatedRole';
import ProjectModal, { type ProjectModalData } from '../components/ProjectModal';
import multiVendorAsset from '../assets/MultiVendor.png';
import studySyncAsset from '../assets/StudySync (1).png';



// 2. Background floating particles
const ParticleBackground = () => {
  const [particles, setParticles] = useState<Array<{ id: number; top: string; left: string; size: number; delay: number }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 1.5 + Math.random() * 2,
      delay: Math.random() * 4,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-15">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/40"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.1, 0.7, 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

// 3. Social Dock
const SocialDock = () => {
  const socials = [
    { icon: <Mail size={18} />, url: "https://mail.google.com/mail/?view=cm&fs=1&to=ravindrachavan265125@gmail.com", label: "Email via Gmail", color: "hover:text-[#06B6D4]" },
    { icon: <FaGithub size={18} />, url: "https://github.com/ravichavan9970", label: "GitHub", color: "hover:text-white" },
    { icon: <FaLinkedin size={18} />, url: "https://www.linkedin.com/in/ravindra-chavan-4ba744250/", label: "LinkedIn", color: "hover:text-[#3B82F6]" },
    { icon: <FaInstagram size={18} />, url: "https://www.instagram.com/ravi_chavan_2002?igsh=MTBsd2dnN2N0bjlyOA==", label: "Instagram", color: "hover:text-[#EC4899]" },
  ];

  return (
    <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-white/[0.02] border border-white/5 shadow-2xl w-fit mx-auto backdrop-blur-md">
      {socials.map((social, idx) => (
        <motion.a
          key={idx}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-text-muted transition-colors ${social.color} p-2 rounded-xl hover:bg-white/5 flex items-center justify-center cursor-pointer`}
          whileHover={{ scale: 1.2, y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 12 }}
          title={social.label}
        >
          {social.icon}
        </motion.a>
      ))}
    </div>
  );
};

const CountUp = ({ value, duration = 1500, suffix = "" }: { value: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [elementRef, setElementRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!elementRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = value;
          if (start === end) return;

          const totalMilliseconds = duration;
          const incrementTime = Math.max(Math.floor(totalMilliseconds / end), 20);
          
          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) {
              clearInterval(timer);
            }
          }, incrementTime);

          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(elementRef);
    return () => observer.disconnect();
  }, [elementRef, value, duration]);

  return (
    <span ref={setElementRef}>
      {count}{suffix}
    </span>
  );
};

const ScrollIndicator = ({ roleTyped }: { roleTyped: boolean }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={roleTyped ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
      transition={{ delay: 0.65, duration: 0.8 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 pointer-events-auto"
      onClick={() => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    >
      <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-text-muted uppercase">Scroll Down</span>
      <div className="w-[24px] h-[38px] rounded-full border border-text-muted/30 flex justify-center p-1.5 hover:border-primary/50 transition-colors">
        <motion.div 
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-1.5 h-1.5 rounded-full bg-primary"
        />
      </div>
    </motion.div>
  );
};

const typewriterTexts = [
  "Java Full Stack Developer",
  "Associate Software Engineer",
  "Spring Boot 3 & Microservices",
  "High-Concurrency Systems",
  "REST API Architectures",
  "MySQL & Spring Security JWT"
];

export default function Home() {


  // Mouse move parallax coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const reactParallaxX = useTransform(springX, (v) => v * 0.3);
  const reactParallaxY = useTransform(springY, (v) => v * 0.3);

  const tsParallaxX = useTransform(springX, (v) => v * -0.25);
  const tsParallaxY = useTransform(springY, (v) => v * -0.25);

  const nodeParallaxX = useTransform(springX, (v) => v * 0.4);
  const nodeParallaxY = useTransform(springY, (v) => v * 0.4);

  const pgParallaxX = useTransform(springX, (v) => v * 0.35);
  const pgParallaxY = useTransform(springY, (v) => v * 0.35);

  const dockerParallaxX = useTransform(springX, (v) => v * 0.2);
  const dockerParallaxY = useTransform(springY, (v) => v * 0.2);

  const pythonParallaxX = useTransform(springX, (v) => v * -0.35);
  const pythonParallaxY = useTransform(springY, (v) => v * -0.35);

  const prismaParallaxX = useTransform(springX, (v) => v * -0.3);
  const prismaParallaxY = useTransform(springY, (v) => v * -0.3);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x * 40);
    mouseY.set(y * 40);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Typewriter effect

  const [typewriterText, setTypewriterText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [roleTyped, setRoleTyped] = useState(false);

  useEffect(() => {
    const handleType = () => {
      const currentFullText = typewriterTexts[textIndex];
      if (!isDeleting) {
        setTypewriterText(currentFullText.slice(0, typewriterText.length + 1));
        setTypingSpeed(55);
        
        if (typewriterText === currentFullText) {
          if (textIndex === 0) {
            setRoleTyped(true);
          }
          setTypingSpeed(3500);
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
  }, [typewriterText, isDeleting, textIndex, typingSpeed]);

  const [activeProjectFilter, setActiveProjectFilter] = useState<'All' | 'Full Stack' | 'React' | 'SaaS' | 'ERP' | 'Portfolio'>('All');
  


  // Form submission states
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastSubmitted, setLastSubmitted] = useState({ name: '', email: '', message: '' });
  const [lastSubmittedChannel, setLastSubmittedChannel] = useState<'email' | 'whatsapp'>('email');
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectModalData | null>(null);

  const handleContactSubmit = async (e: React.FormEvent | React.MouseEvent, channel: 'email' | 'whatsapp' = 'email') => {
    e.preventDefault();

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setSubmitError("Please fill in all fields before sending.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setLastSubmittedChannel(channel);

    const name = formState.name;
    const email = formState.email;
    const message = formState.message;

    setLastSubmitted({ name, email, message });

    // 1. Send to background API if server active
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message, channel })
    }).catch(() => null);

    // 2. Open channel URL in new tab
    if (channel === 'whatsapp') {
      const waUrl = `https://wa.me/917447661921?text=${encodeURIComponent(`Hi Ravindra,\n\nMy name is ${name} (${email}).\n\nMessage:\n${message}`)}`;
      window.open(waUrl, '_blank');
    } else {
      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(`Sender Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`);
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ravindrachavan265125@gmail.com&su=${subject}&body=${body}`;
      window.open(gmailUrl, '_blank');
    }

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormState({ name: '', email: '', message: '' });
  };

  // What I Do Cards
  const whatIDoItems = [
    {
      title: "Java Full Stack Development",
      desc: "Architecting end-to-end applications using Java 21, Spring Boot 3, Spring Data JPA, MySQL 8.0, and React frontend interfaces.",
      icon: <Code2 size={24} className="text-primary-light" />,
      glowColor: "hover:shadow-[0_0_30px_var(--color-primary-hover)] hover:border-primary/25",
    },
    {
      title: "Backend Core & Microservices",
      desc: "Building RESTful microservices with controller-service-repository patterns, stateless JWT authentication, and Swagger docs.",
      icon: <Server size={24} className="text-secondary-light" />,
      glowColor: "hover:shadow-[0_0_30px_var(--color-secondary-hover)] hover:border-secondary/25",
    },
    {
      title: "Database Engineering & JPA",
      desc: "Designing 3NF relational schemas in MySQL 8.0, managing JPA/Hibernate mappings, index tuning, and pessimistic locking.",
      icon: <Database size={24} className="text-secondary" />,
      glowColor: "hover:shadow-[0_0_30px_var(--color-secondary)] hover:border-secondary/25",
    },
    {
      title: "High-Concurrency Daemons",
      desc: "Engineering high-concurrency reservation daemons (@Scheduled background tasks) with race condition protection and real-time receipts.",
      icon: <Layers size={24} className="text-primary" />,
      glowColor: "hover:shadow-[0_0_30px_var(--color-primary)] hover:border-primary/25",
    },
  ];

  // Skills Categories
  const skillsCategories = [
    {
      title: "Backend Core",
      icon: <Server size={20} className="text-secondary-light" />,
      skills: [
        { name: "Java 21", icon: <FaPython className="text-[#007396]" /> },
        { name: "Spring Boot 3", icon: <SiExpress className="text-[#6DB33F]" /> },
        { name: "Spring Security (JWT)", icon: <SiExpress className="text-[#6DB33F]" /> },
        { name: "Spring Data JPA", icon: <Layers className="text-purple-400" /> },
      ],
      glowClass: "hover:border-secondary-light/35"
    },
    {
      title: "Databases & ORM",
      icon: <Database size={20} className="text-secondary" />,
      skills: [
        { name: "MySQL 8.0", icon: <SiPostgresql className="text-[#4479A1]" /> },
        { name: "Hibernate / JPA", icon: <Database className="text-indigo-400" /> },
        { name: "Pessimistic Locking", icon: <Cpu className="text-emerald-400" /> },
      ],
      glowClass: "hover:border-secondary/35"
    },
    {
      title: "Frontend Stack",
      icon: <Smartphone size={20} className="text-primary-light" />,
      skills: [
        { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
        { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38BDF8]" /> },
        { name: "JavaScript (ES6+)", icon: <Sparkles className="text-yellow-400" /> },
      ],
      glowClass: "hover:border-primary-light/35"
    },
    {
      title: "DevOps & Testing",
      icon: <Cpu size={20} className="text-primary" />,
      skills: [
        { name: "Docker & Compose", icon: <FaDocker className="text-[#2496ED]" /> },
        { name: "JUnit 5 & Mockito", icon: <Sparkles className="text-red-400" /> },
        { name: "Swagger / OpenAPI", icon: <Code2 className="text-[#85EA2D]" /> },
        { name: "Git & GitHub", icon: <FaGithub className="text-white" /> },
      ],
      glowClass: "hover:border-primary/35"
    }
  ];

  // Project List
  const projectsList = [
    {
      title: "MultiVendor – Marketplace & Service Booking",
      tagline: "High-Concurrency Java 21 Enterprise Marketplace",
      desc: "Architected a full-stack multi-vendor marketplace using Java 21, Spring Boot 3.2.5, Spring Security JWT, Spring Data JPA, and MySQL. Features real-time slot booking with 10-minute hold reservation daemons, pessimistic database locking, dual-identifier 6-digit OTP auth, and vendor earnings analytics.",
      tech: ["Java 21", "Spring Boot 3.2.5", "Spring Security", "MySQL", "React"],
      categories: ["Full Stack", "React"],
      link: "https://github.com/ravichavan9970/MultiVendor.git",
      repo: "https://github.com/ravichavan9970/MultiVendor.git",
      status: "Production Ready",
      image: multiVendorAsset,
      isSpotlight: true,
      features: [
        "Dual-Identifier 6-Digit OTP Auth (Email & SMS)",
        "10-Min Hold Reservation (@Scheduled Tasks)",
        "Pessimistic Database Locking Protection",
        "Google Meet Link & Mailto Dispatch Integration"
      ]
    },
    {
      title: "StudySync – Student Productivity Web Application",
      tagline: "Student Productivity Platform & Focus Command Center",
      desc: "Developed 30+ RESTful APIs across 7 modules (Authentication, Tasks, Notes, Planner, Focus Room, Analytics) using controller-service-repository architecture and JWT security. Built a Pomodoro focus timer with Chart.js analytics and containerized the application using Docker Compose.",
      tech: ["Java 21", "Spring Boot", "React", "Docker Compose", "MySQL", "Chart.js"],
      categories: ["Full Stack", "React"],
      link: "https://github.com/ravichavan9970/StudySync.git",
      repo: "https://github.com/ravichavan9970/StudySync.git",
      status: "Production Ready",
      image: studySyncAsset,
      isSpotlight: false,
      features: [
        "30+ RESTful APIs across 7 Core Modules",
        "Pomodoro Timer with Chart.js Analytics",
        "Normalized 7-Table MySQL Schema",
        "One-Command Docker Compose Deployment"
      ]
    }
  ];

  const filteredProjects = projectsList.filter(project => {
    if (activeProjectFilter === 'All') return true;
    return project.categories.includes(activeProjectFilter as any);
  });

  // Timeline journey
  const milestones = [
    {
      step: "2021 – 2024",
      title: "Bachelor of Computer Science (B.Sc. CS)",
      subtitle: "Academic Foundation",
      desc: "New Arts Commerce & Science College, Shevgaon. Foundational computer science, algorithms, relational SQL databases, and object-oriented programming.",
      tech: ["Core Java", "C/C++", "Data Structures", "SQL", "OOP"]
    },
    {
      step: "2024 – 2026",
      title: "Master of Computer Science (M.Sc. CS)",
      subtitle: "Advanced Computer Science",
      desc: "New Arts Commerce & Science College, Shevgaon. Advanced software engineering principles, distributed systems, and software architecture.",
      tech: ["Advanced Java", "Distributed Computing", "Database Design", "Software Architecture"]
    },
    {
      step: "June 2026",
      title: "Java Full Stack Development Trainee",
      subtitle: "Naresh i Technologies, Hyderabad",
      desc: "Intensive training in enterprise Java 21, Spring Boot 3, Spring Security (JWT), Hibernate/JPA, REST APIs, MySQL 8.0, Docker, and React.",
      tech: ["Java 21", "Spring Boot 3", "Spring Security", "MySQL", "Docker", "React"]
    },
    {
      step: "2026",
      title: "MultiVendor Marketplace & Service Booking",
      subtitle: "🔥 FLAGSHIP PROJECT",
      desc: "Built a high-concurrency multi-vendor platform with 10-minute hold reservation daemons (@Scheduled), dual OTP auth, and pessimistic locking.",
      tech: ["Java 21", "Spring Boot 3.2.5", "Spring Security", "MySQL", "React"],
      badge: "🔥 FLAGSHIP PROJECT",
      highlight: true
    },
    {
      step: "2026",
      title: "StudySync – Student Productivity App",
      subtitle: "🚀 ENTERPRISE PRODUCTIVITY",
      desc: "Engineered 30+ RESTful APIs across 7 modules documented with Swagger and containerized via Docker Compose.",
      tech: ["Java 21", "Spring Boot", "React", "Docker Compose", "MySQL"],
      badge: "🚀 ENTERPRISE PRODUCTIVITY"
    }
  ];

  return (
    <motion.div
      className="relative bg-bg-darkest min-h-screen text-text-main overflow-hidden pt-[80px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* -------------------- Aurora Blurred Background Orbs -------------------- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-10] select-none">
        <div className="absolute top-[3%] left-[8%] w-[450px] h-[450px] rounded-full orb-cyan blur-[130px] animate-aurora-slow" />
        <div className="absolute top-[22%] right-[4%] w-[550px] h-[550px] rounded-full orb-purple blur-[140px] animate-aurora-fast" />
        <div className="absolute top-[48%] left-[-8%] w-[500px] h-[500px] rounded-full orb-pink blur-[125px] animate-aurora-slow" />
        <div className="absolute top-[72%] right-[8%] w-[480px] h-[480px] rounded-full orb-blue blur-[120px] animate-aurora-fast" />
        <div className="absolute top-[88%] left-[15%] w-[420px] h-[420px] rounded-full orb-emerald blur-[115px] animate-aurora-slow" />
      </div>

      {/* Background Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-5] select-none">
        <ParticleBackground />
      </div>      {/* -------------------- SPLIT-SCREEN HERO SECTION -------------------- */}
      <section id="hero" className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-8 overflow-hidden z-10 scroll-mt-[80px]">
        <div className="max-w-[1280px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT SIDE: Personal Branding Layout */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left py-4 md:py-8">
            {/* WELCOME Status Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-fit mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-[10px] font-mono font-bold uppercase tracking-wider text-primary-light">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-light opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                WELCOME
              </span>
            </motion.div>

            {/* Heading & Massive Name */}
            <div className="mb-4 w-full max-w-[850px] overflow-visible z-10 relative select-none cursor-default">
              <div className="absolute inset-0 bg-[#38BDF8]/15 blur-[40px] z-[1] pointer-events-none rounded-full w-full h-full" />
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                whileHover={{ scale: 1.02 }}
                style={{ fontSize: "clamp(48px, 5vw, 68px)", lineHeight: "1", letterSpacing: "-0.03em" }}
                className="font-black font-display name-gradient-text relative select-none cursor-default whitespace-nowrap overflow-visible z-10 pb-1"
              >
                Ravindra Chavan
              </motion.h1>
            </div>

            {/* Subtitle/Role with rotating professional titles */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="mb-5 space-y-1.5 text-left"
            >
              {/* Rotating Title */}
              <div className="relative h-[28px] md:h-[34px] overflow-hidden w-full">
                <AnimatedRole className="text-xl md:text-2xl absolute left-0 top-0" />
              </div>

              {/* Typing Animation */}
              <p className="text-[10px] md:text-xs font-mono font-bold text-secondary-light tracking-widest uppercase h-5 flex items-center">
                {typewriterText}
                <span className="w-[2px] h-3.5 bg-primary-light ml-1 animate-pulse inline-block" />
              </p>
            </motion.div>

            {/* Short description (Coordinated Reveal) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={roleTyped ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-sm md:text-base text-text-muted leading-relaxed max-w-2xl mb-6 space-y-3"
            >
              <p>
                Building scalable, secure enterprise Java applications and high-concurrency systems using Java 21, Spring Boot 3, Spring Security (JWT), and MySQL.
              </p>
              <p>
                Experienced in REST API design, pessimistic database locking, Docker Compose containerization, and writing clean test suites (JUnit 5/Mockito).
              </p>
            </motion.div>

            {/* Social Icons row (Coordinated Reveal) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={roleTyped ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="flex items-center gap-3 mb-8"
            >
              {[
                { icon: <Mail size={16} />, url: "https://mail.google.com/mail/?view=cm&fs=1&to=ravindrachavan265125@gmail.com", label: "Email via Gmail", color: "hover:text-[#06B6D4] hover:border-[#06B6D4]/30" },
                { icon: <FaGithub size={16} />, url: "https://github.com/ravichavan9970", label: "GitHub", color: "hover:text-white hover:border-white/30" },
                { icon: <FaLinkedin size={16} />, url: "https://www.linkedin.com/in/ravindra-chavan-4ba744250/", label: "LinkedIn", color: "hover:text-[#3B82F6] hover:border-[#3B82F6]/30" },
                { icon: <FaInstagram size={16} />, url: "https://www.instagram.com/ravi_chavan_2002?igsh=MTBsd2dnN2N0bjlyOA==", label: "Instagram", color: "hover:text-[#EC4899] hover:border-[#EC4899]/30" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-text-muted transition-all duration-300 flex items-center justify-center cursor-pointer ${social.color}`}
                  whileHover={{ scale: 1.15, y: -2 }}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* Actions (Coordinated Reveal) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={roleTyped ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                View My Work
                <ArrowRight size={14} />
              </a>
              <a
                href="/resume/Ravindra_Chavan_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.03] hover:bg-white/5 text-text-title border border-white/5 hover:border-primary/20 text-xs font-bold active:scale-95 transition-all duration-300 cursor-pointer hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
              >
                📄 View Resume
              </a>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Apple Vision Pro style independent floating system with Mouse Parallax */}
          <motion.div 
            className="lg:col-span-6 flex justify-center items-center relative min-h-[500px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Outer Box Container with center profile image */}
            <div className="relative w-[360px] h-[360px] md:w-[500px] md:h-[500px] flex items-center justify-center">
              
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
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  className="relative w-60 h-60 md:w-[330px] md:h-[330px] rounded-full p-[3px] bg-gradient-to-tr from-primary via-secondary to-primary-light shadow-[0_0_45px_rgba(139,92,246,0.35)] flex-shrink-0 z-10"
                >
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-bg-darkest relative bg-bg-dark flex items-center justify-center shadow-inner">
                    <img 
                      src="/images/profile.jpg" 
                      alt="Ravindra Chavan profile" 
                      className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238B5CF6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
                      }}
                    />
                    {/* Glass Reflection Highlight */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-transparent pointer-events-none rounded-full" />
                  </div>
                </motion.div>
              </div>

              {/* Independent Floating Tech Badges (Circular Orbit) with Mouse Parallax transforms */}
              {[
                { name: "React", icon: <FaReact className="text-[#61DAFB]" />, pos: { top: '6%', right: '6%' }, x: [0, -5, 5, 0], y: [0, -8, 6, 0], duration: 6, delay: 0, glow: "rgba(97,218,251,0.25)", pX: reactParallaxX, pY: reactParallaxY },
                { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" />, pos: { top: '48%', right: '-10%' }, x: [0, -8, 6, 0], y: [0, -4, 8, 0], duration: 7, delay: 0.5, glow: "rgba(49,120,198,0.25)", pX: tsParallaxX, pY: tsParallaxY },
                { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" />, pos: { top: '6%', left: '6%' }, x: [0, 6, -5, 0], y: [0, -6, 8, 0], duration: 8, delay: 0.2, glow: "rgba(51,153,51,0.25)", pX: nodeParallaxX, pY: nodeParallaxY },
                { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" />, pos: { bottom: '6%', left: '6%' }, x: [0, 8, -6, 0], y: [0, 6, -10, 0], duration: 7.5, delay: 0.8, glow: "rgba(65,105,225,0.25)", pX: pgParallaxX, pY: pgParallaxY },
                { name: "Docker", icon: <FaDocker className="text-[#2496ED]" />, pos: { top: '-10%', left: '42%' }, x: [0, 4, -4, 0], y: [0, -10, 6, 0], duration: 9, delay: 0, glow: "rgba(36,150,237,0.25)", pX: dockerParallaxX, pY: dockerParallaxY },
                { name: "Python", icon: <FaPython className="text-[#3776AB]" />, pos: { top: '48%', left: '-10%' }, x: [0, 6, -8, 0], y: [0, 8, -6, 0], duration: 6.5, delay: 1.0, glow: "rgba(55,118,171,0.25)", pX: pythonParallaxX, pY: pythonParallaxY },
                { name: "Prisma", icon: <SiPrisma className="text-white" />, pos: { bottom: '6%', right: '6%' }, x: [0, -6, 6, 0], y: [0, 8, -8, 0], duration: 8.5, delay: 1.2, glow: "rgba(255,255,255,0.15)", pX: prismaParallaxX, pY: prismaParallaxY },
              ].map((badge) => {
                return (
                  <motion.div
                    key={badge.name}
                    className="absolute z-20"
                    style={{
                      ...badge.pos,
                      x: badge.pX,
                      y: badge.pY
                    }}
                  >
                    <motion.div
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
                      className="p-2 px-3 rounded-xl bg-bg-card backdrop-blur-md border border-white/10 shadow-xl flex items-center gap-1.5 cursor-default hover:border-primary/50 transition-colors"
                      whileHover={{
                        scale: 1.1,
                        boxShadow: `0 0 20px ${badge.glow}`,
                      }}
                    >
                      <span className="text-base flex items-center justify-center">{badge.icon}</span>
                      <span className="text-[9px] font-bold font-mono text-text-muted">{badge.name}</span>
                    </motion.div>
                  </motion.div>
                );
              })}

            </div>
          </motion.div>
          
        </div>
        
        {/* Scroll Indicator Reveal */}
        <ScrollIndicator roleTyped={roleTyped} />
      </section>


      {/* -------------------- ABOUT SECTION -------------------- */}
      <section id="about" className="py-24 relative border-t border-white/5 bg-bg-dark/15 z-10 scroll-mt-[104px]">
        <div className="max-w-[1400px] mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text font-display text-xs font-bold tracking-widest uppercase mb-3 bg-white/[0.02] border border-white/5 px-3.5 py-1.5 rounded-full">
              WHO I AM
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-text-title tracking-tight mt-4">
              About & Core Competencies
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Card: Summary Description */}
            <motion.div 
              className="lg:col-span-8 p-8 rounded-[32px] glass-aurora border border-white/5 relative overflow-hidden flex flex-col justify-between"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-left">
                <h3 className="text-xl md:text-2xl font-bold font-display text-text-title mb-5 flex items-center gap-2">
                  <Sparkles size={22} className="text-primary animate-pulse" />
                  Ravindra Chavan
                </h3>
                <p className="text-sm md:text-base text-text-muted leading-relaxed mb-6">
                  Results-driven Full-Stack Java Software Engineer with hands-on experience building scalable, secure enterprise applications using Java 21, Spring Boot 3, Spring Security (JWT), and MySQL. Skilled in REST API design, high-concurrency systems with pessimistic locking, containerized deployments (Docker), and test-driven development (JUnit 5/Mockito).
                </p>
                <p className="text-sm md:text-base text-text-muted leading-relaxed">
                  Experienced building responsive frontend UIs in React and collaborating in Agile teams to deliver features from design through production. Completed intensive full-stack training at Naresh i Technologies, Hyderabad.
                </p>
              </div>

              {/* Genuine Information Block */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/5">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted font-mono mb-2 block">CORE FOCUS</span>
                  <ul className="text-xs text-text-main space-y-1.5 font-bold font-mono">
                    <li>• Java Full-Stack Architecture</li>
                    <li>• Spring Boot REST APIs</li>
                    <li>• Pessimistic Locking & Daemons</li>
                    <li>• MySQL & Docker Containerization</li>
                  </ul>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted font-mono mb-2 block">TECH STACK</span>
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {['Java 21', 'Spring Boot 3', 'Spring Security', 'MySQL', 'Docker', 'React', 'JUnit 5'].map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-[9px] text-text-muted font-mono font-bold">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted font-mono mb-2 block">LOCATION</span>
                  <span className="text-xs text-text-main font-bold font-mono">Pune, Maharashtra, India</span>
                </div>
              </div>
            </motion.div>

            {/* Right Card: Education Dashboard widget */}
            <motion.div 
              className="lg:col-span-4 p-8 rounded-[32px] glass-aurora border border-white/5 text-left flex flex-col justify-between"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div>
                <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text font-mono text-[10px] font-bold tracking-widest uppercase mb-3 bg-white/[0.02] border border-white/5 px-3 py-1 rounded-full">
                  ACADEMICS & TRAINING
                </span>
                <h3 className="text-lg font-bold font-display text-text-title mt-4 mb-3">
                  Education & Training
                </h3>
                <div className="text-xs text-text-muted leading-relaxed space-y-2">
                  <p>• <strong>M.Sc. CS</strong> – New Arts Commerce & Science College, Shevgaon (2024–2026)</p>
                  <p>• <strong>B.Sc. CS</strong> – New Arts Commerce & Science College, Shevgaon (2021–2024)</p>
                  <p>• <strong>Java Full Stack Trainee</strong> – Naresh i Technologies, Hyderabad (June 2026)</p>
                </div>
              </div>
              
              <div className="mt-8 p-4 rounded-xl bg-white/[0.01] border border-white/5 flex gap-3 items-center">
                <BookOpen className="text-primary-light" size={24} />
                <span className="text-[11px] font-mono text-text-muted font-semibold">Master of Computer Science (M.Sc. CS)</span>
              </div>
            </motion.div>
          </div>

          {/* Stats Counters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
            {[
              { value: 6, suffix: "+", label: "Core Services", desc: "API dev, DB designs, SaaS components, UI setups, and prompt engineering." },
              { value: 12, suffix: "+", label: "Stack Tools", desc: "Languages, databases, frameworks, and deployment engines." },
              { text: "100%", suffix: "", label: "Verifiable Code", desc: "Every project has a live repository and real codebases." },
              { text: "24/7", suffix: "", label: "Active Learning", desc: "Constantly building, optimizing, and exploring new systems." }
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 text-center flex flex-col justify-between shadow-inner h-full min-h-[160px]"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div>
                  <span className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-display block">
                    {'value' in stat ? (
                      <CountUp value={stat.value!} suffix={stat.suffix} />
                    ) : (
                      <span>{stat.text}{stat.suffix}</span>
                    )}
                  </span>
                  <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider text-text-muted mt-2 block">
                    {stat.label}
                  </span>
                </div>
                <p className="text-[10px] md:text-xs text-text-muted/80 leading-relaxed mt-3 pt-3 border-t border-white/5 font-medium">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Highlight Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
            {[
              {
                title: "Java & Spring Boot Core",
                icon: <Code2 className="text-primary-light" size={20} />,
                desc: "Designing enterprise REST APIs, Spring Security JWT claims, and controller-service-repository layers.",
                techs: ["Java 21", "Spring Boot 3", "Spring Security", "Spring Data JPA"]
              },
              {
                title: "High-Concurrency Daemons",
                icon: <Server className="text-secondary-light" size={20} />,
                desc: "Engineering automated 10-minute hold reservation daemons (@Scheduled tasks) with pessimistic DB locks.",
                techs: ["Pessimistic Locking", "@Scheduled Tasks", "Transactions", "Concurrency"]
              },
              {
                title: "Relational DB Engineering",
                icon: <Database className="text-primary" size={20} />,
                desc: "Designing 3NF normalized schemas, indexing lookup columns, and configuring Hibernate entity mappings.",
                techs: ["MySQL 8.0", "Hibernate JPA", "Indexing", "Normalized Schemas"]
              },
              {
                title: "Docker & Frontend Integration",
                icon: <FaDocker className="text-secondary" size={20} />,
                desc: "Containerizing microservice environments with Docker Compose and connecting to React client applications.",
                techs: ["Docker", "Docker Compose", "React", "Swagger / OpenAPI"]
              }
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                className="p-6 rounded-[24px] glass-aurora border border-white/5 flex flex-col justify-between text-left transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/5 group"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl w-fit mb-5 group-hover:border-primary/30 transition-colors">
                  {card.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-title font-display mb-2">{card.title}</h4>
                  <p className="text-[11px] text-text-muted leading-relaxed mb-4">{card.desc}</p>
                </div>
                <div className="flex flex-wrap gap-1 mt-auto pt-3 border-t border-white/5">
                  {card.techs.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-[9px] text-text-muted font-mono font-semibold">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Expanded Personal Story & Current Goals Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <motion.div
              className="p-8 rounded-[32px] glass-aurora border border-white/5 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted font-mono mb-2.5 block">THE PATHWAY</span>
              <h4 className="text-lg font-bold font-display text-text-title mb-4">My Personal Coding Story</h4>
              <p className="text-xs md:text-sm text-text-muted leading-relaxed select-none">
                My software engineering journey began during my Computer Science degrees (B.Sc. & M.Sc.) at New Arts Commerce & Science College, Shevgaon. Driven by a passion for backend systems, I specialized in Java 21, Spring Boot 3, and MySQL at Naresh i Technologies in Hyderabad. Building projects like MultiVendor Marketplace and StudySync taught me how to solve high-concurrency race conditions, implement dual OTP authentication, and structure clean microservice layers.
              </p>
            </motion.div>

            <motion.div
              className="p-8 rounded-[32px] glass-aurora border border-white/5 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted font-mono mb-2.5 block">THE FUTURE</span>
              <h4 className="text-lg font-bold font-display text-text-title mb-4">My Development Goals</h4>
              <p className="text-xs md:text-sm text-text-muted leading-relaxed select-none">
                I am actively seeking an Associate Software Engineer role in Java Full-Stack Development. My focus is on writing robust enterprise microservices, optimizing database transactions, and building high-performance backend platforms while continuously expanding my cloud and containerization skills.
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* -------------------- WHAT I DO SERVICES SECTION -------------------- */}
      <section className="py-24 relative border-t border-white/5 z-10">
        <div className="max-w-[1400px] mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-transparent bg-gradient-to-r from-secondary to-primary bg-clip-text font-display text-xs font-bold tracking-widest uppercase mb-3 bg-white/[0.02] border border-white/5 px-3.5 py-1.5 rounded-full">
              WHAT I DO
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-text-title tracking-tight mt-4">
              Core Engineering Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatIDoItems.map((item, idx) => (
              <motion.div
                key={idx}
                className={`p-6 rounded-[24px] glass-aurora border border-white/5 flex flex-col h-full group text-left ${item.glowColor}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl w-fit mb-5 group-hover:border-primary/35 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-text-title font-display mb-3">
                  {item.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed mt-auto">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------- SKILLS WIDGETS SECTION -------------------- */}
      <section id="skills" className="py-24 relative border-t border-white/5 bg-bg-dark/15 z-10 scroll-mt-[104px]">
        <div className="max-w-[1400px] mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text font-display text-xs font-bold tracking-widest uppercase mb-3 bg-white/[0.02] border border-white/5 px-3.5 py-1.5 rounded-full">
              My Tech Stack
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-text-title tracking-tight mt-4">
              Full-Stack Tooling & Expertise
            </h2>
          </div>

          {/* Equal height dashboard widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
            {skillsCategories.map((category, idx) => (
              <motion.div
                key={idx}
                className={`p-6 rounded-[24px] glass-aurora border border-white/5 flex flex-col justify-between h-[500px] min-h-[500px] group text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] ${category.glowClass}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                {/* Upper content wrapper */}
                <div className="flex flex-col gap-6 w-full">
                  {/* Header: Icon + Title */}
                  <div className="flex items-center gap-2.5 pb-4 border-b border-white/5">
                    <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                      {category.icon}
                    </div>
                    <h4 className="text-xs font-bold text-text-title font-display uppercase tracking-wider">
                      {category.title}
                    </h4>
                  </div>

                  {/* Skills List - Starts at same vertical offset */}
                  <div className="flex flex-col gap-2.5">
                    {category.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-all duration-200 cursor-default"
                      >
                        <span className="text-lg flex items-center justify-center">
                          {skill.icon}
                        </span>
                        <span className="text-xs font-semibold text-text-muted font-mono">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Badge - Pushed to bottom */}
                <div className="mt-auto pt-4 border-t border-white/5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-mono font-bold text-primary-light uppercase tracking-wider">
                    Verified Stack
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------- PROJECTS SECTION -------------------- */}
      <section id="projects" className="py-24 relative border-t border-white/5 z-10 scroll-mt-[104px]">
        <div className="max-w-[1400px] mx-auto px-6">

          {/* Header row: title left, filters right */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <span className="text-transparent bg-gradient-to-r from-secondary to-primary bg-clip-text font-display text-xs font-bold tracking-widest uppercase">
                Featured Project
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-text-title tracking-tight mt-2">
                Engineering Projects Case Studies
              </h2>
              <p className="text-text-muted mt-4 max-w-2xl mx-auto text-xs md:text-sm leading-relaxed">
                Projects I have built from scratch — each with a real codebase, verifiable tech stack, and a GitHub repository.
              </p>
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'All', label: 'All' },
                { id: 'Full Stack', label: 'Full Stack' },
                { id: 'React', label: 'React' },
                { id: 'SaaS', label: 'SaaS' },
                { id: 'ERP', label: 'ERP' },
                { id: 'Portfolio', label: 'Portfolio' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveProjectFilter(filter.id as any)}
                  className={`px-4 py-1.5 text-[11px] font-bold rounded-full transition-all duration-300 border cursor-pointer whitespace-nowrap ${
                    activeProjectFilter === filter.id
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/40 text-text-title shadow-sm'
                      : 'border-white/8 text-text-muted hover:text-text-title hover:bg-white/5'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2-column card grid */}
          <div className={`grid gap-8 ${filteredProjects.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 lg:grid-cols-2'}`}>
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, pIdx) => (
                <motion.div
                  key={project.title}
                  layout
                  className="rounded-[24px] glass-aurora border border-white/5 relative overflow-hidden flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: pIdx * 0.08 }}
                  whileHover={{ y: -8, boxShadow: '0 24px 60px rgba(99,102,241,0.18)' }}
                >
                  {/* ── Browser mockup preview (light, forced inline) ── */}
                  <div
                    className="w-full rounded-t-[24px] overflow-hidden shrink-0"
                    style={{ background: '#ffffff', borderBottom: '1px solid rgba(0,0,0,0.07)' }}
                  >
                    {/* Browser chrome */}
                    <div
                      className="flex items-center gap-1.5 px-3 py-2"
                      style={{ background: '#f1f5f9', borderBottom: '1px solid rgba(0,0,0,0.05)' }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ background: '#f87171' }} />
                      <span className="w-2 h-2 rounded-full" style={{ background: '#fbbf24' }} />
                      <span className="w-2 h-2 rounded-full" style={{ background: '#4ade80' }} />
                      <div
                        className="ml-2 flex-1 max-w-[160px] rounded px-2 py-0.5 text-center text-[9px] font-mono truncate"
                        style={{ background: 'rgba(0,0,0,0.05)', color: '#64748b' }}
                      >
                        {project.title.toLowerCase().replace(/\s+/g, '-')}.dev
                      </div>
                    </div>

                    {/* Preview viewport — 230px */}
                    <div 
                      onClick={() => setSelectedModalProject(project as any)}
                      className="relative overflow-hidden w-full h-[230px] group/img bg-slate-950 cursor-pointer"
                      title="Click to view full project details"
                    >
                      <img 
                        src={(project as any).image || (project.title.includes('MultiVendor') ? multiVendorAsset : studySyncAsset)} 
                        alt={project.title} 
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105" 
                      />
                    </div>
                  </div>

                  {/* ── Card text body ── */}
                  <div className="p-6 flex flex-col gap-4 flex-1">
                    {/* Tech chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/5 text-text-muted text-[10px] font-bold font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Title & status */}
                    <div onClick={() => setSelectedModalProject(project as any)} className="cursor-pointer group/title">
                      <h3 className="text-xl md:text-2xl font-bold font-display text-text-title leading-tight mb-1 group-hover/title:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs font-bold text-primary font-mono uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                        {project.status}
                      </p>
                    </div>

                    <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                      {project.desc}
                    </p>

                    {/* Feature checklist */}
                    <div className="grid grid-cols-2 gap-2">
                      {project.features.map((feat, fidx) => (
                        <div key={fidx} className="flex items-center gap-2 text-xs text-text-muted font-bold font-mono">
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                          {feat}
                        </div>
                      ))}
                    </div>

                    {/* CTA buttons */}
                    <div className="flex flex-wrap gap-3 mt-auto pt-2">
                      <button
                        onClick={() => setSelectedModalProject(project as any)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                      >
                        View Project Details <ArrowRight size={13} />
                      </button>
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/5 text-text-title border border-white/5 hover:border-primary/20 text-xs font-bold active:scale-95 transition-all duration-300"
                      >
                        <FaGithub size={13} /> Repository
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>


      {/* -------------------- JOURNEY TIMELINE SECTION -------------------- */}
      <section id="experience" className="py-20 relative border-t border-white/5 bg-bg-dark/15 z-10 scroll-mt-[104px]">
        <div className="max-w-[1400px] mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text font-display text-xs font-bold tracking-widest uppercase mb-3 bg-white/[0.02] border border-white/5 px-3.5 py-1.5 rounded-full">
              Full Stack Development Journey
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-text-title tracking-tight mt-4">
              2026 — Full Stack Development Journey
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto py-8">
            {/* Left aligned vertical roadmap line */}
            <div className="absolute left-[17px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent" />
            
            <div className="space-y-6">
              {milestones.map((milestone, idx) => {
                const isHighlight = milestone.highlight;
                return (
                  <div key={idx} className="relative flex gap-6 pl-1.5 items-stretch">
                    
                    {/* Pulsing indicator node */}
                    <div className="flex flex-col items-center justify-center shrink-0 w-8">
                      <div className={`w-3.5 h-3.5 rounded-full bg-bg-darkest border-2 ${isHighlight ? 'border-primary shadow-[0_0_12px_rgba(139,92,246,0.6)]' : 'border-primary/45'} flex items-center justify-center relative z-10`}>
                        <span className={`absolute inset-0 rounded-full bg-primary/20 ${isHighlight ? 'animate-ping' : 'animate-pulse'}`} />
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-light" />
                      </div>
                    </div>
                    
                    {/* Content Card */}
                    <motion.div 
                      className={`w-full p-5 rounded-2xl border transition-all duration-300 text-left ${
                        isHighlight 
                          ? 'bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent border-primary/40 shadow-[0_0_20px_rgba(139,92,246,0.1)]'
                          : 'bg-white/[0.01] border border-white/5 hover:border-primary/20 hover:bg-white/[0.02]'
                      }`}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                    >
                      <div className="flex flex-wrap items-center gap-2.5 mb-2">
                        <span className="text-[9px] font-mono font-extrabold text-primary bg-primary/10 border border-primary/25 px-2 py-0.5 rounded">
                          {milestone.step}
                        </span>
                        {milestone.badge && (
                          <span className="text-[9px] font-mono font-extrabold text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 px-2 py-0.5 rounded">
                            {milestone.badge}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-base font-bold text-text-title font-display mb-1">
                        {milestone.title}
                      </h3>
                      {milestone.subtitle && !milestone.badge && (
                        <h4 className="text-[10px] font-bold text-secondary-light font-mono mb-2 uppercase tracking-wide">
                          {milestone.subtitle}
                        </h4>
                      )}
                      
                      {milestone.desc && (
                        <p className="text-xs text-text-muted leading-relaxed mb-3">
                          {milestone.desc}
                        </p>
                      )}

                      {/* Display bullets if any */}
                      {(milestone as any).bullets && (
                        <ul className="list-disc list-inside text-xs text-text-muted space-y-1 mb-3 pl-1 font-mono">
                          {((milestone as any).bullets as string[]).map((b: string) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      )}

                      {milestone.tech && milestone.tech.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {milestone.tech.map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[9px] text-text-muted font-mono font-bold">{t}</span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* -------------------- GITHUB OPEN SOURCE PRESENCE SECTION -------------------- */}
      <section id="github" className="py-24 relative border-t border-white/5 bg-bg-dark/15 z-10 scroll-mt-[104px]">
        <div className="max-w-[1400px] mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-transparent bg-gradient-to-r from-emerald-400 to-primary bg-clip-text font-display text-xs font-bold tracking-widest uppercase mb-3 bg-white/[0.02] border border-white/5 px-3.5 py-1.5 rounded-full">
              GITHUB CODE
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-text-title tracking-tight mt-4">
              Open Source Presence
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="p-8 rounded-[32px] glass-aurora border border-white/5 shadow-2xl flex flex-col md:flex-row gap-8 items-center justify-between text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex-grow">
                <span className="text-xs font-bold text-primary font-mono block mb-2">github.com/ravichavan9970</span>
                <h3 className="text-2xl font-bold text-text-title font-display mb-3">Exploring Open Source Repositories</h3>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed max-w-xl">
                  I host enterprise full-stack Java codebases, microservice modules, and project blueprints on GitHub. Inspect commit logs, read through repository architectures, and follow my work.
                </p>

                <div className="flex gap-4 mt-6">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted font-mono">MultiVendor Marketplace</span>
                    <a 
                      href="https://github.com/ravichavan9970" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs text-primary-light hover:text-white transition-colors font-bold font-mono"
                    >
                      Repository
                    </a>
                  </div>
                  <div className="w-px bg-white/5" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted font-mono">StudySync App</span>
                    <a 
                      href="https://github.com/ravichavan9970" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs text-primary-light hover:text-white transition-colors font-bold font-mono"
                    >
                      Repository
                    </a>
                  </div>
                </div>
              </div>

              <a
                href="https://github.com/ravichavan9970"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 w-full md:w-auto text-center"
              >
                <span>Follow on GitHub</span>
                <FaGithub size={14} />
              </a>
            </motion.div>
          </div>

        </div>
      </section>

      {/* -------------------- CONTACT SECTION -------------------- */}
      <section id="contact" className="py-24 relative border-t border-white/5 z-10 overflow-hidden scroll-mt-[104px]">
        <div className="max-w-[1400px] mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text font-display text-xs font-bold tracking-widest uppercase mb-3 bg-white/[0.02] border border-white/5 px-3.5 py-1.5 rounded-full">
              CONNECTION
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-text-title tracking-tight mt-4">
              Get In Touch
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 max-w-5xl mx-auto">
            
            {/* Left Detail Statement */}
            <motion.div 
              className="lg:col-span-5 flex flex-col text-center lg:text-left items-center lg:items-start"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold font-display text-text-title mb-4">
                Let's discuss an opportunity
              </h3>
              <p className="text-xs md:text-sm text-text-muted leading-relaxed mb-6">
                Have an engineering role, want to collaborate on enterprise projects, or looking to hire a full-stack Java developer? Shoot me a message.
              </p>
              <div className="flex items-center gap-3 text-xs text-text-muted font-bold mb-3 select-none font-mono">
                <Mail size={16} className="text-primary-light" />
                ravindrachavan265125@gmail.com
              </div>
              <div className="flex items-center gap-3 text-xs text-text-muted font-bold select-none font-mono">
                <Compass size={16} className="text-secondary-light" />
                Pune, Maharashtra, India
              </div>
            </motion.div>

            {/* Right Form */}
            <motion.div 
              className="lg:col-span-7 w-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div 
                className="p-8 rounded-[32px] border shadow-2xl relative backdrop-blur-md"
                style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border-dark)' }}
              >
                <AnimatePresence mode="wait">
                  {!submitSuccess ? (
                    <motion.form 
                      key="form"
                      onSubmit={(e) => handleContactSubmit(e, 'email')} 
                      className="space-y-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="flex flex-col text-left">
                        <label htmlFor="name" className="text-xs font-semibold text-[#374151] mb-2 tracking-[0.08em] uppercase font-mono">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="Enter your full name"
                          className="w-full px-4.5 py-3 rounded-2xl bg-white/75 backdrop-blur-[10px] border-[1.5px] border-[rgba(125,125,125,0.18)] focus:border-primary focus:shadow-[0_0_15px_rgba(139,92,246,0.25)] focus:scale-[1.01] transition-all duration-200 outline-none text-base text-[#111827] font-medium placeholder:text-[#94A3B8] placeholder:font-medium placeholder:transition-opacity placeholder:duration-200 focus:placeholder:opacity-0"
                        />
                      </div>

                      <div className="flex flex-col text-left">
                        <label htmlFor="email" className="text-xs font-semibold text-[#374151] mb-2 tracking-[0.08em] uppercase font-mono">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="Enter your email address"
                          className="w-full px-4.5 py-3 rounded-2xl bg-white/75 backdrop-blur-[10px] border-[1.5px] border-[rgba(125,125,125,0.18)] focus:border-primary focus:shadow-[0_0_15px_rgba(139,92,246,0.25)] focus:scale-[1.01] transition-all duration-200 outline-none text-base text-[#111827] font-medium placeholder:text-[#94A3B8] placeholder:font-medium placeholder:transition-opacity placeholder:duration-200 focus:placeholder:opacity-0"
                        />
                      </div>

                      <div className="flex flex-col text-left">
                        <label htmlFor="message" className="text-xs font-semibold text-[#374151] mb-2 tracking-[0.08em] uppercase font-mono">
                          Message
                        </label>
                        <textarea
                          id="message"
                          required
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          placeholder="Write your message here..."
                          className="w-full px-4.5 py-3 rounded-2xl bg-white/75 backdrop-blur-[10px] border-[1.5px] border-[rgba(125,125,125,0.18)] focus:border-primary focus:shadow-[0_0_15px_rgba(139,92,246,0.25)] focus:scale-[1.01] transition-all duration-200 outline-none text-base text-[#111827] font-medium placeholder:text-[#94A3B8] placeholder:font-medium placeholder:transition-opacity placeholder:duration-200 focus:placeholder:opacity-0 resize-none min-h-[180px]"
                        />
                      </div>

                      {submitError && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-[10px] font-bold font-mono flex items-center gap-2">
                          <AlertTriangle size={12} />
                          {submitError}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <button
                          type="button"
                          onClick={(e) => handleContactSubmit(e, 'email')}
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white text-xs font-bold transition-all duration-300 disabled:opacity-60 shadow-md shadow-primary/10 cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
                        >
                          <Mail size={15} />
                          <span>{isSubmitting && lastSubmittedChannel === 'email' ? "Sending..." : "Send via Email"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleContactSubmit(e, 'whatsapp')}
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-teal-600 hover:to-emerald-500 text-white text-xs font-bold transition-all duration-300 disabled:opacity-60 shadow-md shadow-emerald-500/10 cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
                        >
                          <FaWhatsapp size={16} />
                          <span>{isSubmitting && lastSubmittedChannel === 'whatsapp' ? "Sending..." : "Send via WhatsApp"}</span>
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success"
                      className="py-12 flex flex-col items-center justify-center text-center font-display"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <CheckCircle2 size={36} className="animate-bounce" />
                      </div>
                      <h4 className="text-xl font-bold text-[#111827] mb-2">
                        {lastSubmittedChannel === 'whatsapp' ? 'Message Prepared & WhatsApp Opened!' : 'Message Prepared & Gmail Opened!'}
                      </h4>
                      <p className="text-xs text-[#374151] max-w-sm font-semibold mb-4">
                        {lastSubmittedChannel === 'whatsapp'
                          ? <>WhatsApp has been opened in a new tab pre-filled with your message to <span className="text-emerald-600 font-bold">+91 74476 61921</span>.</>
                          : <>Gmail Web Composer has been opened in a new tab pre-filled with your message to <span className="text-primary font-bold">ravindrachavan265125@gmail.com</span>.</>
                        }
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-3 pt-2 w-full">
                        <a
                          href={`https://wa.me/917447661921?text=${encodeURIComponent(`Hi Ravindra, My name is ${lastSubmitted.name || 'a visitor'} (${lastSubmitted.email || ''}). Message: ${lastSubmitted.message || ''}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all duration-300 shadow-md cursor-pointer hover:scale-[1.02] justify-center"
                        >
                          <FaWhatsapp size={14} />
                          Send on WhatsApp
                        </a>
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=ravindrachavan265125@gmail.com&su=${encodeURIComponent(`Portfolio Message from ${lastSubmitted.name || 'a visitor'}`)}&body=${encodeURIComponent(`Sender Name: ${lastSubmitted.name || ''}\nSender Email: ${lastSubmitted.email || ''}\n\nMessage:\n${lastSubmitted.message || ''}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all duration-300 shadow-md cursor-pointer hover:scale-[1.02] justify-center"
                        >
                          <Mail size={14} />
                          Re-open Gmail
                        </a>
                        <button
                          onClick={() => setSubmitSuccess(false)}
                          className="flex items-center justify-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors cursor-pointer px-5 py-2.5 rounded-xl border border-primary/20 hover:bg-primary/5"
                        >
                          Send Another Message
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>

          {/* Social Dock */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SocialDock />
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />
    </motion.div>
  );
}
