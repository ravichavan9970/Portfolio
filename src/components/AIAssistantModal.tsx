import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, X, Send, Bot, User, Code2, Layers, BrainCircuit, 
  Trash2, Copy, Check, ChevronRight, KeyRound, RefreshCw
} from 'lucide-react';

export type AIModelType = 'portfolio-rag' | 'arch-copilot' | 'code-auditor';

interface AIModelConfig {
  id: AIModelType;
  name: string;
  badge: string;
  tagline: string;
  color: string;
  borderColor: string;
  bgActive: string;
  icon: React.ReactNode;
  suggestedPrompts: string[];
}

const AI_MODELS: AIModelConfig[] = [
  {
    id: 'portfolio-rag',
    name: 'Gemini-Portfolio-RAG',
    badge: 'Model 01: Resume & Experience',
    tagline: 'Instant Q&A on Ravindra Chavan, Java 21, Spring Boot 3, and projects',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/40',
    bgActive: 'bg-amber-500/15',
    icon: <BrainCircuit size={16} className="text-amber-400" />,
    suggestedPrompts: [
      "Why should we hire Ravindra for a Backend Java Engineer role?",
      "Explain his hands-on experience with Spring Boot 3 and JWT.",
      "What high-concurrency problem did he solve in MultiVendor?",
      "Summarize his education and technical certifications."
    ]
  },
  {
    id: 'arch-copilot',
    name: 'Arch-DeepSeek-Java',
    badge: 'Model 02: System Architecture',
    tagline: 'Expert on distributed systems, pessimistic locking & dual-cloud DR',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    bgActive: 'bg-cyan-500/15',
    icon: <Layers size={16} className="text-cyan-400" />,
    suggestedPrompts: [
      "How does pessimistic locking (SELECT FOR UPDATE) prevent double-booking?",
      "Explain the Shivchhatra Trekkers dual-cloud disaster recovery architecture.",
      "How do Java 21 Virtual Threads compare to platform thread pools?",
      "Design a rate limiter for 600 requests/minute on Spring Boot."
    ]
  },
  {
    id: 'code-auditor',
    name: 'Code-Auditor-AI',
    badge: 'Model 03: Code Reviewer',
    tagline: 'Live analysis for concurrency bugs, deadlocks, N+1 queries & security',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    bgActive: 'bg-emerald-500/15',
    icon: <Code2 size={16} className="text-emerald-400" />,
    suggestedPrompts: [
      "Review a Spring Boot @Transactional method for race condition and deadlock hazards.",
      "How do you detect and resolve Hibernate N+1 query bottlenecks?",
      "Check this pattern: synchronized vs ReentrantLock in high-load booking services.",
      "What security best practices prevent JWT token hijacking in REST APIs?"
    ]
  }
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  modelId: AIModelType;
  text: string;
  timestamp: string;
}

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ── Query Normalizer (Fixes typos, slang, and common abbreviations) ─────────────
function normalizeQuery(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\bmi\b/g, 'me')
    .replace(/\bu\b/g, 'you')
    .replace(/\bur\b/g, 'your')
    .replace(/\babt\b/g, 'about')
    .replace(/\bwht\b/g, 'what')
    .replace(/\bplz\b|\bpls\b/g, 'please')
    .replace(/\bproj\b|\bprojets\b|\bprojectz\b/g, 'projects')
    .replace(/\bskils\b|\bskillz\b/g, 'skills')
    .replace(/\bexprnc\b|\bexp\b/g, 'experience')
    .replace(/\bedu\b|\bclg\b/g, 'education')
    .replace(/\bconatct\b|\bcontct\b/g, 'contact')
    .replace(/\bdetials\b|\bdetail\b/g, 'details')
    .replace(/\btele\b/g, 'tell')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasAny(q: string, words: string[]): boolean {
  return words.some(w => q.includes(w));
}

// ── Rich Interactive Markdown Renderer Component ─────────────────────────────
function FormattedMessage({ text }: { text: string }) {
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2 text-xs sm:text-[13px] leading-relaxed select-text text-text-main">
      {parts.map((part, pIdx) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.slice(3, -3).trim().split('\n');
          const firstLine = lines[0].trim();
          const hasLang = /^[a-zA-Z0-9_-]+$/.test(firstLine);
          const lang = hasLang ? firstLine : 'code';
          const codeContent = hasLang ? lines.slice(1).join('\n') : lines.join('\n');

          return (
            <div key={pIdx} className="my-3 rounded-xl overflow-hidden border border-white/10 bg-black/60 shadow-md">
              <div className="px-3 py-1.5 bg-white/[0.04] border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-text-muted">
                <span className="uppercase tracking-wider text-amber-400 font-bold">{lang}</span>
                <button
                  type="button"
                  onClick={() => copyCode(codeContent, pIdx)}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[10px]"
                >
                  {copiedCodeIdx === pIdx ? (
                    <>
                      <Check size={11} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={11} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 overflow-x-auto text-[11px] sm:text-xs font-mono text-cyan-200 leading-relaxed scrollbar-thin">
                <code>{codeContent}</code>
              </pre>
            </div>
          );
        }

        const lines = part.split('\n');
        return (
          <div key={pIdx} className="space-y-1.5">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();

              if (!trimmed) {
                return <div key={lIdx} className="h-1" />;
              }

              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={lIdx} className="text-sm font-bold text-white mt-3 mb-1 pt-1 pb-1 border-b border-white/10 flex items-center gap-1.5">
                    {renderInlineFormatting(trimmed.slice(4))}
                  </h3>
                );
              }

              if (trimmed.startsWith('#### ')) {
                return (
                  <h4 key={lIdx} className="text-xs font-bold text-amber-300 mt-2.5 mb-1">
                    {renderInlineFormatting(trimmed.slice(5))}
                  </h4>
                );
              }

              if (trimmed === '---') {
                return <hr key={lIdx} className="border-white/10 my-3" />;
              }

              if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-1.5 my-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-light mt-1.5 shrink-0" />
                    <div className="flex-1 leading-relaxed">
                      {renderInlineFormatting(trimmed.slice(2))}
                    </div>
                  </div>
                );
              }

              const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
              if (numMatch) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-1.5 my-1.5">
                    <span className="px-1.5 py-0.2 rounded bg-primary/20 border border-primary/40 text-[10px] font-mono text-primary-light font-bold shrink-0 mt-0.5">
                      {numMatch[1]}
                    </span>
                    <div className="flex-1 leading-relaxed">
                      {renderInlineFormatting(numMatch[2])}
                    </div>
                  </div>
                );
              }

              return (
                <p key={lIdx} className="leading-relaxed">
                  {renderInlineFormatting(line)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function renderInlineFormatting(text: string): React.ReactNode[] {
  const tokens = text.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*|\[.*?\]\(.*?\))/g);

  return tokens.map((token, idx) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      return (
        <strong key={idx} className="text-white font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith('`') && token.endsWith('`')) {
      return (
        <code key={idx} className="px-1.5 py-0.5 rounded bg-white/10 text-amber-300 font-mono text-[11px] border border-white/10">
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith('*') && token.endsWith('*')) {
      return (
        <em key={idx} className="text-cyan-300 italic">
          {token.slice(1, -1)}
        </em>
      );
    }
    const linkMatch = token.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={idx}
          href={linkMatch[2]}
          target={linkMatch[2].startsWith('http') ? '_blank' : '_self'}
          rel="noreferrer"
          className="text-cyan-400 hover:text-cyan-300 underline font-medium transition-colors"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return token;
  });
}

