/**
 * HeroSection.tsx — Slider Anniversaire Mama Sylvie
 * ✅ Fonds : header1.png → header5.png uniquement
 * ✅ Fully responsive SE → écran géant
 * ✅ Navigation arrows & progress bar retirés
 */

import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import type { Variants as FMVariants } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

import header1 from "@/assets/header1.png";
import header2 from "@/assets/header2.png";
import header3 from "@/assets/header3.png";
import header4 from "@/assets/header4.png";
import header5 from "@/assets/header5.png";

/* 6 slides → 5 images, la dernière réutilise header1 */
const HERO_IMAGES = [header1, header2, header3, header4, header5, header1];

/* ── FONT LOADER ─────────────────────────────────────────────────── */
const useFonts = () => {
  useEffect(() => {
    if (document.getElementById("hero-custom-fonts")) return;
    const link = document.createElement("link");
    link.id = "hero-custom-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Dancing+Script:wght@600;700&family=Permanent+Marker&display=swap";
    document.head.appendChild(link);
  }, []);
};

const FONTS = {
  sunnyWinter: "'Dancing Script', cursive",
  nickelodeon: "'Permanent Marker', cursive",
  luckiest:    "'Luckiest Guy', cursive",
};

/* ── SLIDES DATA ─────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 0,
    message: "50 Ans de Lumière",
    sub: "Un demi-siècle de grâce et d'amour infini",
    font: FONTS.luckiest,
    msgColor: "#d4af37",
    subColor: "rgba(255,240,180,0.85)",
    gradient: "linear-gradient(160deg, rgba(20,8,0,0.88) 0%, rgba(40,20,0,0.55) 50%, rgba(10,5,0,0.82) 100%)",
    accentLeft: "#d4af37",
    animType: "bounce",
  },
  {
    id: 1,
    message: "La Reine de nos Cœurs",
    sub: "Chaque jour à tes côtés est une bénédiction",
    font: FONTS.sunnyWinter,
    msgColor: "#fff8dc",
    subColor: "rgba(212,175,55,0.9)",
    gradient: "linear-gradient(160deg, rgba(5,0,18,0.88) 0%, rgba(15,5,40,0.55) 50%, rgba(5,0,12,0.82) 100%)",
    accentLeft: "#b8a0ff",
    animType: "typewriter",
  },
  {
    id: 2,
    message: "Maman, tu es notre Force",
    sub: "Ta prière est notre armure chaque matin",
    font: FONTS.nickelodeon,
    msgColor: "#ffffff",
    subColor: "rgba(212,175,55,0.88)",
    gradient: "linear-gradient(160deg, rgba(0,12,5,0.88) 0%, rgba(0,30,15,0.55) 50%, rgba(0,10,4,0.82) 100%)",
    accentLeft: "#7fffd4",
    animType: "slide",
  },
  {
    id: 3,
    message: "50 Ans ça se Fête !",
    sub: "En grande pompe, avec toute la famille",
    font: FONTS.luckiest,
    msgColor: "#d4af37",
    subColor: "rgba(255,235,150,0.90)",
    gradient: "linear-gradient(160deg, rgba(18,5,0,0.88) 0%, rgba(50,20,0,0.55) 50%, rgba(12,4,0,0.82) 100%)",
    accentLeft: "#ff9933",
    animType: "zoom",
  },
  {
    id: 4,
    message: "Merci pour tout, Mama",
    sub: "Tes sacrifices ont bâti nos victoires",
    font: FONTS.sunnyWinter,
    msgColor: "#fff0e0",
    subColor: "rgba(200,160,80,0.90)",
    gradient: "linear-gradient(160deg, rgba(15,0,20,0.88) 0%, rgba(40,5,55,0.55) 50%, rgba(10,0,14,0.82) 100%)",
    accentLeft: "#f9a8d4",
    animType: "typewriter",
  },
  {
    id: 5,
    message: "Une Fête Royale t'attend",
    sub: "Ndogpassi III · 19 Avril 2026 · 15h30",
    font: FONTS.nickelodeon,
    msgColor: "#ffffff",
    subColor: "#d4af37",
    gradient: "linear-gradient(160deg, rgba(0,5,20,0.88) 0%, rgba(0,15,45,0.55) 50%, rgba(0,4,15,0.82) 100%)",
    accentLeft: "#60a5fa",
    animType: "bounce",
  },
];

/* ── ANIMATION VARIANTS ──────────────────────────────────────────── */
const spring = (stiffness: number, damping: number, duration?: number) =>
  ({ type: "spring" as const, stiffness, damping, ...(duration ? { duration } : {}) });

