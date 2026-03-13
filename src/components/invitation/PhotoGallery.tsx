/**
 * PhotoGallery.tsx
 * ✅ ZÉRO import statique d'image — supprime l'erreur de chargement
 * ✅ new URL(path, import.meta.url).href = méthode officielle Vite
 * ✅ useState hors du .map() → composant CarouselCard dédié
 * ✅ translateX en nombre pur (pas de string dans x Framer)
 * ✅ Police mobile augmentée · Responsive SE → grand écran
 */

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

// ── RÉSOLUTION D'IMAGE VIA VITE (new URL) ─────────────────────────────────────
// Aucun import statique → pas d'erreur de chargement de module
const img = (filename: string): string =>
  new URL(`../../assets/${filename}`, import.meta.url).href;

const PHOTOS = [
  { id: 0,  src: img("header5.png"), caption: "Maman Sylvie",        sub: "Notre étoile d'hier et d'aujourd'hui" },
  { id: 1,  src: img("header4.png"), caption: "Souvenirs Dorés",      sub: "Chaque instant gravé dans nos cœurs" },
  { id: 2,  src: img("header2.png"), caption: "La Force de Vivre",    sub: "50 ans de résilience et de beauté" },
  { id: 3,  src: img("18.jpeg"),     caption: "Force & Grâce",        sub: "La femme que tu es, le modèle que tu donnes" },
  { id: 4,  src: img("1.jpeg"),      caption: "Lumière Éternelle",    sub: "Ta grâce illumine chaque pièce" },
  { id: 5,  src: img("2.jpeg"),      caption: "Notre Refuge",         sub: "Dans tes bras, tout devient possible" },
  { id: 6,  src: img("3.jpeg"),      caption: "La Bénédiction",       sub: "Ta prière est notre plus bel héritage" },
  { id: 7,  src: img("4.jpeg"),      caption: "Joie Partagée",        sub: "Rire ensemble, notre plus grand bonheur" },
  { id: 8,  src: img("5.jpeg"),      caption: "Cinquante Printemps",  sub: "Et tant d'années encore à célébrer" },
  { id: 9,  src: img("7.jpeg"),      caption: "Famille & Amour",      sub: "Les liens que rien ne peut effacer" },
  { id: 10, src: img("6.jpeg"),      caption: "Pour Toujours",        sub: "Maman Sylvie, notre reine éternelle" },
  { id: 11, src: img("8.jpeg"),      caption: "Grâce Infinie",        sub: "Un sourire qui réchauffe l'âme" },
  { id: 12, src: img("9.jpeg"),      caption: "L'Héritage",           sub: "Des valeurs transmises avec amour" },
  { id: 13, src: img("10.jpeg"),     caption: "Instant Précieux",     sub: "Un moment figé dans l'éternité" },
  { id: 14, src: img("11.jpeg"),     caption: "Tendresse Pure",       sub: "L'amour maternel sans condition" },
  { id: 15, src: img("12.jpeg"),     caption: "Rayonnement",          sub: "Ta lumière guide nos pas" },
  { id: 16, src: img("13.jpeg"),     caption: "Douceur du Soir",      sub: "La paix que tu nous offres" },
  { id: 17, src: img("14.jpeg"),     caption: "Mémoire Vivante",      sub: "Chaque ride raconte une histoire" },
  { id: 18, src: img("15.jpeg"),     caption: "Joie de Vivre",        sub: "Ton rire est notre plus belle mélodie" },
  { id: 19, src: img("16.jpeg"),     caption: "Élégance Naturelle",   sub: "La beauté qui vient de l'intérieur" },
  { id: 20, src: img("17.jpeg"),     caption: "Racines & Ailes",      sub: "Tu nous as appris à nous envoler" },
  { id: 21, src: img("19.jpeg"),     caption: "Complicité",           sub: "Des secrets partagés, une confiance absolue" },
  { id: 22, src: img("20.jpeg"),     caption: "Fierté Maternelle",    sub: "Tes enfants sont ta plus belle œuvre" },
  { id: 23, src: img("21.jpeg"),     caption: "Sérénité",             sub: "La sagesse acquise au fil des années" },
  { id: 24, src: img("22.jpeg"),     caption: "Voyage de Vie",        sub: "Chaque étape a façonné la reine que tu es" },
  { id: 25, src: img("23.jpeg"),     caption: "Éclat d'Or",           sub: "50 ans qui brillent comme l'or pur" },
  { id: 26, src: img("24.jpeg"),     caption: "Bonheur Simple",       sub: "Les petits plaisirs qui font les grandes joies" },
  { id: 27, src: img("25.jpeg"),     caption: "Portrait de Reine",    sub: "Digne, belle, aimante — toi" },
  { id: 28, src: img("26.jpeg"),     caption: "Lien Sacré",           sub: "Entre mère et enfants, un amour éternel" },
  { id: 29, src: img("27.jpeg"),     caption: "Éternelle Jeunesse",   sub: "Ton âme reste jeune et lumineuse" },
  { id: 30, src: img("28.jpeg"),     caption: "Bénédiction Divine",   sub: "Un cadeau du ciel parmi nous" },
  { id: 31, src: img("29.jpeg"),     caption: "Cinquante Étoiles",    sub: "Une pour chaque année magnifique" },
  { id: 32, src: img("30.jpeg"),     caption: "L'Amour Incarné",      sub: "Maman, notre plus grand amour" },
  { id: 33, src: img("31.jpeg"),     caption: "Royauté",              sub: "Tu règnes sur nos cœurs pour toujours" },
  { id: 34, src: img("32.jpeg"),     caption: "Lumière du Foyer",     sub: "La flamme qui ne s'éteint jamais" },
  { id: 35, src: img("33.jpeg"),     caption: "Souvenir Précieux",    sub: "Un instant figé dans l'éternité" },
  { id: 36, src: img("34.jpeg"),     caption: "Beauté Rayonnante",    sub: "La grâce incarnée en toi" },
  { id: 37, src: img("header1.png"), caption: "Notre Étoile",         sub: "Maman Sylvie, notre plus bel amour" },
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
      <button onClick={onClose} style={{ position: "absolute", top: "clamp(12px,3vw,24px)", right: "clamp(12px,3vw,24px)", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(212,175,55,0.25)", borderRadius: "50%", width: "clamp(38px,6vw,50px)", height: "clamp(38px,6vw,50px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.7)", zIndex: 510 }}>
        <X size={18} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNav((index - 1 + photos.length) % photos.length); }} style={{ position: "absolute", left: "clamp(8px,2vw,20px)", top: "50%", transform: "translateY(-50%)", background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "50%", width: "clamp(38px,6vw,54px)", height: "clamp(38px,6vw,54px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#d4af37", zIndex: 510 }}>
        <ChevronLeft size={22} />
      </button>

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "clamp(280px, 85vw, 900px)", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
      >
        <img src={photo.src} alt={photo.caption} style={{ width: "100%", maxHeight: "72vh", objectFit: "contain", borderRadius: 14, border: "1px solid rgba(212,175,55,0.2)" }} />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1rem, 2.5vw, 1.3rem)", color: "#f0d98a", letterSpacing: "0.06em" }}>{photo.caption}</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)", fontStyle: "italic", color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{photo.sub}</p>
          <p style={{ fontFamily: "sans-serif", fontSize: "clamp(0.8rem, 1.5vw, 0.75rem)", color: "rgba(212,175,55,0.35)", letterSpacing: "0.3em", marginTop: 8 }}>{index + 1} / {photos.length}</p>
        </div>
      </motion.div>

      <button onClick={(e) => { e.stopPropagation(); onNav((index + 1) % photos.length); }} style={{ position: "absolute", right: "clamp(8px,2vw,20px)", top: "50%", transform: "translateY(-50%)", background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "50%", width: "clamp(38px,6vw,54px)", height: "clamp(38px,6vw,54px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#d4af37", zIndex: 510 }}>
        <ChevronRight size={22} />
      </button>
    </motion.div>
  );
};

