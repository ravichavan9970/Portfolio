import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

interface TimelineStep {
  step: string;
  title: string;
  subtitle: string;
  desc: string;
  tech?: string[];
  bullets?: string[];
  badge?: string;
  highlight?: boolean;
}

export default function JourneyPage() {
  const journeySteps: TimelineStep[] = [
    {
      step: "2021 – 2024",
      title: "Bachelor of Computer Science (B.Sc. CS)",
      subtitle: "Academic Foundation",
      desc: "New Arts Commerce & Science College, Shevgaon. Built strong foundational knowledge in Object-Oriented Programming, Data Structures, SQL Database Management, and Core Java.",
      tech: ["Java", "C/C++", "Data Structures", "SQL", "OOP Fundamentals"]
    },
    {
      step: "2024 – 2026",
      title: "Master of Computer Science (M.Sc. CS)",
      subtitle: "Advanced Computer Science",
      desc: "New Arts Commerce & Science College, Shevgaon. Focused on advanced software engineering principles, distributed computing, database optimization, and web application architecture.",
      tech: ["Advanced Java", "Distributed Systems", "Database Design", "Software Engineering"]
    },
    {
      step: "June 2026",
      title: "Java Full Stack Development Trainee",
      subtitle: "Naresh i Technologies, Hyderabad",
      desc: "Completed an intensive, practical full-stack Java training program focusing on enterprise backend systems, REST API architecture, microservices, containerization, and modern frontend integration.",
      tech: ["Java 21", "Spring Boot 3", "Spring Security JWT", "MySQL 8.0", "Docker", "React"]
    },
    {
      step: "2026",
      title: "MultiVendor Marketplace & Service Booking",
      subtitle: "🔥 FLAGSHIP PROJECT",
      desc: "Designed and built a high-concurrency multi-vendor platform with 10-minute hold reservation daemons (@Scheduled), dual-identifier 6-digit OTP auth, pessimistic database locking, and vendor earnings analytics.",
      tech: ["Java 21", "Spring Boot 3.2.5", "Spring Security", "Spring Data JPA", "MySQL", "React"],
      badge: "🔥 FLAGSHIP PROJECT",
      highlight: true
    },
    {
      step: "2026",
      title: "StudySync – Student Productivity App",
      subtitle: "🚀 ENTERPRISE PRODUCTIVITY",
      desc: "Engineered 30+ RESTful APIs across 7 modules (Auth, Tasks, Pomodoro Timer, Focus Room, Analytics) documented with Swagger and containerized via Docker Compose.",
      tech: ["Java 21", "Spring Boot", "React", "Docker Compose", "MySQL", "Chart.js"],
      badge: "🚀 ENTERPRISE PRODUCTIVITY"
    },
    {
      step: "Current Goal",
      title: "Associate Software Engineer Role",
      subtitle: "💼 CAREER OBJECTIVE",
      desc: "Seeking Full-Stack Java Software Engineer opportunities in Pune/India to build scalable enterprise solutions and high-concurrency backend services.",
      bullets: ["Enterprise Backend Microservices", "High-Concurrency REST API Design", "Cloud Containerization & Security", "Agile Full-Stack Development"],
      tech: ["Java 21", "Spring Boot", "Docker", "MySQL", "React"],
      badge: "💼 CAREER OBJECTIVE"
    }
  ];

  return (
    <motion.div 
      className="py-24 relative overflow-hidden bg-bg-darkest min-h-screen text-text-main pt-[128px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background blur orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-purple-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10 space-y-24">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary-light uppercase tracking-wider">
            Full Stack Developer Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-text-title tracking-tight mt-4">
            2026 — Full Stack Development Journey
          </h2>
          <p className="text-text-muted mt-4 max-w-lg mx-auto text-xs md:text-sm leading-relaxed">
            A vertical roadmap showing the academic progression from B.Sc. & M.Sc. CS, Java Full-Stack training at Naresh i Technologies, to building enterprise systems.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-3xl mx-auto py-8">
          {/* Left aligned vertical roadmap line */}
          <div className="absolute left-[17px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent" />
          
          <div className="space-y-6">
            {journeySteps.map((step, idx) => {
              const isHighlight = step.highlight;
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
                        {step.step}
                      </span>
                      {step.badge && (
                        <span className="text-[9px] font-mono font-extrabold text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 px-2 py-0.5 rounded">
                          {step.badge}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-base font-bold text-text-title font-display mb-1">
                      {step.title}
                    </h3>
                    {step.subtitle && !step.badge && (
                      <h4 className="text-[10px] font-bold text-secondary-light font-mono mb-2 uppercase tracking-wide">
                        {step.subtitle}
                      </h4>
                    )}
                    
                    {step.desc && step.desc !== "" && (
                      <p className="text-xs text-text-muted leading-relaxed mb-3">
                        {step.desc}
                      </p>
                    )}

                    {/* Display bullets if any */}
                    {step.bullets && (
                      <ul className="list-disc list-inside text-xs text-text-muted space-y-1 mb-3 pl-1 font-mono">
                        {step.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}

                    {step.tech && step.tech.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {step.tech.map((t) => (
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

        {/* GitHub Profile Link */}
        <div className="border-t border-white/5 pt-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="p-6 rounded-2xl glass-aurora border border-white/5 text-left shadow-sm"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center flex-shrink-0">
                    <FaGithub size={24} className="text-text-title" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-text-title block font-display">@ravichavan9970</span>
                    <span className="text-[10px] text-text-muted font-mono block mt-0.5">github.com/ravichavan9970</span>
                    <span className="text-[10px] text-emerald-400 font-mono block mt-1 font-bold">View real repositories and contributions on GitHub ↗</span>
                  </div>
                </div>
                <a
                  href="https://github.com/ravichavan9970"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 flex-shrink-0"
                >
                  <FaGithub size={14} />
                  View GitHub Profile
                </a>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
