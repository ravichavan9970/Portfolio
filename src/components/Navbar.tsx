import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Settings, Check, Lock, KeyRound, Eye, EyeOff } from 'lucide-react';
import Avatar from './Avatar';

export interface AvailabilityOption {
  id: string;
  label: string;
  dotBg: string;
  dotPing: string;
  textColor: string;
}

export const availabilityOptions: AvailabilityOption[] = [
  { id: 'available', label: 'AVAILABLE FOR HIRE', dotBg: 'bg-emerald-500', dotPing: 'bg-emerald-400', textColor: 'text-emerald-400' },
  { id: 'hired', label: 'HIRED', dotBg: 'bg-blue-500', dotPing: 'bg-blue-400', textColor: 'text-blue-400' },
  { id: 'open', label: 'OPEN TO OFFERS', dotBg: 'bg-amber-500', dotPing: 'bg-amber-400', textColor: 'text-amber-400' },
  { id: 'busy', label: 'IN A PROJECT', dotBg: 'bg-rose-500', dotPing: 'bg-rose-400', textColor: 'text-rose-400' },
];

// ─── Navigation Links ──────────────────────────────────────────────────────────
const navLinks = [
  { name: 'Home',     path: '/'         },
  { name: 'About',    path: '/about'    },
  { name: 'Skills',   path: '/skills'   },
  { name: 'Projects', path: '/projects' },
  { name: 'Journey',  path: '/journey'  },
  { name: 'Contact',  path: '/contact'  },
];

// ─── Centralized Accent Color Registry ────────────────────────────────────────
const accentRegistry = {
  purple:  { primary: '#8B5CF6', hover: '#7C3AED', light: '#A78BFA', glow: 'rgba(139,92,246,0.35)', glowSoft: 'rgba(124,58,237,0.15)', secondary: '#EC4899', secondaryHover: '#DB2777', secondaryLight: '#F472B6' },
  blue:    { primary: '#3B82F6', hover: '#2563EB', light: '#60A5FA', glow: 'rgba(59,130,246,0.35)',  glowSoft: 'rgba(37,99,235,0.15)',   secondary: '#06B6D4', secondaryHover: '#0891B2', secondaryLight: '#67E8F9' },
  emerald: { primary: '#10B981', hover: '#059669', light: '#34D399', glow: 'rgba(16,185,129,0.35)', glowSoft: 'rgba(5,150,105,0.15)',   secondary: '#3B82F6', secondaryHover: '#2563EB', secondaryLight: '#60A5FA' },
  orange:  { primary: '#F97316', hover: '#EA580C', light: '#FB923C', glow: 'rgba(249,115,22,0.35)', glowSoft: 'rgba(234,88,12,0.15)',   secondary: '#EF4444', secondaryHover: '#DC2626', secondaryLight: '#F87171' },
  cyan:    { primary: '#06B6D4', hover: '#0891B2', light: '#67E8F9', glow: 'rgba(6,182,212,0.35)',  glowSoft: 'rgba(8,145,178,0.15)',   secondary: '#8B5CF6', secondaryHover: '#7C3AED', secondaryLight: '#A78BFA' },
  rose:    { primary: '#F43F5E', hover: '#E11D48', light: '#FB7185', glow: 'rgba(244,63,94,0.35)',  glowSoft: 'rgba(225,29,72,0.15)',   secondary: '#8B5CF6', secondaryHover: '#7C3AED', secondaryLight: '#A78BFA' },
  slate:   { primary: '#64748B', hover: '#475569', light: '#94A3B8', glow: 'rgba(100,116,139,0.35)',glowSoft: 'rgba(71,85,105,0.15)',   secondary: '#334155', secondaryHover: '#1E293B', secondaryLight: '#64748B' },
};

type AccentKey = keyof typeof accentRegistry;

