/**
 * PhotoGallery.tsx — OPTIMISÉ PERFORMANCE
 * ✅ Toutes les photos dans l'ordre demandé
 * ✅ CORRIGÉ : useState sorti du .map() → composant CarouselCard dédié
 * ✅ CORRIGÉ : translateX en nombre pur (pas de string clamp dans x)
 * ✅ Police augmentée sur mobile · Responsive SE → écran géant
 */

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

import header5 from "@/assets/header5.png";
import header4 from "@/assets/header4.png";
import header2 from "@/assets/header2.png";
import img18   from "@/assets/18.jpeg";
import img1    from "@/assets/1.jpeg";
import img2    from "@/assets/2.jpeg";
import img3    from "@/assets/3.jpeg";
import img4    from "@/assets/4.jpeg";
import img5    from "@/assets/5.jpeg";
import img7    from "@/assets/7.jpeg";
import img6    from "@/assets/6.jpeg";
import img8    from "@/assets/8.jpeg";
import img9    from "@/assets/9.jpeg";
import img10   from "@/assets/10.jpeg";
import img11   from "@/assets/11.jpeg";
import img12   from "@/assets/12.jpeg";
import img13   from "@/assets/13.jpeg";
import img14   from "@/assets/14.jpeg";
import img15   from "@/assets/15.jpeg";
import img16   from "@/assets/16.jpeg";
import img17   from "@/assets/17.jpeg";
import img19   from "@/assets/19.jpeg";
import img20   from "@/assets/20.jpeg";
import img21   from "@/assets/21.jpeg";
import img22   from "@/assets/22.jpeg";
import img23   from "@/assets/23.jpeg";
import img24   from "@/assets/24.jpeg";
import img25   from "@/assets/25.jpeg";
import img26   from "@/assets/26.jpeg";
import img27   from "@/assets/27.jpeg";
import img28   from "@/assets/28.jpeg";
import img29   from "@/assets/29.jpeg";
import img30   from "@/assets/30.jpeg";
import img31   from "@/assets/31.jpeg";
import img32   from "@/assets/32.jpeg";
import img33   from "@/assets/33.jpeg";
import img34   from "@/assets/34.jpeg";
import header1 from "@/assets/header1.png";

