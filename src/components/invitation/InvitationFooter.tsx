/**
 * InvitationFooter.tsx — Footer luxueux repensé
 * ✅ Design entièrement revu — élégance dorée profonde
 * ✅ Responsive SE → écran géant
 */

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const useFonts = () => {
  useEffect(() => {
    if (document.getElementById("footer-fonts")) return;
    const l = document.createElement("link");
    l.id = "footer-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400;1,600&display=swap";
    document.head.appendChild(l);
  }, []);
};

/* ── SHIMMER LINE ─────────────────────────────────────────────────── */
const ShimmerBar = ({ width = 60 }: { width?: number | string }) => (
  <div style={{ position: "relative", height: 1, width, overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(212,175,55,0.2)" }} />
    <motion.div
      animate={{ x: ["-100%", "200%"] }}
      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      style={{
        position: "absolute", top: 0, left: 0, height: "100%", width: "50%",
        background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.85), transparent)",
      }}
    />
  </div>
);

/* ── FLOATING ORB ─────────────────────────────────────────────────── */
const FloatingOrb = ({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) => (
  <motion.div
    animate={{ y: [0, -18, 0], opacity: [0.06, 0.18, 0.06] }}
    transition={{ repeat: Infinity, duration: 5 + delay, delay, ease: "easeInOut" }}
    style={{
      position: "absolute",
      left: x, top: y,
      width: size, height: size,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(212,175,55,0.4), transparent)",
      filter: "blur(20px)",
      pointerEvents: "none",
    }}
  />
);

/* ── MAIN FOOTER ──────────────────────────────────────────────────── */
const InvitationFooter = () => {
  useFonts();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <footer ref={ref} style={{
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(180deg, #050505 0%, #000000 100%)",
      padding: "clamp(4rem, 10vw, 8rem) 0 clamp(2rem, 5vw, 4rem)",
    }}>
      {/* Floating ambient orbs */}
      <FloatingOrb x="10%" y="20%" size={200} delay={0} />
      <FloatingOrb x="75%" y="15%" size={160} delay={1.5} />
      <FloatingOrb x="50%" y="60%" size={300} delay={0.8} />

      {/* Gold radial glow from bottom center */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "clamp(300px, 80vw, 800px)",
        height: "clamp(150px, 30vw, 350px)",
        background: "radial-gradient(ellipse at bottom, rgba(212,175,55,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: "clamp(320px, 92vw, 1200px)",
        margin: "0 auto",
        padding: "0 clamp(1rem, 5vw, 4rem)",
        textAlign: "center",
        position: "relative", zIndex: 1,
      }}>

        {/* Top ornament */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(0.5rem, 2vw, 1.5rem)", marginBottom: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          <ShimmerBar width="clamp(30px, 10vw, 100px)" />
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            style={{ fontSize: "clamp(0.7rem, 1.5vw, 1rem)", color: "#d4af37", opacity: 0.6 }}
          >
            ✦
          </motion.span>
          <span style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(0.42rem, 1.1vw, 0.58rem)",
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: "rgba(212,175,55,0.45)",
          }}>
            50 Ans de Grâce
          </span>
          <motion.span
            animate={{ rotate: [0, -360] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            style={{ fontSize: "clamp(0.7rem, 1.5vw, 1rem)", color: "#d4af37", opacity: 0.6 }}
          >
            ✦
          </motion.span>
          <ShimmerBar width="clamp(30px, 10vw, 100px)" />
        </motion.div>

        {/* Main name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "clamp(1.5rem, 4vw, 3rem)" }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(0.5rem, 1.3vw, 0.65rem)",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "rgba(212,175,55,0.45)",
            marginBottom: "clamp(0.5rem, 1.5vw, 1rem)",
            fontStyle: "normal",
          }}>En l'honneur de</p>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(2.4rem, 8vw, 7rem)",
            lineHeight: 1,
            letterSpacing: "-0.01em",
            marginBottom: "clamp(0.3rem, 1vw, 0.6rem)",
          }}>
            <span style={{ color: "rgba(255,255,255,0.85)" }}>Maman </span>
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
              style={{
                background: "linear-gradient(90deg, #bf953f, #fcf6ba, #d4af37, #fcf6ba, #bf953f)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline",
              }}
            >
              Sylvie Aimée
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "clamp(0.42rem, 1.1vw, 0.58rem)",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: "rgba(212,175,55,0.4)",
              marginTop: "clamp(0.5rem, 1.5vw, 1rem)",
            }}
          >
            L'élégance d'une vie
          </motion.p>
        </motion.div>

        {/* Gold horizontal divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: 1,
            width: "clamp(120px, 50vw, 500px)",
            margin: "0 auto clamp(2rem, 5vw, 4rem)",
            background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), rgba(255,255,255,0.3), rgba(212,175,55,0.6), transparent)",
            transformOrigin: "center",
          }}
        />

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.9 }}
          style={{ marginBottom: "clamp(2rem, 5vw, 4rem)" }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1rem, 2.8vw, 1.6rem)",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.7,
            maxWidth: "clamp(260px, 70vw, 680px)",
            margin: "0 auto",
            letterSpacing: "0.02em",
          }}>
            "50 ans de grâce, de force et d'amour infini."
          </p>
        </motion.div>

        {/* Date + lieu */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "clamp(0.5rem, 2vw, 1.2rem)",
            marginBottom: "clamp(3rem, 7vw, 6rem)",
          }}
        >
          <ShimmerBar width="clamp(16px, 4vw, 40px)" />
          <span style={{
            fontFamily: "sans-serif",
            fontSize: "clamp(0.48rem, 1.2vw, 0.65rem)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(212,175,55,0.45)",
          }}>
            19 Avril 2026 · Ndogpassi III · Douala
          </span>
          <ShimmerBar width="clamp(16px, 4vw, 40px)" />
        </motion.div>

        {/* Bottom signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.04)",
            paddingTop: "clamp(1rem, 3vw, 2rem)",
          }}
        >
          <p style={{
            fontFamily: "sans-serif",
            fontSize: "clamp(0.42rem, 1vw, 0.55rem)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.15)",
          }}>
            Fait avec amour par la famille · 2026
          </p>
        </motion.div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400;1,600&display=swap');`}</style>
    </footer>
  );
};

export default InvitationFooter;