/**
 * EventDetails.tsx — Cartes en plaques d'or avec effet lumière
 */

import { motion, Variants, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { MapPin, Clock, PartyPopper, Shirt, Sparkles } from "lucide-react";

/* ── GOLD PLAQUE CARD ────────────────────────────────────────────── */
interface CardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  sub: string;
  note: string;
  index: number;
}

const GoldPlaqueCard = ({ icon, title, content, sub, note, index }: CardProps) => {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ delay: index * 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setTimeout(() => setIsActive(false), 1500)}
      style={{
        position: "relative",
        borderRadius: 22,
        overflow: "hidden",
        cursor: "default",
        isolation: "isolate",
      }}
    >
      {/* Outer glow */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute", inset: -2, borderRadius: 24, zIndex: -1,
          background: "linear-gradient(135deg, #d4af37, #f5e17a, #b8920e, #f0c842, #d4af37)",
          filter: "blur(8px)", opacity: 0,
        }}
      />

      {/* Card body — GOLD PLAQUE */}
      <div style={{
        position: "relative",
        background: isActive
          ? "linear-gradient(135deg, #2a1f04, #1a1200, #2d2208, #1a1200)"
          : "linear-gradient(145deg, #1c1504, #0f0b02, #1a1200, #0c0900)",
        border: `1px solid ${isActive ? "rgba(212,175,55,0.55)" : "rgba(212,175,55,0.22)"}`,
        borderRadius: 22,
        padding: "clamp(1.4rem, 3vw, 2.2rem)",
        transition: "background 0.5s, border-color 0.5s",
        overflow: "hidden",
        minHeight: 200,
      }}>

        {/* ── SHIMMER SWEEP ── */}
        <motion.div
          animate={isActive ? { x: ["-160%", "160%"] } : { x: "-160%" }}
          transition={isActive ? { duration: 0.85, ease: "easeInOut" } : { duration: 0 }}
          style={{
            position: "absolute", top: 0, left: 0,
            width: "60%", height: "100%",
            background: "linear-gradient(90deg, transparent 0%, rgba(255,245,200,0.22) 40%, rgba(255,255,255,0.35) 50%, rgba(255,245,200,0.22) 60%, transparent 100%)",
            transform: "skewX(-15deg)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* ── GOLD TEXTURE PATTERN ── */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 22,
          background: `
            repeating-linear-gradient(
              45deg,
              transparent, transparent 2px,
              rgba(212,175,55,0.02) 2px, rgba(212,175,55,0.02) 4px
            )
          `,
          pointerEvents: "none",
        }} />

        {/* ── TOP BORDER LINE ── */}
        <div style={{
          position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)",
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Icon */}
          <motion.div
            animate={{ scale: isActive ? 1.12 : 1, rotate: isActive ? 5 : 0 }}
            transition={{ duration: 0.4, type: "spring" }}
            style={{
              width: 48, height: 48, borderRadius: "50%",
              background: isActive
                ? "linear-gradient(135deg, rgba(212,175,55,0.35), rgba(255,215,0,0.2))"
                : "rgba(212,175,55,0.08)",
              border: `1px solid ${isActive ? "rgba(212,175,55,0.5)" : "rgba(212,175,55,0.18)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#d4af37", marginBottom: 18,
              transition: "background 0.4s, border-color 0.4s",
            }}
          >
            {icon}
          </motion.div>

          {/* Title label */}
          <p style={{
            fontFamily: "sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: isActive ? "rgba(212,175,55,0.8)" : "rgba(212,175,55,0.5)",
            marginBottom: 6,
            transition: "color 0.4s",
          }}>{title}</p>

          {/* Main content */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            color: isActive ? "#fff8dc" : "#e8d5a0",
            letterSpacing: "0.05em",
            marginBottom: 4,
            transition: "color 0.4s",
          }}>{content}</p>

          <p style={{
            fontFamily: "sans-serif",
            fontSize: "clamp(0.7rem, 1.5vw, 0.8rem)",
            color: isActive ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.3)",
            marginBottom: 18,
            transition: "color 0.4s",
          }}>{sub}</p>

          {/* Divider */}
          <div style={{
            height: 1, marginBottom: 14,
            background: isActive
              ? "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)"
              : "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            transition: "background 0.4s",
          }} />

          {/* Note */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(0.65rem, 1.4vw, 0.78rem)",
            fontStyle: "italic",
            color: isActive ? "rgba(212,175,55,0.65)" : "rgba(212,175,55,0.35)",
            letterSpacing: "0.03em",
            transition: "color 0.4s",
          }}>{note}</p>
        </div>

        {/* ── CORNER MARKS ── */}
        {[["top-3 left-3", "border-t border-l"], ["top-3 right-3", "border-t border-r"],
          ["bottom-3 left-3", "border-b border-l"], ["bottom-3 right-3", "border-b border-r"]].map(([pos, border], i) => (
          <div key={i} style={{
            position: "absolute", width: 12, height: 12,
            borderStyle: "solid",
            borderWidth: 0,
            borderColor: isActive ? "rgba(212,175,55,0.45)" : "rgba(212,175,55,0.18)",
            ...(pos.includes("top") ? { top: 10 } : { bottom: 10 }),
            ...(pos.includes("left") ? { left: 10, borderLeftWidth: 1, borderTopWidth: pos.includes("top") ? 1 : 0, borderBottomWidth: pos.includes("bottom") ? 1 : 0 }
                : { right: 10, borderRightWidth: 1, borderTopWidth: pos.includes("top") ? 1 : 0, borderBottomWidth: pos.includes("bottom") ? 1 : 0 }),
            transition: "border-color 0.4s",
          }} />
        ))}
      </div>
    </motion.div>
  );
};

/* ── DETAILS DATA ─────────────────────────────────────────────────── */
const details = [
  { icon: <MapPin size={20} />, title: "Lieu", content: "Ndogpassi III", sub: "Zone de recasement", note: "L'excellence pour vous recevoir." },
  { icon: <Clock size={20} />, title: "Horaire", content: "15h30", sub: "Début des festivités", note: "Soyez des nôtres dès l'ouverture." },
  { icon: <PartyPopper size={20} />, title: "Ambiance", content: "Gala & Danse", sub: "Dîner gastronomique", note: "Une nuit gravée dans les mémoires." },
  { icon: <Shirt size={20} />, title: "Dress Code", content: "Royal & Chic", sub: "Or, Blanc, Rose", note: "L'élégance est de mise." },
];

/* ── MAIN COMPONENT ───────────────────────────────────────────────── */
const EventDetails = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <section style={{
      padding: "clamp(3rem, 8vw, 6rem) 0",
      background: "#050505",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9 }}
          style={{ textAlign: "center", marginBottom: "clamp(2rem, 5vw, 4rem)" }}
        >
          <Sparkles style={{ color: "#d4af37", width: 20, height: 20, margin: "0 auto 14px" }} className="animate-pulse" />
          <h2 style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(1.3rem, 3.5vw, 2.2rem)",
            color: "transparent",
            background: "linear-gradient(135deg, #bf953f, #fcf6ba, #b38728)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.06em",
          }}>
            Le Guide de la Soirée
          </h2>
          <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, #d4af37, transparent)", margin: "14px auto 0" }} />
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(clamp(200px, 45%, 280px), 1fr))",
          gap: "clamp(1rem, 2.5vw, 1.8rem)",
        }}>
          {details.map((item, i) => (
            <GoldPlaqueCard key={item.title} {...item} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@1,300;1,400&display=swap');
      `}</style>
    </section>
  );
};

export default EventDetails;