const PHOTOS = [
  { id: 0,  src: header5, caption: "Maman Sylvie",           sub: "Notre étoile d'hier et d'aujourd'hui" },
  { id: 1,  src: header4, caption: "Souvenirs Dorés",         sub: "Chaque instant gravé dans nos cœurs" },
  { id: 2,  src: header2, caption: "La Force de Vivre",       sub: "50 ans de résilience et de beauté" },
  { id: 3,  src: img18,   caption: "Force & Grâce",           sub: "La femme que tu es, le modèle que tu donnes" },
  { id: 4,  src: img1,    caption: "Lumière Éternelle",       sub: "Ta grâce illumine chaque pièce" },
  { id: 5,  src: img2,    caption: "Notre Refuge",            sub: "Dans tes bras, tout devient possible" },
  { id: 6,  src: img3,    caption: "La Bénédiction",          sub: "Ta prière est notre plus bel héritage" },
  { id: 7,  src: img4,    caption: "Joie Partagée",           sub: "Rire ensemble, notre plus grand bonheur" },
  { id: 8,  src: img5,    caption: "Cinquante Printemps",     sub: "Et tant d'années encore à célébrer" },
  { id: 9,  src: img7,    caption: "Famille & Amour",         sub: "Les liens que rien ne peut effacer" },
  { id: 10, src: img6,    caption: "Pour Toujours",           sub: "Maman Sylvie, notre reine éternelle" },
  { id: 11, src: img8,    caption: "Grâce Infinie",           sub: "Un sourire qui réchauffe l'âme" },
  { id: 12, src: img9,    caption: "L'Héritage",              sub: "Des valeurs transmises avec amour" },
  { id: 13, src: img10,   caption: "Instant Précieux",        sub: "Un moment figé dans l'éternité" },
  { id: 14, src: img11,   caption: "Tendresse Pure",          sub: "L'amour maternel sans condition" },
  { id: 15, src: img12,   caption: "Rayonnement",             sub: "Ta lumière guide nos pas" },
  { id: 16, src: img13,   caption: "Douceur du Soir",         sub: "La paix que tu nous offres" },
  { id: 17, src: img14,   caption: "Mémoire Vivante",         sub: "Chaque ride raconte une histoire" },
  { id: 18, src: img15,   caption: "Joie de Vivre",           sub: "Ton rire est notre plus belle mélodie" },
  { id: 19, src: img16,   caption: "Élégance Naturelle",      sub: "La beauté qui vient de l'intérieur" },
  { id: 20, src: img17,   caption: "Racines & Ailes",         sub: "Tu nous as appris à nous envoler" },
  { id: 21, src: img19,   caption: "Complicité",              sub: "Des secrets partagés, une confiance absolue" },
  { id: 22, src: img20,   caption: "Fierté Maternelle",       sub: "Tes enfants sont ta plus belle œuvre" },
  { id: 23, src: img21,   caption: "Sérénité",                sub: "La sagesse acquise au fil des années" },
  { id: 24, src: img22,   caption: "Voyage de Vie",           sub: "Chaque étape a façonné la reine que tu es" },
  { id: 25, src: img23,   caption: "Éclat d'Or",              sub: "50 ans qui brillent comme l'or pur" },
  { id: 26, src: img24,   caption: "Bonheur Simple",          sub: "Les petits plaisirs qui font les grandes joies" },
  { id: 27, src: img25,   caption: "Portrait de Reine",       sub: "Digne, belle, aimante — toi" },
  { id: 28, src: img26,   caption: "Lien Sacré",              sub: "Entre mère et enfants, un amour éternel" },
  { id: 29, src: img27,   caption: "Éternelle Jeunesse",      sub: "Ton âme reste jeune et lumineuse" },
  { id: 30, src: img28,   caption: "Bénédiction Divine",      sub: "Un cadeau du ciel parmi nous" },
  { id: 31, src: img29,   caption: "Cinquante Étoiles",       sub: "Une pour chaque année magnifique" },
  { id: 32, src: img30,   caption: "L'Amour Incarné",         sub: "Maman, notre plus grand amour" },
  { id: 33, src: img31,   caption: "Royauté",                 sub: "Tu règnes sur nos cœurs pour toujours" },
  { id: 34, src: img32,   caption: "Lumière du Foyer",        sub: "La flamme qui ne s'éteint jamais" },
  { id: 35, src: img33,   caption: "Souvenir Précieux",       sub: "Un instant figé dans l'éternité" },
  { id: 36, src: img34,   caption: "Beauté Rayonnante",       sub: "La grâce incarnée en toi" },
  { id: 37, src: header1, caption: "Notre Étoile",            sub: "Maman Sylvie, notre plus bel amour" },
];

type Photo = typeof PHOTOS[number];

