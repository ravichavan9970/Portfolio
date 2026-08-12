import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, MapPin, Phone, 
  AlertTriangle, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const [lastSubmitted, setLastSubmitted] = useState({ name: '', email: '', message: '' });
  const [lastSubmittedChannel, setLastSubmittedChannel] = useState<'email' | 'whatsapp'>('email');

  const validate = () => {
    const tempErrors: Partial<typeof formData> = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required";
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

    const name = formData.name;
    const email = formData.email;
    const message = formData.message;

    setLastSubmitted({ name, email, message });

    // 1. Send to background API if server active
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message, channel })
    }).catch(() => null);

    // 2. Open corresponding app / web link in new tab with pre-filled content
    if (channel === 'whatsapp') {
      const waUrl = `https://wa.me/917447661921?text=${encodeURIComponent(`Hi Ravindra,\n\nMy name is ${name} (${email}).\n\nMessage:\n${message}`)}`;
      window.open(waUrl, '_blank');
    } else {
      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(`Sender Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`);
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ravindrachavan265125@gmail.com&su=${subject}&body=${body}`;
      window.open(gmailUrl, '_blank');
    }

    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    { icon: <Mail size={16} className="text-primary-light" />, label: "Direct Email", value: "ravindrachavan265125@gmail.com", href: "mailto:ravindrachavan265125@gmail.com" },
    { icon: <Phone size={16} className="text-secondary-light" />, label: "WhatsApp Direct", value: "+91 74476 61921", href: "https://wa.me/917447661921" },
    { icon: <MapPin size={16} className="text-emerald-400" />, label: "Current Location", value: "Pune, Maharashtra, India", href: "https://maps.google.com/?q=Pune,Maharashtra" }
  ];

  return (
    <motion.div 
      className="py-24 relative overflow-hidden bg-bg-darkest min-h-screen text-text-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-[20%] right-[10%] w-[450px] h-[450px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1450px] mx-auto px-6 relative z-10 space-y-24">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary-light uppercase tracking-wider">
            Connection
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-text-title tracking-tight mt-4">
            Get In Touch
          </h2>
          <p className="text-text-muted mt-4 max-w-lg mx-auto text-xs md:text-sm leading-relaxed">
            Have an engineering role, want to collaborate on enterprise projects, or looking to hire a full-stack Java developer? Shoot me a message.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch">
          
          {/* LEFT: Metadata & Availability status */}
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-between p-8 rounded-[32px] border shadow-2xl relative overflow-hidden backdrop-blur-md"
            style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border-dark)' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8 text-left">
              {/* Availability panel */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3.5 shadow-sm">
                <div className="relative flex h-3.5 w-3.5 shrink-0 mt-0.5 select-none">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111827] font-display">Career Availability Status</h4>
                  <p className="text-[10px] text-[#374151] mt-1 leading-normal font-medium">
                    Open to Associate Software Engineer, Java Full-Stack, and Spring Boot backend engineering roles in Pune and across India.
                  </p>
                </div>
              </div>

              {/* Grid lists */}
              <div className="space-y-6">
                <h5 className="text-[10px] font-bold text-[#374151] uppercase tracking-widest font-mono">Direct Channels</h5>
                
                <div className="space-y-4">
                  {contactInfo.map((info, idx) => (
                    <a
                      key={idx}
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="flex gap-4 p-3 rounded-xl bg-black/[0.02] border border-transparent hover:border-black/5 hover:bg-black/[0.04] transition-all group"
                    >
                      <div className="p-2.5 rounded-lg bg-white border border-black/10 shrink-0 shadow-sm">
                        {info.icon}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-[#6B7280] font-mono uppercase block">{info.label}</span>
                        <span className="text-xs font-bold text-[#111827] truncate block mt-0.5 group-hover:text-primary transition-colors">{info.value}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-8 border-t border-black/10 text-left">
              <span className="text-[9px] font-bold text-[#6B7280] font-mono uppercase block mb-3">Social Profiles</span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://github.com/ravichavan9970"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-black/5 hover:bg-black/10 border border-black/10 hover:border-primary/30 text-[#374151] hover:text-primary transition-all duration-300"
                  title="GitHub"
                >
                  <FaGithub size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/ravindra-chavan-4ba744250/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-black/5 hover:bg-black/10 border border-black/10 hover:border-primary/30 text-[#374151] hover:text-primary transition-all duration-300"
                  title="LinkedIn"
                >
                  <FaLinkedin size={16} />
                </a>
                <a
                  href="https://www.instagram.com/ravi_chavan_2002?igsh=MTBsd2dnN2N0bjlyOA=="
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-black/5 hover:bg-black/10 border border-black/10 hover:border-primary/30 text-[#374151] hover:text-[#EC4899] transition-all duration-300"
                  title="Instagram"
                >
                  <FaInstagram size={16} />
                </a>
                <a
                  href="https://wa.me/917447661921"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-black/5 hover:bg-black/10 border border-black/10 hover:border-primary/30 text-[#374151] hover:text-emerald-600 transition-all duration-300"
                  title="WhatsApp"
                >
                  <FaWhatsapp size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Validated Form Center */}
          <motion.div 
            className="lg:col-span-7 p-8 rounded-[32px] border shadow-2xl relative overflow-hidden backdrop-blur-md"
            style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border-dark)' }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {status === 'success' ? (
              <motion.div
                className="flex flex-col items-center justify-center text-center h-full space-y-4 py-16"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
              >
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full animate-bounce">
                  <ShieldCheck size={36} />
                </div>
                <h3 className="text-lg font-bold text-[#111827] font-display">
                  {lastSubmittedChannel === 'whatsapp' ? 'Message Prepared & WhatsApp Opened!' : 'Message Prepared & Gmail Opened!'}
                </h3>
                <p className="text-xs text-[#374151] max-w-sm leading-relaxed font-semibold">
                  {lastSubmittedChannel === 'whatsapp' 
                    ? <>WhatsApp has been opened in a new tab pre-filled with your message to <span className="text-emerald-600 font-bold">+91 74476 61921</span>.</>
                    : <>Gmail Web Composer has been opened in a new tab pre-filled with your message to <span className="text-primary font-bold">ravindrachavan265125@gmail.com</span>.</>
                  }
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/917447661921?text=${encodeURIComponent(`Hi Ravindra, My name is ${lastSubmitted.name || 'a visitor'} (${lastSubmitted.email || ''}). Message: ${lastSubmitted.message || ''}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all duration-300 shadow-md cursor-pointer hover:scale-[1.02] justify-center"
                  >
                    <FaWhatsapp size={14} />
                    Send on WhatsApp
                  </a>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=ravindrachavan265125@gmail.com&su=${encodeURIComponent(`Portfolio Message from ${lastSubmitted.name || 'a visitor'}`)}&body=${encodeURIComponent(`Sender Name: ${lastSubmitted.name || ''}\nSender Email: ${lastSubmitted.email || ''}\n\nMessage:\n${lastSubmitted.message || ''}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all duration-300 shadow-md cursor-pointer hover:scale-[1.02] justify-center"
                  >
                    <Mail size={14} />
                    Re-open Gmail
                  </a>
                  <button
                    onClick={() => setStatus('idle')}
                    className="flex items-center justify-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors cursor-pointer px-5 py-2.5 rounded-xl border border-primary/20 hover:bg-primary/5"
                  >
                    Send another message
                    <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={(e) => handleSubmit(e, 'email')} className="space-y-6 text-left">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10px] font-semibold text-[#374151] uppercase tracking-[0.08em] font-mono">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4.5 py-3 rounded-2xl bg-white/75 backdrop-blur-[10px] border-[1.5px] border-[rgba(125,125,125,0.18)] focus:border-primary focus:shadow-[0_0_15px_rgba(139,92,246,0.25)] focus:scale-[1.01] transition-all duration-200 outline-none text-base text-[#111827] font-medium placeholder:text-[#94A3B8] placeholder:font-medium placeholder:transition-opacity placeholder:duration-200 focus:placeholder:opacity-0"
                  />
                  {errors.name && (
                    <span className="text-[10px] font-bold font-mono text-red-500 flex items-center gap-1">
                      <AlertTriangle size={10} />
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10px] font-semibold text-[#374151] uppercase tracking-[0.08em] font-mono">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full px-4.5 py-3 rounded-2xl bg-white/75 backdrop-blur-[10px] border-[1.5px] border-[rgba(125,125,125,0.18)] focus:border-primary focus:shadow-[0_0_15px_rgba(139,92,246,0.25)] focus:scale-[1.01] transition-all duration-200 outline-none text-base text-[#111827] font-medium placeholder:text-[#94A3B8] placeholder:font-medium placeholder:transition-opacity placeholder:duration-200 focus:placeholder:opacity-0"
                  />
                  {errors.email && (
                    <span className="text-[10px] font-bold font-mono text-red-500 flex items-center gap-1">
                      <AlertTriangle size={10} />
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[10px] font-semibold text-[#374151] uppercase tracking-[0.08em] font-mono">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write your message here..."
                    className="w-full px-4.5 py-3 rounded-2xl bg-white/75 backdrop-blur-[10px] border-[1.5px] border-[rgba(125,125,125,0.18)] focus:border-primary focus:shadow-[0_0_15px_rgba(139,92,246,0.25)] focus:scale-[1.01] transition-all duration-200 outline-none text-base text-[#111827] font-medium placeholder:text-[#94A3B8] placeholder:font-medium placeholder:transition-opacity placeholder:duration-200 focus:placeholder:opacity-0 resize-none min-h-[180px]"
                  />
                  {errors.message && (
                    <span className="text-[10px] font-bold font-mono text-red-500 flex items-center gap-1">
                      <AlertTriangle size={10} />
                      {errors.message}
                    </span>
                  )}
                </div>

                {submitError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-[10px] font-bold font-mono flex items-center gap-2">
                    <AlertTriangle size={12} />
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, 'email')}
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white text-xs font-bold transition-all duration-300 disabled:opacity-60 shadow-md shadow-primary/10 cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
                  >
                    <Mail size={15} />
                    <span>{status === 'submitting' && lastSubmittedChannel === 'email' ? "Sending..." : "Send via Email"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, 'whatsapp')}
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-teal-600 hover:to-emerald-500 text-white text-xs font-bold transition-all duration-300 disabled:opacity-60 shadow-md shadow-emerald-500/10 cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
                  >
                    <FaWhatsapp size={16} />
                    <span>{status === 'submitting' && lastSubmittedChannel === 'whatsapp' ? "Sending..." : "Send via WhatsApp"}</span>
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
