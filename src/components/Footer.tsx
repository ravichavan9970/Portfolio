import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  const socialLinks = [
    { icon: <FaGithub size={16} />, url: "https://github.com/ravichavan9970", label: "GitHub", color: "hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:border-white/30" },
    { icon: <FaLinkedin size={16} />, url: "https://www.linkedin.com/in/ravindra-chavan-4ba744250/", label: "LinkedIn", color: "hover:text-[#3B82F6] hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:border-[#3B82F6]/30" },
    { icon: <FaInstagram size={16} />, url: "https://www.instagram.com/ravi_chavan_2002?igsh=MTBsd2dnN2N0bjlyOA==", label: "Instagram", color: "hover:text-[#EC4899] hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:border-[#EC4899]/30" },
    { icon: <Mail size={16} />, url: "https://mail.google.com/mail/?view=cm&fs=1&to=ravindrachavan265125@gmail.com", label: "Email via Gmail", color: "hover:text-[#06B6D4] hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:border-[#06B6D4]/30" },
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
    "Java 21",
    "Spring Boot 3",
    "Spring Security",
    "MySQL 8.0",
    "Docker",
    "React"
  ];

  return (
    <motion.footer 
      className="w-full bg-bg-darkest/95 border-t border-white/5 relative overflow-hidden pt-20 pb-8 z-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Soft gradient mesh / blur glow effect backgrounds */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-6 space-y-16">
        
        {/* ======================================================== */}
        {/* TOP SECTION: Large CTA Banner                             */}
        {/* ======================================================== */}
        <div className="p-8 md:p-12 rounded-3xl glass-aurora border border-white/5 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 pointer-events-none animate-pulse duration-[6000ms]" />
          <div className="text-left space-y-3 relative z-10 max-w-xl">
            <h3 className="text-2xl md:text-3.5xl font-black font-display text-text-title tracking-tight leading-tight">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-xs md:text-sm text-text-muted leading-relaxed">
              Open to Java Full-Stack roles, enterprise backend development, API design, and cloud opportunities.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 relative z-10 shrink-0">
            <button
              onClick={() => navigate('/contact')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Contact Me
            </button>
            <a
              href="/resume/Ravindra_Chavan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.03] hover:bg-white/5 text-text-title border border-white/5 hover:border-primary/25 text-xs font-bold active:scale-95 transition-all duration-300 cursor-pointer hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
            >
              📄 View Resume
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MIDDLE SECTION: 4 Columns                                  */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 text-left items-start">
          
          {/* Column 1: Profile Description & Socials */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <h4 className="font-black text-lg leading-none tracking-tight font-display bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent bg-300% animate-gradient-flow glow-pulse inline-block">
                Ravindra Chavan
              </h4>
              <span className="text-[10px] font-mono font-bold text-secondary-light uppercase tracking-wider block mt-1.5">
                Java Full Stack Developer
              </span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed max-w-sm">
              Building scalable, secure enterprise Java applications and high-concurrency systems.
            </p>
            {/* Social Links with lift, glow, scale */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-text-muted transition-all duration-300 flex items-center justify-center cursor-pointer ${social.color}`}
                  whileHover={{ scale: 1.15, y: -3 }}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-[10px] font-bold text-text-muted uppercase tracking-widest font-mono">
              Navigation
            </h5>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-xs text-text-muted hover:text-text-title transition-colors duration-200 block w-fit relative group py-0.5"
                >
                  {link.label}
                  {/* Animated underline */}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Tech Stack */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-[10px] font-bold text-text-muted uppercase tracking-widest font-mono">
              My Tech Stack
            </h5>
            <div className="flex flex-col gap-2">
              {techStack.map((tech) => (
                <span 
                  key={tech} 
                  className="text-xs text-text-muted hover:text-text-title hover:translate-x-1 transition-all duration-200 cursor-default block w-fit"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-[10px] font-bold text-text-muted uppercase tracking-widest font-mono">
              Contact
            </h5>
            <div className="space-y-3.5 text-xs text-text-muted">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-secondary shrink-0 mt-0.5" />
                <span>Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail size={14} className="text-primary shrink-0 mt-0.5" />
                <a href="mailto:ravindrachavan265125@gmail.com" className="hover:text-text-title transition-colors">
                  ravindrachavan265125@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* BOTTOM BAR: Copyright & Stack Info                      */}
        {/* ======================================================== */}
        <div className="flex flex-col items-center justify-center gap-2.5 pt-8 border-t border-white/5 text-[10px] font-bold text-text-muted uppercase font-mono text-center">
          <div>
            © 2026 Ravindra Chavan
          </div>
          <div className="flex items-center gap-1.5 text-text-muted/65">
            <span>Crafted with</span>
            <span className="text-text-title">Java 21</span>
            <span>•</span>
            <span className="text-text-title">Spring Boot</span>
            <span>•</span>
            <span className="text-text-title">React</span>
          </div>
        </div>

      </div>
    </motion.footer>
  );
}