/* ── LIGHTBOX ─────────────────────────────────────────────────────── */
const Lightbox = ({ photos, index, onClose, onNav }: {
  photos: Photo[]; index: number; onClose: () => void; onNav: (i: number) => void;
}) => {
  const photo = photos[index];
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  onNav((index - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") onNav((index + 1) % photos.length);
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onNav, onClose, photos.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }} onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.97)", backdropFilter: "blur(24px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(1rem, 4vw, 3rem)" }}
    >
      <button onClick={onClose} style={{ position: "absolute", top: "clamp(12px,3vw,24px)", right: "clamp(12px,3vw,24px)", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(212,175,55,0.25)", borderRadius: "50%", width: "clamp(38px,6vw,50px)", height: "clamp(38px,6vw,50px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.7)", zIndex: 510 }}><X size={18} /></button>
      <button onClick={(e) => { e.stopPropagation(); onNav((index - 1 + photos.length) % photos.length); }} style={{ position: "absolute", left: "clamp(8px,2vw,20px)", top: "50%", transform: "translateY(-50%)", background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "50%", width: "clamp(38px,6vw,54px)", height: "clamp(38px,6vw,54px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#d4af37", zIndex: 510 }}><ChevronLeft size={22} /></button>

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "clamp(280px, 85vw, 860px)", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
      >
        <img src={photo.src} alt={photo.caption} style={{ width: "100%", maxHeight: "70vh", objectFit: "contain", borderRadius: 14, border: "1px solid rgba(212,175,55,0.2)" }} />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "#f0d98a", letterSpacing: "0.06em" }}>{photo.caption}</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(0.95rem, 2.2vw, 1.05rem)", fontStyle: "italic", color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{photo.sub}</p>
          <p style={{ fontFamily: "sans-serif", fontSize: "clamp(0.78rem, 1.5vw, 0.72rem)", color: "rgba(212,175,55,0.35)", letterSpacing: "0.3em", marginTop: 8 }}>{index + 1} / {photos.length}</p>
        </div>
      </motion.div>

      <button onClick={(e) => { e.stopPropagation(); onNav((index + 1) % photos.length); }} style={{ position: "absolute", right: "clamp(8px,2vw,20px)", top: "50%", transform: "translateY(-50%)", background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "50%", width: "clamp(38px,6vw,54px)", height: "clamp(38px,6vw,54px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#d4af37", zIndex: 510 }}><ChevronRight size={22} /></button>
    </motion.div>
  );
};

/* ── CAROUSEL CARD — composant dédié (résout hook-in-map) ─────────── */
interface CarouselCardProps {
  photo: Photo;
  offset: number;   // -2 | -1 | 0 | 1 | 2
  onOpenLightbox: () => void;
  onPrev: () => void;
  onNext: () => void;
}

// translateX en px numériques uniquement (résout l'erreur TS2363)
const TX_ABS: Record<number, number> = { 0: 0, 1: 205, 2: 365 };

const CarouselCard = ({ photo, offset, onOpenLightbox, onPrev, onNext }: CarouselCardProps) => {
  const [isHov, setIsHov] = useState(false);
  const isCenter = offset === 0;
  const abs = Math.abs(offset);
  const scale   = isCenter ? 1 : abs === 1 ? 0.84 : 0.68;
  const zIndex  = isCenter ? 10 : abs === 1 ? 6 : 2;
  const opacity = isCenter ? 1 : abs === 1 ? 0.65 : 0.3;
  const tx      = offset < 0 ? -TX_ABS[abs] : TX_ABS[abs]; // toujours un nombre

  return (
    <motion.div
      animate={{ scale, opacity, x: tx }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => isCenter ? onOpenLightbox() : (offset < 0 ? onPrev() : onNext())}
      onMouseEnter={() => setIsHov(true)}
      onMouseLeave={() => setIsHov(false)}
      style={{
        position: "absolute",
        width:  isCenter ? "clamp(140px, 36vw, 320px)" : "clamp(110px, 28vw, 240px)",
        height: isCenter ? "clamp(180px, 40vw, 380px)" : "clamp(140px, 30vw, 290px)",
        zIndex, cursor: isCenter ? "zoom-in" : "pointer",
        borderRadius: "clamp(12px, 2vw, 20px)", overflow: "hidden",
        border: isCenter ? "1px solid rgba(212,175,55,0.4)" : "1px solid rgba(212,175,55,0.1)",
        boxShadow: isCenter
          ? "0 0 40px rgba(212,175,55,0.15), 0 20px 60px rgba(0,0,0,0.6)"
          : "0 8px 24px rgba(0,0,0,0.4)",
      }}
    >
      <img
        src={photo.src} alt={photo.caption}
        loading={abs <= 1 ? "eager" : "lazy"}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease", transform: isHov && isCenter ? "scale(1.04)" : "scale(1)" }}
      />

      {isCenter && (
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }}>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(0.8rem, 2vw, 1.4rem)" }}>
            <p style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(0.82rem, 2vw, 1rem)", color: "#f0d98a", marginBottom: 2, letterSpacing: "0.04em" }}>{photo.caption}</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(0.85rem, 1.8vw, 0.92rem)", fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}>{photo.sub}</p>
          </div>
        </div>
      )}

      {isCenter && isHov && (
        <div style={{ position: "absolute", top: "clamp(8px,2vw,12px)", right: "clamp(8px,2vw,12px)", width: "clamp(30px,5vw,42px)", height: "clamp(30px,5vw,42px)", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(212,175,55,0.35)", borderRadius: "50%", zIndex: 4, display: "flex", alignItems: "center", justifyContent: "center", color: "#d4af37" }}>
          <ZoomIn size={14} />
        </div>
      )}

      {isCenter && [
        { top: 8,  left: 8,  borderWidth: "1px 0 0 1px" },
        { top: 8,  right: 8, borderWidth: "1px 1px 0 0" },
        { bottom: 8, left: 8,  borderWidth: "0 0 1px 1px" },
        { bottom: 8, right: 8, borderWidth: "0 1px 1px 0" },
      ].map((pos, i) => (
        <div key={i} style={{ position: "absolute", width: 12, height: 12, borderStyle: "solid", borderColor: "rgba(212,175,55,0.55)", borderWidth: pos.borderWidth, zIndex: 4, ...pos }} />
      ))}
    </motion.div>
  );
};

