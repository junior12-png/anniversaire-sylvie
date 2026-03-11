/**
 * PhotoGallery.tsx — Galerie Anniversaire Maman Sylvie
 * ✅ Carousel/Slider luxueux prenant toutes les 33 photos
 * ✅ Design doré, lightbox, navigation au clavier & tactile
 * ✅ Toutes les images s'adaptent au carousel
 */

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

import img1  from "@/assets/1.jpeg";
import img2  from "@/assets/2.jpeg";
import img3  from "@/assets/3.jpeg";
import img4  from "@/assets/4.jpeg";
import img5  from "@/assets/5.jpeg";
import img6  from "@/assets/6.jpeg";
import img7  from "@/assets/7.jpeg";
import img8  from "@/assets/8.jpeg";
import img9  from "@/assets/9.jpeg";
import img10 from "@/assets/10.jpeg";
import img11 from "@/assets/11.jpeg";
import img12 from "@/assets/12.jpeg";
import img13 from "@/assets/13.jpeg";
import img14 from "@/assets/14.jpeg";
import img15 from "@/assets/15.jpeg";
import img16 from "@/assets/16.jpeg";
import img17 from "@/assets/17.jpeg";
import img18 from "@/assets/18.jpeg";
import img19 from "@/assets/19.jpeg";
import img20 from "@/assets/20.jpeg";
import img21 from "@/assets/21.jpeg";
import img22 from "@/assets/22.jpeg";
import img23 from "@/assets/23.jpeg";
import img24 from "@/assets/24.jpeg";
import img25 from "@/assets/25.jpeg";
import img26 from "@/assets/26.jpeg";
import img27 from "@/assets/27.jpeg";
import img28 from "@/assets/28.jpeg";
import img29 from "@/assets/29.jpeg";
import img30 from "@/assets/30.jpeg";
import img31 from "@/assets/31.jpeg";
import img32 from "@/assets/32.jpeg";
import img33 from "@/assets/33.jpeg";

/* ── PHOTOS DATA ──────────────────────────────────────────────────── */
const PHOTOS = [
  { id: 0,  src: img1,  caption: "Maman Sylvie",           sub: "Notre étoile d'hier et d'aujourd'hui" },
  { id: 1,  src: img2,  caption: "Souvenirs Dorés",         sub: "Chaque instant gravé dans nos cœurs" },
  { id: 2,  src: img3,  caption: "La Force de Vivre",       sub: "50 ans de résilience et de beauté" },
  { id: 3,  src: img4,  caption: "Lumière Éternelle",       sub: "Ta grâce illumine chaque pièce" },
  { id: 4,  src: img5,  caption: "Notre Refuge",            sub: "Dans tes bras, tout devient possible" },
  { id: 5,  src: img6,  caption: "La Bénédiction",          sub: "Ta prière est notre plus bel héritage" },
  { id: 6,  src: img7,  caption: "Joie Partagée",           sub: "Rire ensemble, notre plus grand bonheur" },
  { id: 7,  src: img8,  caption: "Cinquante Printemps",     sub: "Et tant d'années encore à célébrer" },
  { id: 8,  src: img9,  caption: "Famille & Amour",         sub: "Les liens que rien ne peut effacer" },
  { id: 9,  src: img10, caption: "Pour Toujours",           sub: "Maman Sylvie, notre reine éternelle" },
  { id: 10, src: img11, caption: "Grâce Infinie",           sub: "Un sourire qui réchauffe l'âme" },
  { id: 11, src: img12, caption: "L'Héritage",              sub: "Des valeurs transmises avec amour" },
  { id: 12, src: img13, caption: "Instant Précieux",        sub: "Un moment figé dans l'éternité" },
  { id: 13, src: img14, caption: "Tendresse Pure",          sub: "L'amour maternel sans condition" },
  { id: 14, src: img15, caption: "Rayonnement",             sub: "Ta lumière guide nos pas" },
  { id: 15, src: img16, caption: "Douceur du Soir",         sub: "La paix que tu nous offres" },
  { id: 16, src: img17, caption: "Mémoire Vivante",         sub: "Chaque ride raconte une histoire" },
  { id: 17, src: img18, caption: "Force & Grâce",           sub: "La femme que tu es, le modèle que tu donnes" },
  { id: 18, src: img19, caption: "Joie de Vivre",           sub: "Ton rire est notre plus belle mélodie" },
  { id: 19, src: img20, caption: "Élégance Naturelle",      sub: "La beauté qui vient de l'intérieur" },
  { id: 20, src: img21, caption: "Racines & Ailes",         sub: "Tu nous as appris à nous envoler" },
  { id: 21, src: img22, caption: "Complicité",              sub: "Des secrets partagés, une confiance absolue" },
  { id: 22, src: img23, caption: "Fierté Maternelle",       sub: "Tes enfants sont ta plus belle œuvre" },
  { id: 23, src: img24, caption: "Sérénité",                sub: "La sagesse acquise au fil des années" },
  { id: 24, src: img25, caption: "Voyage de Vie",           sub: "Chaque étape a façonné la reine que tu es" },
  { id: 25, src: img26, caption: "Éclat d'Or",              sub: "50 ans qui brillent comme l'or pur" },
  { id: 26, src: img27, caption: "Bonheur Simple",          sub: "Les petits plaisirs qui font les grandes joies" },
  { id: 27, src: img28, caption: "Portrait de Reine",       sub: "Digne, belle, aimante — toi" },
  { id: 28, src: img29, caption: "Lien Sacré",              sub: "Entre mère et enfants, un amour éternel" },
  { id: 29, src: img30, caption: "Éternelle Jeunesse",      sub: "Ton âme reste jeune et lumineuse" },
  { id: 30, src: img31, caption: "Bénédiction Divine",      sub: "Un cadeau du ciel parmi nous" },
  { id: 31, src: img32, caption: "Cinquante Étoiles",       sub: "Une pour chaque année magnifique" },
  { id: 32, src: img33, caption: "L'Amour Incarné",         sub: "Maman, notre plus grand amour" },
];

