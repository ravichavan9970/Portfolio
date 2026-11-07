import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Mail, MapPin, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  const socialLinks = [
    { icon: <FaGithub size={15} />, url: "https://github.com/ravichavan9970", label: "GitHub", color: "hover:text-white" },
    { icon: <FaLinkedin size={15} />, url: "https://www.linkedin.com/in/ravindra-chavan-4ba744250/", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: <FaWhatsapp size={15} />, url: "https://wa.me/917447661921", label: "WhatsApp", color: "hover:text-emerald-400" },
    { icon: <FaInstagram size={15} />, url: "https://www.instagram.com/ravi_chavan_2002?igsh=MTBsd2dnN2N0bjlyOA==", label: "Instagram", color: "hover:text-pink-400" },
    { icon: <Mail size={15} />, url: "https://mail.google.com/mail/?view=cm&fs=1&to=ravindrachavan265125@gmail.com", label: "Email via Gmail", color: "hover:text-cyan-400" },
  ];

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Skills", path: "/skills" },
    { label: "Projects", path: "/projects" },
    { label: "Journey", path: "/journey" },
    { label: "Contact", path: "/contact" }
  ];

  const techStack = [
    "Java 21 LTS",
    "Spring Boot 3.3.3",
    "Spring Security JWT",
    "MySQL 8.0",
    "Pessimistic Locking",
    "Docker & Render",
    "React 19"
  ];

  return (
    <motion.footer 
      className="w-full bg-neutral-100/90 dark:bg-[#0b0f19] border-t border-neutral-200 dark:border-white/10 relative overflow-hidden pt-16 pb-8 z-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 space-y-12">
        
        {/* ======================================================== */}
        {/* TOP SECTION: Large Engineering CTA Banner                */}
        {/* ======================================================== */}
        <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm dark:shadow-xl text-left">
          <div className="space-y-2 max-w-xl">
            <span className="font-mono text-[10px] uppercase tracking-wider text-primary-light font-bold">
              // RECRUITER & CLIENT ACCESS //
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900 dark:text-white tracking-tight">
              Ready to Build High-Concurrency Systems?
            </h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">
              Open to Java Full-Stack roles, distributed backend architectures, and mission-critical microservice contracts. Available for immediate onboarding.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-bold text-xs transition cursor-pointer shadow-md"
            >
              Initiate Contact
            </button>
            <a
              href="/resume/Ravindra_Chavan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-300 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:text-white dark:border-white/10 text-xs font-mono font-bold transition cursor-pointer shadow-sm"
            >
              Resume (PDF)
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MIDDLE SECTION: Structured Columns                       */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 text-left items-start">
          
          {/* Column 1: Profile Description */}
          <div className="lg:col-span-5 space-y-3">
            <div>
              <h4 className="font-bold text-base font-display text-neutral-900 dark:text-white">
                Ravindra Chavan
              </h4>
              <span className="text-[11px] font-mono text-cyan-400 block mt-0.5">
                Associate Software Engineer · Java Full-Stack
              </span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed max-w-sm font-sans">
              Specialized in high-concurrency systems, Spring Boot 3.3, dual-cloud disaster recovery, and pessimistic database locking.
            </p>
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg bg-white/[0.03] border border-white/10 text-text-muted transition-colors ${social.color}`}
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider">
              Navigation
            </h5>
            <ul className="space-y-1.5 text-text-muted">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => navigate(link.path)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Stack Badges */}
          <div className="lg:col-span-4 space-y-3 font-mono text-xs">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider">
              Engineering Foundations
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.08] text-[10px] text-text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="text-[11px] text-text-muted space-y-1 pt-2">
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-purple-400" />
                <span>Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={12} className="text-cyan-400" />
                <span>ravindrachavan265125@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* BOTTOM BAR: Hallmark Anti-Slop Compliance Stamp          */}
        {/* ======================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/[0.08] text-[11px] font-mono text-text-muted">
          <div>
            © 2026 Ravindra Chavan. All rights reserved.
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.08] text-[10px]">
            <ShieldCheck size={12} className="text-emerald-400" />
            <span>Built with Hallmark Anti-Slop Standards · Verified Enterprise Specs</span>
          </div>
        </div>

      </div>
    </motion.footer>
  );
}