/* ── CAROUSEL ─────────────────────────────────────────────────────── */
const Carousel = ({ photos, onOpenLightbox }: { photos: Photo[]; onOpenLightbox: (i: number) => void }) => {
  const [current, setCurrent] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAuto  = useCallback(() => { if (autoRef.current) clearInterval(autoRef.current); }, []);
  const startAuto = useCallback(() => {
    autoRef.current = setInterval(() => setCurrent(c => (c + 1) % photos.length), 5000);
  }, [photos.length]);

  useEffect(() => { startAuto(); return stopAuto; }, [startAuto, stopAuto]);

  const next = useCallback(() => { setCurrent(c => (c + 1) % photos.length); stopAuto(); startAuto(); }, [photos.length, stopAuto, startAuto]);
  const prev = useCallback(() => { setCurrent(c => (c - 1 + photos.length) % photos.length); stopAuto(); startAuto(); }, [photos.length, stopAuto, startAuto]);

  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(1rem, 3vw, 2rem) 0", height: "clamp(240px, 50vw, 460px)", overflow: "hidden" }}>

      {[-2, -1, 0, 1, 2].map((offset) => {
        const idx = (current + offset + photos.length) % photos.length;
        return (
          <CarouselCard
            key={`${current}-${offset}`}
            photo={photos[idx]}
            offset={offset}
            onOpenLightbox={() => onOpenLightbox(idx)}
            onPrev={prev}
            onNext={next}
          />
        );
      })}

      <button onClick={prev} style={{ position: "absolute", left: "clamp(0px,1vw,8px)", top: "50%", transform: "translateY(-50%)", background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "50%", width: "clamp(38px,5vw,54px)", height: "clamp(38px,5vw,54px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#d4af37", zIndex: 20, backdropFilter: "blur(8px)" }}>
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} style={{ position: "absolute", right: "clamp(0px,1vw,8px)", top: "50%", transform: "translateY(-50%)", background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "50%", width: "clamp(38px,5vw,54px)", height: "clamp(38px,5vw,54px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#d4af37", zIndex: 20, backdropFilter: "blur(8px)" }}>
        <ChevronRight size={20} />
      </button>

      {/* Pagination */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
        <button onClick={prev} style={{ background: "none", border: "none", color: "rgba(212,175,55,0.5)", cursor: "pointer", fontSize: "1rem", padding: "2px 6px" }}>‹</button>
        <span style={{ fontFamily: "sans-serif", fontSize: "clamp(0.78rem, 1.5vw, 0.72rem)", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(212,175,55,0.45)" }}>
          {current + 1} / {photos.length}
        </span>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {Array.from({ length: Math.min(7, photos.length) }, (_, i) => {
            const dotIdx = Math.floor(current / 7) * 7 + i;
            if (dotIdx >= photos.length) return null;
            return (
              <button key={dotIdx} onClick={() => { setCurrent(dotIdx); stopAuto(); startAuto(); }}
                style={{ width: dotIdx === current ? 16 : 6, height: 6, borderRadius: 3, backgroundColor: dotIdx === current ? "#d4af37" : "rgba(212,175,55,0.25)", border: "none", cursor: "pointer", padding: 0, transition: "width 0.3s, background-color 0.3s" }}
              />
            );
          })}
        </div>
        <button onClick={next} style={{ background: "none", border: "none", color: "rgba(212,175,55,0.5)", cursor: "pointer", fontSize: "1rem", padding: "2px 6px" }}>›</button>
      </div>
    </div>
  );
};

/* ── MAIN GALLERY ─────────────────────────────────────────────────── */
const PhotoGallery = () => {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, amount: 0.05 });
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox  = useCallback((i: number) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <>
      <section ref={sectionRef} style={{ padding: "clamp(3rem, 8vw, 7rem) 0", background: "linear-gradient(180deg, #080808 0%, #050505 100%)", borderTop: "1px solid rgba(255,255,255,0.04)", overflow: "hidden" }}>
        <div style={{ maxWidth: "clamp(320px, 98vw, 1600px)", margin: "0 auto", padding: "0 clamp(0.5rem, 2vw, 2rem)" }}>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.9 }}
            style={{ textAlign: "center", marginBottom: "clamp(1.5rem, 4vw, 3.5rem)" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(8px,2vw,16px)", marginBottom: "clamp(0.8rem,2.5vw,1.8rem)" }}>
              <div style={{ height: 1, width: "clamp(20px,6vw,60px)", background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5))" }} />
              <span style={{ color: "rgba(212,175,55,0.5)", fontSize: "clamp(0.88rem, 2vw, 0.9rem)" }}>✦</span>
              <div style={{ height: 1, width: "clamp(20px,6vw,60px)", background: "linear-gradient(90deg, rgba(212,175,55,0.5), transparent)" }} />
            </div>
            <p style={{ fontFamily: "sans-serif", fontSize: "clamp(0.82rem, 1.8vw, 0.78rem)", letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(212,175,55,0.5)", marginBottom: "clamp(0.5rem,1.5vw,1rem)" }}>Instants Précieux</p>
            <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1.5rem, 4.5vw, 3.2rem)", color: "transparent", background: "linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fcf6ba, #bf953f)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.06em", lineHeight: 1.2, marginBottom: "clamp(0.5rem,1.5vw,1rem)" }}>Album de Famille</h2>
            <div style={{ height: 1, width: "clamp(40px,12vw,90px)", background: "linear-gradient(90deg, transparent, #d4af37, transparent)", margin: "0 auto clamp(0.5rem,1.5vw,1rem)" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1rem, 2.5vw, 1.1rem)", fontStyle: "italic", color: "rgba(255,255,255,0.3)" }}>
              "Chaque photo est un souvenir qui ne s'efface jamais."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Carousel photos={PHOTOS} onOpenLightbox={openLightbox} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{ marginTop: "clamp(2rem,5vw,3.5rem)", display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(8px,2vw,16px)" }}
          >
            <div style={{ height: 1, width: "clamp(20px,6vw,60px)", background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.35))" }} />
            <span style={{ fontFamily: "sans-serif", fontSize: "clamp(0.82rem, 1.5vw, 0.75rem)", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(212,175,55,0.3)" }}>{PHOTOS.length} souvenirs</span>
            <div style={{ height: 1, width: "clamp(20px,6vw,60px)", background: "linear-gradient(90deg, rgba(212,175,55,0.35), transparent)" }} />
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox photos={PHOTOS} index={lightbox} onClose={closeLightbox} onNav={setLightbox} />
        )}
      </AnimatePresence>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&display=swap');`}</style>
    </>
  );
};

export default PhotoGallery;