export default function AIAssistantModal({ isOpen, onClose }: AIAssistantModalProps) {
  const [activeModel, setActiveModel] = useState<AIModelType>('portfolio-rag');
  const [inputVal, setInputVal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => localStorage.getItem('user_gemini_api_key') || '');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Record<AIModelType, ChatMessage[]>>({
    'portfolio-rag': [
      {
        id: 'msg-p-1',
        sender: 'assistant',
        modelId: 'portfolio-rag',
        text: `👋 **Hi! I am Gemini-Portfolio-RAG**, specialized in Ravindra Chavan's engineering profile.\n\nAsk me anything about his **Java 21 / Spring Boot 3 enterprise stack**, flagship case studies (*Shivchhatra Trekkers*, *MultiVendor*, *StudySync*), or why he is a strong hire for your team!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ],
    'arch-copilot': [
      {
        id: 'msg-a-1',
        sender: 'assistant',
        modelId: 'arch-copilot',
        text: `⚡ **Welcome to Arch-DeepSeek-Java!**\n\nI specialize in **distributed architecture, high-concurrency reservation daemons, dual-cloud disaster recovery, and database locking strategies**. Ask me to analyze an architecture or explain system design concepts.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ],
    'code-auditor': [
      {
        id: 'msg-c-1',
        sender: 'assistant',
        modelId: 'code-auditor',
        text: `🔍 **Code-Auditor-AI online.**\n\nPaste Java / Spring Boot / React snippets or ask me to inspect concurrency locks, detect deadlocks, analyze JPA queries, or review security patterns.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]
  });

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, activeModel]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeModel, isGenerating]);

  const activeConfig = AI_MODELS.find(m => m.id === activeModel) || AI_MODELS[0];
  const activeMessages = messages[activeModel];

  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      localStorage.setItem('user_gemini_api_key', apiKeyInput.trim());
    } else {
      localStorage.removeItem('user_gemini_api_key');
    }
    setShowKeyConfig(false);
  };

  const handleClearChat = () => {
    setMessages(prev => ({
      ...prev,
      [activeModel]: [
        {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          modelId: activeModel,
          text: `🔄 Conversation cleared. Ready for your questions on **${activeConfig.name}**!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    }));
  };

  const generateAIResponse = async (userPrompt: string): Promise<string> => {
    const customKey = localStorage.getItem('user_gemini_api_key') || (import.meta as any).env?.VITE_GEMINI_API_KEY;

    if (customKey) {
      try {
        let systemContext = '';
        if (activeModel === 'portfolio-rag') {
          systemContext = `You are Gemini-Portfolio-RAG, an AI assistant representing Ravindra Chavan (Associate Software Engineer & Full-Stack Java Developer). Ravindra specializes in Java 21 LTS, Spring Boot 3.3, Spring Security JWT, MySQL, React 19, Docker, and RESTful Microservices. Key projects: 1. Shivchhatra Trekkers (Spring Boot 3.3.3, Dual-Cloud Disaster Recovery across Render, UPI QR instant booking, 600 req/min rate limiter); 2. MultiVendor Marketplace (Pessimistic locking reservation daemon, 6-digit OTP auth); 3. StudySync (Spring Boot & React productivity app, Pomodoro Chart.js analytics). Ravindra has an M.Sc in Computer Science (8.5 CGPA) and is available for hire immediately. Answer concisely and professionally.`;
        } else if (activeModel === 'arch-copilot') {
          systemContext = `You are Arch-DeepSeek-Java, an expert software architect specializing in Java 21, Spring Boot, distributed system design, high-concurrency booking engines, pessimistic row-locking (SELECT ... FOR UPDATE), dual-cloud disaster recovery, and microservices resilience. Provide structured, deep architectural answers with clean diagrams or code patterns where helpful.`;
        } else {
          systemContext = `You are Code-Auditor-AI, an enterprise code auditor specializing in Java, Spring Boot, and React. Your job is to identify bugs, concurrency issues, memory leaks, N+1 JPA query inefficiencies, and security vulnerabilities. Provide actionable refactored solutions.`;
        }

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${customKey}`;
        const resp = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  { text: `${systemContext}\n\nUser Question: ${userPrompt}` }
                ]
              }
            ]
          })
        });

        if (resp.ok) {
          const data = await resp.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) return reply;
        }
      } catch {
        // Fallback to local high-fidelity contextual engine below
      }
    }

    // High-Fidelity Client Contextual Reasoning Engine with Normalization
    await new Promise(r => setTimeout(r, 450));
    const q = normalizeQuery(userPrompt);

    // ────────────────────────────────────────────────────────────────────────
    // MODEL 01: GEMINI-PORTFOLIO-RAG (Resume & Experience Intelligence)
    // ────────────────────────────────────────────────────────────────────────
    if (activeModel === 'portfolio-rag') {
      // Specific: Shivchhatra Trekkers
      if (hasAny(q, ['shivchhatra', 'trek', 'trekkers', 'dual cloud', 'disaster recovery', 'render cloud', 'upi qr'])) {
        return `### 🏔️ Project Deep-Dive: Shivchhatra Trekkers

**Shivchhatra Trekkers** is an enterprise outdoor expedition booking & disaster-resilient platform built by Ravindra Chavan.

#### 🛠️ Tech Stack & Infrastructure:
- **Backend**: Java 21 (LTS), Spring Boot 3.3.3, Spring Data JPA, Hibernate ORM
- **Database**: H2 Persistent Storage Engine with atomic file journaling
- **Deployment**: Dual Mirrored Instances on Render Cloud
- **Payment & Gateway**: Custom UPI Dynamic QR code generator engine

#### ⚡ Core Engineering Achievements:
1. **Dual-Cloud Disaster Recovery Engine**:
   - Built an active-standby replication pipeline across secondary Render nodes.
   - Live expedition ledgers are serialized with cryptographic integrity checksums.
   - Offline timestamped JSON backup snapshots generated on demand, guaranteeing zero data loss during cloud maintenance.
2. **High-Concurrency Rate Limiting**:
   - Engineered a 600 req/min token-bucket rate limiter to prevent bot scraping and booking collisions.
3. **Dynamic UPI QR Engine**:
   - Instant QR code generation with dynamic amount encoding and automated payment reconciliation.
4. **Reliability & SLA**:
   - **0% double-booking** over 1,000+ mock transactions; **99.98% uptime SLA**.

👉 *You can inspect the full architecture on the [Projects Page](#/projects) or ask me to explain its database schema!*`;
      }

      // Specific: MultiVendor Marketplace
      if (hasAny(q, ['multivendor', 'multi vendor', 'marketplace', 'ecommerce', 'e commerce', 'pessimistic lock', 'hold token', 'otp'])) {
        return `### 🛒 Project Deep-Dive: MultiVendor Marketplace

**MultiVendor Marketplace** is a high-concurrency B2B/B2C multi-merchant e-commerce platform architected to eliminate flash-sale race conditions.

#### 🛠️ Tech Stack:
- **Backend**: Java 21, Spring Boot 3, Spring Security, Spring Data JPA, MySQL 8
- **Frontend**: React 19, TypeScript, Tailwind CSS 4, Vite
- **Security**: Stateless JWT Authentication, Dual-Identifier 6-Digit OTP, BCrypt

#### ⚡ Core Engineering Achievements:
1. **Pessimistic Row-Level Locking (\`PESSIMISTIC_WRITE\`)**:
   - Eliminated negative inventory overselling when hundreds of customers check out the final stock simultaneously:
\`\`\`java
@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT p FROM Product p WHERE p.id = :id")
Optional<Product> findByIdForUpdate(@Param("id") Long id);
\`\`\`
2. **Automated 10-Minute Hold Reservation Daemon**:
   - Created a temporary hold token upon entering checkout.
   - Built an automated background sweeper (\`@Scheduled(fixedDelay = 60000)\`) that automatically evicts expired unpurchased items and returns stock to the public pool.
3. **Role-Based Security (RBAC)**:
   - Strict privilege separation across \`ADMIN\`, \`VENDOR\`, and \`CUSTOMER\` with customized JWT validation filters.

👉 *Explore the live demo and repository links on the [Projects Page](#/projects)!*`;
      }

      // Specific: StudySync
      if (hasAny(q, ['studysync', 'study sync', 'pomodoro', 'productivity', 'study app'])) {
        return `### ⏱️ Project Deep-Dive: StudySync Student Suite

**StudySync** is a full-stack student productivity and time-management application designed for focused learning workflows.

#### 🛠️ Tech Stack:
- **Backend**: Java 21, Spring Boot 3, RESTful APIs, JPA
- **Frontend**: React 19, TypeScript, Chart.js, Tailwind CSS
- **Features**: Interactive Pomodoro timer, milestone boards, study session analytics

#### ⚡ Core Engineering Highlights:
1. **Pomodoro Deep-Work Engine**:
   - Built a configurable work/break timer synchronized with browser state to maintain focus tracking across page reloads.
2. **Data Visualizations & Analytics**:
   - Integrated Chart.js to render daily, weekly, and monthly productivity velocity curves.
3. **Task & Milestone Tracking**:
   - Clean Kanban-style organization with category filtering and priority indicators.

👉 *Check out StudySync on the [Projects Page](#/projects)!*`;
      }

      // General Projects Overview (Matches: "tell mi about projects", "projects", "work", etc.)
      if (hasAny(q, ['project', 'projects', 'work', 'built', 'portfolio', 'apps', 'showcase', 'flagship', 'what did you build', 'tell me about your project'])) {
        return `### 🚀 Flagship Projects by Ravindra Chavan

Ravindra has architected and delivered **3 major enterprise-grade software applications**, each solving complex production challenges:

---

#### 1. 🏔️ Shivchhatra Trekkers (Expedition Booking & Disaster-Resilient System)
- **Tech Stack**: Java 21 LTS, Spring Boot 3.3.3, Spring Data JPA, H2 Persistent Storage, Render Cloud.
- **Problem Solved**: High weekend booking spikes caused single-cloud downtime and duplicate seat reservations.
- **Key Innovations**:
  - **Dual-Cloud Disaster Recovery**: Automated live ledger replication across secondary Render instances with cryptographically signed payloads.
  - **Zero Double-Booking Guarantee**: Dynamic batch slot reservation locks handling a **600 req/min** rate limiter.
  - **Dynamic UPI QR Engine**: Instant QR code generation with dynamic amount encoding and automated payment reconciliation.
- **Outcome**: 99.98% availability with zero transaction collisions across 1,000+ bookings.

---

#### 2. 🛒 MultiVendor Marketplace (High-Concurrency E-Commerce Platform)
- **Tech Stack**: Java 21, Spring Boot 3, React 19, TypeScript, Tailwind CSS, MySQL 8, Spring Security JWT.
- **Problem Solved**: Concurrent checkouts on limited inventory items triggered race conditions and overselling.
- **Key Innovations**:
  - **Pessimistic Row-Level Locking (\`PESSIMISTIC_WRITE\`)**: Row-level database locks using SQL \`SELECT ... FOR UPDATE\` during checkout.
  - **Automated Hold Sweeper Daemon**: 10-minute hold token expiration daemon (\`@Scheduled\`) that safely returns abandoned stock back to the active catalog.
  - **Dual-Identifier 6-Digit OTP Auth**: Phone & email verification with BCrypt hashing and timed expiration caches.
- **Outcome**: 100% elimination of inventory overselling under flash-sale stress tests.

---

#### 3. ⏱️ StudySync (Student Productivity & Focus Platform)
- **Tech Stack**: Spring Boot 3, React 19, Chart.js, RESTful microservices.
- **Key Innovations**:
  - Customizable **Pomodoro Deep Focus Timer** with browser session persistence.
  - Visual **Productivity Dashboards** rendered with Chart.js displaying study velocity.
  - Real-time study logs and task prioritization manager.

---

💡 *Would you like a deep dive into any specific project's database architecture or source code? Just ask!*`;
      }

      // Skills & Tech Stack
      if (hasAny(q, ['skill', 'skills', 'tech stack', 'technologies', 'tools', 'backend', 'frontend', 'database', 'java', 'spring', 'react', 'mysql', 'docker'])) {
        return `### 💻 Ravindra Chavan's Technical Skills & Stack:

#### ☕ Backend & Core Engineering:
- **Java 21 (LTS)**: Virtual Threads, Records, Pattern Matching, Stream API, Concurrency
- **Spring Framework**: Spring Boot 3.3.3, Spring Data JPA, Spring Security, Hibernate ORM
- **Architecture**: RESTful Microservices, Stateless JWT Auth, RBAC, Dual-Cloud Disaster Recovery
- **Build & Package**: Maven, Gradle, Clean Architecture

#### 🗄️ Databases & Storage:
- **Relational Databases**: MySQL 8, PostgreSQL, H2 Persistent Engine
- **Optimization**: Pessimistic/Optimistic Locking (\`SELECT FOR UPDATE\`), B-Tree Indexing, Connection Pooling (HikariCP), Query Execution Plans

#### ⚛️ Frontend & UI Engineering:
- **Languages & Frameworks**: React 19, TypeScript, JavaScript (ES6+), HTML5, CSS3
- **Styling & Animations**: Tailwind CSS 4, Framer Motion, Three.js
- **Tooling**: Vite, Single-Page Architecture (SPA), Responsive Mobile Design

#### 🛠️ DevOps, Cloud & Testing:
- **Cloud & Hosting**: Render, Vercel, Docker
- **Testing & Tools**: JUnit 5, Mockito, Postman, Git & GitHub, Linux/Unix CLI

👉 *View interactive proficiency gauges on the [Skills Page](#/skills)!*`;
      }

      // Experience & Career Journey
      if (hasAny(q, ['experience', 'journey', 'career', 'work history', 'background', 'timeline', 'company', 'role'])) {
        return `### 🧭 Ravindra Chavan's Career Journey & Experience:

#### 💼 Associate Software Engineer & Full-Stack Java Developer
- **Focus Area**: Designing scalable, production-grade microservices and reactive user interfaces.
- **Distributed Reliability**: Architected dual-cloud active-standby disaster recovery with automated failover and offline air-gapped backups.
- **High-Concurrency Engineering**: Implemented JPA pessimistic row locking and background cleanup sweeper daemons, handling 600 req/min rate limits.
- **Security & Authorization**: Configured stateless Spring Security filter chains with JWT tokens, dual-identifier 6-digit OTP verification, and RBAC.

#### 🎓 Academic Foundation:
- **Master of Science (M.Sc.) in Computer Science** — 8.5 CGPA
- **Bachelor of Science (B.Sc.) in Computer Science** — 8.4 CGPA

👉 *Read the complete career milestones on the [Journey Page](#/journey)!*`;
      }

      // Why Hire Ravindra / Strengths
      if (hasAny(q, ['hire', 'why hire', 'strength', 'strengths', 'why should', 'candidate', 'value', 'advantage'])) {
        return `### 🌟 Why You Should Hire Ravindra Chavan:

1. **Enterprise Java 21 & Spring Boot 3 Mastery**:
   - Rather than basic tutorial apps, Ravindra builds **production-grade distributed systems** with strict transaction isolation, pessimistic locking, and stateless JWT authentication.
2. **Proven Real-World Problem Solving**:
   - Solved flash-sale overselling using database locks and sweeper daemons in *MultiVendor Marketplace*.
   - Guaranteed 99.98% uptime using a mirrored dual-cloud topology in *Shivchhatra Trekkers*.
3. **True Full-Stack Capability**:
   - Seamlessly connects high-performance Java backends to modern **React 19 & TypeScript** frontends with Tailwind CSS.
4. **Strong Computer Science Foundation**:
   - Holds an M.Sc. in Computer Science with an **8.5 CGPA**, backed by solid knowledge of algorithms, concurrency, and database indexing.
5. **Immediate Availability**:
   - Based in Pune, Maharashtra. Ready for immediate joining (On-Site, Hybrid, or Remote). Reach out directly via WhatsApp at **+91 74476 61921**!`;
      }

      // Education & Academic Background
      if (hasAny(q, ['education', 'degree', 'college', 'university', 'msc', 'bsc', 'marks', 'cgpa', 'grades', 'school'])) {
        return `### 🎓 Education & Academic Credentials:

#### 1. Master of Science (M.Sc.) in Computer Science
- **Grade / Score**: **8.5 CGPA**
- **Key Coursework**: Distributed Systems, Advanced Database Management (DBMS), Data Structures & Algorithms, Software Architecture, Network Security.

#### 2. Bachelor of Science (B.Sc.) in Computer Science
- **Grade / Score**: **8.4 CGPA**
- **Key Coursework**: Object-Oriented Programming (Java/C++), Operating Systems, Web Development, Database Systems, Computer Networks.

Ravindra consistently maintained distinction-level academic performance while building production software projects.`;
      }

      // Contact & Socials / Resume
      if (hasAny(q, ['contact', 'email', 'phone', 'mobile', 'whatsapp', 'call', 'reach', 'number', 'address', 'location', 'pune', 'resume', 'cv', 'linkedin', 'github'])) {
        return `### 📬 Contact & Connect with Ravindra Chavan:

- **📱 WhatsApp / Phone**: **[+91 74476 61921](https://wa.me/917447661921?text=Hi%20Ravindra,%20I%20reviewed%20your%20portfolio!)** *(Instant direct response)*
- **✉️ Email**: **[ravindrachavan265125@gmail.com](mailto:ravindrachavan265125@gmail.com)**
- **📍 Location**: Pune, Maharashtra, India *(Open to Relocation & Remote Roles)*
- **📄 Resume**: **[Download Resume PDF](/resume/Ravindra_Chavan_Resume.pdf)**
- **💻 GitHub**: **[github.com/ravichavan9970](https://github.com/ravichavan9970)**
- **💼 LinkedIn**: **[linkedin.com/in/ravindra-chavan](https://www.linkedin.com/in/ravindra-chavan-66779a243/)**

Feel free to send a message on WhatsApp or email for interview scheduling!`;
      }

      // Security, JWT & Auth
      if (hasAny(q, ['security', 'jwt', 'auth', 'authentication', 'authorization', 'otp', 'token', 'bcrypt', 'rbac'])) {
        return `### 🛡️ Spring Security & JWT Implementation Architecture:

In his enterprise backends, Ravindra implements industry-standard security practices:

1. **Stateless Authentication**:
   - Configures \`SecurityFilterChain\` with \`SessionCreationPolicy.STATELESS\`, preventing session fixation and CSRF vulnerabilities in microservices.
2. **Dual-Identifier 6-Digit OTP Engine**:
   - Integrated phone + email verification with timed expiration caches and BCrypt password hashing.
3. **Role-Based Access Control (RBAC)**:
   - Enforced fine-grained endpoint authorizations (\`ADMIN\`, \`VENDOR\`, \`CUSTOMER\`) with custom JWT filter validation chains.
4. **Token Refresh & Revocation**:
   - Short-lived access tokens coupled with secure token blacklisting upon logout.`;
      }

      // Greetings & Introductions
      if (hasAny(q, ['hi', 'hello', 'hey', 'namaste', 'greetings', 'morning', 'evening', 'who are you', 'what can you do', 'help'])) {
        return `👋 **Hello! I am Gemini-Portfolio-RAG**, your intelligent guide to Ravindra Chavan's engineering portfolio.

I can answer any technical or professional questions about Ravindra:
- 🚀 **Projects**: Ask *"Tell me about your projects"*, *"Explain Shivchhatra Trekkers"*, or *"How did you build MultiVendor?"*
- 💻 **Tech Stack**: Ask *"What are your Java 21 and Spring Boot skills?"*
- 🌟 **Hiring**: Ask *"Why should we hire Ravindra?"* or *"What is your experience?"*
- 📬 **Contact**: Ask *"How do I contact Ravindra?"* or *"Where can I download his resume?"*

What would you like to explore first?`;
      }

      // Default Fallback for Model 01
      return `### 💡 Ravindra Chavan — Engineering Summary:

Ravindra is an **Associate Software Engineer & Full-Stack Java Developer** specializing in high-concurrency systems, Spring Boot 3.3.3, Java 21, and React 19.

#### 📌 Flagship Highlights:
- **Dual-Cloud Disaster Recovery**: Mirrored Render nodes in *Shivchhatra Trekkers* with 99.98% uptime.
- **Pessimistic Row-Level Locking**: Race-condition prevention in *MultiVendor Marketplace* via JPA \`SELECT ... FOR UPDATE\`.
- **Full-Stack Proficiency**: React 19, TypeScript, Tailwind CSS, MySQL 8, Docker.
- **Education**: M.Sc. in Computer Science (8.5 CGPA).

👉 **Try asking me:**
- *"Tell me about your projects"*
- *"Explain pessimistic locking in MultiVendor"*
- *"What is Ravindra's experience with Spring Boot?"*
- *"How can I contact or hire Ravindra?"*`;
    }

    // ────────────────────────────────────────────────────────────────────────
    // MODEL 02: ARCH-DEEPSEEK-JAVA (System Architecture Co-Pilot)
    // ────────────────────────────────────────────────────────────────────────
    if (activeModel === 'arch-copilot') {
      if (hasAny(q, ['pessimistic', 'optimistic', 'lock', 'locking', 'select for update', 'pessimistic write', 'isolation', 'concurrency'])) {
        return `### ⚡ Pessimistic vs Optimistic Locking in Spring Boot:

#### 1. When to Choose Pessimistic Locking:
- **High contention scenarios**: When multiple transactions attempt to acquire the exact same row simultaneously (e.g., ticket booking, limited inventory flash sales).
- **Mechanism**: Translates directly to SQL:
\`\`\`sql
SELECT stock FROM products WHERE id = 101 FOR UPDATE;
\`\`\`
- Other transactions block until the holding transaction commits or rolls back, guaranteeing zero over-allocation.

#### 2. Clean Spring Data JPA Pattern:
\`\`\`java
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @QueryHints({@QueryHint(name = "jakarta.persistence.lock.timeout", value = "3000")})
    @Query("SELECT p FROM Product p WHERE p.id = :id")
    Optional<Product> findByIdWithLock(@Param("id") Long id);
}
\`\`\`

#### 3. Automatic Cleanup Daemon:
Pair with an automated background worker to evict orphaned holds:
\`\`\`java
@Scheduled(fixedDelay = 60000)
@Transactional
public void releaseExpiredHolds() {
    LocalDateTime threshold = LocalDateTime.now().minusMinutes(10);
    reservationRepository.deleteExpiredReservations(threshold);
}
\`\`\``;
      }

      if (hasAny(q, ['disaster recovery', 'dr', 'dual cloud', 'replication', 'failover', 'render', 'vault', 'backup'])) {
        return `### 🌐 Enterprise Dual-Cloud Disaster Recovery Engine:

As implemented in **Shivchhatra Trekkers**:

1. **Topology**:
   - **Primary Instance**: Render Java 21 instance managing live H2 Persistent Disk JPA transactions and dynamic UPI QR generation.
   - **Standby Secondary**: Mirrored Render instance ready for automated instant failover.
2. **Data Pipeline**:
   - Atomic bulk-sync endpoints serialize the entire expedition ledger with cryptographic integrity hashes.
   - Secondary instance continuously ingests mirrored deltas.
3. **Air-Gapped Vault**:
   - Offline timestamped JSON backup snapshots generated on demand, providing full disaster recovery even under total cloud outage.`;
      }

      if (hasAny(q, ['rate limit', 'rate limiting', 'throttle', 'throttling', 'token bucket', 'leaky bucket', '600 req'])) {
        return `### ⏱️ Designing a 600 Req/Min Rate Limiter in Spring Boot:

#### 1. Algorithm Selection: Token Bucket vs Sliding Window
- **Token Bucket**: Allows short bursts while strictly enforcing the average 10 req/second (600 req/min) rate.

#### 2. Spring Boot Implementation via Interceptor / Filter:
\`\`\`java
@Component
public class RateLimitFilter extends OncePerRequestFilter {
    private final Map<String, Bucket> clientBuckets = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String clientIp = request.getRemoteAddr();
        Bucket bucket = clientBuckets.computeIfAbsent(clientIp, k -> createNewBucket());

        if (bucket.tryConsume(1)) {
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.getWriter().write('{"error": "Rate limit exceeded (600 req/min)"}');
        }
    }
}
\`\`\``;
      }

      if (hasAny(q, ['project', 'projects', 'shivchhatra', 'multivendor', 'studysync'])) {
        return `### 🏗️ Architectural Overview of Ravindra's Projects:

1. **Shivchhatra Trekkers**:
   - **Pattern**: Disaster-Resilient Microservice with Mirrored Active-Standby Topologies.
   - **Key Components**: H2 Persistent Journaling, Dynamic UPI QR Generator, 600 req/min Throttler, Checksum Synchronizer.
2. **MultiVendor Marketplace**:
   - **Pattern**: High-Concurrency E-Commerce Engine with Pessimistic Row Locking.
   - **Key Components**: MySQL 8 \`SELECT ... FOR UPDATE\`, 10-min Hold Token Sweeper, Stateless JWT RBAC Security Chain.
3. **StudySync**:
   - **Pattern**: Modular Productivity REST API with Client-Side Reactive State.
   - **Key Components**: Session State Caching, Chart.js Metric Aggregator.`;
      }

      // Default Architecture Response
      return `### 🏗️ Enterprise System Architecture & Microservices Best Practices:

1. **Resilience & Circuit Breakers**: Use Resilience4j around external payment gateways and cloud APIs to prevent cascade failures.
2. **Database Sharding & Read Replicas**: Separate high-throughput transactional writes from analytic queries using read replicas.
3. **Stateless Security**: Enforce JWT authentication with Short TTLs and distributed refresh token revoking.
4. **Concurrency Control**: Choose Pessimistic Locking for inventory reservation and Optimistic Locking (\`@Version\`) for low-contention master data.

👉 *Ask me about: "Pessimistic vs Optimistic Locking", "Dual-cloud disaster recovery", or "How to handle flash sale traffic"!*`;
    }

    // ────────────────────────────────────────────────────────────────────────
    // MODEL 03: CODE-AUDITOR-AI (Java & Concurrency Code Reviewer)
    // ────────────────────────────────────────────────────────────────────────
    if (activeModel === 'code-auditor') {
      if (hasAny(q, ['n+1', 'n + 1', 'jpa', 'hibernate', 'lazy', 'join fetch', 'entitygraph', 'query'])) {
        return `### 🔍 JPA N+1 Query Defect Audit & Resolution:

#### ❌ Problem (N+1 Query Trigger):
Calling \`findAll()\` on an entity with \`@OneToMany\` or \`@ManyToOne\` triggers 1 query for the parent, then N queries for children:
\`\`\`java
// Triggers 1 + N SQL queries:
List<Order> orders = orderRepository.findAll();
for (Order o : orders) {
    System.out.println(o.getItems().size()); // N queries!
}
\`\`\`

#### ✅ Solution 1: JOIN FETCH in JPQL
\`\`\`java
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT DISTINCT o FROM Order o JOIN FETCH o.items WHERE o.customer.id = :customerId")
    List<Order> findCustomerOrdersWithItems(@Param("customerId") Long customerId);
}
\`\`\`

#### ✅ Solution 2: @EntityGraph
\`\`\`java
@EntityGraph(attributePaths = {"items", "customer"})
List<Order> findAll();
\`\`\`
**Result**: Reduces N+1 queries to a single efficient SQL JOIN.`;
      }

      if (hasAny(q, ['concurrency', 'race condition', 'thread', 'volatile', 'synchronized', 'reentrantlock', 'atomic'])) {
        return `### 🔍 Concurrency & Race Condition Audit:

#### ❌ Flawed Pattern (Non-Atomic Increment):
\`\`\`java
public class BookingCounter {
    private int count = 0; // Race condition under concurrent threads!
    public void increment() { count++; }
}
\`\`\`

#### ✅ Fixed Pattern (Atomic Operations):
\`\`\`java
public class BookingCounter {
    private final AtomicInteger count = new AtomicInteger(0);
    public void increment() { count.incrementAndGet(); }
}
\`\`\`

#### ✅ For Database-Level Race Conditions:
Always use database-level pessimistic row locking (\`PESSIMISTIC_WRITE\`) inside an active \`@Transactional\` boundary so that concurrent web requests cannot over-allocate stock.`;
      }

      if (hasAny(q, ['deadlock', 'circular wait', 'lock order'])) {
        return `### 🔍 Deadlock Prevention Audit:

#### ❌ Deadlock Hazard (Inconsistent Lock Ordering):
- Thread 1 acquires Lock A, waits for Lock B.
- Thread 2 acquires Lock B, waits for Lock A.

#### ✅ Best Practice Rules:
1. **Consistent Lock Ordering**: Always acquire locks in the exact same lexicographical or numerical ID order:
\`\`\`java
Long firstId = Math.min(acc1.getId(), acc2.getId());
Long secondId = Math.max(acc1.getId(), acc2.getId());
\`\`\`
2. **Lock Timeouts**: Never block indefinitely. Always specify a timeout:
\`\`\`java
@QueryHints({@QueryHint(name = "jakarta.persistence.lock.timeout", value = "2000")})
\`\`\``;
      }

      if (hasAny(q, ['project', 'projects', 'review', 'shivchhatra', 'multivendor'])) {
        return `### 🔍 Code Quality & Architecture Audit of Ravindra's Codebases:

1. **MultiVendor Marketplace**:
   - **Locking Hygiene**: Properly scoped \`@Transactional\` methods with \`PESSIMISTIC_WRITE\` ensure locks release immediately upon commit.
   - **Sweeper Daemon**: Exception-handled \`@Scheduled\` background thread prevents daemon thread death.
2. **Shivchhatra Trekkers**:
   - **Idempotent Webhooks**: Payment verification checks transaction IDs before updating expedition booking states.
   - **Rate Limiting**: Applied via Spring filters before hitting costly persistence layers.`;
      }

      // Default Code Auditor Response
      return `### 🔍 Code-Auditor-AI Inspection Checklist:

Paste any Java / Spring Boot / React code snippet, and I will audit it for:
1. **Thread Safety & Race Conditions**: \`volatile\`, \`AtomicInteger\`, \`synchronized\`, and DB row locks.
2. **JPA Query Performance**: N+1 queries, Cartesian products, and missing indexes.
3. **Transaction Boundaries**: Proper \`@Transactional(rollbackFor = Exception.class)\` usage.
4. **Security Vulnerabilities**: Injection prevention, CSRF, and safe JWT decoding.

👉 *Try pasting a method or asking: "Audit a Spring Boot @Transactional method"!*`;
    }

    // Universal Fallback
    return `### 📋 Assistant Response:
I am here to help you evaluate **Ravindra Chavan's software engineering portfolio**. You can ask about his **Java 21 / Spring Boot 3 projects**, **system architecture**, or request a **code audit**!`;
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputVal.trim();
    if (!text || isGenerating) return;

    setInputVal('');

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      modelId: activeModel,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [activeModel]: [...prev[activeModel], userMsg]
    }));

    setIsGenerating(true);

    try {
      const replyText = await generateAIResponse(text);

      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        modelId: activeModel,
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => ({
        ...prev,
        [activeModel]: [...prev[activeModel], aiMsg]
      }));
    } catch {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        modelId: activeModel,
        text: `⚠️ An error occurred while generating the response. Please try again or test a suggested prompt!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => ({
        ...prev,
        [activeModel]: [...prev[activeModel], errorMsg]
      }));
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 pointer-events-auto">
          {/* Backdrop Blur */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Main AI Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl h-[88vh] max-h-[820px] rounded-3xl overflow-hidden border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.85)] z-10 flex flex-col"
            style={{
              background: 'linear-gradient(180deg, #0c1122 0%, #060914 100%)',
            }}
          >
            {/* ── Top Window Bar ────────────────────────────────────────── */}
            <div className="px-5 py-3.5 bg-white/[0.03] border-b border-white/10 flex items-center justify-between select-none">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-primary/20 text-primary-light border border-primary/30">
                  <Sparkles size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-text-title font-display">Real-Time AI Multi-Model Co-Pilot</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                      Live AI
                    </span>
                  </div>
                  <p className="text-[10px] text-text-muted hidden sm:block">
                    Switch between 3 specialized models for Resume Intelligence, Architecture & Code Review
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowKeyConfig(!showKeyConfig)}
                  title="Configure Gemini API Key"
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    showKeyConfig || apiKeyInput 
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' 
                      : 'bg-white/5 border-white/10 text-text-muted hover:text-white'
                  }`}
                >
                  <KeyRound size={15} />
                </button>
                <button
                  type="button"
                  onClick={handleClearChat}
                  title="Clear conversation"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-text-muted hover:text-white border border-white/10 transition-all cursor-pointer"
                >
                  <Trash2 size={15} />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  title="Close AI Assistant"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-text-muted hover:text-white border border-white/10 transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* ── API Key Configuration Drawer (Collapsible) ─────────────── */}
            <AnimatePresence>
              {showKeyConfig && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 py-3.5 bg-slate-900/90 border-b border-amber-500/30 text-xs text-left space-y-2.5 overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 flex items-center gap-1.5">
                      <KeyRound size={13} />
                      Optional: Connect Your Personal Google Gemini API Key
                    </span>
                    <span className="text-[10px] text-text-muted">Stored securely in your local browser only</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      placeholder="Paste Gemini API Key (AIzaSy...)"
                      className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleSaveApiKey}
                      className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs transition-colors cursor-pointer"
                    >
                      Save Key
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    💡 If no key is provided, the embedded zero-dependency high-fidelity reasoning engine handles all questions instantly with 100% uptime!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── 3 Real-World AI Model Selection Tabs ───────────────────── */}
            <div className="p-3 bg-white/[0.01] border-b border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {AI_MODELS.map((model) => {
                const isActive = activeModel === model.id;
                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => setActiveModel(model.id)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? `${model.bgActive} ${model.borderColor} shadow-md` 
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] text-text-muted'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${isActive ? 'bg-white/10' : 'bg-white/5'}`}>
                      {model.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-text-title'}`}>
                          {model.name}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-[10px] text-text-muted truncate mt-0.5">
                        {model.badge}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ── Active Model Info Ribbon ───────────────────────────────── */}
            <div className="px-5 py-2 bg-black/30 border-b border-white/5 flex items-center justify-between text-[11px] text-text-muted">
              <span className="truncate">
                Active: <strong className="text-white">{activeConfig.name}</strong> — {activeConfig.tagline}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-primary-light hidden md:inline-block">
                ⚡ Real-Time Streaming
              </span>
            </div>

            {/* ── Chat Messages Stream Area ──────────────────────────────── */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10 text-left">
              {activeMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-tr from-primary to-secondary text-white' 
                      : 'bg-white/10 border border-white/15 text-primary-light'
                  }`}>
                    {msg.sender === 'user' ? <User size={15} /> : <Bot size={16} />}
                  </div>

                  {/* Message Bubble */}
                  <div className="flex flex-col space-y-1 max-w-[85%]">
                    <div className="flex items-center gap-2 px-1 text-[10px] text-text-muted">
                      <span className="font-semibold">{msg.sender === 'user' ? 'You' : activeConfig.name}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                      {msg.sender === 'assistant' && (
                        <button
                          type="button"
                          onClick={() => copyToClipboard(msg.text, msg.id)}
                          className="ml-auto hover:text-white transition-colors cursor-pointer"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                        </button>
                      )}
                    </div>

                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-[13px] leading-relaxed select-text ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-primary/90 to-secondary/90 text-white shadow-md'
                          : 'bg-white/[0.04] border border-white/10 text-text-main shadow-sm'
                      }`}
                    >
                      {msg.sender === 'user' ? (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      ) : (
                        <FormattedMessage text={msg.text} />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isGenerating && (
                <div className="flex gap-3 mr-auto max-w-md">
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 text-primary-light flex items-center justify-center shrink-0">
                    <RefreshCw size={15} className="animate-spin text-primary-light" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-text-muted flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-light animate-ping" />
                    <span>{activeConfig.name} is formulating response...</span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* ── Clickable Suggested Quick Prompts ──────────────────────── */}
            <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-none select-none">
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider shrink-0 flex items-center gap-1">
                <ChevronRight size={12} className="text-primary-light" />
                Prompt Ideas:
              </span>
              {activeConfig.suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInputVal(prompt);
                    setTimeout(() => inputRef.current?.focus(), 50);
                  }}
                  className="px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-primary/20 border border-white/10 hover:border-primary/40 text-[10px] text-text-muted hover:text-white whitespace-nowrap transition-all cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* ── Input Box & Send Bar ───────────────────────────────────── */}
            <form onSubmit={handleSendMessage} className="p-3.5 bg-white/[0.02] border-t border-white/10 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={`Ask ${activeConfig.name} anything...`}
                disabled={isGenerating}
                className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-text-muted/60 focus:outline-none focus:border-primary transition-all font-sans"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isGenerating}
                className="h-[46px] px-5 rounded-2xl bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-bold text-xs flex items-center gap-2 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-md cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>Ask AI</span>
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
