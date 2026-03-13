/**
 * Countdown.tsx — OPTIMISÉ PERFORMANCE
 * ✅ Date mise à jour : 18 Avril 2026
 * ✅ Police augmentée sur mobile
 * ✅ Responsive SE → écran géant
 */

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, memo } from "react";
import confetti from "canvas-confetti";

const TARGET_DATE = new Date("2026-04-18T14:00:00");

function calculateTimeLeft() {
  const diff = TARGET_DATE.getTime() - new Date().getTime();
  if (diff <= 0) return { JOURS: 0, HEURES: 0, MINUTES: 0, SECONDES: 0 };
  return {
    JOURS: Math.floor(diff / (1000 * 60 * 60 * 24)),
    HEURES: Math.floor((diff / (1000 * 60 * 60)) % 24),
    MINUTES: Math.floor((diff / (1000 * 60)) % 60),
    SECONDES: Math.floor((diff / 1000) % 60),
  };
}

const GoldGrain = ({ index, total }: { index: number; total: number }) => {
  const angle = (index / total) * 360;
  const radius = 50 + (index % 3) * 3;
  const size = (index % 3) + 1.5;
  const delay = (index * 0.4) % 3;
  const duration = 2.5 + (index % 2);

  return (
    <motion.div
      animate={{ opacity: [0, 0.8, 0.3, 0.7, 0], scale: [0.5, 1.1, 0.8, 1, 0.5] }}
      transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
      style={{
        position: "absolute", top: "50%", left: "50%",
        width: size, height: size, borderRadius: "50%",
        backgroundColor: index % 2 === 0 ? "#d4af37" : "#f5e17a",
        boxShadow: `0 0 ${size * 2}px rgba(212,175,55,0.7)`,
        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}%)`,
        pointerEvents: "none",
      }}
    />
  );
};

interface TimeUnitProps { label: string; value: number; maxValue: number; isFinished: boolean; isInView: boolean; delay: number }

const CircularTimeUnit = memo(({ label, value, maxValue, isFinished, isInView, delay }: TimeUnitProps) => {
  const formatted = String(value).padStart(2, "0");
  const size = "clamp(80px, 22vw, 160px)";
  const strokeWidth = 4;
  const r = 44;
  const circumference = 2 * Math.PI * r;
  const progress = maxValue > 0 ? value / maxValue : 0;
  const dashOffset = circumference * (1 - progress);
  const grainCount = 8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
      transition={{ delay, duration: 0.9, type: "spring", stiffness: 80, damping: 15 }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(0.5rem, 1.5vw, 1rem)" }}
    >
      <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {Array.from({ length: grainCount }, (_, i) => (
          <GoldGrain key={i} index={i} total={grainCount} />
        ))}

        <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(212,175,55,0.1)" strokeWidth={strokeWidth} />
          <defs>
            <filter id={`glow-${label}`}>
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="50%" stopColor="#f5e17a" />
              <stop offset="100%" stopColor="#b8920e" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="50" cy="50" r={r} fill="none" stroke="url(#goldGrad)"
            strokeWidth={strokeWidth} strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            filter={`url(#glow-${label})`}
          />
        </svg>

        <div style={{ position: "absolute", inset: "8%", borderRadius: "50%", background: isFinished ? "radial-gradient(circle, #2a1f04, #0f0b02)" : "radial-gradient(circle, #1c1504, #080601)", boxShadow: isFinished ? "0 0 30px rgba(212,175,55,0.3), inset 0 0 20px rgba(0,0,0,0.8)" : "inset 0 0 20px rgba(0,0,0,0.8)", border: "1px solid rgba(212,175,55,0.15)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
          <div style={{ overflow: "hidden", height: "clamp(2.2rem, 6.5vw, 3.8rem)", display: "flex", alignItems: "center" }}>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={formatted}
                initial={{ y: 25, opacity: 0, filter: "blur(3px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -25, opacity: 0, filter: "blur(3px)" }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1.8rem, 5.5vw, 3.2rem)", display: "block", color: isFinished ? "#d4af37" : "#f0d98a", textShadow: isFinished ? "0 0 20px rgba(212,175,55,0.7), 0 0 40px rgba(212,175,55,0.3)" : "0 2px 12px rgba(0,0,0,0.5)", lineHeight: 1, fontWeight: "bold" }}
              >
                {formatted}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div className="countdown-pulse-line" style={{ width: 20, height: 1, background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }} />
        <span style={{ fontFamily: "sans-serif", fontSize: "clamp(0.55rem, 1.2vw, 0.62rem)", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(212,175,55,0.65)", fontWeight: "bold" }}>{label}</span>
      </div>
    </motion.div>
  );
});

const ColonSeparator = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    style={{ display: "flex", flexDirection: "column", gap: 8, paddingBottom: "clamp(1.5rem, 4vw, 3rem)", alignSelf: "center" }}
  >
    {[0, 1].map(i => (
      <div key={i} className={`colon-dot colon-dot-${i}`} style={{ width: "clamp(4px, 1vw, 7px)", height: "clamp(4px, 1vw, 7px)", borderRadius: "50%", backgroundColor: "#d4af37", boxShadow: "0 0 8px rgba(212,175,55,0.6)" }} />
    ))}
  </motion.div>
);

const Countdown = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isFinished, setIsFinished] = useState(false);

  const launchFireworks = () => {
    const end = Date.now() + 8000;
    const colors = ["#D4AF37", "#FFFFFF", "#FFDF00", "#FF9933", "#FFD700"];
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0 }, colors });
      confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1 }, colors });
      confetti({ particleCount: 3, angle: 90, spread: 120, origin: { x: 0.5, y: 0.3 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
      if (Object.values(updated).every(v => v === 0) && !isFinished) {
        setIsFinished(true);
        launchFireworks();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const maxValues = { JOURS: 365, HEURES: 24, MINUTES: 60, SECONDES: 60 };
  const entries = Object.entries(timeLeft) as [keyof typeof maxValues, number][];

  return (
    <section ref={ref} style={{ padding: "clamp(3rem, 8vw, 7rem) 0", background: "#080808", overflow: "hidden", position: "relative" }}>
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "clamp(300px, 80vw, 900px)", height: "clamp(300px, 80vw, 900px)", background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%)", borderRadius: "50%", filter: "blur(50px)", pointerEvents: "none", willChange: "transform, opacity" }}
      />

      <div style={{ maxWidth: "clamp(320px, 95vw, 1400px)", margin: "0 auto", padding: "0 clamp(0.75rem, 4vw, 3rem)", position: "relative", zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9 }}
          style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          <p style={{ fontFamily: "sans-serif", fontSize: "clamp(0.88rem, 2vw, 0.85rem)", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(212,175,55,0.55)", marginBottom: 12 }}>
            Le Grand Rendez-Vous
          </p>
          <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1.5rem, 4.5vw, 3.5rem)", color: "transparent", background: "linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.06em", marginBottom: 16 }}>
            {isFinished ? "C'est le Grand Jour ! 🎉" : "Dans Combien de Temps ?"}
          </h2>
          <div className="countdown-pulse-line" style={{ height: 1, width: "clamp(50px, 10vw, 100px)", background: "linear-gradient(90deg, transparent, #d4af37, transparent)", margin: "0 auto" }} />
        </motion.div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "clamp(0.3rem, 2vw, 2rem)", flexWrap: "wrap" }}>
          {entries.map(([label, value], i) => (
            <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "clamp(0.3rem, 2vw, 2rem)" }}>
              <CircularTimeUnit label={label} value={value} maxValue={maxValues[label]} isFinished={isFinished} isInView={isInView} delay={i * 0.12} />
              {i < entries.length - 1 && <ColonSeparator isInView={isInView} />}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
          style={{ textAlign: "center", marginTop: "clamp(2rem, 5vw, 4rem)" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(0.5rem, 2vw, 1.5rem)" }}>
            <div style={{ height: 1, width: "clamp(20px, 5vw, 50px)", background: "linear-gradient(90deg, transparent, #d4af37)", opacity: 0.7 }} />
            <span style={{ fontFamily: "sans-serif", fontSize: "clamp(0.88rem, 2vw, 0.85rem)", color: "rgba(212,175,55,0.5)", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              18 Avril 2026 · Ndogpassi III · Douala
            </span>
            <div style={{ height: 1, width: "clamp(20px, 5vw, 50px)", background: "linear-gradient(90deg, #d4af37, transparent)", opacity: 0.7 }} />
          </div>
        </motion.div>

        <AnimatePresence>
          {isFinished && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginTop: 32 }}>
              <motion.button
                onClick={launchFireworks}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ padding: "clamp(0.8rem, 2vw, 1.2rem) clamp(2rem, 6vw, 4rem)", background: "linear-gradient(135deg, #b8920e, #f0c842, #d4af37)", borderRadius: 100, border: "none", cursor: "pointer", fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1rem, 2.2vw, 1rem)", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1a0f00", fontWeight: "bold", boxShadow: "0 0 30px rgba(212,175,55,0.5)" }}
              >
                Fêter ça ! 🎆
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&display=swap');
        .countdown-pulse-line { animation: cdPulse 3s ease-in-out infinite; }
        @keyframes cdPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        .colon-dot { animation: colonBlink 1s ease-in-out infinite; }
        .colon-dot-1 { animation-delay: 0.5s; }
        @keyframes colonBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
      `}</style>
    </section>
  );
};

export default Countdown;