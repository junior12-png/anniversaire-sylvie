/**
 * HommageGratitudes.tsx — Section Hommage & Gratitudes
 * ✅ Vidéos locales remplacées dans le slider
 * ✅ Police augmentée sur mobile
 * ✅ Responsive SE → écran géant
 */

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Utensils } from "lucide-react";

import video1 from "@/assets/PixVerse_V5_Image_Text_360P_Ceci_c_est_pour_un (3).mp4";
import video2 from "@/assets/PixVerse_V5.6_Image_Text_360P_S_il_te_plaiut_j (1).mp4";
import video3 from "@/assets/PixVerse_V5.6_Image_Text_360P_S_il_te_plaiut_j.mp4";
import video4 from "@/assets/PixVerse_V5_Image_Text_360P_Fait_pareil_ici_s_.mp4";
import video5 from "@/assets/PixVerse_V5_Image_Text_360P_je_veux_que_tu_met (1).mp4";

const FOOD_ITEMS = [
  { id: 0, label: "Variété de Brochettes",  desc: "Saveurs grillées préparées avec amour", src: video1, isVideo: true },
  { id: 1, label: "Kouakoukou",             desc: "Le goût authentique de notre terroir", src: video2, isVideo: true },
  { id: 2, label: "Eru & Water Fufu",       desc: "Les saveurs profondes de la tradition", src: video3, isVideo: true },
  { id: 3, label: "Koki Plantain Mûr",      desc: "Une douceur enveloppée dans la tradition", src: video4, isVideo: true },
  { id: 4, label: "Spiritueux",             desc: "Pour porter un toast à la reine du jour", src: video5, isVideo: true },
];

const SPEECH_PARAGRAPHS = [
  "En ce jour exceptionnel, nous voulons rendre hommage à une femme d'exception.",
  "Mama Sylvie, tu as consacré ta vie à ceux que tu aimes, avec une générosité sans limites et une foi inébranlable.",
  "Chaque repas préparé avec amour, chaque prière murmurée pour nous, chaque sacrifice fait dans l'ombre… nous les honorons aujourd'hui.",
  "Que cette fête soit à la hauteur de la grandeur de ton cœur. Nous t'aimons, Maman.",
];

const SpeechIntro = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      style={{ maxWidth: 680, margin: "0 auto clamp(2.5rem, 6vw, 5rem)", textAlign: "center", padding: "0 clamp(1rem, 4vw, 2rem)", position: "relative" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "rgba(212,175,55,0.12)", lineHeight: 0.8, fontFamily: "Georgia, serif", marginBottom: 16 }}
      >❝</motion.div>

      {SPEECH_PARAGRAPHS.map((para, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(6px)" }}
          transition={{ duration: 0.9, delay: 0.2 + i * 0.18, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.15rem, 2.8vw, 1.3rem)",
            fontStyle: "italic",
            color: i === 0 ? "#f8e6a5" : i === SPEECH_PARAGRAPHS.length - 1 ? "#d4af37" : "rgba(255,255,255,0.65)",
            lineHeight: 1.75, letterSpacing: "0.02em", marginBottom: 14,
          }}
        >{para}</motion.p>
      ))}

      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1.2 }}
        style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "rgba(212,175,55,0.12)", lineHeight: 0.8, fontFamily: "Georgia, serif" }}>❞</motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
        style={{ height: 1, width: "clamp(60px, 18vw, 120px)", background: "linear-gradient(90deg, transparent, #d4af37, transparent)", margin: "16px auto 0" }}
      />
    </motion.div>
  );
};

const GifSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    const t = setInterval(() => { setDirection(1); setCurrent(c => (c + 1) % FOOD_ITEMS.length); }, 6000);
    return () => clearInterval(t);
  }, []);

  const goTo = (idx: number) => { setDirection(idx > current ? 1 : -1); setCurrent(idx); };
  const slide = FOOD_ITEMS[current];
  const bezier: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const slideInitial = (d: number) => ({ x: d > 0 ? "80%" : "-80%", opacity: 0, scale: 0.9 });
  const slideExit    = (d: number) => ({ x: d > 0 ? "-80%" : "80%", opacity: 0, scale: 0.92 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.9 }}
      style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" }}
    >
      <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(212,175,55,0.2)", background: "#0a0800", aspectRatio: "16/9" }}>
        {/* Outer gold glow */}
        <div style={{ position: "absolute", inset: -1, borderRadius: 24, background: "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, transparent 50%, rgba(212,175,55,0.1) 100%)", pointerEvents: "none", zIndex: 3 }} />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            initial={slideInitial(direction)}
            animate={{ x: 0, opacity: 1, scale: 1, transition: { duration: 0.65, ease: bezier } }}
            exit={slideExit(direction)}
            style={{ position: "absolute", inset: 0 }}
          >
            {slide.isVideo ? (
              <video
                key={slide.src}
                autoPlay muted loop playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              >
                <source src={slide.src} type="video/mp4" />
              </video>
            ) : (
              <img src={slide.src} alt={slide.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            )}

            {/* Gradient overlay */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)" }} />

            {/* Text overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(1rem, 3vw, 2rem)", zIndex: 2 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <Utensils size={14} style={{ color: "#d4af37" }} />
                <span style={{ fontFamily: "sans-serif", fontSize: "clamp(0.88rem, 2vw, 0.9rem)", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(212,175,55,0.8)" }}>Au Menu</span>
              </div>
              <h3 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1.1rem, 3vw, 1.6rem)", color: "#fff8dc", marginBottom: 4, letterSpacing: "0.04em" }}>{slide.label}</h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1rem, 2.5vw, 1.05rem)", color: "rgba(255,255,255,0.6)", fontStyle: "italic" }}>{slide.desc}</p>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <button onClick={() => { setDirection(-1); setCurrent(c => (c - 1 + FOOD_ITEMS.length) % FOOD_ITEMS.length); }} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", zIndex: 4, background: "rgba(0,0,0,0.5)", border: "1px solid rgba(212,175,55,0.25)", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", cursor: "pointer" }}><ChevronLeft size={17} /></button>
        <button onClick={() => { setDirection(1); setCurrent(c => (c + 1) % FOOD_ITEMS.length); }} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", zIndex: 4, background: "rgba(0,0,0,0.5)", border: "1px solid rgba(212,175,55,0.25)", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", cursor: "pointer" }}><ChevronRight size={17} /></button>

        {/* Slide counter */}
        <div style={{ position: "absolute", top: 14, right: 14, zIndex: 4, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 20, padding: "4px 10px", fontFamily: "sans-serif", fontSize: "clamp(0.88rem, 2vw, 0.9rem)", letterSpacing: "0.15em", color: "rgba(212,175,55,0.8)" }}>
          {current + 1} / {FOOD_ITEMS.length}
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
        {FOOD_ITEMS.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            animate={{ width: current === i ? 20 : 7, opacity: current === i ? 1 : 0.35 }}
            style={{ height: 7, borderRadius: 4, backgroundColor: current === i ? "#d4af37" : "rgba(212,175,55,0.4)", border: "none", cursor: "pointer", padding: 0 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const HommageGratitudes = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section style={{ padding: "clamp(3rem, 8vw, 6rem) 0", background: "linear-gradient(180deg, #080808 0%, #060400 60%, #080808 100%)", overflow: "hidden" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.9 }}
          style={{ textAlign: "center", marginBottom: "clamp(2rem, 5vw, 4rem)", padding: "0 1rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ height: 1, width: 40, background: "linear-gradient(90deg, transparent, #d4af37)" }} />
            <span style={{ fontSize: "clamp(0.88rem, 2vw, 0.85rem)", color: "rgba(212,175,55,0.6)", letterSpacing: "0.4em", textTransform: "uppercase", fontFamily: "sans-serif" }}>Avec Toute Notre Affection</span>
            <div style={{ height: 1, width: 40, background: "linear-gradient(90deg, #d4af37, transparent)" }} />
          </div>

          <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1.5rem, 4vw, 2.4rem)", color: "transparent", background: "linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.06em", marginBottom: 14 }}>
            Hommage & Gratitudes
          </h2>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <div style={{ height: 1, width: 50, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5))" }} />
            <span style={{ color: "rgba(212,175,55,0.4)", fontSize: "0.95rem" }}>◆</span>
            <div style={{ height: 2, width: 80, background: "linear-gradient(90deg, rgba(212,175,55,0.7), rgba(255,255,255,0.5), rgba(212,175,55,0.7))", borderRadius: 1 }} />
            <span style={{ color: "rgba(212,175,55,0.4)", fontSize: "0.95rem" }}>◆</span>
            <div style={{ height: 1, width: 50, background: "linear-gradient(90deg, rgba(212,175,55,0.5), transparent)" }} />
          </div>
        </motion.div>

        <SpeechIntro />

        <div style={{ marginBottom: 16 }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "clamp(0.92rem, 2vw, 0.92rem)", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(212,175,55,0.5)", marginBottom: 20 }}
          >
            ✦ Les Délices de la Fête ✦
          </motion.p>
          <GifSlider />
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@1,300;1,400&display=swap');`}</style>
    </section>
  );
};

export default HommageGratitudes;