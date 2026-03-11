/**
 * TributeSection.tsx — Hommage à Maman Sylvie
 * ✅ Responsive SE → écran géant
 * ✅ Mobile : Texte1 en haut, Slider au milieu (sans dots/flèches), Texte3 en bas
 * ✅ Cartes alignées à la même hauteur (Desktop)
 */

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

/* ── FONT LOADER ─────────────────────────────────────────────────── */
const useFonts = () => {
  useEffect(() => {
    if (document.getElementById("tribute-fonts")) return;
    const link = document.createElement("link");
    link.id = "tribute-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,400;1,600&family=Cinzel+Decorative:wght@400;700&family=Playfair+Display:ital,wght@1,400;1,700&display=swap";
    document.head.appendChild(link);
  }, []);
};

let _id = 0;
const uid = () => ++_id;

/* ── SAND PARTICLE ───────────────────────────────────────────────── */
interface SandP { id: number; x: number; y: number; dx: number; dy: number; size: number; gold: boolean }

/* ── SAND TYPEWRITER ─────────────────────────────────────────────── */
const SandWriter = ({ text, fontSize = "1.05rem", color = "#f8e6a5", delay = 0 }: {
  text: string; fontSize?: string; color?: string; delay?: number;
}) => {
  const [count, setCount] = useState(0);
  const [particles, setParticles] = useState<SandP[]>([]);
  const containerRef = useRef<HTMLSpanElement>(null);
  const spawnRef = useRef<((i: number) => void) | null>(null);

  spawnRef.current = useCallback((idx: number) => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const progress = text.length > 1 ? idx / (text.length - 1) : 0.5;
    const x = progress * el.offsetWidth;
    const y = el.offsetHeight * 0.7;
    const newPs: SandP[] = Array.from({ length: 10 }, () => ({
      id: uid(), x, y,
      dx: (Math.random() - 0.5) * 44,
      dy: Math.random() * 22 + 6,
      size: Math.random() * 3 + 0.6,
      gold: Math.random() > 0.3,
    }));
    const ids = newPs.map(p => p.id);
    setParticles(p => [...p, ...newPs]);
    setTimeout(() => setParticles(p => p.filter(pp => !ids.includes(pp.id))), 900);
  }, [text.length]);

  useEffect(() => {
    if (count >= text.length) return;
    const ms = count === 0 ? delay : 80;
    const t = setTimeout(() => {
      setCount(c => { spawnRef.current?.(c); return c + 1; });
    }, ms);
    return () => clearTimeout(t);
  }, [count, delay, text.length]);

  return (
    <span ref={containerRef} style={{ position: "relative", display: "inline-block", lineHeight: 1.5 }}>
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize, color, fontStyle: "italic", letterSpacing: "0.04em" }}>
        {text.slice(0, count)}
        {count > 0 && count < text.length && (
          <motion.span
            animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.48 }}
            style={{ display: "inline-block", width: 1.5, height: "0.75em", backgroundColor: "#d4af37", verticalAlign: "text-bottom", marginLeft: 1, borderRadius: 1 }}
          />
        )}
      </span>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}>
        {particles.map(p => (
          <motion.div key={p.id}
            style={{
              position: "absolute", left: p.x, top: p.y,
              width: p.size, height: p.size, borderRadius: "50%",
              backgroundColor: p.gold ? `rgba(212,175,55,0.85)` : `rgba(255,240,165,0.75)`,
            }}
            initial={{ x: 0, y: 0, opacity: 0.9, scale: 1 }}
            animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 0.1 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          />
        ))}
      </div>
    </span>
  );
};

