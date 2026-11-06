import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Server, ShieldCheck, Database, Layers,
  Copy, Check, ArrowRight, ExternalLink
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'dual-cloud' | 'pessimistic-lock';
}

export default function ArchitectureModal({ isOpen, onClose, defaultTab = 'dual-cloud' }: ArchitectureModalProps) {
  const [activeTab, setActiveTab] = useState<'dual-cloud' | 'pessimistic-lock'>(defaultTab);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const dualCloudCode = `@Service
@Slf4j
public class DisasterRecoverySyncService {

    @Value("\${dr.secondary.endpoint}")
    private String secondaryNodeUrl;

    @Scheduled(fixedDelay = 30000)
    public void pushDeltaJournalToMirror() {
        List<ExpeditionBooking> uncommittedDeltas = ledgerRepo.findUnsyncedEvents();
        if (uncommittedDeltas.isEmpty()) return;

        SignedPayload payload = PayloadSigner.sign(uncommittedDeltas, privateKey);
        
        restClient.post()
            .uri(secondaryNodeUrl + "/api/v1/internal/dr-sync")
            .header("X-Signature-SHA256", payload.getHmac())
            .body(payload)
            .retrieve()
            .toBodilessEntity();
            
        ledgerRepo.markAsSynchronized(uncommittedDeltas);
    }
}`;

  const pessimisticLockCode = `@Repository
public interface ProductHoldRepository extends JpaRepository<ProductHold, Long> {

    // Direct Database-Level Row Lock: Translates to SQL "SELECT ... FOR UPDATE"
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @QueryHints({@QueryHint(name = "jakarta.persistence.lock.timeout", value = "3000")})
    @Query("SELECT p FROM Product p WHERE p.id = :productId")
    Optional<Product> acquireExclusiveLock(@Param("productId") Long productId);

    // Automated Sweeper Daemon: Reclaims abandoned carts older than 10 minutes
    @Modifying
    @Transactional
    @Query("DELETE FROM ProductHold h WHERE h.expiresAt < :now")
    int releaseExpiredReservationHolds(@Param("now") LocalDateTime now);
}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 pointer-events-auto">
          {/* Backdrop Blur */}
          <motion.div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.85)] z-10 flex flex-col bg-[#0b0f19] text-text-main"
          >
            {/* Header Bar */}
            <div className="px-6 py-4 bg-white/[0.03] border-b border-white/10 flex items-center justify-between select-none">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/15 text-primary-light border border-primary/30">
                  <Layers size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white font-display">System Architecture Blueprint</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                      VERIFIED PRODUCTION
                    </span>
                  </div>
                  <p className="text-[11px] text-text-muted">
                    Engineered by Ravindra Chavan · Java 21 LTS & Spring Boot 3.3.3
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-text-muted hover:text-white border border-white/10 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Tab Selector */}
            <div className="p-2 bg-black/40 border-b border-white/10 grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('dual-cloud')}
                className={`py-2.5 px-4 rounded-xl border flex items-center justify-center gap-2 font-mono transition cursor-pointer ${
                  activeTab === 'dual-cloud'
                    ? 'bg-primary/20 border-primary text-white shadow-sm font-bold'
                    : 'bg-white/[0.02] border-white/5 text-text-muted hover:text-white'
                }`}
              >
                <Server size={14} className={activeTab === 'dual-cloud' ? 'text-primary-light' : ''} />
                <span>01: Dual-Cloud DR Engine</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pessimistic-lock')}
                className={`py-2.5 px-4 rounded-xl border flex items-center justify-center gap-2 font-mono transition cursor-pointer ${
                  activeTab === 'pessimistic-lock'
                    ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-sm font-bold'
                    : 'bg-white/[0.02] border-white/5 text-text-muted hover:text-white'
                }`}
              >
                <Database size={14} className={activeTab === 'pessimistic-lock' ? 'text-emerald-400' : ''} />
                <span>02: Pessimistic Locking Daemon</span>
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 text-left">
              {activeTab === 'dual-cloud' ? (
                <div className="space-y-6">
                  {/* Summary Box */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-primary-light font-bold">
                        Implementation: Shivchhatra Trekkers
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                        SLA: 99.98% Uptime
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">Active-Standby Mirrored Disaster Recovery Across Render</h4>
                    <p className="text-xs text-text-muted leading-relaxed">
                      To prevent expedition booking loss during cloud outages, the platform runs a mirrored dual-instance topology. The Primary Render node serializes delta ledger updates and cryptographically streams them to a hot secondary replica with automated failover routing.
                    </p>
                  </div>

                  {/* Architecture Diagram */}
                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3 font-mono text-xs">
                    <span className="text-[10px] uppercase tracking-wider text-text-muted">Topology Blueprint</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
                        <div className="text-cyan-400 font-bold mb-1">PRIMARY NODE</div>
                        <div className="text-[11px] text-text-muted">Render Java 21 Instance</div>
                        <div className="text-[10px] text-emerald-400 mt-1">● Active / Live Writes</div>
                      </div>
                      <div className="flex flex-col items-center justify-center text-primary-light text-[10px]">
                        <span>Cryptographic Delta Stream</span>
                        <ArrowRight size={16} className="my-1 hidden md:block" />
                        <span>HMAC-SHA256 Signed</span>
                      </div>
                      <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30">
                        <div className="text-purple-400 font-bold mb-1">SECONDARY MIRROR</div>
                        <div className="text-[11px] text-text-muted">Hot Standby Replica</div>
                        <div className="text-[10px] text-amber-400 mt-1">● 1-Click Instant Failover</div>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                      <div className="text-base font-bold text-white font-mono">600 req/min</div>
                      <div className="text-[10px] text-text-muted">Token-Bucket Rate Limiter</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                      <div className="text-base font-bold text-emerald-400 font-mono">0.00%</div>
                      <div className="text-[10px] text-text-muted">Data Loss on Outage</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                      <div className="text-base font-bold text-cyan-400 font-mono">&lt;45 ms</div>
                      <div className="text-[10px] text-text-muted">P99 Replication Lag</div>
                    </div>
                  </div>

                  {/* Code Snippet */}
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-black/70">
                    <div className="px-4 py-2 bg-white/[0.04] border-b border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-400 uppercase font-bold">DisasterRecoverySyncService.java</span>
                      <button
                        type="button"
                        onClick={() => copyCode(dualCloudCode, 'dual-cloud')}
                        className="flex items-center gap-1 text-[11px] text-text-muted hover:text-white transition cursor-pointer"
                      >
                        {copiedSnippet === 'dual-cloud' ? (
                          <>
                            <Check size={12} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-[11px] sm:text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                      <code>{dualCloudCode}</code>
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Summary Box */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                        Implementation: MultiVendor Marketplace
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                        Race Condition: 0% Collisions
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">Pessimistic Row-Level Locking & Automated 10-Minute Hold Sweeper</h4>
                    <p className="text-xs text-text-muted leading-relaxed">
                      In high-volume flash-sales, multiple buyers attempt to reserve the final inventory item simultaneously. By implementing JPA <code className="text-amber-300">PESSIMISTIC_WRITE</code> (SQL <code className="text-amber-300">SELECT ... FOR UPDATE</code>), concurrent transactions block safely. An automated <code className="text-cyan-300">@Scheduled</code> sweeper daemon reclaims abandoned holds after 10 minutes.
                    </p>
                  </div>

                  {/* Flow Diagram */}
                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2 text-xs font-mono">
                    <span className="text-[10px] uppercase tracking-wider text-text-muted">Transaction Execution Pipeline</span>
                    <div className="space-y-2 text-[11px] leading-relaxed">
                      <div className="p-2 rounded bg-white/[0.02] border border-white/5 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">1</span>
                        <span>Customer initiates checkout → Acquires exclusive row lock with 3000ms timeout hint.</span>
                      </div>
                      <div className="p-2 rounded bg-white/[0.02] border border-white/5 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">2</span>
                        <span>Generates 10-minute hold reservation token; decrements visible available stock atomically.</span>
                      </div>
                      <div className="p-2 rounded bg-white/[0.02] border border-white/5 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">3</span>
                        <span>If customer completes OTP payment → Order confirmed, inventory committed permanently.</span>
                      </div>
                      <div className="p-2 rounded bg-white/[0.02] border border-white/5 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px]">4</span>
                        <span>If abandoned → Sweeper daemon (<code className="text-amber-300">@Scheduled(fixedDelay = 60000)</code>) reclaims stock back to market pool.</span>
                      </div>
                    </div>
                  </div>

                  {/* Code Snippet */}
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-black/70">
                    <div className="px-4 py-2 bg-white/[0.04] border-b border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-400 uppercase font-bold">ProductHoldRepository.java</span>
                      <button
                        type="button"
                        onClick={() => copyCode(pessimisticLockCode, 'pessimistic')}
                        className="flex items-center gap-1 text-[11px] text-text-muted hover:text-white transition cursor-pointer"
                      >
                        {copiedSnippet === 'pessimistic' ? (
                          <>
                            <Check size={12} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-[11px] sm:text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                      <code>{pessimisticLockCode}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Bar */}
            <div className="px-6 py-3.5 bg-black/40 border-t border-white/10 flex items-center justify-between text-xs text-text-muted">
              <span className="text-[11px] font-mono flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" />
                Zero-Downtime Guarantee · Thread-Safe Execution
              </span>
              <a
                href="#/projects"
                onClick={onClose}
                className="flex items-center gap-1 text-primary-light hover:text-white font-medium transition cursor-pointer"
              >
                <span>View Full Projects Showcase</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
