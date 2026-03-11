/**
 * LandingScreen.tsx — Landing Anniversaire Mama Sylvie
 *
 * POLICES UTILISÉES (Google Fonts de substitution) :
 * Pour utiliser tes polices originales, remplace dans l'objet FONTS :
 *   - 'Pinyon Script'          → 'Chopin Script'
 *   - 'Cormorant Garamond'     → 'Noelan'
 *   - 'Pacifico'               → 'Sunny Winter'
 *   - 'Mountains of Christmas' → 'Kingthing Christmas'
 *   - 'Great Vibes'            → 'Christmas Cards'
 * (Charge tes fichiers .ttf/.otf via @font-face dans ton CSS global)
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── FONTS ────────────────────────────────────────────────────────────────────
const FONTS = {
  evenement: "'Pinyon Script', cursive",           // a → Chopin Script
  joyeux:    "'Cormorant Garamond', serif",         // b → Noelan
  mama:      "'Pacifico', cursive",                 // c → Sunny Winter
  cinquante: "'Mountains of Christmas', cursive",   // d → Kingthing Christmas
  bouton:    "'Great Vibes', cursive",              // e → Christmas Cards
};

let _pid = 0;
const uid = () => ++_pid;

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface LandingScreenProps {
  onOpen: () => void;
}
interface SandParticle {
  id: number; x: number; y: number;
  dx: number; dy: number; size: number; alpha: number; gold: boolean;
}
interface BgStar {
  id: number; x: number; y: number; size: number; dur: number; del: number;
  px: number; py: number;
}
interface TrailDot { id: number; x: number; y: number; size: number }

// ─── FONT LOADER ─────────────────────────────────────────────────────────────
const useFontLoader = () => {
  useEffect(() => {
    if (document.getElementById("mama-sylvie-fonts")) return;
    const link = document.createElement("link");
    link.id = "mama-sylvie-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Mountains+of+Christmas:wght@700&family=Pacifico&family=Cormorant+Garamond:ital,wght@1,300;1,500&family=Great+Vibes&display=swap";
    document.head.appendChild(link);
  }, []);
};

// ─── (a) BOUNCING LIGHT TEXT — "Événement Prestigieux" ───────────────────────
// Chaque lettre bondit depuis le haut (spring), puis une lumière balaye lettre par lettre
interface BouncingLightTextProps {
  text: string; fontFamily: string; fontSize: string;
  color?: string; delay?: number;
}
const BouncingLightText = ({
  text, fontFamily, fontSize,
  color = "rgba(212,175,55,0.85)", delay = 0,
}: BouncingLightTextProps) => {
  const [litIndex, setLitIndex] = useState(-1);
  const chars = text.split("");
  const charsRef = useRef(chars);
  const delayRef = useRef(delay);

  useEffect(() => {
    const charList = charsRef.current;
    const startDelay = delayRef.current;
    let cancelled = false;
    const runSweep = () => {
      if (cancelled) return;
      charList.forEach((_, i) => {
        setTimeout(() => { if (!cancelled) setLitIndex(i); }, i * 75);
        setTimeout(() => { if (!cancelled) setLitIndex(-1); }, i * 75 + 220);
      });
      setTimeout(runSweep, charList.length * 75 + 2800);
    };
    const t = setTimeout(runSweep, startDelay + charList.length * 65 + 900);
    return () => { cancelled = true; clearTimeout(t); };
  }, []); // one-shot effect — reads from stable refs only

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", fontFamily, fontSize, letterSpacing: "0.08em" }}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: -90, opacity: 0, scale: 1.6 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            delay: delay / 1000 + i * 0.065,
            type: "spring", stiffness: 170, damping: 11, mass: 0.85,
          }}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            color: litIndex === i ? "#ffffff" : color,
            textShadow:
              litIndex === i
                ? "0 0 8px #fff, 0 0 24px rgba(255,230,100,0.95), 0 0 55px rgba(212,175,55,0.6)"
                : "0 0 6px rgba(212,175,55,0.22)",
            transition: "color 0.06s, text-shadow 0.06s",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

// ─── (b/c) SAND TYPEWRITER — "Joyeux Anniversaire" & "Mama Sylvie" ───────────
// Écrit lettre par lettre comme une plume, avec des particules de sable à chaque lettre
interface SandTypewriterProps {
  text: string; fontFamily: string; fontSize: string;
  color?: string; delay?: number;
}
const SandTypewriter = ({
  text, fontFamily, fontSize, color = "#fff", delay = 0,
}: SandTypewriterProps) => {
  const [count, setCount]       = useState(0);
  const [particles, setParticles] = useState<SandParticle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const spawnParticles = useCallback(
    (letterIdx: number) => {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const progress = text.length > 1 ? letterIdx / (text.length - 1) : 1;
      const x = progress * el.offsetWidth;
      const y = el.offsetHeight * 0.68;

      const newPs: SandParticle[] = Array.from({ length: 12 }, () => ({
        id: uid(), x, y,
        dx: (Math.random() - 0.5) * 40,
        dy: Math.random() * 26 + 8,
        size: Math.random() * 2.8 + 0.4,
        alpha: Math.random() * 0.55 + 0.45,
        gold: Math.random() > 0.35,
      }));
      const ids = newPs.map(p => p.id);
      setParticles(p => [...p, ...newPs]);
      setTimeout(() => setParticles(p => p.filter(pp => !ids.includes(pp.id))), 1000);
    },
    [text.length]
  );

  useEffect(() => {
    if (count >= text.length) return;
    const ms = count === 0 ? delay : 88;
    const t = setTimeout(() => {
      setCount(c => {
        spawnParticles(c);
        return c + 1;
      });
    }, ms);
    return () => clearTimeout(t);
  }, [count, delay, spawnParticles, text.length]);

  return (
    <div ref={containerRef} style={{ position: "relative", display: "inline-block" }}>
      <span style={{ fontFamily, fontSize, color }}>
        {text.slice(0, count)}
        {count > 0 && count < text.length && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.52 }}
            style={{
              display: "inline-block", width: 2, height: "0.78em",
              backgroundColor: "rgba(212,175,55,0.85)",
              verticalAlign: "text-bottom", marginLeft: 2, borderRadius: 1,
            }}
          />
        )}
      </span>

      {/* Particules de sable */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}>
        {particles.map(p => (
          <motion.div
            key={p.id}
            style={{
              position: "absolute", left: p.x, top: p.y,
              width: p.size, height: p.size, borderRadius: "50%",
              backgroundColor: p.gold
                ? `rgba(212,175,55,${p.alpha})`
                : `rgba(255,240,165,${p.alpha})`,
            }}
            initial={{ x: 0, y: 0, opacity: p.alpha, scale: 1 }}
            animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 0.15 }}
            transition={{ duration: 0.88, ease: "easeOut" }}
          />
        ))}
      </div>
    </div>
  );
};