const getVariants = (type: string): FMVariants => {
  switch (type) {
    case "bounce":
      return {
        initial: { y: -60, opacity: 0, scale: 0.8 },
        animate: { y: 0, opacity: 1, scale: 1, transition: spring(120, 10) },
        exit:    { y: 60, opacity: 0, scale: 0.9, transition: { duration: 0.5 } },
      };
    case "slide":
      return {
        initial: { x: -120, opacity: 0 },
        animate: { x: 0, opacity: 1, transition: spring(90, 18, 0.9) },
        exit:    { x: 120, opacity: 0, transition: { duration: 0.45 } },
      };
    case "zoom":
      return {
        initial: { scale: 0.3, opacity: 0, rotate: -6 },
        animate: { scale: 1, opacity: 1, rotate: 0, transition: spring(130, 12) },
        exit:    { scale: 1.4, opacity: 0, transition: { duration: 0.5 } },
      };
    default:
      return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
        exit:    { opacity: 0, y: -20, transition: { duration: 0.4 } },
      };
  }
};

/* ── TYPEWRITER ──────────────────────────────────────────────────── */
const TypewriterText = ({ text, fontFamily, color, fontSize }: {
  text: string; fontFamily: string; color: string; fontSize: string;
}) => {
  const chars = text.split("");
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.055 } } }}
      style={{ fontFamily, color, fontSize, display: "inline-block" }}
    >
      {chars.map((c, i) => (
        <motion.span
          key={i}
          variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </motion.span>
  );
};

/* ── GOLD LINE ───────────────────────────────────────────────────── */
const GoldLine = ({ width = 40 }: { width?: number }) => (
  <div style={{ position: "relative", height: 1, width, overflow: "hidden", flexShrink: 0 }}>
    <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(212,175,55,0.3)" }} />
    <motion.div
      animate={{ x: ["-100%", "200%"] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
      style={{
        position: "absolute", top: 0, left: 0, height: "100%", width: "50%",
        background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.9), transparent)",
      }}
    />
  </div>
);

/* ── DOTS ────────────────────────────────────────────────────────── */
const SlideDots = ({ count, current, onChange }: {
  count: number; current: number; onChange: (i: number) => void;
}) => (
  <div style={{ display: "flex", gap: "clamp(5px, 1.5vw, 10px)", alignItems: "center", justifyContent: "center" }}>
    {Array.from({ length: count }, (_, i) => (
      <motion.button
        key={i}
        onClick={() => onChange(i)}
        animate={{ width: current === i ? "clamp(18px,4vw,28px)" : "clamp(6px,2vw,10px)", opacity: current === i ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
        style={{
          height: "clamp(6px,1.5vw,9px)",
          borderRadius: 4,
          backgroundColor: current === i ? "#d4af37" : "rgba(255,255,255,0.4)",
          border: "none", cursor: "pointer", padding: 0,
        }}
      />
    ))}
  </div>
);

/* ── SCROLL REVEAL ───────────────────────────────────────────────── */
const ScrollReveal = ({ children, delay = 0, direction = "up", style }: {
  children: React.ReactNode; delay?: number;
  direction?: "up" | "down" | "left" | "right"; style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const dirMap = { up: { y: 35 }, down: { y: -35 }, left: { x: 35 }, right: { x: -35 } };
  const initial = { opacity: 0, ...dirMap[direction] };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
};

/* ── MAIN HERO ───────────────────────────────────────────────────── */
const HeroSection = () => {
  useFonts();
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const yImage        = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scaleImg      = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const yContent      = useTransform(scrollYProgress, [0, 0.65], ["0%", "-12%"]);

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(next, 6000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, isPaused, next]);

  const handleDragEnd = useCallback((_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 50) prev();
    else if (info.offset.x < -50) next();
  }, [next, prev]);

  const slide = SLIDES[current];
  const variants = getVariants(slide.animType);

  return (
    <>
      <section
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: "#050505",
        }}
      >
        {/* ── BACKGROUND IMAGE — change avec chaque slide ── */}
        <motion.div
          style={{
            y: yImage, scale: scaleImg,
            position: "absolute", inset: 0, zIndex: 0,
          }}
        >
          <AnimatePresence mode="sync">
            <motion.img
              key={`hero-bg-${slide.id}`}
              src={HERO_IMAGES[slide.id]}
              alt=""
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          </AnimatePresence>

          {/* Dégradé permanent sur le fond */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 45%, rgba(5,5,5,0.92) 100%)",
          }} />
        </motion.div>

        {/* Per-slide gradient overlay */}
        <AnimatePresence mode="sync">
          <motion.div
            key={`grad-${slide.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{
              position: "absolute", inset: 0, zIndex: 2,
              background: slide.gradient,
              pointerEvents: "none",
            }}
          />
        </AnimatePresence>

        {/* ── CONTENT ── */}
        <motion.div
          style={{
            opacity: opacityContent,
            y: yContent,
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            width: "100%",
            minHeight: "100svh",
            padding: "clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 5rem) clamp(3rem, 8vw, 6rem)",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          {/* Ornement haut */}
          <ScrollReveal direction="down" delay={0.1}>
            <div style={{
              display: "flex", alignItems: "center",
              gap: "clamp(8px, 2vw, 16px)",
              marginBottom: "clamp(1.5rem, 5vw, 4rem)",
              flexWrap: "wrap", justifyContent: "center",
            }}>
              <GoldLine width={30} />
              <span style={{
                fontFamily: FONTS.luckiest,
                fontSize: "clamp(0.38rem, 1.2vw, 0.7rem)",
                color: "rgba(212,175,55,0.7)",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}>
                Événement Prestigieux · 2026
              </span>
              <GoldLine width={30} />
            </div>
          </ScrollReveal>

          {/* Slide texte (drag) */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            style={{
              width: "100%",
              maxWidth: "clamp(300px, 90vw, 900px)",
              cursor: "grab",
              userSelect: "none",
            }}
            whileTap={{ cursor: "grabbing" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "clamp(0.5rem, 2vw, 1.2rem)",
                  padding: "0 clamp(0.5rem, 3vw, 2rem)",
                }}
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  style={{
                    height: "clamp(2px, 0.4vw, 3px)",
                    width: "clamp(2rem, 8vw, 5rem)",
                    backgroundColor: slide.accentLeft,
                    borderRadius: 2,
                  }}
                />

                {slide.animType === "typewriter" ? (
                  <TypewriterText
                    text={slide.message}
                    fontFamily={slide.font}
                    color={slide.msgColor}
                    fontSize="clamp(1.6rem, 6.5vw, 5.5rem)"
                  />
                ) : (
                  <span style={{
                    fontFamily: slide.font,
                    fontSize: "clamp(1.6rem, 6.5vw, 5.5rem)",
                    color: slide.msgColor,
                    display: "block",
                    lineHeight: 1.1,
                    textShadow: `0 0 30px ${slide.accentLeft}44, 0 4px 20px rgba(0,0,0,0.6)`,
                    letterSpacing: "0.02em",
                    wordBreak: "break-word",
                    hyphens: "auto",
                  }}>
                    {slide.message}
                  </span>
                )}

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.7 }}
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "clamp(0.8rem, 2.2vw, 1.5rem)",
                    color: slide.subColor,
                    maxWidth: "clamp(220px, 70vw, 620px)",
                    lineHeight: 1.5,
                    letterSpacing: "0.02em",
                    wordBreak: "break-word",
                  }}
                >
                  {slide.sub}
                </motion.p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                  style={{
                    height: 1,
                    width: "clamp(1.5rem, 4vw, 3rem)",
                    backgroundColor: "rgba(212,175,55,0.4)",
                    borderRadius: 1,
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Dots */}
          <div style={{ marginTop: "clamp(1.2rem, 4vw, 3rem)" }}>
            <SlideDots count={SLIDES.length} current={current} onChange={goTo} />
          </div>

          {/* Date */}
          <ScrollReveal direction="up" delay={0.3} style={{ marginTop: "clamp(1.2rem, 3.5vw, 2.5rem)" }}>
            <div style={{
              display: "flex", alignItems: "center",
              gap: "clamp(6px, 2vw, 14px)",
              flexWrap: "wrap", justifyContent: "center",
            }}>
              <GoldLine width={22} />
              <motion.p
                animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                style={{
                  fontFamily: FONTS.luckiest,
                  fontSize: "clamp(0.42rem, 1.4vw, 0.7rem)",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  background: "linear-gradient(90deg, rgba(255,255,255,0.25), rgba(255,255,255,0.95), rgba(255,255,255,0.25))",
                  backgroundSize: "250% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
              >
                19 Avril 2026{" "}
                <span style={{ WebkitTextFillColor: "rgba(212,175,55,0.5)" }}>•</span>{" "}
                Douala
              </motion.p>
              <GoldLine width={22} />
            </div>
          </ScrollReveal>

          {/* Découvrir */}
          <ScrollReveal direction="up" delay={0.5} style={{ marginTop: "clamp(1rem, 3vw, 2rem)" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                style={{
                  fontFamily: FONTS.luckiest,
                  fontSize: "clamp(0.38rem, 1.1vw, 0.58rem)",
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  color: "rgba(212,175,55,0.5)",
                }}
              >
                Découvrir
              </motion.span>
              <div style={{
                position: "relative", height: "clamp(28px, 5vw, 42px)", width: 1,
                overflow: "hidden", backgroundColor: "rgba(255,255,255,0.08)",
              }}>
                <motion.div
                  animate={{ y: [-42, 42] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatType: "mirror" }}
                  style={{
                    position: "absolute", width: "100%", height: "100%",
                    background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.7), transparent)",
                  }}
                />
              </div>
            </div>
          </ScrollReveal>
        </motion.div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Dancing+Script:wght@600;700&family=Permanent+Marker&display=swap');
      `}</style>
    </>
  );
};

export default HeroSection;