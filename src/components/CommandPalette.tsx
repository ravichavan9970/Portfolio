import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, Terminal, FileText, Home, User, Code2, 
  Briefcase, Compass, Mail, Sun, 
  Sparkles, Layers
} from 'lucide-react';
import { FaWhatsapp, FaGithub, FaLinkedin } from 'react-icons/fa';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
}

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Projects' | 'Actions' | 'Themes' | 'Developer';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenTerminal }: CommandPaletteProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input on open & reset state
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const setThemeColor = (color: string) => {
    localStorage.setItem('theme-color', color);
    window.dispatchEvent(new Event('themechange'));
    onClose();
  };

  const toggleThemeMode = () => {
    const current = localStorage.getItem('portfolio-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', next);
    const root = document.documentElement;
    root.classList.remove('dark');
    if (next === 'dark') root.classList.add('dark');
    window.dispatchEvent(new Event('themechange'));
    onClose();
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-home',
      category: 'Navigation',
      title: 'Home',
      subtitle: 'Hero, featured spotlight & engineering profile',
      icon: <Home size={16} className="text-primary-light" />,
      action: () => { navigate('/'); onClose(); }
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'About Me',
      subtitle: 'Background, education, engineering philosophy',
      icon: <User size={16} className="text-primary-light" />,
      action: () => { navigate('/about'); onClose(); }
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Skills & Tech Stack',
      subtitle: 'Java 21, Spring Boot, MySQL, React, Docker',
      icon: <Code2 size={16} className="text-primary-light" />,
      action: () => { navigate('/skills'); onClose(); }
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Projects Showcase',
      subtitle: 'Flagship enterprise case studies & code repositories',
      icon: <Briefcase size={16} className="text-primary-light" />,
      action: () => { navigate('/projects'); onClose(); }
    },
    {
      id: 'nav-journey',
      category: 'Navigation',
      title: 'Career Journey',
      subtitle: 'Experience, milestones, education timeline',
      icon: <Compass size={16} className="text-primary-light" />,
      action: () => { navigate('/journey'); onClose(); }
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Contact & Hire',
      subtitle: 'Direct email, WhatsApp & availability status',
      icon: <Mail size={16} className="text-primary-light" />,
      action: () => { navigate('/contact'); onClose(); }
    },

    // Flagship Projects
    {
      id: 'proj-shivchhatra',
      category: 'Projects',
      title: 'Shivchhatra Trekkers',
      subtitle: 'Spring Boot 3.3.3 • Dual-Cloud Disaster Recovery • UPI QR Engine',
      icon: <Layers size={16} className="text-amber-400" />,
      action: () => {
        navigate('/projects');
        onClose();
      }
    },
    {
      id: 'proj-multivendor',
      category: 'Projects',
      title: 'MultiVendor Marketplace',
      subtitle: 'Spring Boot 3 • Pessimistic Locking • 6-Digit OTP Auth',
      icon: <Layers size={16} className="text-emerald-400" />,
      action: () => {
        navigate('/projects');
        onClose();
      }
    },
    {
      id: 'proj-studysync',
      category: 'Projects',
      title: 'StudySync Student App',
      subtitle: 'Spring Boot & React • Pomodoro Analytics • Task Management',
      icon: <Layers size={16} className="text-cyan-400" />,
      action: () => {
        navigate('/projects');
        onClose();
      }
    },

    // Developer Tools
    {
      id: 'dev-terminal',
      category: 'Developer',
      title: 'Open Developer Terminal',
      subtitle: 'Interactive Unix CLI (help, skills, arch, stats, hire)',
      icon: <Terminal size={16} className="text-emerald-400" />,
      shortcut: '>_',
      action: () => {
        onClose();
        setTimeout(onOpenTerminal, 150);
      }
    },

    // Quick Actions
    {
      id: 'act-resume',
      category: 'Actions',
      title: 'View & Download Resume',
      subtitle: 'Full-Stack Java Software Engineer Resume (PDF)',
      icon: <FileText size={16} className="text-primary-light" />,
      shortcut: 'PDF',
      action: () => {
        window.open('/resume/Ravindra_Chavan_Resume.pdf', '_blank');
        onClose();
      }
    },
    {
      id: 'act-whatsapp',
      category: 'Actions',
      title: 'Chat on WhatsApp',
      subtitle: '+91 74476 61921 • Instant direct response',
      icon: <FaWhatsapp size={16} className="text-emerald-500" />,
      action: () => {
        window.open('https://wa.me/917447661921?text=Hi%20Ravindra,%20I%20reviewed%20your%20portfolio!', '_blank');
        onClose();
      }
    },
    {
      id: 'act-github',
      category: 'Actions',
      title: 'GitHub Profile',
      subtitle: 'github.com/ravichavan9970 • Repositories & source code',
      icon: <FaGithub size={16} className="text-slate-300" />,
      action: () => {
        window.open('https://github.com/ravichavan9970', '_blank');
        onClose();
      }
    },
    {
      id: 'act-linkedin',
      category: 'Actions',
      title: 'LinkedIn Profile',
      subtitle: 'linkedin.com/in/ravindra-chavan • Professional network',
      icon: <FaLinkedin size={16} className="text-blue-400" />,
      action: () => {
        window.open('https://www.linkedin.com/in/ravindra-chavan-66779a243/', '_blank');
        onClose();
      }
    },

    // Themes & Accents
    {
      id: 'theme-toggle',
      category: 'Themes',
      title: 'Toggle Light / Dark Mode',
      subtitle: 'Switch between Obsidian Dark and High-Contrast Light',
      icon: <Sun size={16} className="text-amber-400" />,
      action: toggleThemeMode
    },
    {
      id: 'theme-purple',
      category: 'Themes',
      title: 'Theme: Royal Purple',
      subtitle: 'Deep violet & vivid pink accents',
      icon: <span className="w-3 h-3 rounded-full bg-[#8B5CF6] inline-block shadow-sm" />,
      action: () => setThemeColor('purple')
    },
    {
      id: 'theme-cyan',
      category: 'Themes',
      title: 'Theme: Cyber Cyan',
      subtitle: 'Vibrant neon cyan & electric purple accents',
      icon: <span className="w-3 h-3 rounded-full bg-[#06B6D4] inline-block shadow-sm" />,
      action: () => setThemeColor('cyan')
    },
    {
      id: 'theme-emerald',
      category: 'Themes',
      title: 'Theme: Mint Emerald',
      subtitle: 'Clean jade emerald & cobalt accents',
      icon: <span className="w-3 h-3 rounded-full bg-[#10B981] inline-block shadow-sm" />,
      action: () => setThemeColor('emerald')
    },
    {
      id: 'theme-blue',
      category: 'Themes',
      title: 'Theme: Ocean Blue',
      subtitle: 'Cobalt blue & crisp cyan accents',
      icon: <span className="w-3 h-3 rounded-full bg-[#3B82F6] inline-block shadow-sm" />,
      action: () => setThemeColor('blue')
    },
    {
      id: 'theme-orange',
      category: 'Themes',
      title: 'Theme: Sunset Orange',
      subtitle: 'Warm sunset orange & crimson accents',
      icon: <span className="w-3 h-3 rounded-full bg-[#F97316] inline-block shadow-sm" />,
      action: () => setThemeColor('orange')
    },
    {
      id: 'theme-rose',
      category: 'Themes',
      title: 'Theme: Velvet Rose',
      subtitle: 'Modern rose red & purple accents',
      icon: <span className="w-3 h-3 rounded-full bg-[#F43F5E] inline-block shadow-sm" />,
      action: () => setThemeColor('rose')
    },
    {
      id: 'theme-slate',
      category: 'Themes',
      title: 'Theme: Minimal Slate',
      subtitle: 'Monochrome executive slate & charcoal accents',
      icon: <span className="w-3 h-3 rounded-full bg-[#64748B] inline-block shadow-sm" />,
      action: () => setThemeColor('slate')
    },
  ];

  // Filter commands by query
  const filteredCommands = commands.filter(cmd => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return cmd.title.toLowerCase().includes(q) ||
           (cmd.subtitle && cmd.subtitle.toLowerCase().includes(q)) ||
           cmd.category.toLowerCase().includes(q);
  });

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  // Keep selected item in view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] md:pt-[15vh] px-4 pointer-events-auto">
          {/* Backdrop Blur */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.6)] z-10 flex flex-col max-h-[75vh]"
            style={{
              background: 'rgba(15, 23, 42, 0.92)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
              <Search size={18} className="text-primary-light shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command, page, project, or theme..."
                className="w-full bg-transparent text-sm text-text-title placeholder-text-muted/60 focus:outline-none font-sans"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-md text-text-muted hover:text-white transition-colors"
                >
                  <X size={15} />
                </button>
              )}
              <div className="flex items-center gap-1.5 shrink-0 select-none">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-text-muted">
                  ESC to exit
                </span>
              </div>
            </div>

            {/* Results List */}
            <div 
              ref={listRef}
              className="overflow-y-auto p-2 space-y-1 divide-y divide-white/5 max-h-[55vh] scrollbar-thin scrollbar-thumb-white/10 text-left"
            >
              {filteredCommands.length === 0 ? (
                <div className="py-12 text-center text-text-muted text-xs">
                  <p className="font-medium text-text-title mb-1">No matching commands found</p>
                  <p className="text-[11px]">Try searching for &quot;projects&quot;, &quot;resume&quot;, &quot;skills&quot;, or &quot;terminal&quot;</p>
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      data-selected={isSelected}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                        isSelected 
                          ? 'bg-primary/20 text-white border border-primary/40 shadow-sm' 
                          : 'text-text-main hover:bg-white/[0.04] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-primary/30 text-white' : 'bg-white/5 text-text-muted'}`}>
                          {cmd.icon}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-text-title truncate">{cmd.title}</span>
                            <span className="text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.2 rounded bg-white/5 text-text-muted border border-white/5">
                              {cmd.category}
                            </span>
                          </div>
                          {cmd.subtitle && (
                            <span className="text-[11px] text-text-muted truncate mt-0.5">{cmd.subtitle}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 pl-3">
                        {cmd.shortcut && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-text-muted">
                            {cmd.shortcut}
                          </span>
                        )}
                        {isSelected && (
                          <span className="text-[10px] font-mono text-primary-light hidden sm:inline-block">
                            ↵ Enter
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Status Bar */}
            <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-[11px] text-text-muted font-mono select-none">
              <div className="flex items-center gap-3">
                <span>Navigate <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10">↓</kbd></span>
                <span>Select <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10">↵</kbd></span>
              </div>
              <div className="flex items-center gap-1.5 text-primary-light">
                <Sparkles size={13} />
                <span className="text-[10px] uppercase font-bold tracking-wider">Fast Track Menu</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
