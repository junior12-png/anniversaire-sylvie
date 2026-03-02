import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroFloral from "@/assets/hero-floral.jpg";

const HeroSection = () => {
  const containerRef = useRef(null);

  // Parallaxe optimisé : On réduit l'amplitude sur mobile pour la performance
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[100svh] w-full overflow-hidden bg-[#050505]">

      {/* --- ARRIÈRE-PLAN --- */}
      <motion.div style={{ y: yImage }} className="absolute inset-0 z-0">
        <img
          src={heroFloral}
          alt="Maman Sylvie"
          className="h-full w-full object-cover scale-110 object-[center_20%]" // Ajusté pour ne pas couper le visage
        />
        {/* Voile sombre progressif pour la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#050505]" />
      </motion.div>

      {/* --- CONTENU --- */}
      <motion.div
        style={{ opacity: opacityText }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
      >
        {/* Barre lumineuse */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "60px", opacity: 1 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="mb-6 h-[1.5px] bg-gold"
        />

        {/* Slogan */}
        <div className="mb-3 overflow-hidden">
          <motion.span
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="block font-sans text-[9px] md:text-[11px] tracking-[0.4em] uppercase text-gold/90"
          >
            Une Vie de Lumière
          </motion.span>
        </div>

        {/* Titre Principal */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-serif text-[2.5rem] md:text-7xl text-white leading-[1.1] mb-4"
        >
          <span className="font-light">Cinquante ans de</span>
          <br />
          <span className="italic font-medium text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
            Grâce & Majesté
          </span>
        </motion.h1>

        {/* NOM avec lueur */}
        <div className="relative mt-4">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.8 }}
            className="absolute left-1/2 top-1/2 -z-10 h-24 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/30 blur-[60px]"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="font-script text-6xl md:text-9xl text-gold"
          >
            Maman Sylvie
          </motion.p>
        </div>

        {/* Détails date/lieu */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-10 flex items-center gap-3 text-white/80"
        >
          <div className="h-[1px] w-6 md:w-10 bg-gold/40" />
          <p className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase">
            12 avril 2026 • Douala
          </p>
          <div className="h-[1px] w-6 md:w-10 bg-gold/40" />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] uppercase tracking-[0.3em] text-gold/50">Découvrir</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-gold to-transparent"
          />
        </motion.div>

      </motion.div>
    </section>
  );
};

export default HeroSection;