// ─── (d) 50 ANS ÇA SE FÊTE — apparition + traits dorés scintillants ───────────
interface SparkleDivProps { delay?: number }
interface SparkDot { id: number; x: number; y: number; size: number }

const SparkleLine = () => {
  const [sparks, setSparks] = useState<SparkDot[]>([]);
  useEffect(() => {
    const iv = setInterval(() => {
      const newS: SparkDot[] = Array.from({ length: 5 }, () => ({
        id: uid(), x: Math.random() * 48 - 24, y: Math.random() * 5 - 2.5,
        size: Math.random() * 5 + 2,
      }));
      const ids = newS.map(s => s.id);
      setSparks(s => [...s, ...newS]);
      setTimeout(() => setSparks(s => s.filter(ss => !ids.includes(ss.id))), 700);
    }, 450);
    return () => clearInterval(iv);
  }, []);
  return (
    <div style={{ position: "relative", height: 1, width: 48, backgroundColor: "rgba(212,175,55,0.5)" }}>
      {sparks.map(s => (
        <motion.div
          key={s.id}
          style={{
            position: "absolute", borderRadius: "50%",
            width: s.size, height: s.size,
            backgroundColor: Math.random() > 0.4 ? "#d4af37" : "#fff8dc",
            left: "50%", top: "50%",
            marginLeft: -s.size / 2, marginTop: -s.size / 2,
            boxShadow: "0 0 5px #d4af37, 0 0 10px rgba(212,175,55,0.4)",
          }}
          initial={{ x: s.x, y: s.y, opacity: 1, scale: 1 }}
          animate={{ x: s.x, y: s.y - 14, opacity: 0, scale: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

const SparkleFifty = ({ delay = 0 }: SparkleDivProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.6, y: 18 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay: delay / 1000, duration: 0.85, type: "spring", stiffness: 90 }}
    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}
  >
    <SparkleLine />
    <span
      style={{
        fontFamily: FONTS.cinquante,
        fontSize: "clamp(0.95rem, 2.8vw, 1.45rem)",
        color: "#d4af37",
        letterSpacing: "0.18em",
        textShadow: "0 0 12px rgba(212,175,55,0.55), 0 0 25px rgba(212,175,55,0.25)",
        textTransform: "uppercase",
      }}
    >
      50 ans ça se fête
    </span>
    <SparkleLine />
  </motion.div>
);

// ─── (f) INTERACTIVE BACKGROUND ──────────────────────────────────────────────
const STARS: BgStar[] = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  x: Math.random() * 100, y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  dur: Math.random() * 3 + 2,
  del: Math.random() * 3,
  px: (Math.random() - 0.5) * 0.05,
  py: (Math.random() - 0.5) * 0.05,
}));

interface Shooting { id: number; x: number; y: number }

const InteractiveBackground = () => {
  const [mouse, setMouse]     = useState({ x: 50, y: 50 });
  const [trails, setTrails]   = useState<TrailDot[]>([]);
  const [shooting, setShooting] = useState<Shooting | null>(null);
  const lastTrail = useRef(0);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setMouse({ x, y });

    const now = Date.now();
    if (now - lastTrail.current > 38) {
      lastTrail.current = now;
      const dot: TrailDot = { id: uid(), x: e.clientX, y: e.clientY, size: Math.random() * 4 + 2 };
      setTrails(t => [...t.slice(-22), dot]);
      setTimeout(() => setTrails(t => t.filter(tt => tt.id !== dot.id)), 750);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  useEffect(() => {
    let cancelled = false;
    const fire = () => {
      if (cancelled) return;
      setShooting({ id: uid(), x: Math.random() * 65 + 5, y: Math.random() * 35 + 3 });
      setTimeout(() => { if (!cancelled) setShooting(null); }, 1400);
      setTimeout(fire, Math.random() * 4500 + 3500);
    };
    const t = setTimeout(fire, 2500);
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Glow cursor */}
      <div
        style={{
          position: "absolute",
          width: 520, height: 520, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,175,55,0.055) 0%, transparent 70%)",
          left: `${mouse.x}%`, top: `${mouse.y}%`,
          transform: "translate(-50%, -50%)",
          transition: "left 0.25s ease, top 0.25s ease",
          pointerEvents: "none",
        }}
      />

      {/* Stars with parallax */}
      {STARS.map(s => (
        <motion.div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x + (mouse.x - 50) * s.px}%`,
            top: `${s.y + (mouse.y - 50) * s.py}%`,
            width: s.size, height: s.size, borderRadius: "50%",
            backgroundColor: "white",
            boxShadow: "0 0 4px rgba(255,255,255,0.6)",
            transition: "left 0.9s ease, top 0.9s ease",
          }}
          animate={{ opacity: [0.15, 0.9, 0.15], scale: [1, 1.5, 1] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.del }}
        />
      ))}

      {/* Shooting star */}
      <AnimatePresence>
        {shooting && (
          <motion.div
            key={shooting.id}
            style={{
              position: "absolute",
              left: `${shooting.x}%`, top: `${shooting.y}%`,
              height: 1.5, width: 130, borderRadius: 4,
              background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.9), white)",
              rotate: 22,
              transformOrigin: "left center",
            }}
            initial={{ scaleX: 0, opacity: 0, x: 0 }}
            animate={{ scaleX: [0, 1, 0.2], opacity: [0, 1, 0], x: 220 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Mouse trail */}
      {trails.map(t => (
        <motion.div
          key={t.id}
          style={{
            position: "fixed", left: t.x, top: t.y,
            width: t.size, height: t.size, borderRadius: "50%",
            backgroundColor: "rgba(212,175,55,0.65)",
            boxShadow: "0 0 7px rgba(212,175,55,0.4)",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0.1, y: -18 }}
          transition={{ duration: 0.72 }}
        />
      ))}

      {/* Central nebula glow */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "clamp(300px, 60vw, 650px)",
          height: "clamp(300px, 60vw, 650px)",
          background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 65%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

// ─── (g) EXIT ANIMATION OVERLAY ───────────────────────────────────────────────
const ExitRings = () => (
  <motion.div
    style={{
      position: "fixed", inset: 0, zIndex: 400,
      display: "flex", alignItems: "center", justifyContent: "center",
      pointerEvents: "none",
    }}
    initial={{ opacity: 1 }}
    animate={{ opacity: 1 }}
  >
    {[0, 1, 2, 3].map(i => (
      <motion.div
        key={i}
        style={{
          position: "absolute", borderRadius: "50%",
          border: `${2 - i * 0.4}px solid rgba(212,175,55,${0.7 - i * 0.15})`,
        }}
        initial={{ width: 60, height: 60, opacity: 1 }}
        animate={{ width: 900, height: 900, opacity: 0 }}
        transition={{ delay: i * 0.13, duration: 1.1, ease: "easeOut" }}
      />
    ))}
    {/* Gold flash */}
    <motion.div
      style={{ position: "absolute", inset: 0, backgroundColor: "rgba(212,175,55,0.12)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.6, 0] }}
      transition={{ duration: 0.7 }}
    />
    {/* Particle burst */}
    {Array.from({ length: 20 }, (_, i) => {
      const angle = (i / 20) * Math.PI * 2;
      const dist = 150 + Math.random() * 200;
      return (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: Math.random() * 5 + 2, height: Math.random() * 5 + 2,
            borderRadius: "50%",
            backgroundColor: i % 3 === 0 ? "#fff8dc" : "#d4af37",
            boxShadow: "0 0 6px rgba(212,175,55,0.7)",
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            opacity: 0, scale: 0,
          }}
          transition={{ duration: 0.9 + Math.random() * 0.4, ease: "easeOut" }}
        />
      );
    })}
  </motion.div>
);

// ─── BOUTON SCINTILLANT ──────────────────────────────────────────────────────
interface SparkleButtonProps {
  onEnter: () => void;
  visible: boolean;
}
interface BtnSpark { id: number; x: number; y: number; size: number }

const SparkleButton = ({ onEnter, visible }: SparkleButtonProps) => {
  const [hovered, setHovered]   = useState(false);
  const [sparks, setSparks]     = useState<BtnSpark[]>([]);

  useEffect(() => {
    if (!hovered) return;
    const iv = setInterval(() => {
      const s: BtnSpark = { id: uid(), x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 5 + 2 };
      setSparks(ss => [...ss, s]);
      setTimeout(() => setSparks(ss => ss.filter(k => k.id !== s.id)), 650);
    }, 100);
    return () => clearInterval(iv);
  }, [hovered]);

  return (
    <motion.div
      initial={{ x: 140, opacity: 0 }}
      animate={visible ? { x: 0, opacity: 1 } : { x: 140, opacity: 0 }}
      transition={{ type: "spring", stiffness: 75, damping: 14, delay: visible ? 0 : 0 }}
    >
      <motion.button
        onClick={onEnter}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.04, boxShadow: "0 14px 40px -8px rgba(212,175,55,0.65)" }}
        style={{
          position: "relative",
          padding: "clamp(0.8rem,2.5vw,1.1rem) clamp(1.8rem,4vw,2.8rem)",
          background: "linear-gradient(135deg, #b8920e, #f0c842, #d4af37, #f0c842, #b8920e)",
          backgroundSize: "300% 100%",
          borderRadius: 100,
          border: "none",
          cursor: "pointer",
          overflow: "hidden",
          boxShadow: "0 8px 32px -6px rgba(212,175,55,0.4)",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
      >
        {/* Shimmer */}
        <motion.div
          animate={{ x: ["-160%", "160%"] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
            transform: "skewX(-14deg)",
          }}
        />
        {/* Hover sparks */}
        {sparks.map(s => (
          <motion.div
            key={s.id}
            style={{
              position: "absolute",
              left: `${s.x}%`, top: `${s.y}%`,
              width: s.size, height: s.size, borderRadius: "50%",
              backgroundColor: "#fff",
              boxShadow: "0 0 6px #d4af37",
              pointerEvents: "none",
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 0, opacity: 0, y: -22 }}
            transition={{ duration: 0.58 }}
          />
        ))}
        {/* Text */}
        <span
          style={{
            position: "relative", zIndex: 1,
            fontFamily: FONTS.bouton,
            fontSize: "clamp(1rem, 2.8vw, 1.5rem)",
            color: "#1a0f00",
            fontWeight: "bold",
            letterSpacing: "0.03em",
            display: "flex", alignItems: "center", gap: "0.55rem",
          }}
        >
          Entrer dans la fête
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.1 }}
          >
            →
          </motion.span>
        </span>
      </motion.button>
    </motion.div>
  );
};

// ─── MAIN LANDING SCREEN ─────────────────────────────────────────────────────
const LandingScreen = ({ onOpen }: LandingScreenProps) => {
  useFontLoader();

  const [isExiting, setIsExiting] = useState(false);

  // Timing (ms) pour l'apparition séquentielle
  const D = {
    evenement: 200,
    joyeux:    1000,
    mama:      3400,  // ~20 lettres × 88ms = 1760ms après joyeux
    cinquante: 5700,
    bouton:    6300,
  };

  const handleEnter = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    window.dispatchEvent(new Event("ouvrirInvitation"));
    setTimeout(() => onOpen(), 1300);
  }, [isExiting, onOpen]);

  return (
    <>
      {/* ── MAIN FRAME ── */}
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-[#040404] overflow-hidden touch-none"
        animate={isExiting
          ? { opacity: 0, scale: 1.07, filter: "brightness(2)" }
          : { opacity: 1, scale: 1, filter: "brightness(1)" }
        }
        transition={{ duration: 1, ease: "circOut", delay: isExiting ? 0.2 : 0 }}
      >
        {/* FOND INTERACTIF (f) */}
        <InteractiveBackground />

        {/* CONTENU */}
        <div
          style={{
            position: "relative", zIndex: 10,
            display: "flex", flexDirection: "column",
            alignItems: "center", textAlign: "center",
            padding: "0 1.25rem", width: "100%", gap: "0.6rem",
          }}
        >
          {/* (a) Événement Prestigieux */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <BouncingLightText
              text="Événement Prestigieux"
              fontFamily={FONTS.evenement}
              fontSize="clamp(1.15rem, 3.2vw, 2.1rem)"
              delay={D.evenement}
            />
          </motion.div>

          {/* (b) Joyeux Anniversaire */}
          <div>
            <SandTypewriter
              text="Joyeux Anniversaire"
              fontFamily={FONTS.joyeux}
              fontSize="clamp(2.4rem, 8.5vw, 6.2rem)"
              color="#ffffff"
              delay={D.joyeux}
            />
          </div>

          {/* (c) Mama Sylvie */}
          <div>
            <SandTypewriter
              text="Mama Sylvie"
              fontFamily={FONTS.mama}
              fontSize="clamp(1.5rem, 5.5vw, 3.2rem)"
              color="rgba(212,175,55,0.92)"
              delay={D.mama}
            />
          </div>

          {/* Espace */}
          <div style={{ height: "0.5rem" }} />

          {/* (d) 50 ans ça se fête */}
          <SparkleFifty delay={D.cinquante} />

          {/* Espace */}
          <div style={{ height: "1rem" }} />

          {/* (e) Bouton Entrer dans la fête */}
          <SparkleButton onEnter={handleEnter} visible={true} />
        </div>

        {/* Coins décoratifs */}
        <div style={{
          position: "absolute", top: "clamp(1.2rem,3vw,2.5rem)", left: "clamp(1.2rem,3vw,2.5rem)",
          width: "clamp(3rem,6vw,5rem)", height: "clamp(3rem,6vw,5rem)",
          borderTop: "1px solid rgba(212,175,55,0.3)", borderLeft: "1px solid rgba(212,175,55,0.3)",
          borderRadius: "12px 0 0 0", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "clamp(1.2rem,3vw,2.5rem)", right: "clamp(1.2rem,3vw,2.5rem)",
          width: "clamp(3rem,6vw,5rem)", height: "clamp(3rem,6vw,5rem)",
          borderBottom: "1px solid rgba(212,175,55,0.3)", borderRight: "1px solid rgba(212,175,55,0.3)",
          borderRadius: "0 0 12px 0", pointerEvents: "none",
        }} />
      </motion.div>

      {/* (g) ANIMATION D'ENTRÉE au clic */}
      <AnimatePresence>
        {isExiting && <ExitRings />}
      </AnimatePresence>
    </>
  );
};

export default LandingScreen;