/* ── BOUNCING TEXT ───────────────────────────────────────────────── */
const BouncingText = ({ text, fontSize = "1.05rem", color = "#f8e6a5", delay = 0 }: {
  text: string; fontSize?: string; color?: string; delay?: number;
}) => {
  const words = text.split(" ");
  return (
    <span style={{ display: "inline-block" }}>
      {words.map((word, wi) => (
        <motion.span
          key={wi}
          initial={{ y: -55, opacity: 0, scale: 1.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            delay: delay / 1000 + wi * 0.13,
            type: "spring", stiffness: 160, damping: 10,
          }}
          style={{
            display: "inline-block",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize, color, fontStyle: "italic", letterSpacing: "0.04em",
            marginRight: "0.35em",
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

/* ── LEFT LETTER PANEL (Texte 1) ─────────────────────────────────── */
const LeftLetterPanel = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "linear-gradient(145deg, rgba(28,18,4,0.95), rgba(15,9,2,0.98))",
        border: "1px solid rgba(212,175,55,0.18)",
        borderRadius: 18,
        padding: "clamp(1.2rem, 3vw, 2rem)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        backdropFilter: "blur(12px)",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%", // Forcer la hauteur totale
      }}
    >
      <div style={{
        position: "absolute", inset: 0, borderRadius: 18,
        background: "repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(212,175,55,0.025) 22px, rgba(212,175,55,0.025) 23px)",
        pointerEvents: "none",
      }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, #d4af37, transparent)", opacity: 0.4 }} />

      <p style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(0.5rem, 1.2vw, 0.6rem)", color: "rgba(212,175,55,0.6)", letterSpacing: "0.3em", textTransform: "uppercase", textAlign: "center" }}>
        ✦ Avec Amour ✦
      </p>

      {inView && (
        <>
          <SandWriter text="Maman, tu es notre étoile du matin," delay={200} fontSize="clamp(0.82rem, 2vw, 1rem)" />
          <SandWriter text="celle qui ne s'éteint jamais." delay={2200} fontSize="clamp(0.82rem, 2vw, 1rem)" color="rgba(212,175,55,0.8)" />
          <SandWriter text="Merci pour chaque prière," delay={3800} fontSize="clamp(0.82rem, 2vw, 1rem)" />
          <SandWriter text="chaque sacrifice silencieux." delay={5200} fontSize="clamp(0.82rem, 2vw, 1rem)" color="rgba(248,230,165,0.7)" />
        </>
      )}

      <div style={{ marginTop: "auto", textAlign: "right" }}>
        <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "0.5rem", color: "rgba(212,175,55,0.35)", letterSpacing: "0.2em" }}>— La Famille</span>
      </div>
    </motion.div>
  );
};

/* ── RIGHT LETTER PANEL (Texte 3) ────────────────────────────────── */
const RightLetterPanel = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      style={{
        background: "linear-gradient(145deg, rgba(4,18,28,0.95), rgba(2,9,15,0.98))",
        border: "1px solid rgba(100,180,255,0.12)",
        borderRadius: 18,
        padding: "clamp(1.2rem, 3vw, 2rem)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        backdropFilter: "blur(12px)",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%", // Forcer la hauteur totale
      }}
    >
      <div style={{
        position: "absolute", inset: 0, borderRadius: 18,
        background: "repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(100,180,255,0.02) 22px, rgba(100,180,255,0.02) 23px)",
        pointerEvents: "none",
      }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)", opacity: 0.3 }} />

      <p style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(0.5rem, 1.2vw, 0.6rem)", color: "rgba(212,175,55,0.6)", letterSpacing: "0.3em", textTransform: "uppercase", textAlign: "center" }}>
        ✦ En Vérité ✦
      </p>

      {inView && (
        <>
          <BouncingText text="Tu es notre refuge" delay={300} fontSize="clamp(0.82rem, 2vw, 1rem)" color="#f8e6a5" />
          <BouncingText text="et notre plus grande fierté." delay={800} fontSize="clamp(0.82rem, 2vw, 1rem)" color="rgba(212,175,55,0.85)" />
          <BouncingText text="50 ans de force" delay={1500} fontSize="clamp(0.82rem, 2vw, 1rem)" color="#ffffff" />
          <BouncingText text="et de beauté intérieure." delay={2000} fontSize="clamp(0.82rem, 2vw, 1rem)" color="rgba(248,230,165,0.7)" />
        </>
      )}

      <div style={{ marginTop: "auto", textAlign: "left" }}>
        <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "0.5rem", color: "rgba(212,175,55,0.35)", letterSpacing: "0.2em" }}>— Avec Gratitude</span>
      </div>
    </motion.div>
  );
};

