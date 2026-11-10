import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, MapPin, Phone, 
  AlertTriangle, ArrowRight, ShieldCheck,
  Terminal, Copy, Check, 
  Clock, Lock, RefreshCw, Radio
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const [lastSubmitted, setLastSubmitted] = useState({ name: '', email: '', message: '' });
  const [lastSubmittedChannel, setLastSubmittedChannel] = useState<'email' | 'whatsapp'>('email');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [txId, setTxId] = useState('TX-89214');

  // Real-time local IST clock telemetry
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("ravindrachavan265125@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const validate = () => {
    const tempErrors: Partial<typeof formData> = {};
    if (!formData.name.trim()) tempErrors.name = "Sender identity required [NAME_EMPTY]";
    if (!formData.email.trim()) {
      tempErrors.email = "Return frequency required [EMAIL_EMPTY]";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Malformed socket format [INVALID_EMAIL]";
    }
    if (!formData.message.trim()) tempErrors.message = "Payload buffer empty [PAYLOAD_EMPTY]";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof formData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent, channel: 'email' | 'whatsapp' = 'email') => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    setSubmitError(null);
    setLastSubmittedChannel(channel);

    const generatedTxId = `TX-${Math.floor(10000 + Math.random() * 90000)}`;
    setTxId(generatedTxId);

    const name = formData.name;
    const email = formData.email;
    const message = formData.message;

    setLastSubmitted({ name, email, message });

    // 1. Dispatch packet to background contact endpoint
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message, channel, txId: generatedTxId })
    }).catch(() => null);

    // 2. Open encrypted communication socket
    if (channel === 'whatsapp') {
      const waUrl = `https://wa.me/917447661921?text=${encodeURIComponent(`[${generatedTxId}] Transmission from ${name} (${email}):\n\n${message}`)}`;
      window.open(waUrl, '_blank');
    } else {
      const subject = encodeURIComponent(`[${generatedTxId}] Transmission from ${name}`);
      const body = encodeURIComponent(`SENDER IDENTITY: ${name}\nRETURN SOCKET: ${email}\nTRANSMISSION ID: ${generatedTxId}\n\nPAYLOAD BRIEF:\n${message}`);
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ravindrachavan265125@gmail.com&su=${subject}&body=${body}`;
      window.open(gmailUrl, '_blank');
    }

    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
  };

  const contactChannels = [
    {
      id: "01",
      protocol: "DIRECT_SMTP",
      label: "Direct Email Socket",
      value: "ravindrachavan265125@gmail.com",
      actionType: "copy",
      href: "mailto:ravindrachavan265125@gmail.com",
      icon: <Mail size={16} className="text-cyan-600 dark:text-cyan-400" />
    },
    {
      id: "02",
      protocol: "SECURE_WHATSAPP",
      label: "WhatsApp Tunnel",
      value: "+91 74476 61921",
      actionType: "link",
      href: "https://wa.me/917447661921",
      icon: <Phone size={16} className="text-emerald-600 dark:text-emerald-400" />
    },
    {
      id: "03",
      protocol: "PHYSICAL_NODE",
      label: "Base Coordinates",
      value: "Pune, Maharashtra, India",
      actionType: "link",
      href: "https://maps.google.com/?q=Pune,Maharashtra",
      icon: <MapPin size={16} className="text-violet-600 dark:text-violet-400" />
    }
  ];

  return (
    <motion.div 
      className="py-16 sm:py-24 relative overflow-x-hidden bg-bg-darkest min-h-screen text-text-main hallmark-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Futuristic Quantum Atmospheric Glows */}
      <div className="absolute top-[12%] right-[8%] w-[500px] h-[500px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[5%] w-[500px] h-[500px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* ── 1. FUTURISTIC HUD HEADER & TELEMETRY STRIP ───────── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          
          {/* Cyber Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-800 dark:text-cyan-300 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <Radio size={12} className="text-cyan-600 dark:text-cyan-400" />
            <span>QUANTUM UPLINK // SECURE CHANNELS ACTIVE</span>
          </div>

          {/* Futuristic Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-neutral-900 dark:text-white">
            Transmission <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-500 to-secondary">Terminal</span>
          </h1>

          <p className="text-neutral-700 dark:text-text-muted max-w-xl mx-auto text-xs sm:text-sm font-sans leading-relaxed font-medium">
            Initiate encrypted direct transmission to Ravindra Chavan. Transmit an enterprise role opportunity, distributed architecture brief, or technical consultation.
          </p>

          {/* 4-Metric Telemetry Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 text-left font-mono">
            <div className="p-2.5 rounded-xl bg-white/80 dark:bg-white/[0.02] border border-neutral-300 dark:border-white/10 shadow-xs backdrop-blur-xs">
              <span className="text-[9px] uppercase tracking-wider text-neutral-600 dark:text-text-muted block font-semibold">GEO_NODE</span>
              <span className="text-[11px] font-bold text-neutral-900 dark:text-white block mt-0.5 truncate">18.5204° N, 73.8567° E</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/80 dark:bg-white/[0.02] border border-neutral-300 dark:border-white/10 shadow-xs backdrop-blur-xs">
              <span className="text-[9px] uppercase tracking-wider text-neutral-600 dark:text-text-muted block font-semibold">FREQUENCY</span>
              <span className="text-[11px] font-bold text-cyan-700 dark:text-cyan-400 block mt-0.5">1420.405 MHz</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/80 dark:bg-white/[0.02] border border-neutral-300 dark:border-white/10 shadow-xs backdrop-blur-xs">
              <span className="text-[9px] uppercase tracking-wider text-neutral-600 dark:text-text-muted block font-semibold">LATENCY P99</span>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">&lt; 8ms (OPTIMAL)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/80 dark:bg-white/[0.02] border border-neutral-300 dark:border-white/10 shadow-xs backdrop-blur-xs">
              <span className="text-[9px] uppercase tracking-wider text-neutral-600 dark:text-text-muted block font-semibold">CIPHER</span>
              <span className="text-[11px] font-bold text-violet-700 dark:text-violet-400 block mt-0.5">AES-256 / SHA-256</span>
            </div>
          </div>
        </div>

        {/* ── 2. MAIN MISSION CONTROL CONSOLE (LEFT + RIGHT) ───────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* LEFT: COMM-TRANSCEIVER TELEMETRY DOSSIER */}
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-neutral-300 dark:border-white/10 bg-white/95 dark:bg-[#0b0f19]/90 shadow-2xl relative overflow-hidden backdrop-blur-xl group hover:border-cyan-500/40 transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Tech Corner HUD Brackets */}
            <div className="absolute top-2.5 left-3 text-[9px] font-mono text-cyan-600/50 dark:text-cyan-400/40 select-none pointer-events-none">┌ [SYS.01]</div>
            <div className="absolute top-2.5 right-3 text-[9px] font-mono text-cyan-600/50 dark:text-cyan-400/40 select-none pointer-events-none">[SYS.02] ┐</div>
            <div className="absolute bottom-2.5 left-3 text-[9px] font-mono text-cyan-600/50 dark:text-cyan-400/40 select-none pointer-events-none">└ [SYS.03]</div>
            <div className="absolute bottom-2.5 right-3 text-[9px] font-mono text-cyan-600/50 dark:text-cyan-400/40 select-none pointer-events-none">[SYS.04] ┘</div>

            <div className="space-y-6 text-left pt-2">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-white/10 pb-3 font-mono text-xs">
                <span className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white">
                  <Terminal size={14} className="text-cyan-600 dark:text-cyan-400" />
                  COMM_TRANSCEIVER_v26.bin
                </span>
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                  <span className="flex gap-0.5 items-end h-3">
                    <span className="w-1 h-1.5 bg-emerald-500 rounded-xs animate-pulse"></span>
                    <span className="w-1 h-2 bg-emerald-500 rounded-xs"></span>
                    <span className="w-1 h-2.5 bg-emerald-500 rounded-xs"></span>
                    <span className="w-1 h-3 bg-emerald-500 rounded-xs"></span>
                  </span>
                  <span>99.8% SIGNAL</span>
                </div>
              </div>

              {/* Holographic Radar Availability Radar Module */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 relative overflow-hidden shadow-xs">
                <div className="flex items-start gap-3 relative z-10">
                  <div className="relative flex h-4 w-4 shrink-0 mt-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        DEPLOYMENT STATUS // READY
                      </h4>
                    </div>
                    <p className="text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed">
                      Open to Associate Software Engineer, Java Full-Stack, and Spring Boot Backend engineering roles in Pune & across India.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-2 font-mono text-[9px]">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-500/30">
                        RESPONSE SLA &lt; 2 HRS
                      </span>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 font-bold border border-cyan-500/30">
                        TIMEZONE: IST (UTC+5:30)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Communication Channels (Encrypted Frequencies) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[10px] text-neutral-600 dark:text-text-muted font-bold uppercase tracking-wider">
                  <span>// DIRECT CHANNELS & SOCKETS</span>
                  <span>TLS 1.3</span>
                </div>
                
                <div className="space-y-2.5">
                  {contactChannels.map((channel) => (
                    <div
                      key={channel.id}
                      className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-300 dark:border-white/10 hover:border-cyan-500/40 hover:bg-neutral-100 dark:hover:bg-white/[0.04] transition-all group shadow-2xs flex items-center justify-between gap-3"
                    >
                      <a
                        href={channel.href}
                        target={channel.href.startsWith('http') ? '_blank' : undefined}
                        rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="flex items-center gap-3 min-w-0 flex-1"
                      >
                        <div className="p-2 rounded-lg bg-white dark:bg-white/[0.06] border border-neutral-300 dark:border-white/10 shrink-0 text-neutral-800 dark:text-white shadow-2xs group-hover:scale-105 transition-transform">
                          {channel.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono font-bold text-neutral-500 dark:text-text-muted uppercase">
                              FREQ {channel.id} // {channel.protocol}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-neutral-900 dark:text-white truncate block mt-0.5 group-hover:text-primary transition-colors font-mono">
                            {channel.value}
                          </span>
                        </div>
                      </a>

                      {/* Quick Action Button */}
                      {channel.actionType === 'copy' ? (
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          title="Copy Email to Clipboard"
                          className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-white/[0.06] border border-neutral-300 dark:border-white/10 hover:border-cyan-500 text-neutral-700 dark:text-text-muted hover:text-neutral-900 dark:hover:text-white transition-all text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer shrink-0 shadow-2xs"
                        >
                          {copiedEmail ? (
                            <>
                              <Check size={11} className="text-emerald-500" />
                              <span className="text-emerald-600 dark:text-emerald-400">COPIED</span>
                            </>
                          ) : (
                            <>
                              <Copy size={11} className="text-cyan-600 dark:text-cyan-400" />
                              <span>COPY</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <a
                          href={channel.href}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-white/[0.06] border border-neutral-300 dark:border-white/10 hover:border-cyan-500 text-neutral-700 dark:text-text-muted hover:text-neutral-900 dark:hover:text-white transition-all text-[10px] font-mono font-bold flex items-center gap-1 shrink-0 shadow-2xs"
                        >
                          <span>CONNECT</span>
                          <ArrowRight size={10} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Pune IST Telemetry Clock */}
              <div className="p-3 rounded-xl bg-neutral-100/90 dark:bg-black/40 border border-neutral-300 dark:border-white/10 font-mono text-[11px] flex items-center justify-between text-neutral-800 dark:text-text-muted">
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-cyan-600 dark:text-cyan-400" />
                  <span className="font-semibold text-neutral-900 dark:text-white">NODE TIME:</span>
                  <span className="text-cyan-700 dark:text-cyan-300 font-bold">{currentTime || '11:30:00 AM'} IST</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  <Lock size={10} />
                  <span>AES-256 E2EE</span>
                </div>
              </div>

            </div>

            {/* Holographic Orbital Social Relays */}
            <div className="pt-6 mt-6 border-t border-neutral-200 dark:border-white/10 text-left">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-neutral-600 dark:text-text-muted font-mono uppercase tracking-wider">
                  // ORBITAL SOCIAL RELAYS
                </span>
                <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">SYNCHRONIZED</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <a
                  href="https://github.com/ravichavan9970"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.03] hover:bg-neutral-100 dark:hover:bg-white/10 border border-neutral-300 dark:border-white/10 text-neutral-800 hover:text-black dark:text-text-muted dark:hover:text-white transition-all flex flex-col items-center gap-1 group shadow-2xs"
                  title="GitHub Profile"
                >
                  <FaGithub size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[8px] font-mono font-bold uppercase text-neutral-600 dark:text-text-muted">GIT_HUB</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/ravindra-chavan-4ba744250/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.03] hover:bg-neutral-100 dark:hover:bg-white/10 border border-neutral-300 dark:border-white/10 text-neutral-800 hover:text-blue-600 dark:text-text-muted dark:hover:text-cyan-400 transition-all flex flex-col items-center gap-1 group shadow-2xs"
                  title="LinkedIn Network"
                >
                  <FaLinkedin size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[8px] font-mono font-bold uppercase text-neutral-600 dark:text-text-muted">LINKEDIN</span>
                </a>
                <a
                  href="https://wa.me/917447661921"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.03] hover:bg-neutral-100 dark:hover:bg-white/10 border border-neutral-300 dark:border-white/10 text-neutral-800 hover:text-emerald-600 dark:text-text-muted dark:hover:text-emerald-400 transition-all flex flex-col items-center gap-1 group shadow-2xs"
                  title="WhatsApp Direct"
                >
                  <FaWhatsapp size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[8px] font-mono font-bold uppercase text-neutral-600 dark:text-text-muted">WHATSAPP</span>
                </a>
                <a
                  href="https://www.instagram.com/ravi_chavan_2002?igsh=MTBsd2dnN2N0bjlyOA=="
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.03] hover:bg-neutral-100 dark:hover:bg-white/10 border border-neutral-300 dark:border-white/10 text-neutral-800 hover:text-pink-600 dark:text-text-muted dark:hover:text-pink-400 transition-all flex flex-col items-center gap-1 group shadow-2xs"
                  title="Instagram"
                >
                  <FaInstagram size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[8px] font-mono font-bold uppercase text-neutral-600 dark:text-text-muted">INSTA</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: TRANSMISSION DISPATCH CONSOLE */}
          <motion.div 
            className="lg:col-span-7 p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-neutral-300 dark:border-white/10 bg-white/95 dark:bg-[#0b0f19]/90 shadow-2xl relative overflow-hidden backdrop-blur-xl group hover:border-primary/40 transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Tech Corner HUD Brackets */}
            <div className="absolute top-2.5 left-3 text-[9px] font-mono text-primary/50 select-none pointer-events-none">┌ [TX.01]</div>
            <div className="absolute top-2.5 right-3 text-[9px] font-mono text-primary/50 select-none pointer-events-none">[TX.02] ┐</div>
            <div className="absolute bottom-2.5 left-3 text-[9px] font-mono text-primary/50 select-none pointer-events-none">└ [TX.03]</div>
            <div className="absolute bottom-2.5 right-3 text-[9px] font-mono text-primary/50 select-none pointer-events-none">[TX.04] ┘</div>

            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-white/10 pb-3 mb-6 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="text-neutral-900 dark:text-white font-bold ml-1">DISPATCH_PAYLOAD_CONSOLE.sh</span>
              </div>
              <span className="text-[10px] font-bold text-neutral-500 dark:text-text-muted hidden sm:inline-block">
                PROTOCOL: TLS_v1.3 // DUAL-SOCKET
              </span>
            </div>

            {status === 'success' ? (
              <motion.div
                className="flex flex-col items-center justify-center text-center py-10 space-y-5"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-2xl shadow-lg animate-pulse">
                  <ShieldCheck size={42} />
                </div>
                
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold block mb-1">
                    // TRANSMISSION STATUS: 200 OK // ACKNOWLEDGED
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white font-display">
                    Payload Prepared &amp; Socket Initialized!
                  </h3>
                </div>

                {/* Telemetry Packet Receipt Card */}
                <div className="w-full max-w-md p-4 rounded-xl bg-neutral-50 dark:bg-black/50 border border-neutral-300 dark:border-white/10 font-mono text-left text-xs space-y-2">
                  <div className="flex justify-between border-b border-neutral-200 dark:border-white/10 pb-1.5">
                    <span className="text-neutral-500 dark:text-text-muted uppercase text-[10px]">TRANSMISSION_ID</span>
                    <span className="font-bold text-cyan-700 dark:text-cyan-400">{txId}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 dark:border-white/10 pb-1.5">
                    <span className="text-neutral-500 dark:text-text-muted uppercase text-[10px]">SENDER</span>
                    <span className="font-bold text-neutral-900 dark:text-white">{lastSubmitted.name || 'Anonymous Visitor'}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 dark:border-white/10 pb-1.5">
                    <span className="text-neutral-500 dark:text-text-muted uppercase text-[10px]">ROUTING_CHANNEL</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                      {lastSubmittedChannel === 'whatsapp' ? 'WhatsApp Direct Tunnel' : 'Direct Gmail SMTP'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500 dark:text-text-muted uppercase text-[10px]">TIMESTAMP</span>
                    <span className="font-bold text-neutral-700 dark:text-neutral-300">{currentTime} IST</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 dark:text-text-muted max-w-sm leading-relaxed font-sans">
                  {lastSubmittedChannel === 'whatsapp' 
                    ? 'A WhatsApp window has been launched with your encrypted message payload pre-formatted for Ravindra.'
                    : 'The Gmail Web Composer has been pre-loaded with your transmission envelope addressed directly to Ravindra.'}
                </p>

                {/* Re-trigger Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/917447661921?text=${encodeURIComponent(`[${txId}] Transmission from ${lastSubmitted.name || 'a visitor'} (${lastSubmitted.email || ''}):\n\n${lastSubmitted.message || ''}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold font-mono transition-all shadow-md cursor-pointer hover:scale-[1.02]"
                  >
                    <FaWhatsapp size={14} />
                    <span>LAUNCH WHATSAPP</span>
                  </a>

                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=ravindrachavan265125@gmail.com&su=${encodeURIComponent(`[${txId}] Transmission from ${lastSubmitted.name || 'a visitor'}`)}&body=${encodeURIComponent(`SENDER: ${lastSubmitted.name || ''}\nRETURN SOCKET: ${lastSubmitted.email || ''}\nTRANSMISSION ID: ${txId}\n\nPAYLOAD:\n${lastSubmitted.message || ''}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold font-mono transition-all shadow-md cursor-pointer hover:scale-[1.02]"
                  >
                    <Mail size={14} />
                    <span>RE-OPEN GMAIL</span>
                  </a>

                  <button
                    onClick={() => setStatus('idle')}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/20 hover:border-primary text-neutral-800 dark:text-white text-xs font-mono font-bold hover:bg-neutral-100 dark:hover:bg-white/5 transition-all cursor-pointer"
                  >
                    <RefreshCw size={12} />
                    <span>NEW TRANSMISSION</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={(e) => handleSubmit(e, 'email')} className="space-y-5 text-left">
                
                {/* 01. SENDER IDENTITY */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="name" className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                      <span className="text-cyan-600 dark:text-cyan-400">// 01.</span> SENDER IDENTITY
                    </label>
                    <span className="text-[9px] font-mono text-neutral-500 dark:text-text-muted uppercase font-bold">[PARAM_REQUIRED]</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Miller // Engineering Director"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-100/90 dark:bg-black/40 border border-neutral-300 dark:border-white/10 focus:border-cyan-500 focus:bg-white dark:focus:bg-white/[0.06] focus:ring-1 focus:ring-cyan-500 transition-all outline-none text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-text-muted/50 font-sans shadow-2xs"
                    />
                  </div>
                  {errors.name && (
                    <span className="text-[10px] font-bold font-mono text-red-500 flex items-center gap-1 mt-1">
                      <AlertTriangle size={11} />
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* 02. RETURN FREQUENCY (EMAIL) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="email" className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                      <span className="text-cyan-600 dark:text-cyan-400">// 02.</span> RETURN FREQUENCY (EMAIL)
                    </label>
                    <span className="text-[9px] font-mono uppercase font-bold">
                      {formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Check size={10} />
                          VALID SOCKET
                        </span>
                      ) : (
                        <span className="text-neutral-500 dark:text-text-muted">[TLS_ROUTED]</span>
                      )}
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john.miller@enterprise.io"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-100/90 dark:bg-black/40 border border-neutral-300 dark:border-white/10 focus:border-cyan-500 focus:bg-white dark:focus:bg-white/[0.06] focus:ring-1 focus:ring-cyan-500 transition-all outline-none text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-text-muted/50 font-sans shadow-2xs"
                    />
                  </div>
                  {errors.email && (
                    <span className="text-[10px] font-bold font-mono text-red-500 flex items-center gap-1 mt-1">
                      <AlertTriangle size={11} />
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* 03. MISSION PAYLOAD */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="message" className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                      <span className="text-cyan-600 dark:text-cyan-400">// 03.</span> TRANSMISSION PAYLOAD
                    </label>
                    <div className="text-[9px] font-mono flex items-center gap-2">
                      <span className={`font-bold ${formData.message.length > 0 ? 'text-cyan-700 dark:text-cyan-300' : 'text-neutral-500 dark:text-text-muted'}`}>
                        PAYLOAD: {formData.message.length} BYTES
                      </span>
                      <span className="text-neutral-400 dark:text-white/20">|</span>
                      <span className="text-neutral-500 dark:text-text-muted uppercase">CHECKSUM: OK</span>
                    </div>
                  </div>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe the engineering opportunity, high-concurrency Java project, or architectural inquiry..."
                      className="w-full px-4 py-3 rounded-xl bg-neutral-100/90 dark:bg-black/40 border border-neutral-300 dark:border-white/10 focus:border-cyan-500 focus:bg-white dark:focus:bg-white/[0.06] focus:ring-1 focus:ring-cyan-500 transition-all outline-none text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-text-muted/50 resize-none min-h-[160px] font-sans shadow-2xs"
                    />
                  </div>
                  {errors.message && (
                    <span className="text-[10px] font-bold font-mono text-red-500 flex items-center gap-1 mt-1">
                      <AlertTriangle size={11} />
                      {errors.message}
                    </span>
                  )}
                </div>

                {submitError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold font-mono flex items-center gap-2">
                    <AlertTriangle size={14} />
                    {submitError}
                  </div>
                )}

                {/* Dual Holographic Dispatch Execution Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, 'email')}
                    disabled={status === 'submitting'}
                    className="w-full flex flex-col items-center justify-center py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary via-indigo-600 to-secondary hover:from-indigo-600 hover:to-primary text-white text-xs font-bold font-mono transition-all duration-300 disabled:opacity-60 shadow-lg shadow-primary/20 cursor-pointer hover:scale-[1.01] active:scale-[0.98] border border-white/20 group"
                  >
                    <div className="flex items-center gap-2">
                      <Mail size={15} className="group-hover:translate-x-0.5 transition-transform" />
                      <span>{status === 'submitting' && lastSubmittedChannel === 'email' ? "TRANSMITTING..." : "EXECUTE EMAIL DISPATCH"}</span>
                    </div>
                    <span className="text-[9px] text-white/70 font-normal mt-0.5">ROUTING: DIRECT SMTP // TLS</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, 'whatsapp')}
                    disabled={status === 'submitting'}
                    className="w-full flex flex-col items-center justify-center py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white text-xs font-bold font-mono transition-all duration-300 disabled:opacity-60 shadow-lg shadow-emerald-500/20 cursor-pointer hover:scale-[1.01] active:scale-[0.98] border border-white/20 group"
                  >
                    <div className="flex items-center gap-2">
                      <FaWhatsapp size={16} className="group-hover:translate-x-0.5 transition-transform" />
                      <span>{status === 'submitting' && lastSubmittedChannel === 'whatsapp' ? "TRANSMITTING..." : "INITIATE WHATSAPP SOCKET"}</span>
                    </div>
                    <span className="text-[9px] text-white/70 font-normal mt-0.5">ROUTING: P2P INSTANT LINK</span>
                  </button>
                </div>

              </form>
            )}
          </motion.div>

        </div>

      </div>
    </motion.div>
  );
}