/* ── LIGHTBOX ─────────────────────────────────────────────────────── */
const Lightbox = ({ photos, index, onClose, onNav }: {
  photos: typeof PHOTOS;
  index: number;
  onClose: () => void;
  onNav: (i: number) => void;
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 500,
        background: "rgba(0,0,0,0.97)",
        backdropFilter: "blur(24px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(1rem, 4vw, 3rem)",
      }}
    >
      {/* Close */}
      <button onClick={onClose} style={{
        position: "absolute", top: "clamp(12px,3vw,24px)", right: "clamp(12px,3vw,24px)",
        background: "rgba(255,255,255,0.07)", border: "1px solid rgba(212,175,55,0.25)",
        borderRadius: "50%", width: "clamp(36px,6vw,48px)", height: "clamp(36px,6vw,48px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", color: "rgba(255,255,255,0.7)", zIndex: 510,
      }}><X size={18} /></button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onNav((index - 1 + photos.length) % photos.length); }}
        style={{
          position: "absolute", left: "clamp(8px,2vw,20px)", top: "50%", transform: "translateY(-50%)",
          background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)",
          borderRadius: "50%", width: "clamp(36px,6vw,52px)", height: "clamp(36px,6vw,52px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#d4af37", zIndex: 510,
        }}
      ><ChevronLeft size={22} /></button>

      {/* Image */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          maxWidth: "min(90vw, 900px)", maxHeight: "90vh",
        }}
      >
        <div style={{
          position: "relative", borderRadius: "clamp(8px,2vw,16px)", overflow: "hidden",
          border: "1px solid rgba(212,175,55,0.25)",
          boxShadow: "0 0 60px rgba(212,175,55,0.12), 0 20px 60px rgba(0,0,0,0.8)",
        }}>
          {[
            { top: 10, left: 10, borderWidth: "1px 0 0 1px" },
            { top: 10, right: 10, borderWidth: "1px 1px 0 0" },
            { bottom: 10, left: 10, borderWidth: "0 0 1px 1px" },
            { bottom: 10, right: 10, borderWidth: "0 1px 1px 0" },
          ].map((pos, i) => (
            <div key={i} style={{
              position: "absolute", width: 16, height: 16,
              borderStyle: "solid", borderColor: "rgba(212,175,55,0.5)",
              borderWidth: pos.borderWidth, zIndex: 2, ...pos,
            }} />
          ))}
          <img
            src={photo.src}
            alt={photo.caption}
            style={{
              maxHeight: "70vh", maxWidth: "min(85vw, 860px)",
              objectFit: "contain", display: "block",
            }}
          />
        </div>
        <div style={{ marginTop: "clamp(0.8rem,2vw,1.5rem)", textAlign: "center" }}>
          <p style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(0.7rem,2vw,1.1rem)",
            color: "#d4af37", letterSpacing: "0.06em",
          }}>{photo.caption}</p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(0.65rem,1.6vw,0.9rem)",
            color: "rgba(255,255,255,0.45)", fontStyle: "italic", marginTop: 4,
          }}>{photo.sub}</p>
          <p style={{
            fontFamily: "sans-serif", fontSize: "clamp(0.4rem,1vw,0.55rem)",
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)", marginTop: 8,
          }}>{index + 1} / {photos.length}</p>
        </div>
      </motion.div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNav((index + 1) % photos.length); }}
        style={{
          position: "absolute", right: "clamp(8px,2vw,20px)", top: "50%", transform: "translateY(-50%)",
          background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)",
          borderRadius: "50%", width: "clamp(36px,6vw,52px)", height: "clamp(36px,6vw,52px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#d4af37", zIndex: 510,
        }}
      ><ChevronRight size={22} /></button>
    </motion.div>
  );
};