/* ── CENTER SLIDER (sans dots/flèches) ───────────────────────────── */
const SLIDES = [
  {
    id: 0,
    title: "Cœur d'une Mère",
    texts: [
      "Maman, tu es la racine de notre vie et la source de notre courage. Quand je te vois prier, je sens que le ciel s'ouvre pour nous.",
      "Tu as porté nos joies et nos peines avec une force silencieuse qui ne peut venir que de Dieu.",
    ],
    accent: "#d4af37",
  },
  {
    id: 1,
    title: "La Fratrie Unie",
    texts: [
      "Joyeux anniversaire à notre modèle ! Merci d'être ce guide et ce pilier sur qui nous pouvons toujours compter.",
      "Ta présence est notre plus beau cadeau. Je t'adore de tout mon cœur !",
    ],
    accent: "#c0a8e8",
  },
  {
    id: 2,
    title: "Notre Communauté",
    texts: [
      "Ta présence apporte une lumière et une énergie qui nous tirent tous vers le haut. Toute notre communauté s'unit pour te souhaiter le meilleur.",
      "Plus qu'une simple réunion, nous formons grâce à toi une véritable famille.",
    ],
    accent: "#7fffd4",
  },
  {
    id: 3,
    title: "Lumière Éternelle",
    texts: [
      "À notre Maman, lumière de notre maison et étoile de nos vies. Merci pour tes sacrifices et pour ce Ndolé qui rassemble nos cœurs comme une bénédiction.",
      "Maman, ton sourire est comme une lampe qui ne s'éteint jamais.",
    ],
    accent: "#ffd700",
  },
];

const CenterSlider = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[current];

  return (
    <div style={{
      width: "100%",
      height: "100%", // Forcer la hauteur totale
      position: "relative",
      background: "linear-gradient(145deg, #0c0802, #060401, #0a0600)",
      border: "1px solid rgba(212,175,55,0.25)",
      borderRadius: 22,
      padding: "clamp(1.8rem, 4vw, 3rem) clamp(1.2rem, 3vw, 2.5rem)",
      overflow: "hidden",
      minHeight: "clamp(220px, 35vw, 320px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
    }}>
      {/* Corner ornaments */}
      {[
        { top: 12, left: 12, borderWidth: "1px 0 0 1px" },
        { top: 12, right: 12, borderWidth: "1px 1px 0 0" },
        { bottom: 12, left: 12, borderWidth: "0 0 1px 1px" },
        { bottom: 12, right: 12, borderWidth: "0 1px 1px 0" },
      ].map((pos, i) => (
        <div key={i} style={{
          position: "absolute", width: 28, height: 28,
          borderColor: "rgba(212,175,55,0.35)",
          borderStyle: "solid",
          borderWidth: pos.borderWidth,
          ...pos,
        }} />
      ))}

      {/* Shimmer */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
        style={{
          position: "absolute", top: 0, left: 0, height: 1, width: "50%",
          background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)",
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.05, y: -20 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ height: 1, width: 24, backgroundColor: `${slide.accent}66` }} />
            <span style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "clamp(0.5rem, 1.3vw, 0.7rem)",
              color: slide.accent,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
            }}>{slide.title}</span>
            <div style={{ height: 1, width: 24, backgroundColor: `${slide.accent}66` }} />
          </div>

          <div style={{ fontSize: "0.7rem", color: `${slide.accent}88` }}>◆</div>

          {slide.texts.map((t, i) => (
            <p key={i} style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(0.88rem, 2vw, 1.1rem)",
              color: i === 0 ? "#f8e6a5" : "rgba(212,175,55,0.7)",
              fontStyle: "italic",
              textAlign: "center",
              lineHeight: 1.7,
              letterSpacing: "0.02em",
              maxWidth: "clamp(260px, 60vw, 460px)",
            }}>{t}</p>
          ))}

          <div style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: `${slide.accent}22`, lineHeight: 0.5, fontFamily: "serif" }}>"</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ── ORNATE TITLE ────────────────────────────────────────────────── */
