import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Sparkles, Copy, Check } from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandOutput {
  id: string;
  command: string;
  response: React.ReactNode;
  timestamp: string;
}

export default function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [logs, setLogs] = useState<CommandOutput[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Initial welcome greeting
  useEffect(() => {
    if (isOpen && logs.length === 0) {
      setLogs([
        {
          id: 'welcome',
          command: 'init',
          response: (
            <div className="space-y-2 text-xs">
              <p className="text-emerald-400 font-bold">
                🚀 Welcome to Ravindra Chavan&apos;s Interactive Portfolio Terminal (v2.5)
              </p>
              <p className="text-slate-400 leading-relaxed">
                Associate Software Engineer | Java 21 • Spring Boot 3 • MySQL • React • Microservices
              </p>
              <p className="text-slate-300">
                Type <span className="text-primary-light font-bold underline cursor-pointer" onClick={() => executeCommand('help')}>help</span> to see all available commands or explore architecture with <span className="text-amber-400 font-bold underline cursor-pointer" onClick={() => executeCommand('arch')}>arch</span>.
              </p>
            </div>
          ),
          timestamp: new Date().toLocaleTimeString(),
        }
      ]);
    }
  }, [isOpen, logs.length]);

  // Focus input on open & scroll to bottom
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const executeCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    const lower = raw.toLowerCase();
    const parts = lower.split(' ');
    const root = parts[0];
    const arg = parts[1];

    // Add to history
    setHistory(prev => [...prev, raw]);
    setHistoryPointer(-1);

    let res: React.ReactNode;

    switch (root) {
      case 'help':
        res = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-emerald-400 font-bold border-b border-white/10 pb-1">AVAILABLE COMMANDS</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 font-mono">
              <div><span className="text-cyan-400 font-bold">about</span> : Engineer bio, background & focus</div>
              <div><span className="text-cyan-400 font-bold">skills</span> : Full-stack technical stack breakdown</div>
              <div><span className="text-cyan-400 font-bold">projects</span> : Flagship enterprise case studies</div>
              <div><span className="text-amber-400 font-bold">arch</span> : System design & DR flowcharts</div>
              <div><span className="text-cyan-400 font-bold">stats</span> : System benchmarks & live metrics</div>
              <div><span className="text-cyan-400 font-bold">theme &lt;name&gt;</span> : Switch accent palette (cyan, purple...)</div>
              <div><span className="text-emerald-400 font-bold">hire</span> : Fast-track direct contact & WhatsApp</div>
              <div><span className="text-slate-400 font-bold">clear</span> : Reset terminal output</div>
              <div><span className="text-slate-400 font-bold">exit</span> : Close terminal window</div>
            </div>
          </div>
        );
        break;

      case 'about':
        res = (
          <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
            <p className="text-emerald-400 font-bold">ABOUT RAVINDRA CHAVAN</p>
            <p>
              Associate Software Engineer specializing in scalable enterprise backends using <span className="text-white font-semibold">Java 21</span>, <span className="text-white font-semibold">Spring Boot 3</span>, <span className="text-white font-semibold">Spring Security (JWT)</span>, and <span className="text-white font-semibold">MySQL</span>.
            </p>
            <p>
              Experienced in high-concurrency booking daemons with pessimistic locking, dual-cloud disaster recovery replication, RESTful microservices, and modern responsive frontends in <span className="text-white font-semibold">React 19 & TypeScript</span>.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded bg-white/5 text-primary-light border border-white/10">📍 Pune / Maharashtra, India</span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-emerald-400 border border-white/10">💼 Open to Full-Stack / Backend Roles</span>
            </div>
          </div>
        );
        break;

      case 'skills':
        res = (
          <div className="space-y-2.5 text-xs text-slate-300">
            <p className="text-emerald-400 font-bold">TECHNICAL SKILLS MATRIX</p>
            <div className="space-y-2 font-mono text-[11px]">
              <div>
                <span className="text-amber-400 font-bold">[Backend & Architecture]:</span>
                <p className="text-slate-300">Java 21 LTS, Spring Boot 3.3, Spring Security (JWT), Spring Data JPA, Hibernate, REST APIs, Microservices, Multithreading</p>
              </div>
              <div>
                <span className="text-blue-400 font-bold">[Databases & Storage]:</span>
                <p className="text-slate-300">MySQL 8.0, PostgreSQL, H2 Persistent Disk/In-Memory, Pessimistic Locking, Normalization</p>
              </div>
              <div>
                <span className="text-cyan-400 font-bold">[Frontend & UI]:</span>
                <p className="text-slate-300">React 19, TypeScript, JavaScript (ES6+), Tailwind CSS 4, Framer Motion, Responsive Design</p>
              </div>
              <div>
                <span className="text-purple-400 font-bold">[DevOps, Testing & Cloud]:</span>
                <p className="text-slate-300">Docker, Docker Compose, JUnit 5, Mockito, Git/GitHub, Render, Vercel, CI/CD Pipelines</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'projects':
        res = (
          <div className="space-y-2 text-xs text-slate-300">
            <p className="text-emerald-400 font-bold">FLAGSHIP PROJECTS</p>
            <div className="space-y-3 font-mono text-[11px]">
              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between text-amber-400 font-bold">
                  <span>1. Shivchhatra Trekkers (Flagship)</span>
                  <a href="https://github.com/ravichavan9970/Shivchhatra-Trekkers-Backend" target="_blank" rel="noreferrer" className="underline text-slate-400 hover:text-white">GitHub ↗</a>
                </div>
                <p className="text-slate-300 text-[10px] mt-1">
                  Spring Boot 3.3.3 & Java 21 • Dual-cloud disaster recovery replication across Render instances • Dynamic UPI QR instant booking engine • 600 req/min rate limiter.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>2. MultiVendor Marketplace</span>
                  <a href="https://github.com/ravichavan9970/MultiVendor.git" target="_blank" rel="noreferrer" className="underline text-slate-400 hover:text-white">GitHub ↗</a>
                </div>
                <p className="text-slate-300 text-[10px] mt-1">
                  Java 21 & Spring Boot 3 • Dual-identifier 6-digit OTP auth • Pessimistic locking reservation daemon (@Scheduled) preventing cart race conditions.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between text-cyan-400 font-bold">
                  <span>3. StudySync Student Platform</span>
                  <a href="https://github.com/ravichavan9970/StudySync.git" target="_blank" rel="noreferrer" className="underline text-slate-400 hover:text-white">GitHub ↗</a>
                </div>
                <p className="text-slate-300 text-[10px] mt-1">
                  Spring Boot & React • 30+ RESTful APIs across 7 modules • Pomodoro timer with Chart.js focus analytics & normalized 7-table schema.
                </p>
              </div>
            </div>
          </div>
        );
        break;

      case 'arch':
      case 'architecture':
        res = (
          <div className="space-y-3 text-xs text-slate-300">
            <p className="text-amber-400 font-bold">ENTERPRISE SYSTEM ARCHITECTURE FLOWCHARTS</p>
            
            <div className="p-3 rounded-lg bg-black/40 border border-amber-500/30 font-mono text-[10px] leading-relaxed overflow-x-auto text-amber-200">
              <p className="font-bold text-white mb-1">▶ Shivchhatra Trekkers: Dual-Cloud Disaster Recovery Engine</p>
              <pre>{`[Mobile/Web Client]
       │ (HTTPS REST API / Rate-Limited 600 req/min)
       ▼
┌──────────────────────────────────────────────┐
│  PRIMARY CLUSTER (Render Java 21 Instance)   │
│  - Spring Boot 3.3.3 + JPA + H2 Disk Vault   │
│  - Dynamic UPI QR Engine + Base64 Receipts   │
└──────────────────────┬───────────────────────┘
                       │ Atomic Bulk-Sync Pipeline
                       ▼
┌──────────────────────────────────────────────┐
│  SECONDARY STANDBY (Failover Render Replica) │
│  - Real-time mirrored expedition database    │
│  - Offline timestamped JSON backup snapshot  │
└──────────────────────────────────────────────┘`}</pre>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-emerald-500/30 font-mono text-[10px] leading-relaxed overflow-x-auto text-emerald-200">
              <p className="font-bold text-white mb-1">▶ MultiVendor: Pessimistic Locking & Order Hold Daemon</p>
              <pre>{`[Concurrent Buyers Checkout Same SKU]
                  │
                  ▼
┌────────────────────────────────────────────────────────┐
│  @Transactional Checkout Service                       │
│  - SELECT stock FROM product WHERE id=? FOR UPDATE     │
│  - Database Row Lock prevents double-allocation        │
│  - Generates 10-Minute Temporary Hold Token            │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│  @Scheduled(fixedDelay = 60000) Sweeper Daemon         │
│  - Scans expired reservations past 10 minutes          │
│  - Releases locked inventory automatically             │
└────────────────────────────────────────────────────────┘`}</pre>
            </div>
          </div>
        );
        break;

      case 'stats':
        res = (
          <div className="space-y-2 text-xs text-slate-300">
            <p className="text-emerald-400 font-bold">SYSTEM TELEMETRY & RUNTIME METRICS</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center pt-1">
              <div className="p-2 rounded bg-white/5 border border-white/10">
                <span className="text-[10px] text-slate-400 block">JVM RUNTIME</span>
                <span className="text-xs font-bold text-white">Java 21 LTS</span>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/10">
                <span className="text-[10px] text-slate-400 block">FRAMEWORK</span>
                <span className="text-xs font-bold text-emerald-400">Spring Boot 3</span>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/10">
                <span className="text-[10px] text-slate-400 block">P99 LATENCY</span>
                <span className="text-xs font-bold text-cyan-400">&lt; 45 ms</span>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/10">
                <span className="text-[10px] text-slate-400 block">UPTIME / SLA</span>
                <span className="text-xs font-bold text-purple-400">99.98%</span>
              </div>
            </div>
          </div>
        );
        break;

      case 'theme':
        if (!arg) {
          res = (
            <p className="text-amber-400 text-xs font-mono">
              Usage: theme &lt;name&gt; (Options: purple, cyan, emerald, blue, orange, rose, slate)
            </p>
          );
        } else {
          const allowed = ['purple', 'cyan', 'emerald', 'blue', 'orange', 'rose', 'slate'];
          if (allowed.includes(arg)) {
            localStorage.setItem('theme-color', arg);
            window.dispatchEvent(new Event('themechange'));
            res = (
              <p className="text-emerald-400 text-xs font-mono">
                ✓ Accent theme switched to <span className="font-bold uppercase">{arg}</span>.
              </p>
            );
          } else {
            res = (
              <p className="text-red-400 text-xs font-mono">
                Unknown theme: &quot;{arg}&quot;. Available: {allowed.join(', ')}.
              </p>
            );
          }
        }
        break;

      case 'hire':
      case 'sudo':
        res = (
          <div className="space-y-2 text-xs text-slate-300">
            <p className="text-emerald-400 font-bold">🎉 FAST-TRACK RECRUITER CONTACT</p>
            <p className="leading-relaxed">
              Ravindra is available for Full-Stack Java and Backend Software Engineering positions.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
              <a
                href="https://wa.me/917447661921?text=Hi%20Ravindra,%20we%20reviewed%20your%20portfolio%20and%20would%20like%20to%20connect!"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-colors"
              >
                Chat on WhatsApp (+91 74476 61921) ↗
              </a>
              <a
                href="mailto:ravindrachavan265125@gmail.com?subject=Opportunity%20Discussion%20-%20Software%20Engineer"
                className="px-3 py-1.5 rounded bg-primary hover:bg-primary-hover text-white font-bold transition-colors"
              >
                Send Direct Email ↗
              </a>
            </div>
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        return;

      case 'exit':
        onClose();
        return;

      default:
        res = (
          <p className="text-rose-400 text-xs font-mono">
            zsh: command not found: {raw}. Type <span className="text-primary-light underline cursor-pointer" onClick={() => executeCommand('help')}>help</span> for valid commands.
          </p>
        );
        break;
    }

    setLogs(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        command: raw,
        response: res,
        timestamp: new Date().toLocaleTimeString(),
      }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyPointer === -1 ? history.length - 1 : Math.max(0, historyPointer - 1);
        setHistoryPointer(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length > 0 && historyPointer !== -1) {
        const nextIdx = historyPointer + 1;
        if (nextIdx < history.length) {
          setHistoryPointer(nextIdx);
          setInputVal(history[nextIdx]);
        } else {
          setHistoryPointer(-1);
          setInputVal('');
        }
      }
    }
  };

  const copyTranscript = () => {
    const text = logs.map(l => `$ ${l.command}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`relative rounded-2xl overflow-hidden border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.8)] z-10 flex flex-col transition-all duration-300 ${
              isExpanded ? 'w-full h-[92vh]' : 'w-full max-w-3xl h-[620px] max-h-[85vh]'
            }`}
            style={{
              background: '#0a0d18',
            }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0d1222] border-b border-white/10 select-none">
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 flex items-center justify-center transition-all cursor-pointer"
                  title="Close Terminal"
                />
                <button
                  onClick={() => setLogs([])}
                  className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110 flex items-center justify-center transition-all cursor-pointer"
                  title="Clear Screen"
                />
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-110 flex items-center justify-center transition-all cursor-pointer"
                  title="Maximize/Restore"
                />
                <span className="text-xs font-mono font-bold text-slate-400 ml-3 flex items-center gap-1.5">
                  <TerminalIcon size={13} className="text-primary-light" />
                  ravindra@portfolio:~ (bash)
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <button
                  onClick={copyTranscript}
                  title="Copy command transcript"
                  className="p-1 rounded hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? "Restore size" : "Maximize"}
                  className="p-1 rounded hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                >
                  {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button
                  onClick={onClose}
                  title="Close"
                  className="p-1 rounded hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 overflow-y-auto p-4 font-mono text-left space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {logs.map((log) => (
                <div key={log.id} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-emerald-400 font-bold">ravindra@portfolio</span>
                    <span className="text-slate-500">:</span>
                    <span className="text-cyan-400 font-bold">~</span>
                    <span className="text-slate-500">$</span>
                    <span className="text-white font-bold">{log.command}</span>
                    <span className="text-[10px] text-slate-600 ml-auto">{log.timestamp}</span>
                  </div>
                  <div className="pl-4 text-slate-300">
                    {log.response}
                  </div>
                </div>
              ))}

              {/* Input Prompt Line */}
              <div className="flex items-center gap-2 text-xs pt-1">
                <span className="text-emerald-400 font-bold shrink-0">ravindra@portfolio</span>
                <span className="text-slate-500 shrink-0">:</span>
                <span className="text-cyan-400 font-bold shrink-0">~</span>
                <span className="text-slate-500 shrink-0">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-white font-mono focus:outline-none placeholder-slate-600"
                  placeholder="type 'help', 'skills', 'arch', 'projects'..."
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </div>
              <div ref={terminalBottomRef} />
            </div>

            {/* Bottom Status Ribbon */}
            <div className="px-4 py-2 bg-[#0d1222] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none">
              <div className="flex items-center gap-4">
                <span>Type <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-primary-light">help</kbd></span>
                <span>History <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10">↓</kbd></span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Sparkles size={12} />
                <span>Interactive Bash Shell</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
