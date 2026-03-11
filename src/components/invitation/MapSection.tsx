/**
 * MapSection.tsx — Informations lieu (sans carte, sans bouton itinéraire)
 * ✅ Bouton "Voir l'itinéraire" retiré
 * ✅ Responsive SE → écran géant
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Star } from "lucide-react";

const MapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const details = [
    { label: "Lieu de la fête", value: "Ndogpassi III", highlight: true },
    { label: "Repère",          value: "Entrée Lycée",  highlight: false },
    { label: "Ville",           value: "Douala",         highlight: false },
    { label: "Pays",            value: "Cameroun",       highlight: false },
  ];

  return (
    <section ref={ref} style={{
      padding: "clamp(3rem, 8vw, 6rem) 0",
      background: "#080808",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: "clamp(300px, 90vw, 740px)", margin: "0 auto", padding: "0 clamp(0.75rem, 4vw, 3rem)" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9 }}
          style={{ textAlign: "center", marginBottom: "clamp(2rem, 5vw, 4rem)" }}
        >
          <div style={{
            display: "inline-flex", width: "clamp(44px, 8vw, 60px)", height: "clamp(44px, 8vw, 60px)", borderRadius: "50%",
            background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)",
            alignItems: "center", justifyContent: "center", marginBottom: 16,
          }}>
            <MapPin size={22} style={{ color: "#d4af37" }} />
          </div>

          <p style={{
            fontFamily: "sans-serif", fontSize: "clamp(0.45rem, 1.3vw, 0.65rem)",
            letterSpacing: "0.4em", textTransform: "uppercase",
            color: "rgba(212,175,55,0.55)", marginBottom: 10,
          }}>Localisation</p>

          <h2 style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(1rem, 3.5vw, 2.2rem)",
            color: "transparent",
            background: "linear-gradient(135deg, #bf953f, #fcf6ba, #b38728)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.06em",
          }}>Rendez-vous à Ndogpassi</h2>

          <div style={{ height: 1, width: 50, background: "linear-gradient(90deg, transparent, #d4af37, transparent)", margin: "14px auto 0" }} />
        </motion.div>

        {/* Venue card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.95, delay: 0.15 }}
          style={{
            position: "relative",
            background: "linear-gradient(145deg, #1c1504, #0f0b02, #1a1200)",
            border: "1px solid rgba(212,175,55,0.25)",
            borderRadius: 26,
            padding: "clamp(1.8rem, 5vw, 3.5rem) clamp(1.4rem, 4vw, 3rem)",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          {/* Corner ornaments */}
          {[
            { top: 14, left: 14, borderWidth: "1px 0 0 1px" },
            { top: 14, right: 14, borderWidth: "1px 1px 0 0" },
            { bottom: 14, left: 14, borderWidth: "0 0 1px 1px" },
            { bottom: 14, right: 14, borderWidth: "0 1px 1px 0" },
          ].map((pos, i) => (
            <div key={i} style={{
              position: "absolute", width: 18, height: 18,
              borderStyle: "solid", borderColor: "rgba(212,175,55,0.3)",
              borderWidth: pos.borderWidth, ...pos,
            }} />
          ))}

          {/* Shimmer */}
          <motion.div
            animate={{ x: ["-120%", "180%"] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            style={{
              position: "absolute", top: 0, left: 0, width: "50%", height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,245,200,0.04), transparent)",
              transform: "skewX(-12deg)", pointerEvents: "none",
            }}
          />

          {/* Gold top bar */}
          <div style={{
            position: "absolute", top: 0, left: "20%", right: "20%", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)",
          }} />

          {/* Star */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            style={{ marginBottom: 20 }}
          >
            <Star size={20} style={{ color: "rgba(212,175,55,0.4)", margin: "0 auto" }} fill="rgba(212,175,55,0.1)" />
          </motion.div>

          {/* Details list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 3vw, 1.8rem)", position: "relative", zIndex: 1 }}>
            {details.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.7 }}
              >
                <p style={{
                  fontFamily: "sans-serif",
                  fontSize: "clamp(0.45rem, 1.2vw, 0.6rem)",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "rgba(212,175,55,0.45)",
                  marginBottom: 4,
                }}>{d.label}</p>
                <p style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: d.highlight
                    ? "clamp(1.2rem, 4vw, 2.4rem)"
                    : "clamp(0.85rem, 2.5vw, 1.5rem)",
                  color: d.highlight ? "#f0d98a" : "rgba(255,255,255,0.7)",
                  letterSpacing: d.highlight ? "0.06em" : "0.04em",
                  textShadow: d.highlight ? "0 0 20px rgba(212,175,55,0.3)" : "none",
                }}>{d.value}</p>

                {i < details.length - 1 && (
                  <div style={{
                    height: 1, marginTop: 14,
                    background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)",
                  }} />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{
            textAlign: "center",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(0.8rem, 2vw, 1rem)",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.25)",
            marginTop: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          "La route du bonheur passe par Ndogpassi ce jour-là."
        </motion.p>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@1,400&display=swap');`}</style>
    </section>
  );
};

export default MapSection;