const OrnateTitle = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{ textAlign: "center", marginBottom: "clamp(1.5rem, 4vw, 3rem)", position: "relative" }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
        <motion.div
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{ height: 1, width: "clamp(30px, 8vw, 80px)", background: "linear-gradient(90deg, transparent, #d4af37)", transformOrigin: "right" }}
        />
        <motion.span
          animate={{ rotate: inView ? [0, 360] : 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          style={{ fontSize: "clamp(0.8rem, 2vw, 1.2rem)", color: "#d4af37" }}
        >✦</motion.span>
        <motion.div
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{ height: 1, width: "clamp(30px, 8vw, 80px)", background: "linear-gradient(90deg, #d4af37, transparent)", transformOrigin: "left" }}
        />
      </div>

      <h2 style={{
        fontFamily: "'Cinzel Decorative', serif",
        fontSize: "clamp(1.2rem, 4.5vw, 2.8rem)",
        color: "transparent",
        background: "linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "0.08em",
        marginBottom: 12,
      }}>
        Hommage à Notre Reine
      </h2>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <motion.div
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          style={{ height: 1, width: "clamp(40px, 12vw, 120px)", background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6))", transformOrigin: "right" }}
        />
        <span style={{ fontSize: "0.9rem", color: "rgba(212,175,55,0.5)" }}>◈</span>
        <motion.div
          animate={{ width: inView ? "clamp(60px, 15vw, 160px)" : 0 }}
          transition={{ duration: 1.8, delay: 0.3 }}
          style={{ height: 2, background: "linear-gradient(90deg, rgba(212,175,55,0.8), rgba(255,255,255,0.6), rgba(212,175,55,0.8))", borderRadius: 1 }}
        />
        <span style={{ fontSize: "0.9rem", color: "rgba(212,175,55,0.5)" }}>◈</span>
        <motion.div
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          style={{ height: 1, width: "clamp(40px, 12vw, 120px)", background: "linear-gradient(90deg, rgba(212,175,55,0.6), transparent)", transformOrigin: "left" }}
        />
      </div>

      <motion.p
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(0.75rem, 2vw, 1rem)",
          color: "rgba(212,175,55,0.55)",
          fontStyle: "italic",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginTop: 10,
        }}
      >
        50 ans d'une vie bénie
      </motion.p>
    </motion.div>
  );
};

/* ── MAIN SECTION ────────────────────────────────────────────────── */
const TributeSection = () => {
  useFonts();

  return (
    <section style={{
      background: "linear-gradient(180deg, #080808 0%, #0a0600 50%, #080808 100%)",
      color: "white",
      padding: "clamp(3rem, 8vw, 6rem) 0",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: "clamp(320px, 95vw, 1400px)", margin: "0 auto", padding: "0 clamp(0.75rem, 4vw, 3rem)" }}>
        <OrnateTitle />

        {/* Layout responsive :
            - Mobile (<768px) : colonne verticale — Texte1 / Slider / Texte3
            - Desktop (≥768px) : 3 colonnes côte à côte étirées
        */}
        <style>{`
          @media (max-width: 767px) {
            .tribute-layout {
              display: flex !important;
              flex-direction: column !important;
              gap: 1.5rem !important;
            }
            .tribute-left { order: 1 !important; flex: none !important; }
            .tribute-center { order: 2 !important; flex: none !important; }
            .tribute-right { order: 3 !important; flex: none !important; }
          }
        `}</style>

        <div
          className="tribute-layout"
          style={{
            display: "flex",
            gap: "clamp(0.75rem, 2vw, 2rem)",
            alignItems: "stretch", // Aligne toutes les colonnes sur la hauteur de la plus grande
          }}
        >
          <div className="tribute-left" style={{ flex: "0 0 clamp(140px, 26%, 240px)", display: "flex" }}>
            <LeftLetterPanel />
          </div>
          <div className="tribute-center" style={{ flex: 1, minWidth: 0, display: "flex" }}>
            <CenterSlider />
          </div>
          <div className="tribute-right" style={{ flex: "0 0 clamp(140px, 26%, 240px)", display: "flex" }}>
            <RightLetterPanel />
          </div>
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,400;1,600&family=Cinzel+Decorative:wght@400;700&display=swap');`}</style>
    </section>
  );
};

export default TributeSection;