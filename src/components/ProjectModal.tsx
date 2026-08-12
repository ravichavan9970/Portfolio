import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Shield, Database, Server } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export interface ProjectModalData {
  title: string;
  tagline?: string;
  desc: string;
  longDesc?: string;
  tech: string[];
  features: string[];
  status: string;
  image: string;
  image2?: string;
  repo: string;
  link: string;
  modules?: { name: string; desc: string }[];
  architecture?: string[];
}

interface ProjectModalProps {
  project: ProjectModalData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop Scrim */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0F172A] border border-white/15 rounded-[28px] shadow-2xl overflow-y-auto z-10 text-left my-auto"
          style={{
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.7), 0 0 40px rgba(139, 92, 246, 0.2)'
          }}
        >
          {/* Top Sticky Header */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                {project.status || 'Production Ready'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-text-title transition-all duration-200 cursor-pointer border border-white/10 hover:rotate-90"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Browser Screenshot Showcase */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl">
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <div className="ml-3 px-3 py-0.5 rounded bg-black/40 text-[10px] font-mono text-slate-400 border border-white/5 truncate max-w-xs">
                  https://{project.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.dev
                </div>
              </div>
              <div className="relative w-full max-h-[420px] overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Title & Tagline */}
            <div>
              <h2 className="text-2xl md:text-4xl font-bold font-display text-text-title tracking-tight leading-tight">
                {project.title}
              </h2>
              {project.tagline && (
                <p className="text-xs md:text-sm font-mono font-bold text-primary-light mt-1.5">
                  {project.tagline}
                </p>
              )}
            </div>

            {/* Tech Stack Chips */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono uppercase font-bold text-text-muted tracking-widest">
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-xl bg-primary/10 border border-primary/25 text-primary-light text-xs font-mono font-bold shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Description / Case Study Details */}
            <div className="space-y-3 bg-white/[0.02] border border-white/5 p-5 md:p-6 rounded-2xl">
              <h4 className="text-sm font-bold font-display text-text-title flex items-center gap-2">
                <Server size={16} className="text-primary" />
                Engineering & Architecture Overview
              </h4>
              <p className="text-xs md:text-sm text-text-muted leading-relaxed font-normal">
                {project.longDesc || project.desc}
              </p>
            </div>

            {/* Key Features Matrix */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold font-display text-text-title flex items-center gap-2">
                <Shield size={16} className="text-emerald-400" />
                Key Technical Highlights & Modules
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3 hover:border-primary/20 transition-all"
                  >
                    <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-xs font-mono font-bold text-text-title leading-snug">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Screenshot Preview if available */}
            {project.image2 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold font-display text-text-title flex items-center gap-2">
                  <Database size={16} className="text-secondary" />
                  Secondary Interface View
                </h4>
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl max-h-[350px]">
                  <img
                    src={project.image2}
                    alt={`${project.title} secondary view`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <ExternalLink size={14} />
                Explore Live Demo / Repository
              </a>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.03] hover:bg-white/10 text-text-title border border-white/10 hover:border-primary/30 text-xs font-bold active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <FaGithub size={14} />
                GitHub Code Repository
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
