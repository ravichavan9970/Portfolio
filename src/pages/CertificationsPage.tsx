import { motion } from 'framer-motion';
import { ExternalLink, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { FaCertificate } from 'react-icons/fa';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  verificationLink: string;
  skillsGained: string[];
}

export default function CertificationsPage() {
  const certifications: Certification[] = [
    {
      title: "Java Full Stack Development Training",
      issuer: "Naresh i Technologies, Hyderabad",
      date: "June 2026",
      verificationLink: "https://github.com/ravindrachavan",
      skillsGained: ["Java 21", "Spring Boot 3", "Spring Security JWT", "MySQL 8.0 & Hibernate", "Docker & Compose", "React"]
    },
    {
      title: "Master of Computer Science (M.Sc. CS)",
      issuer: "New Arts Commerce & Science College, Shevgaon",
      date: "2024 – 2026",
      verificationLink: "https://github.com/ravindrachavan",
      skillsGained: ["Advanced Software Engineering", "Distributed Systems", "Database Optimization", "System Architecture"]
    },
    {
      title: "Bachelor of Computer Science (B.Sc. CS)",
      issuer: "New Arts Commerce & Science College, Shevgaon",
      date: "2021 – 2024",
      verificationLink: "https://github.com/ravindrachavan",
      skillsGained: ["Object-Oriented Programming (OOP)", "Data Structures & Algorithms", "SQL Relational Databases", "Core Java & Web Basics"]
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
      <div className="absolute top-[15%] left-[10%] w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[10%] w-[450px] h-[450px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1450px] mx-auto px-6 relative z-10 space-y-24">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary-light uppercase tracking-wider">
            My Credentials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-text-title tracking-tight mt-4">
            Professional Certifications
          </h2>
          <p className="text-text-muted mt-4 max-w-lg mx-auto text-xs md:text-sm leading-relaxed">
            Verified credentials and certificates acquired throughout my engineering studies and software practice.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              className="p-7 rounded-[28px] glass-aurora border border-white/5 flex flex-col justify-between shadow-2xl relative hover:border-primary/20 text-left group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Badge Visual Indicator */}
              <div className="absolute top-6 right-6 p-2 rounded-xl bg-white/[0.02] border border-white/5 text-primary-light group-hover:border-primary/20 transition-all">
                <ShieldCheck size={18} />
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <FaCertificate size={16} className="text-primary-light" />
                  <span className="text-[10px] text-text-muted font-mono font-bold uppercase tracking-wider">{cert.issuer}</span>
                </div>
                
                <div>
                  <h3 className="text-base font-bold text-text-title font-display tracking-tight leading-snug">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-text-muted mt-1.5">
                    <Calendar size={12} />
                    <span>Issued: {cert.date}</span>
                  </div>
                </div>

                {/* Skills Visual badging */}
                <div className="border-t border-white/5 pt-4 space-y-2.5">
                  <span className="text-[9px] font-mono font-bold text-text-muted uppercase tracking-wider block">Acquired Competencies:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsGained.map((skill) => (
                      <div key={skill} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.01] border border-white/5 text-text-muted text-[9px] font-bold font-mono">
                        <CheckCircle2 size={10} className="text-emerald-400 shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-5 mt-6 flex justify-between items-center text-[10px] font-bold font-mono">
                <a
                  href={cert.verificationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-light hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  Verify Certificate
                  <ExternalLink size={11} />
                </a>
                <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-mono uppercase tracking-wider select-none text-[8px]">
                  VERIFIED
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