/* ── CAROUSEL ─────────────────────────────────────────────────────── */
const Carousel = ({ photos, onOpenLightbox }: {
  photos: typeof PHOTOS;
  onOpenLightbox: (i: number) => void;
}) => {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Visible cards per viewport
  const getVisible = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth >= 1200) return 5;
    if (window.innerWidth >= 900)  return 4;
    if (window.innerWidth >= 600)  return 3;
    return 2;
  };
  const [visible, setVisible] = useState(getVisible);

  useEffect(() => {
    const onResize = () => setVisible(getVisible());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Auto-play
  const startAuto = useCallback(() => {
    autoRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % photos.length);
    }, 3500);
  }, [photos.length]);

  const stopAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
  }, []);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  const prev = () => { setCurrent(c => (c - 1 + photos.length) % photos.length); stopAuto(); startAuto(); };
  const next = () => { setCurrent(c => (c + 1) % photos.length); stopAuto(); startAuto(); };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Drag / swipe
  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(x);
    stopAuto();
  };
  const onDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const x = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX - x;
   if (Math.abs(diff) > 40) {
    if (diff > 0) {
      next();
    } else {
      prev();
    }
  }
  };

  // Compute which indices are visible around `current`
  const getIndices = () => {
    const half = Math.floor(visible / 2);
    return Array.from({ length: visible }, (_, i) =>
      (current - half + i + photos.length) % photos.length
    );
  };

  const indices = getIndices();

  return (
    <div style={{ position: "relative", userSelect: "none" }}>
      {/* Track */}
      <div
        ref={trackRef}
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onMouseLeave={() => { if (isDragging) { setIsDragging(false); startAuto(); } }}
        onTouchStart={onDragStart}
        onTouchEnd={onDragEnd}
        style={{
          display: "flex",
          gap: "clamp(8px,1.5vw,18px)",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(1rem,3vw,2.5rem) 0",
          overflow: "hidden",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {indices.map((photoIdx, slot) => {
          const isCenter = slot === Math.floor(visible / 2);
          const distFromCenter = Math.abs(slot - Math.floor(visible / 2));
          const scale = isCenter ? 1 : Math.max(0.72, 1 - distFromCenter * 0.1);
          const opacity = isCenter ? 1 : Math.max(0.45, 1 - distFromCenter * 0.2);
          const photo = photos[photoIdx];
          const isHov = hovered === photoIdx;

          return (
            <motion.div
              key={`${photoIdx}-${slot}`}
              layout
              animate={{
                scale: isHov ? scale * 1.04 : scale,
                opacity,
                y: isCenter ? 0 : distFromCenter * 6,
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHovered(photoIdx)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                if (isCenter) {
                  onOpenLightbox(photoIdx);
                } else {
                  setCurrent(photoIdx);
                  stopAuto(); startAuto();
                }
              }}
              style={{
                flexShrink: 0,
                width: isCenter
                  ? "clamp(220px, 38vw, 480px)"
                  : `clamp(${120 - distFromCenter * 10}px, ${28 - distFromCenter * 4}vw, ${360 - distFromCenter * 60}px)`,
                aspectRatio: "3/4",
                borderRadius: "clamp(8px,2vw,14px)",
                overflow: "hidden",
                position: "relative",
                border: isCenter
                  ? "1px solid rgba(212,175,55,0.55)"
                  : "1px solid rgba(212,175,55,0.12)",
                boxShadow: isCenter
                  ? "0 0 50px rgba(212,175,55,0.18), 0 20px 50px rgba(0,0,0,0.7)"
                  : "0 4px 20px rgba(0,0,0,0.5)",
                cursor: isCenter ? "zoom-in" : "pointer",
                transition: "border-color 0.3s, box-shadow 0.3s",
                zIndex: isCenter ? 10 : Math.max(1, 5 - distFromCenter),
              }}
            >
              {/* Image */}
              <motion.img
                src={photo.src}
                alt={photo.caption}
                animate={{ scale: isHov ? 1.06 : 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", display: "block",
                  pointerEvents: "none",
                }}
              />

              {/* Gold shimmer on hover */}
              {isHov && (
                <motion.div
                  initial={{ x: "-120%" }}
                  animate={{ x: "180%" }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                  style={{
                    position: "absolute", top: 0, left: 0,
                    width: "55%", height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,245,200,0.2), transparent)",
                    transform: "skewX(-12deg)", pointerEvents: "none", zIndex: 2,
                  }}
                />
              )}

              {/* Caption overlay — only center */}
              {isCenter && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: isHov ? 1 : 0.85, y: 0 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "clamp(0.8rem,2.5vw,1.6rem)",
                    background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)",
                    zIndex: 3,
                  }}
                >
                  <div style={{ height: 1, width: "clamp(18px,4vw,28px)", background: "#d4af37", marginBottom: 6 }} />
                  <p style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: "clamp(0.55rem,1.6vw,0.9rem)",
                    color: "#d4af37", letterSpacing: "0.05em", marginBottom: 3,
                  }}>{photo.caption}</p>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(0.5rem,1.3vw,0.75rem)",
                    color: "rgba(255,255,255,0.55)", fontStyle: "italic",
                  }}>{photo.sub}</p>
                </motion.div>
              )}

              {/* Zoom icon on center hover */}
              {isCenter && (
                <motion.div
                  animate={{ opacity: isHov ? 1 : 0, scale: isHov ? 1 : 0.7 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute", top: "clamp(8px,2vw,12px)", right: "clamp(8px,2vw,12px)",
                    width: "clamp(28px,5vw,40px)", height: "clamp(28px,5vw,40px)",
                    background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
                    border: "1px solid rgba(212,175,55,0.35)",
                    borderRadius: "50%", zIndex: 4,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#d4af37",
                  }}
                ><ZoomIn size={14} /></motion.div>
              )}

              {/* Corner ornaments — center only */}
              {isCenter && [
                { top: 8, left: 8, borderWidth: "1px 0 0 1px" },
                { top: 8, right: 8, borderWidth: "1px 1px 0 0" },
                { bottom: 8, left: 8, borderWidth: "0 0 1px 1px" },
                { bottom: 8, right: 8, borderWidth: "0 1px 1px 0" },
              ].map((pos, i) => (
                <div key={i} style={{
                  position: "absolute", width: 12, height: 12,
                  borderStyle: "solid", borderColor: "rgba(212,175,55,0.55)",
                  borderWidth: pos.borderWidth, zIndex: 4, ...pos,
                }} />
              ))}
            </motion.div>
          );
        })}
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={prev}
        style={{
          position: "absolute", left: "clamp(0px,1vw,8px)", top: "50%", transform: "translateY(-50%)",
          background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.3)",
          borderRadius: "50%", width: "clamp(36px,5vw,52px)", height: "clamp(36px,5vw,52px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#d4af37", zIndex: 20,
          backdropFilter: "blur(8px)",
          transition: "background 0.2s, border-color 0.2s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.18)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.08)"; }}
      ><ChevronLeft size={20} /></button>

      <button
        onClick={next}
        style={{
          position: "absolute", right: "clamp(0px,1vw,8px)", top: "50%", transform: "translateY(-50%)",
          background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.3)",
          borderRadius: "50%", width: "clamp(36px,5vw,52px)", height: "clamp(36px,5vw,52px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#d4af37", zIndex: 20,
          backdropFilter: "blur(8px)",
          transition: "background 0.2s, border-color 0.2s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.18)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.08)"; }}
      ><ChevronRight size={20} /></button>

      {/* Dot indicators */}
      <div style={{
        display: "flex", justifyContent: "center",
        gap: "clamp(4px,1vw,8px)", marginTop: "clamp(0.8rem,2vw,1.5rem)",
        flexWrap: "wrap", padding: "0 clamp(1rem,3vw,3rem)",
      }}>
        {photos.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => { setCurrent(i); stopAuto(); startAuto(); }}
            animate={{
              width: i === current ? "clamp(20px,3vw,28px)" : "clamp(5px,1vw,7px)",
              background: i === current ? "#d4af37" : "rgba(212,175,55,0.25)",
            }}
            transition={{ duration: 0.35 }}
            style={{
              height: "clamp(5px,1vw,7px)",
              borderRadius: "4px",
              border: "none", padding: 0, cursor: "pointer",
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Counter */}
      <p style={{
        textAlign: "center",
        fontFamily: "sans-serif",
        fontSize: "clamp(0.4rem,1vw,0.52rem)",
        letterSpacing: "0.35em", textTransform: "uppercase",
        color: "rgba(212,175,55,0.35)",
        marginTop: "clamp(0.5rem,1.5vw,1rem)",
      }}>
        {current + 1} / {photos.length}
      </p>
    </div>
  );
};

