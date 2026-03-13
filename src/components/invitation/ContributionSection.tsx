/**
 * ContributionSection.tsx — Design luxueux repensé
 * ✅ Texte cagnotte mis à jour
 * ✅ Quote "votre générosité…" retirée de la section "Plus de cadeau"
 * ✅ Police augmentée sur mobile
 * ✅ Responsive SE → écran géant
 */

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Headphones, Gift, Heart, Copy, Check, Sparkles } from "lucide-react";

const useFonts = () => {
  useEffect(() => {
    if (document.getElementById("contrib-fonts")) return;
    const l = document.createElement("link");
    l.id = "contrib-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,300;1,400;1,600&display=swap";
    document.head.appendChild(l);
  }, []);
};

const ShimmerBar = ({ width = 40 }: { width?: number | string }) => (
  <div style={{ position: "relative", height: 1, width, overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(212,175,55,0.2)" }} />
    <div className="contrib-shimmer" style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "50%", background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.9), transparent)" }} />
  </div>
);

interface CardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
  isInView: boolean;
  accentColor?: string;
}

const LuxuryCard = ({ icon, title, desc, index, isInView, accentColor = "#d4af37" }: CardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ delay: index * 0.15, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 1800)}
      style={{ position: "relative", borderRadius: 24, overflow: "hidden", cursor: "default" }}
    >
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ position: "absolute", inset: -2, borderRadius: 26, zIndex: -1, background: `linear-gradient(135deg, ${accentColor}55, transparent 50%, ${accentColor}33)`, filter: "blur(8px)" }}
      />

      <div style={{
        background: hovered ? "linear-gradient(145deg, #231908, #1a1203, #1f1605)" : "linear-gradient(145deg, #161204, #0c0901, #121002)",
        border: `1px solid ${hovered ? `${accentColor}50` : "rgba(212,175,55,0.15)"}`,
        borderRadius: 24,
        padding: "clamp(2rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2.5rem)",
        overflow: "hidden", textAlign: "center",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(1rem, 2.5vw, 1.4rem)",
        transition: "background 0.5s, border-color 0.4s", position: "relative",
      }}>
        {/* Shimmer sweep */}
        <motion.div animate={hovered ? { x: ["-160%", "160%"] } : { x: "-160%" }} transition={hovered ? { duration: 0.9, ease: "easeInOut" } : {}}
          style={{ position: "absolute", top: 0, left: 0, width: "60%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,250,180,0.15), rgba(255,255,255,0.2), rgba(255,250,180,0.15), transparent)", transform: "skewX(-14deg)", pointerEvents: "none", zIndex: 2 }} />

        {/* Gold top line */}
        <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 2, background: `linear-gradient(90deg, transparent, ${hovered ? accentColor : `${accentColor}55`}, transparent)`, transition: "background 0.4s" }} />

        {/* Corner marks */}
        {[{ top: 12, left: 12, borderWidth: "1px 0 0 1px" }, { top: 12, right: 12, borderWidth: "1px 1px 0 0" }, { bottom: 12, left: 12, borderWidth: "0 0 1px 1px" }, { bottom: 12, right: 12, borderWidth: "0 1px 1px 0" }].map((pos, i) => (
          <div key={i} style={{ position: "absolute", width: 14, height: 14, borderStyle: "solid", borderColor: hovered ? `${accentColor}55` : "rgba(212,175,55,0.15)", borderWidth: pos.borderWidth, ...pos, transition: "border-color 0.4s" }} />
        ))}

        {/* Icon circle */}
        <motion.div
          animate={{ scale: hovered ? 1.12 : 1, boxShadow: hovered ? `0 0 30px ${accentColor}40, 0 0 60px ${accentColor}20` : "none" }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          style={{ width: "clamp(56px, 10vw, 76px)", height: "clamp(56px, 10vw, 76px)", borderRadius: "50%", background: hovered ? `radial-gradient(circle, ${accentColor}25, rgba(0,0,0,0.3))` : "rgba(212,175,55,0.06)", border: `1px solid ${hovered ? `${accentColor}60` : "rgba(212,175,55,0.18)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: accentColor, position: "relative", zIndex: 1, transition: "background 0.4s, border-color 0.4s" }}
        >{icon}</motion.div>

        {/* Title */}
        <h3 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1rem, 2.5vw, 1.15rem)", color: hovered ? "#fff8dc" : "#d4af37", letterSpacing: "0.07em", transition: "color 0.4s", position: "relative", zIndex: 1 }}>{title}</h3>

        {/* Divider */}
        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <ShimmerBar width="100%" />
        </div>

        {/* Desc */}
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.05rem, 2.5vw, 1.15rem)", fontStyle: "italic", color: hovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.38)", lineHeight: 1.65, letterSpacing: "0.02em", transition: "color 0.4s", position: "relative", zIndex: 1, maxWidth: 320 }}>{desc}</p>
      </div>
    </motion.div>
  );
};

const CARDS = [
  {
    icon: <Headphones size={26} />,
    title: "DJ d'un Soir",
    desc: "Préparez vos meilleurs pas de danse pour la fête royale de Maman Sylvie !",
    accentColor: "#d4af37",
  },
  {
    icon: <Gift size={26} />,
    title: "La Cagnotte Magique",
    desc: "Un petit geste de générosité ou un message doux sera la bienvenue pour célébrer les rêves de la reine du jour.",
    accentColor: "#c0a8e8",
  },
  {
    icon: <Heart size={26} />,
    title: "Plus de Cadeau",
    desc: "Votre présence est le plus beau des cadeaux — venez célébrer ensemble !",
    accentColor: "#f9a8d4",
  },
];

/* ── ORANGE MONEY CARD ────────────────────────────────────────────── */
const OrangeMoneyCard = ({ isInView }: { isInView: boolean }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText("699332456");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: 0.4, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      style={{ maxWidth: "clamp(280px, 80vw, 520px)", margin: "0 auto", position: "relative" }}
    >
      <div className="contrib-orange-glow" style={{ position: "absolute", inset: -4, borderRadius: 28, zIndex: -1, background: "linear-gradient(135deg, rgba(255,102,0,0.2), rgba(212,175,55,0.25), rgba(255,102,0,0.15))", filter: "blur(12px)", pointerEvents: "none" }} />

      <div style={{ background: "linear-gradient(145deg, #1e0d02, #120700, #1a0a00)", border: "1px solid rgba(255,102,0,0.3)", borderRadius: 24, padding: "clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem)", overflow: "hidden", position: "relative", textAlign: "center" }}>
        <div className="contrib-shimmer-orange" style={{ position: "absolute", top: 0, left: 0, width: "40%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,120,0,0.07), transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: "12%", right: "12%", height: 2, background: "linear-gradient(90deg, transparent, rgba(255,102,0,0.7), rgba(212,175,55,0.6), rgba(255,102,0,0.7), transparent)" }} />

        {[{ top: 12, left: 12, borderWidth: "1px 0 0 1px" }, { top: 12, right: 12, borderWidth: "1px 1px 0 0" }, { bottom: 12, left: 12, borderWidth: "0 0 1px 1px" }, { bottom: 12, right: 12, borderWidth: "0 1px 1px 0" }].map((pos, i) => (
          <div key={i} style={{ position: "absolute", width: 14, height: 14, borderStyle: "solid", borderColor: "rgba(255,102,0,0.3)", borderWidth: pos.borderWidth, ...pos }} />
        ))}

        <div style={{ position: "relative", zIndex: 1, marginBottom: "clamp(1rem, 2.5vw, 1.5rem)" }}>
          <div className="contrib-logo-pulse" style={{ width: "clamp(56px, 10vw, 72px)", height: "clamp(56px, 10vw, 72px)", borderRadius: "50%", margin: "0 auto", background: "radial-gradient(circle, rgba(255,102,0,0.2), rgba(255,80,0,0.08))", border: "1.5px solid rgba(255,102,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)" }}>🍊</div>
        </div>

        <p style={{ fontFamily: "sans-serif", fontSize: "clamp(0.82rem, 1.8vw, 0.75rem)", letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(212,175,55,0.6)", marginBottom: 8, position: "relative", zIndex: 1 }}>Le plus beau cadeau</p>

        <h3 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "#FF6600", letterSpacing: "0.06em", marginBottom: "clamp(1rem, 2.5vw, 1.5rem)", position: "relative", zIndex: 1, textShadow: "0 0 20px rgba(255,102,0,0.3)" }}>Orange Money</h3>

        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,102,0,0.3), rgba(212,175,55,0.2), rgba(255,102,0,0.3), transparent)", marginBottom: "clamp(1rem, 2.5vw, 1.5rem)", position: "relative", zIndex: 1 }} />

        <div style={{ marginBottom: "clamp(1rem, 2.5vw, 1.5rem)", position: "relative", zIndex: 1 }}>
          <motion.p
            animate={{ textShadow: ["0 0 10px rgba(240,217,138,0.3)", "0 0 25px rgba(240,217,138,0.7)", "0 0 10px rgba(240,217,138,0.3)"] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1.5rem, 5vw, 2.4rem)", color: "#f0d98a", letterSpacing: "0.18em", fontWeight: "bold", marginBottom: 16 }}
          >
            6 99 33 24 56
          </motion.p>

          <motion.button
            onClick={copy}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: copied ? "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.1))" : "linear-gradient(135deg, rgba(255,102,0,0.15), rgba(255,80,0,0.08))", border: `1.5px solid ${copied ? "rgba(212,175,55,0.5)" : "rgba(255,102,0,0.35)"}`, borderRadius: 100, padding: "clamp(0.5rem, 1.5vw, 0.75rem) clamp(1.2rem, 3vw, 2rem)", cursor: "pointer", fontFamily: "sans-serif", fontSize: "clamp(0.85rem, 1.8vw, 0.8rem)", letterSpacing: "0.25em", textTransform: "uppercase", color: copied ? "#d4af37" : "#FF6600", transition: "all 0.35s" }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Numéro copié !" : "Copier le numéro"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

/* ── MAIN SECTION ─────────────────────────────────────────────────── */
const ContributionSection = () => {
  useFonts();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} style={{ padding: "clamp(3rem, 8vw, 7rem) 0", background: "#050505", overflow: "hidden", position: "relative" }}>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`contrib-spark contrib-spark-${i}`} style={{ position: "absolute", top: `${12 + i * 15}%`, left: `${8 + i * 17}%`, width: "clamp(2px, 0.5vw, 3px)", height: "clamp(2px, 0.5vw, 3px)", borderRadius: "50%", backgroundColor: "#d4af37", boxShadow: "0 0 8px #d4af37", pointerEvents: "none" }} />
      ))}

      <div style={{ maxWidth: "clamp(320px, 95vw, 1300px)", margin: "0 auto", padding: "0 clamp(0.75rem, 4vw, 3rem)", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9 }}
          style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          <div style={{ marginBottom: 16 }}>
            <Sparkles className="contrib-sparkle" style={{ color: "#d4af37", width: "clamp(20px, 3.5vw, 26px)", height: "clamp(20px, 3.5vw, 26px)", margin: "0 auto" }} />
          </div>

          <p style={{ fontFamily: "sans-serif", fontSize: "clamp(0.78rem, 1.5vw, 0.72rem)", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(212,175,55,0.5)", marginBottom: 12 }}>Célébration</p>

          <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1.3rem, 3.5vw, 2.2rem)", color: "transparent", background: "linear-gradient(135deg, #bf953f, #fcf6ba, #b38728)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.07em", marginBottom: 12 }}>
            Devenez Magicien d'un Jour
          </h2>

          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.05rem, 2.5vw, 1.1rem)", fontStyle: "italic", color: "rgba(255,255,255,0.35)", maxWidth: "clamp(250px, 60vw, 500px)", margin: "0 auto 16px", lineHeight: 1.65 }}>
            Parce qu'organiser une fête royale demande un peu de poudre de perlimpinpin…
          </p>

          <div style={{ width: "clamp(40px, 8vw, 80px)", margin: "0 auto" }}>
            <ShimmerBar width="100%" />
          </div>
        </motion.div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "clamp(1rem, 2.5vw, 2rem)", marginBottom: "clamp(2.5rem, 6vw, 5rem)" }}>
          {CARDS.map((c, i) => (
            <LuxuryCard key={i} {...c} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Heart divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
          style={{ textAlign: "center", marginBottom: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(0.5rem, 2vw, 1rem)" }}>
            <div style={{ height: 1, width: "clamp(30px, 12vw, 100px)", background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4))" }} />
            <div className="contrib-heart-pulse">
              <Heart size={18} style={{ color: "#d4af37" }} fill="rgba(212,175,55,0.2)" />
            </div>
            <div style={{ height: 1, width: "clamp(30px, 12vw, 100px)", background: "linear-gradient(90deg, rgba(212,175,55,0.4), transparent)" }} />
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem, 2.8vw, 1.22rem)", fontStyle: "italic", color: "rgba(255,255,255,0.45)", marginTop: 14 }}>
            "Le plus beau cadeau, c'est votre présence…"
          </p>
        </motion.div>

        <OrangeMoneyCard isInView={isInView} />
      </div>

      <style>{`
        .contrib-shimmer { animation: contribShimmer 3s linear infinite; }
        @keyframes contribShimmer { from { transform: translateX(-200%); } to { transform: translateX(400%); } }
        .contrib-shimmer-orange { animation: contribShimmer 4s linear infinite; }
        .contrib-orange-glow { animation: contribOrangeGlow 4s ease-in-out infinite; }
        @keyframes contribOrangeGlow { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.7; } }
        .contrib-logo-pulse { animation: contribLogoPulse 3s ease-in-out infinite; }
        @keyframes contribLogoPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .contrib-sparkle { animation: contribSparkleRot 5s ease-in-out infinite; }
        @keyframes contribSparkleRot { 0%, 100% { transform: rotate(0deg); } 33% { transform: rotate(15deg); } 66% { transform: rotate(-15deg); } }
        .contrib-heart-pulse { animation: contribHeartBeat 2.5s ease-in-out infinite; display: inline-block; }
        @keyframes contribHeartBeat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
        .contrib-spark { animation: contribSparkTwinkle 3s ease-in-out infinite; }
        .contrib-spark-1 { animation-delay: 0.5s; }
        .contrib-spark-2 { animation-delay: 1s; }
        .contrib-spark-3 { animation-delay: 1.5s; }
        .contrib-spark-4 { animation-delay: 2s; }
        .contrib-spark-5 { animation-delay: 2.5s; }
        @keyframes contribSparkTwinkle { 0%, 100% { opacity: 0.08; transform: scale(1); } 50% { opacity: 0.45; transform: scale(1.4); } }
      `}</style>
    </section>
  );
};

export default ContributionSection;