const colorThemes: { name: AccentKey; label: string }[] = [
  { name: 'purple',  label: 'Purple'  },
  { name: 'blue',    label: 'Blue'    },
  { name: 'emerald', label: 'Emerald' },
  { name: 'orange',  label: 'Orange'  },
  { name: 'cyan',    label: 'Cyan'    },
  { name: 'rose',    label: 'Rose'    },
  { name: 'slate',   label: 'Slate'   },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ── Availability status state & Admin Protection ──
  const [availabilityId, setAvailabilityId] = useState<string>(() => {
    return localStorage.getItem('availability-status') || 'available';
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [pendingStatusId, setPendingStatusId] = useState<string | null>(null);
  const [adminUsernameInput, setAdminUsernameInput] = useState('Ravindra_chavan_2002');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleAvailabilityChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) setAvailabilityId(customEvent.detail);
    };
    window.addEventListener('availability-change', handleAvailabilityChange);
    return () => window.removeEventListener('availability-change', handleAvailabilityChange);
  }, []);

  const currentAvailability = availabilityOptions.find(o => o.id === availabilityId) || availabilityOptions[0];

  const handleSelectAvailability = (id: string) => {
    setAvailabilityId(id);
    localStorage.setItem('availability-status', id);
    window.dispatchEvent(new CustomEvent('availability-change', { detail: id }));
  };

  const handleStatusOptionClick = (id: string) => {
    setPendingStatusId(id);
    setAuthError(null);
    setAdminPasswordInput('');
    setAuthModalOpen(true);
  };

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUsernameInput.trim().toLowerCase() === 'ravindra_chavan_2002' && adminPasswordInput === 'Ravi@7447') {
      setAuthModalOpen(false);
      setAuthError(null);
      setAdminPasswordInput('');
      if (pendingStatusId) {
        handleSelectAvailability(pendingStatusId);
        setPendingStatusId(null);
      }
    } else {
      setAuthError('Invalid Admin Username or Password');
    }
  };

  // ── Track Scroll Position ───────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Close customizer when clicking outside ─────────────────────────────────
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const modalEl = document.getElementById('admin-auth-modal');
      if (modalEl && modalEl.contains(target)) return;

      const inDesktop = dropdownRef.current?.contains(target);
      const inMobile  = mobileDropdownRef.current?.contains(target);
      const inMobilePanel = mobilePanelRef.current?.contains(target);
      if (!inDesktop && !inMobile && !inMobilePanel) {
        setCustomizerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  // ── Persisted theme state (supports light, dark, and double-click blood-red) ──
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'blood-red'>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'blood-red') return 'blood-red';
    if (saved === 'dark') return 'dark';
    if (saved === 'light') return 'light';
    return 'light';
  });

  const [themeColor, setThemeColor] = useState<AccentKey>(() => {
    const saved = localStorage.getItem('theme-color') as AccentKey;
    return saved && saved in accentRegistry ? saved : 'purple';
  });

  // Derive the live accent tokens from the current color selection
  const accent = accentRegistry[themeColor];
  const isDark = themeMode === 'dark' || themeMode === 'blood-red';
  const isBloodRed = themeMode === 'blood-red';

  // ── Sync HTML class whenever theme state changes ───────────────────────────
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'blood-red');
    if (themeMode === 'blood-red') {
      root.classList.add('dark', 'blood-red');
    } else if (themeMode === 'dark') {
      root.classList.add('dark');
    }
    localStorage.setItem('portfolio-theme', themeMode);
    window.dispatchEvent(new Event('themechange'));
  }, [themeMode]);

  useEffect(() => {
    const root = document.documentElement;
    if (isBloodRed) {
      root.style.setProperty('--color-primary',           '#FF0000');
      root.style.setProperty('--color-primary-hover',     '#CC0000');
      root.style.setProperty('--color-primary-light',     '#FF3333');
      root.style.setProperty('--color-secondary',         '#990000');
      root.style.setProperty('--color-secondary-hover',   '#660000');
      root.style.setProperty('--color-secondary-light',   '#CC0000');
    } else {
      root.style.setProperty('--color-primary',           accent.primary);
      root.style.setProperty('--color-primary-hover',     accent.hover);
      root.style.setProperty('--color-primary-light',     accent.light);
      root.style.setProperty('--color-secondary',         accent.secondary);
      root.style.setProperty('--color-secondary-hover',   accent.secondaryHover);
      root.style.setProperty('--color-secondary-light',   accent.secondaryLight);
    }
    localStorage.setItem('theme-color', themeColor);
  }, [themeColor, accent, isBloodRed]);

  const toggleTheme = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const nextMode = (themeMode === 'dark' || themeMode === 'blood-red') ? 'light' : 'dark';
    setThemeMode(nextMode);
    localStorage.setItem('portfolio-theme', nextMode);
    const root = document.documentElement;
    root.classList.remove('dark', 'blood-red');
    if (nextMode === 'dark') {
      root.classList.add('dark');
    }
    window.dispatchEvent(new Event('themechange'));
  };

  const handleDoubleClickTheme = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextMode = themeMode === 'blood-red' ? 'dark' : 'blood-red';
    setThemeMode(nextMode);
    localStorage.setItem('portfolio-theme', nextMode);
    const root = document.documentElement;
    root.classList.remove('dark', 'blood-red');
    if (nextMode === 'blood-red') {
      root.classList.add('dark', 'blood-red');
    } else {
      root.classList.add('dark');
    }
    window.dispatchEvent(new Event('themechange'));
  };

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  // ── Solid Header Color Tokens (Solid White Light, Solid Dark #0F172A) ────────
  const headerBg     = isBloodRed ? 'rgba(11, 0, 2, 0.45)' : (isDark ? '#0F172A' : '#FFFFFF');
  const headerBorder = isBloodRed ? 'rgba(255, 0, 0, 0.35)' : (isDark ? (scrolled ? '#334155' : '#1E293B') : (scrolled ? '#CBD5E1' : '#E5E7EB'));
  const headerShadow = scrolled
    ? (isBloodRed ? '0 8px 30px rgba(255,0,0,0.35)' : (isDark ? '0 6px 20px rgba(0,0,0,0.35)' : '0 2px 12px rgba(15,23,42,0.06)'))
    : (isBloodRed ? '0 4px 16px rgba(255,0,0,0.25)' : (isDark ? '0 2px 8px rgba(0,0,0,0.2)'   : '0 2px 4px rgba(15,23,42,0.02)'));

  const pillBg     = isBloodRed ? 'rgba(20, 0, 5, 0.35)' : (isDark ? '#111827' : '#FFFFFF');
  const pillBorder = isBloodRed ? 'rgba(255, 0, 0, 0.35)' : (isDark ? '#1E293B' : '#E5E7EB');
  const pillShadow = isBloodRed
    ? '0 6px 24px rgba(255, 0, 0, 0.3)'
    : (isDark ? '0 4px 16px rgba(0, 0, 0, 0.35)' : '0 4px 16px rgba(15, 23, 42, 0.08)');

  // Nav link text & hover colors per mode
  const inactiveColor = isDark ? '#CBD5E1' : '#475569';
  const hoverColor    = isDark ? '#FFFFFF' : '#111827';
  const hoverBg       = isDark ? '#1E293B' : '#F8FAFC';

  // Active pill gradient always uses accent primary → hover
  const activePillGradient = `linear-gradient(135deg,${accent.primary},${accent.hover})`;
  const activePillShadow   = `0 6px 18px ${accent.glow}`;

  // Utility buttons solid tokens
  const utilBg       = isDark ? '#1E293B' : '#F8FAFC';
  const utilBorder   = isDark ? '#1E293B' : '#E5E7EB';
  const utilColor    = isDark ? '#CBD5E1' : '#475569';

  // Panel solid tokens
  const panelBg     = isDark ? '#0F172A' : '#FFFFFF';
  const panelBorder = isDark ? '#1E293B' : '#E5E7EB';

  const toggleCustomizer = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCustomizerOpen(prev => !prev);
  };

  /** Shared theme & availability settings panel */
  const SettingsPanel = () => (
    <div className="space-y-4 text-left">
      {/* Theme Mode Selector */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-bold font-mono mb-2"
           style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
          Theme Mode
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            key="dark-mode"
            type="button"
            onClick={(e) => { e.stopPropagation(); setThemeMode('dark'); }}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl cursor-pointer transition-all border font-mono text-[11px] font-bold"
            style={{
              borderColor: isDark ? accent.primary : panelBorder,
              background: isDark ? '#1E293B' : '#F9FAFB',
              color: isDark ? accent.primary : '#64748B',
            }}
          >
            <Moon size={14} style={{ color: isDark ? '#FBBF24' : undefined }} />
            <span>Dark</span>
            {isDark && <Check size={12} style={{ color: accent.primary }} />}
          </button>

          <button
            key="light-mode"
            type="button"
            onClick={(e) => { e.stopPropagation(); setThemeMode('light'); }}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl cursor-pointer transition-all border font-mono text-[11px] font-bold"
            style={{
              borderColor: !isDark ? accent.primary : panelBorder,
              background: !isDark ? '#EDE9FE' : '#1E293B',
              color: !isDark ? accent.primary : '#94A3B8',
            }}
          >
            <Sun size={14} style={{ color: !isDark ? '#F59E0B' : undefined }} />
            <span>Light</span>
            {!isDark && <Check size={12} style={{ color: accent.primary }} />}
          </button>
        </div>
      </div>

      {/* Availability Status Selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] uppercase tracking-widest font-bold font-mono"
             style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
            Availability Status
          </p>
          <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-amber-400" title="Admin password required for every change">
            <Lock size={11} /> Admin Protected
          </span>
        </div>
        <div className="grid grid-cols-1 gap-1.5">
          {availabilityOptions.map((opt) => {
            const sel = availabilityId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleStatusOptionClick(opt.id)}
                className="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all border text-left w-full"
                style={{
                  borderColor: sel ? accent.primary : panelBorder,
                  background: sel
                    ? (isDark ? '#1E293B' : '#EDE9FE')
                    : (isDark ? '#1E293B' : '#F9FAFB'),
                }}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${opt.dotBg}`} />
                  <span className={`text-[10px] font-mono font-bold ${opt.textColor}`}>
                    {opt.label}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock size={10} className="text-text-muted opacity-60" />
                  {sel && <Check size={12} style={{ color: accent.primary }} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accent Color Section */}
      <div className="border-t border-white/10 pt-3">
        <p className="text-[10px] uppercase tracking-widest font-bold font-mono mb-2"
           style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
          Accent Color
        </p>
        <div className="grid grid-cols-4 gap-2">
          {colorThemes.map((c) => {
            const sel = themeColor === c.name;
            const tok = accentRegistry[c.name];
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setThemeColor(c.name)}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl cursor-pointer relative overflow-hidden"
                style={{
                  border: sel ? `2px solid ${tok.primary}` : `2px solid ${panelBorder}`,
                  boxShadow: sel ? `0 0 12px ${tok.glowSoft}` : 'none',
                  background: sel
                    ? (isDark ? '#1E293B' : '#EDE9FE')
                    : (isDark ? '#1E293B' : '#F9FAFB'),
                  transition: 'all 250ms ease',
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center relative shadow-sm"
                  style={{ background: tok.primary }}
                >
                  {sel && <Check size={11} className="text-white" strokeWidth={3} />}
                </div>
                <span
                  className="text-[9px] font-bold font-mono"
                  style={{ color: sel ? tok.primary : (isDark ? '#94A3B8' : '#64748B') }}
                >
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-300"
      style={{
        height:       '80px',
        background:   headerBg,
        borderBottom: `1px solid ${headerBorder}`,
        boxShadow:    headerShadow,
      }}
    >
      {/* ── Main Container ── */}
      <div className="w-full max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">

        {/* ── Logo Section with Dynamic Status Subtitle ── */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group text-text-title shrink-0"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative shrink-0 select-none">
            <Avatar size="sm" className="w-[36px] h-[36px] border-2 border-primary/20 group-hover:border-primary transition-all duration-300" />
            <span className="absolute bottom-0 right-0 flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentAvailability.dotPing} opacity-75`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${currentAvailability.dotBg}`} />
            </span>
          </div>
          <span className="relative flex flex-col items-start py-0.5">
            <span className="font-extrabold text-[15px] leading-none tracking-tight font-display bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent group-hover:from-secondary group-hover:to-primary transition-all duration-300">
              Ravindra Chavan
            </span>
            <span className={`text-[9px] font-mono font-bold tracking-wider mt-0.5 select-none uppercase ${currentAvailability.textColor}`}>
              {currentAvailability.label}
            </span>
          </span>
        </Link>

        {/* ── Navigation Links Capsule (Desktop) ───────────────────────────── */}
        <div className="hidden lg:flex flex-1 justify-center">
          <motion.nav
            className="flex items-center gap-[6px] px-5"
            style={{
              border:       `1px solid ${pillBorder}`,
              borderRadius: '9999px',
              height:       '52px',
              background:   pillBg,
              boxShadow:    pillShadow,
              transition:   'background 300ms ease, border-color 300ms ease, box-shadow 300ms ease',
            }}
          >
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <NavItem
                  key={link.path}
                  link={link}
                  active={active}
                  activePillGradient={activePillGradient}
                  activePillShadow={activePillShadow}
                  inactiveColor={inactiveColor}
                  hoverColor={hoverColor}
                  hoverBg={hoverBg}
                />
              );
            })}
          </motion.nav>
        </div>

        {/* ── Utilities Section (Right - Desktop) ──────────────────────────── */}
        <div className="hidden lg:flex items-center gap-3 shrink-0 relative" ref={dropdownRef}>

          {/* Desktop Theme Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            onDoubleClick={handleDoubleClickTheme}
            aria-label={isBloodRed ? 'Blood Red theme active' : (isDark ? 'Switch to Light mode' : 'Switch to Dark mode')}
            title="Single-click: Toggle Light/Dark | Double-click: Toggle Bloody Crimson Red"
            className="relative h-[38px] px-3.5 rounded-full cursor-pointer flex items-center gap-2 overflow-hidden border transition-all duration-300 hover:scale-105 active:scale-95 select-none z-50 pointer-events-auto shadow-sm"
            style={{
              borderColor: isBloodRed ? '#EF4444' : (isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.12)'),
              background:  isBloodRed ? 'rgba(153, 27, 27, 0.9)' : (isDark ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.95)'),
              backdropFilter: 'blur(12px)',
              color:       isBloodRed ? '#FFF1F2' : (isDark ? '#F8FAFC' : '#0F172A'),
              boxShadow:   isBloodRed 
                ? '0 0 20px rgba(239,68,68,0.5), inset 0 1px 0 rgba(248,113,113,0.3)' 
                : (isDark ? '0 4px 14px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.1)' : '0 2px 10px rgba(15, 23, 42, 0.06)'),
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isBloodRed ? 'blood-sun' : (isDark ? 'dark-sun' : 'light-moon')}
                initial={{ rotate: -120, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 120, scale: 0.5, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                className="flex items-center justify-center"
              >
                {isBloodRed ? (
                  <Sun size={15} className="text-red-500 animate-pulse drop-shadow-[0_0_12px_rgba(239,68,68,0.9)]" />
                ) : isDark ? (
                  <Sun size={15} className="text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
                ) : (
                  <Moon size={15} className="text-violet-600 dark:text-violet-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
                )}
              </motion.div>
            </AnimatePresence>
            <span
              className="text-[10px] font-mono font-bold tracking-widest uppercase select-none transition-colors duration-300"
              style={{ color: isBloodRed ? '#FFF1F2' : (isDark ? '#E2E8F0' : '#334155') }}
            >
              {isBloodRed ? 'BLOOD' : (isDark ? 'DARK' : 'LIGHT')}
            </span>
          </button>

          {/* Desktop Settings Button */}
          <button
            type="button"
            onClick={toggleCustomizer}
            aria-label="Theme & Availability Settings"
            title="Theme & Availability Settings"
            className="relative h-[38px] w-[38px] rounded-full cursor-pointer flex items-center justify-center border transition-all duration-300 hover:scale-105 active:scale-95 select-none z-50 pointer-events-auto shadow-sm"
            style={{
              borderColor: customizerOpen ? accent.primary : (isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.12)'),
              background:  customizerOpen ? (isDark ? '#1E293B' : '#EDE9FE') : (isDark ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.95)'),
              backdropFilter: 'blur(12px)',
              color:       customizerOpen ? accent.primary : (isDark ? '#F8FAFC' : '#0F172A'),
              boxShadow:   isDark 
                ? '0 4px 14px rgba(0, 0, 0, 0.35)' 
                : '0 2px 10px rgba(15, 23, 42, 0.06)',
            }}
          >
            <motion.div animate={{ rotate: customizerOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
              <Settings size={16} />
            </motion.div>
          </button>

          {/* Desktop Customizer Dropdown Panel */}
          <AnimatePresence>
            {customizerOpen && (
              <motion.div
                className="absolute right-0 top-full mt-3 w-[280px] p-5 rounded-2xl z-50 text-left pointer-events-auto"
                style={{
                  background: panelBg,
                  border:     `1px solid ${panelBorder}`,
                  boxShadow:  `0 24px 60px rgba(0,0,0,0.35), 0 4px 20px ${accent.glowSoft}`,
                }}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <SettingsPanel />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hire Me button */}
          <motion.button
            onClick={() => navigate('/contact')}
            className="flex items-center gap-1.5 h-[42px] px-5 rounded-[14px] text-white text-xs font-bold shadow-md cursor-pointer"
            style={{
              background: activePillGradient,
              boxShadow:  activePillShadow,
              transition: 'box-shadow 300ms ease',
            }}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.95 }}
          >
            Hire Me
          </motion.button>
        </div>

        {/* ── Mobile Controls (< 1024px) ────────────────────────────────────── */}
        <div className="flex lg:hidden items-center gap-2" ref={mobileDropdownRef}>
          {/* Mobile Theme Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            onDoubleClick={handleDoubleClickTheme}
            aria-label={isBloodRed ? 'Blood Red theme active' : (isDark ? 'Switch to Light mode' : 'Switch to Dark mode')}
            title="Single-click: Toggle Light/Dark | Double-click: Toggle Bloody Crimson Red"
            className="relative h-[38px] px-3.5 rounded-full cursor-pointer flex items-center gap-2 overflow-hidden border transition-all duration-300 hover:scale-105 active:scale-95 select-none z-50 pointer-events-auto shadow-sm"
            style={{
              borderColor: isBloodRed ? '#EF4444' : (isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.12)'),
              background:  isBloodRed ? 'rgba(153, 27, 27, 0.9)' : (isDark ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.95)'),
              backdropFilter: 'blur(12px)',
              color:       isBloodRed ? '#FFF1F2' : (isDark ? '#F8FAFC' : '#0F172A'),
              boxShadow:   isBloodRed 
                ? '0 0 20px rgba(239,68,68,0.5), inset 0 1px 0 rgba(248,113,113,0.3)' 
                : (isDark ? '0 4px 14px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.1)' : '0 2px 10px rgba(15, 23, 42, 0.06)'),
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isBloodRed ? 'blood-sun' : (isDark ? 'dark-sun' : 'light-moon')}
                initial={{ rotate: -120, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 120, scale: 0.5, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                className="flex items-center justify-center"
              >
                {isBloodRed ? (
                  <Sun size={15} className="text-red-500 animate-pulse drop-shadow-[0_0_12px_rgba(239,68,68,0.9)]" />
                ) : isDark ? (
                  <Sun size={15} className="text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
                ) : (
                  <Moon size={15} className="text-violet-600 dark:text-violet-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
                )}
              </motion.div>
            </AnimatePresence>
            <span
              className="text-[10px] font-mono font-bold tracking-widest uppercase select-none transition-colors duration-300"
              style={{ color: isBloodRed ? '#FFF1F2' : (isDark ? '#E2E8F0' : '#334155') }}
            >
              {isBloodRed ? 'BLOOD' : (isDark ? 'DARK' : 'LIGHT')}
            </span>
          </button>

          {/* Mobile Settings Button */}
          <button
            type="button"
            onClick={toggleCustomizer}
            aria-label="Settings"
            className="relative h-[38px] w-[38px] rounded-full cursor-pointer flex items-center justify-center border transition-all duration-300 hover:scale-105 active:scale-95 select-none z-50 pointer-events-auto shadow-sm"
            style={{
              borderColor: customizerOpen ? accent.primary : (isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.12)'),
              background:  customizerOpen ? (isDark ? '#1E293B' : '#EDE9FE') : (isDark ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.95)'),
              backdropFilter: 'blur(12px)',
              color:       customizerOpen ? accent.primary : (isDark ? '#F8FAFC' : '#0F172A'),
            }}
          >
            <motion.div animate={{ rotate: customizerOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
              <Settings size={16} />
            </motion.div>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(o => !o)}
            aria-label="Toggle menu"
            className="relative p-2.5 rounded-[14px] cursor-pointer flex items-center justify-center overflow-hidden border transition-all duration-200 hover:scale-105 active:scale-95 pointer-events-auto select-none z-50"
            style={{
              borderColor: utilBorder,
              background:  utilBg,
              color:       utilColor,
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{   rotate:  90,  opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

      </div>

      {/* ─── Mobile Customizer Dropdown Panel ────────────────────────────────── */}
      <AnimatePresence>
        {customizerOpen && (
          <motion.div
            ref={mobilePanelRef}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[90%] max-w-sm p-5 rounded-2xl z-50 text-left pointer-events-auto lg:hidden"
            style={{
              background: panelBg,
              border:     `1px solid ${panelBorder}`,
              boxShadow:  `0 24px 60px rgba(0,0,0,0.35), 0 4px 20px ${accent.glowSoft}`,
            }}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <SettingsPanel />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Mobile Navigation Drawer Card ───────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Scrim */}
            <motion.div
              className="fixed inset-0 z-30 bg-black/50 lg:hidden pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer Card */}
            <motion.div
              className="absolute top-full left-0 right-0 w-full p-4 z-40 pointer-events-auto lg:hidden overflow-hidden"
              style={{
                background:   panelBg,
                borderBottom: `1px solid ${panelBorder}`,
                boxShadow:    '0 12px 32px rgba(0,0,0,0.3)',
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col gap-1 max-w-[1400px] mx-auto px-2">
                {navLinks.map((link, i) => {
                  const active = isActive(link.path);
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.16 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center text-sm font-semibold py-2.5 px-4 rounded-xl cursor-pointer"
                        style={{
                          color:      active ? '#ffffff'           : inactiveColor,
                          background: active ? activePillGradient : 'transparent',
                          boxShadow:  active ? activePillShadow   : 'none',
                          transition: 'background 250ms ease, color 250ms ease',
                        }}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div
                className="mt-3 pt-3 max-w-[1400px] mx-auto px-2"
                style={{ borderTop: `1px solid ${panelBorder}` }}
              >
                <motion.button
                  onClick={() => { setIsOpen(false); navigate('/contact'); }}
                  className="w-full h-10 rounded-xl text-white font-bold flex items-center justify-center text-xs cursor-pointer"
                  style={{ background: activePillGradient, boxShadow: activePillShadow }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Hire Me
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Admin Authentication Modal */}
      <AnimatePresence>
        {authModalOpen && (
          <div id="admin-auth-modal" className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAuthModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-sm p-6 rounded-3xl bg-[#0F172A] border border-white/15 shadow-2xl text-left z-10"
              style={{
                boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 30px rgba(139,92,246,0.2)'
              }}
            >
              <button
                type="button"
                onClick={() => setAuthModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-text-title transition-colors"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary-light">
                  <Lock size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-text-title">Admin Authentication</h3>
                  <p className="text-[11px] font-mono text-text-muted">Enter Admin credentials to change status</p>
                </div>
              </div>

              <form onSubmit={handleAdminAuthSubmit} className="space-y-4 pt-1">
                {authError && (
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-bold text-center">
                    {authError}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted">Admin ID</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={adminUsernameInput}
                      onChange={(e) => setAdminUsernameInput(e.target.value)}
                      placeholder="Enter Admin Username"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-primary focus:outline-none text-xs text-text-title font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted">Admin Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={adminPasswordInput}
                      onChange={(e) => setAdminPasswordInput(e.target.value)}
                      placeholder="Enter Admin Password"
                      required
                      className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-white/[0.03] border border-white/10 focus:border-primary focus:outline-none text-xs text-text-title font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(p => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-title transition-colors"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <KeyRound size={14} />
                    Verify & Unlock Status
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── NavItem Sub-component ─────────────────────────────────────────────────────
function NavItem({
  link, active,
  activePillGradient, activePillShadow,
  inactiveColor, hoverColor, hoverBg,
}: {
  link:               { name: string; path: string };
  active:             boolean;
  activePillGradient: string;
  activePillShadow:   string;
  inactiveColor:      string;
  hoverColor:         string;
  hoverBg:            string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative select-none"
      style={{ borderRadius: '9999px' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={()   => setHovered(false)}
      animate={{ y: !active && hovered ? -2 : 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Active Navigation Pill */}
      {active && (
        <motion.span
          layoutId="activeNavPill"
          className="absolute inset-0"
          style={{
            background:   activePillGradient,
            borderRadius: '9999px',
            boxShadow:    activePillShadow,
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}

      {/* Inactive Hover Background Fill */}
      {!active && (
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{ background: hoverBg, borderRadius: '9999px' }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      <Link
        to={link.path}
        className="relative z-10 flex items-center justify-center text-[14px] font-semibold"
        style={{
          color:        active ? '#ffffff' : hovered ? hoverColor : inactiveColor,
          padding:      active ? '10px 22px' : '8px 18px',
          borderRadius: '9999px',
          transition:   'color 250ms ease, padding 250ms ease',
        }}
      >
        {link.name}
      </Link>
    </motion.div>
  );
}