/* ── MAIN GALLERY ─────────────────────────────────────────────────── */
const PhotoGallery = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.05 });
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox  = useCallback((i: number) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <>
      <section
        ref={sectionRef}
        style={{
          padding: "clamp(3rem, 8vw, 7rem) 0",
          background: "linear-gradient(180deg, #080808 0%, #050505 100%)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          overflow: "hidden",
        }}
      >
        <div style={{
          maxWidth: "clamp(320px, 98vw, 1600px)",
          margin: "0 auto",
          padding: "0 clamp(0.5rem, 2vw, 2rem)",
        }}>

          {/* ── HEADER ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.9 }}
            style={{ textAlign: "center", marginBottom: "clamp(1.5rem, 4vw, 3.5rem)" }}
          >
            {/* Top ornament */}
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: "clamp(8px,2vw,16px)",
              marginBottom: "clamp(0.8rem,2.5vw,1.8rem)",
            }}>
              <div style={{ height: 1, width: "clamp(20px,6vw,60px)", background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5))" }} />
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                style={{ color: "rgba(212,175,55,0.4)", fontSize: "clamp(0.6rem,1.2vw,0.85rem)" }}
              >✦</motion.span>
              <div style={{ height: 1, width: "clamp(20px,6vw,60px)", background: "linear-gradient(90deg, rgba(212,175,55,0.5), transparent)" }} />
            </div>

            <p style={{
              fontFamily: "sans-serif",
              fontSize: "clamp(0.42rem, 1.2vw, 0.62rem)",
              letterSpacing: "0.45em", textTransform: "uppercase",
              color: "rgba(212,175,55,0.5)",
              marginBottom: "clamp(0.5rem,1.5vw,1rem)",
            }}>Instants Précieux</p>

            <h2 style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "clamp(1.3rem, 4.5vw, 3.2rem)",
              color: "transparent",
              background: "linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fcf6ba, #bf953f)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.06em",
              lineHeight: 1.2,
              marginBottom: "clamp(0.5rem,1.5vw,1rem)",
            }}>Album de Famille</h2>

            <div style={{
              height: 1, width: "clamp(40px,12vw,90px)",
              background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
              margin: "0 auto clamp(0.5rem,1.5vw,1rem)",
            }} />

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(0.8rem,2vw,1.1rem)",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.3)",
            }}>
              "Chaque photo est un souvenir qui ne s'efface jamais."
            </p>
          </motion.div>

          {/* ── CAROUSEL ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Carousel photos={PHOTOS} onOpenLightbox={openLightbox} />
          </motion.div>

          {/* Bottom ornament */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{
              marginTop: "clamp(2rem,5vw,3.5rem)",
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: "clamp(8px,2vw,16px)",
            }}
          >
            <div style={{ height: 1, width: "clamp(20px,6vw,60px)", background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.35))" }} />
            <span style={{
              fontFamily: "sans-serif", fontSize: "clamp(0.38rem,1vw,0.52rem)",
              letterSpacing: "0.4em", textTransform: "uppercase",
              color: "rgba(212,175,55,0.3)",
            }}>{PHOTOS.length} souvenirs</span>
            <div style={{ height: 1, width: "clamp(20px,6vw,60px)", background: "linear-gradient(90deg, rgba(212,175,55,0.35), transparent)" }} />
          </motion.div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            photos={PHOTOS}
            index={lightbox}
            onClose={closeLightbox}
            onNav={setLightbox}
          />
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&display=swap');
      `}</style>
    </>
  );
};

export default PhotoGallery;