/* ── CAROUSEL CARD — composant dédié (useState hors du .map()) ────── */
interface CarouselCardProps {
  photo: Photo;
  offset: number;
  onOpenLightbox: () => void;
  onPrev: () => void;
  onNext: () => void;
}

// Valeurs px numériques pures pour Framer Motion (pas de string CSS)
const TX_ABS: Record<number, number> = { 0: 0, 1: 210, 2: 370 };

const CarouselCard = ({ photo, offset, onOpenLightbox, onPrev, onNext }: CarouselCardProps) => {
  const [isHov, setIsHov] = useState(false);
  const isCenter = offset === 0;
  const abs    = Math.abs(offset);
  const scale  = isCenter ? 1 : abs === 1 ? 0.84 : 0.68;
  const zIndex = isCenter ? 10 : abs === 1 ? 6 : 2;
  const opacity = isCenter ? 1 : abs === 1 ? 0.65 : 0.3;
  const tx     = offset < 0 ? -TX_ABS[abs] : TX_ABS[abs];

  return (
    <motion.div
      animate={{ scale, opacity, x: tx }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => isCenter ? onOpenLightbox() : (offset < 0 ? onPrev() : onNext())}
      onMouseEnter={() => setIsHov(true)}
      onMouseLeave={() => setIsHov(false)}
      style={{
        position: "absolute",
        width:  isCenter ? "clamp(150px, 36vw, 340px)" : "clamp(110px, 28vw, 255px)",
        height: isCenter ? "clamp(190px, 42vw, 400px)" : "clamp(145px, 32vw, 310px)",
        zIndex, cursor: isCenter ? "zoom-in" : "pointer",
        borderRadius: "clamp(12px, 2vw, 20px)", overflow: "hidden",
        border: isCenter ? "1px solid rgba(212,175,55,0.4)" : "1px solid rgba(212,175,55,0.1)",
        boxShadow: isCenter
          ? "0 0 40px rgba(212,175,55,0.15), 0 20px 60px rgba(0,0,0,0.6)"
          : "0 8px 24px rgba(0,0,0,0.4)",
      }}
    >
      <img
        src={photo.src}
        alt={photo.caption}
        loading={abs <= 1 ? "eager" : "lazy"}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease", transform: isHov && isCenter ? "scale(1.04)" : "scale(1)" }}
      />

      {isCenter && (
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }}>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(0.9rem, 2vw, 1.5rem)" }}>
            <p style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(0.9rem, 2vw, 1.05rem)", color: "#f0d98a", marginBottom: 3, letterSpacing: "0.04em" }}>{photo.caption}</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(0.88rem, 1.8vw, 1rem)", fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}>{photo.sub}</p>
          </div>
        </div>
      )}

      {isCenter && isHov && (
        <div style={{ position: "absolute", top: "clamp(8px,2vw,12px)", right: "clamp(8px,2vw,12px)", width: "clamp(30px,5vw,44px)", height: "clamp(30px,5vw,44px)", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(212,175,55,0.35)", borderRadius: "50%", zIndex: 4, display: "flex", alignItems: "center", justifyContent: "center", color: "#d4af37" }}>
          <ZoomIn size={15} />
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
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(1rem, 3vw, 2rem) 0", height: "clamp(250px, 52vw, 480px)", overflow: "hidden" }}>

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

      {/* Pagination dots */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
        <button onClick={prev} style={{ background: "none", border: "none", color: "rgba(212,175,55,0.5)", cursor: "pointer", fontSize: "1rem", padding: "2px 6px" }}>‹</button>
        <span style={{ fontFamily: "sans-serif", fontSize: "clamp(0.8rem, 1.5vw, 0.75rem)", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(212,175,55,0.45)" }}>
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

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.9 }}
            style={{ textAlign: "center", marginBottom: "clamp(1.5rem, 4vw, 3.5rem)" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(8px,2vw,16px)", marginBottom: "clamp(0.8rem,2.5vw,1.8rem)" }}>
              <div style={{ height: 1, width: "clamp(20px,6vw,60px)", background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5))" }} />
              <span style={{ color: "rgba(212,175,55,0.5)", fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>✦</span>
              <div style={{ height: 1, width: "clamp(20px,6vw,60px)", background: "linear-gradient(90deg, rgba(212,175,55,0.5), transparent)" }} />
            </div>
            <p style={{ fontFamily: "sans-serif", fontSize: "clamp(0.85rem, 1.8vw, 0.82rem)", letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(212,175,55,0.5)", marginBottom: "clamp(0.5rem,1.5vw,1rem)" }}>
              Instants Précieux
            </p>
            <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1.6rem, 4.5vw, 3.4rem)", color: "transparent", background: "linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fcf6ba, #bf953f)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.06em", lineHeight: 1.2, marginBottom: "clamp(0.5rem,1.5vw,1rem)" }}>
              Album de Famille
            </h2>
            <div style={{ height: 1, width: "clamp(40px,12vw,90px)", background: "linear-gradient(90deg, transparent, #d4af37, transparent)", margin: "0 auto clamp(0.5rem,1.5vw,1rem)" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.05rem, 2.5vw, 1.2rem)", fontStyle: "italic", color: "rgba(255,255,255,0.3)" }}>
              "Chaque photo est un souvenir qui ne s'efface jamais."
            </p>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Carousel photos={PHOTOS} onOpenLightbox={openLightbox} />
          </motion.div>

          {/* Footer count */}
          <motion.div
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{ marginTop: "clamp(2rem,5vw,3.5rem)", display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(8px,2vw,16px)" }}
          >
            <div style={{ height: 1, width: "clamp(20px,6vw,60px)", background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.35))" }} />
            <span style={{ fontFamily: "sans-serif", fontSize: "clamp(0.82rem, 1.5vw, 0.78rem)", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(212,175,55,0.3)" }}>
              {PHOTOS.length} souvenirs
            </span>
            <div style={{ height: 1, width: "clamp(20px,6vw,60px)", background: "linear-gradient(90deg, rgba(212,175,55,0.35), transparent)" }} />
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox photos={PHOTOS} index={lightbox} onClose={closeLightbox} onNav={setLightbox} />
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&display=swap');
      `}</style>
    </>
  );
};

export default PhotoGallery;