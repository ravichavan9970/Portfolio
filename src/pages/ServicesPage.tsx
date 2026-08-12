import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Code2, Server, Database, Sparkles, Cpu, 
  CheckCircle2, ArrowRight, Layers
} from 'lucide-react';

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  deliverables: string[];
  techStack: string[];
}

export default function ServicesPage() {
  const navigate = useNavigate();

  const services: ServiceItem[] = [
    {
      icon: <Layers size={24} className="text-cyan-400" />,
      title: "Java Full Stack Development",
      desc: "Architecting end-to-end web applications using Java 21, Spring Boot 3, Spring Data JPA, MySQL 8.0, and React frontend interfaces.",
      deliverables: ["Spring Boot REST APIs", "React Client UI Integration", "State & Route Security", "Normalized MySQL Schemas"],
      techStack: ["Java 21", "Spring Boot 3", "React", "MySQL"]
    },
    {
      icon: <Cpu size={24} className="text-purple-400" />,
      title: "Enterprise Backend Architecture",
      desc: "Building robust, modular backend systems with controller-service-repository patterns, DTO mappers, and transaction management.",
      deliverables: ["Layered Backend Architecture", "DTO Request/Response Schemas", "Custom Exception Handling", "Maven Build Configurations"],
      techStack: ["Java 21", "Spring Boot", "Spring Data JPA", "Maven"]
    },
    {
      icon: <Server size={24} className="text-sky-400" />,
      title: "API Development & Security",
      desc: "Designing secure, stateless RESTful APIs enforced with Spring Security, JWT token validation, OTP verification, and RBAC.",
      deliverables: ["Stateless JWT Authentication", "Dual OTP Verification (Email/SMS)", "Role-Based Route Guards (RBAC)", "OpenAPI/Swagger Docs"],
      techStack: ["Spring Security", "JWT", "Swagger", "Postman"]
    },
    {
      icon: <Database size={24} className="text-emerald-400" />,
      title: "Database Engineering & JPA",
      desc: "Designing 3NF normalized relational schemas, managing JPA/Hibernate entity mappings, index tuning, and transaction locking.",
      deliverables: ["Normalized Relational Schemas", "Pessimistic & Optimistic Locking", "Query Optimization & Indexing", "Spring Data JPA Repositories"],
      techStack: ["MySQL 8.0", "Hibernate", "JPA", "SQL"]
    },
    {
      icon: <Sparkles size={24} className="text-pink-400" />,
      title: "High-Concurrency Booking Engines",
      desc: "Engineering high-concurrency reservation systems with automated 10-minute hold timers (@Scheduled daemons) to prevent double-bookings.",
      deliverables: ["Background Task Daemons (@Scheduled)", "Hold Reservation Engines", "Race Condition Protection", "Real-Time Transaction Receipts"],
      techStack: ["Java 21", "Spring Boot", "MySQL", "React"]
    },
    {
      icon: <Code2 size={24} className="text-yellow-400" />,
      title: "Containerization & Testing",
      desc: "Packaging full-stack services into Docker containers with Docker Compose and writing automated tests with JUnit 5 and Mockito.",
      deliverables: ["Docker & Docker Compose Files", "JUnit 5 Unit Test Suites", "Mockito Controller/Service Mocks", "Automated CI/CD Ready Setups"],
      techStack: ["Docker", "Docker Compose", "JUnit 5", "Mockito"]
    }
  ];

  return (
    <motion.div 
      className="py-24 relative overflow-hidden bg-bg-darkest min-h-screen text-text-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1450px] mx-auto px-6 relative z-10 space-y-24">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary-light uppercase tracking-wider">
            What I Do
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-text-title tracking-tight mt-4">
            Core Engineering Services
          </h2>
          <p className="text-text-muted mt-4 max-w-lg mx-auto text-xs md:text-sm leading-relaxed">
            I deliver robust full-stack software products, microservice APIs, structured relational databases, and low-latency SaaS integrations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((serv, idx) => (
            <motion.div
              key={idx}
              className="p-7.5 rounded-[28px] glass-aurora border border-white/5 flex flex-col justify-between shadow-2xl relative hover:border-primary/20 text-left group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div className="space-y-6">
                {/* Visual Icon */}
                <div className="p-3 w-fit rounded-xl bg-bg-dark border border-white/5 text-primary group-hover:border-primary/20 transition-all">
                  {serv.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-text-title font-display tracking-tight">
                    {serv.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {serv.desc}
                  </p>
                </div>

                {/* Deliverables checklist */}
                <div className="border-t border-white/5 pt-4 space-y-2">
                  <span className="text-[9px] font-mono font-bold text-text-muted uppercase tracking-wider block">Key Deliverables:</span>
                  <div className="space-y-1.5">
                    {serv.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-[10px] text-text-muted font-bold font-mono">
                        <CheckCircle2 size={10} className="text-emerald-400 shrink-0" />
                        <span className="truncate">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tech Stack Footer */}
              <div className="border-t border-white/5 pt-5 mt-6 flex flex-wrap gap-1">
                {serv.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded bg-white/[0.01] border border-white/5 text-text-muted text-[8px] font-bold font-mono">
                    {tech}
                  </span>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

        {/* CTA section */}
        <div className="border-t border-white/5 pt-16">
          <motion.div
            className="p-10 rounded-[32px] glass-aurora border border-white/5 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl hover:border-primary/20 text-left"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h3 className="text-lg font-bold font-display text-text-title">Need a custom software engineering plan?</h3>
              <p className="text-xs text-text-muted max-w-md">Let's discuss your database scaling, API design patterns, or RAG AI pipelines needs.</p>
            </div>
            <button
              onClick={() => navigate('/contact')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 shrink-0 cursor-pointer"
            >
              Get In Touch
              <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
