import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroFloral from "@/assets/hero-floral.jpg";

const HeroSection = () => {
  const containerRef = useRef(null);

  // Effet de parallaxe : l'image bouge légèrement quand on scrolle
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} className="relative h-[100svh] w-full overflow-hidden bg-[#050505]">

     {/* --- ARRIÈRE-PLAN DYNAMIQUE --- */}
      <motion.div style={{ y: yImage }} className="absolute inset-0 z-0">
        <img
          src={heroFloral}
          alt="Maman"
          className="h-full w-full object-cover scale-110"
        />
        {/* Voile sombre global (70% d'opacité) */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Dégradé radial : Plus sombre sur les bords pour "pousser" la lumière vers le centre */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </motion.div>
      {/* --- CONTENU --- */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">

        {/* 1. L'ACCENT LUMINEUX */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "80px", opacity: 1 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="mb-6 h-[2px] bg-gold"
        />

        {/* 2. LE TITRE */}
        <div className="mb-2 overflow-hidden">
          <motion.span
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="block font-sans text-[10px] tracking-[0.5em] uppercase text-gold/90"
          >
            Une Vie de Lumière
          </motion.span>
        </div>

        <motion.h1
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="font-serif text-4xl md:text-7xl text-white leading-tight"
        >
          <span className="font-light text-white">Cinquante ans de</span>
          <br />
          <span className="italic font-medium text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            Grâce & Majesté
          </span>
        </motion.h1>

        {/* 3. LE NOM (L'élément central) */}
        <div className="relative mt-8">
          {/* Cercle de lumière derrière le nom */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute left-1/2 top-1/2 -z-10 h-32 w-64 -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-gold/20 blur-3xl"
          />

          <motion.p
            initial={{ opacity: 0, letterSpacing: "-0.05em" }}
            animate={{ opacity: 1, letterSpacing: "0.02em" }}
            transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
            className="font-script text-6xl md:text-9xl text-gold"
          >
            Maman Sylvie
          </motion.p>
        </div>

        {/* 4. LES DÉTAILS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-12 flex items-center gap-4 text-white/70"
        >
          <div className="h-[1px] w-8 bg-gold/50" />
          <p className="font-sans text-xs tracking-[0.3em] uppercase">
            12 avril 2026 • Douala
          </p>
          <div className="h-[1px] w-8 bg-gold/50" />
        </motion.div>

        {/* 5. L'INDICATEUR DE SCROLL */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-gold/60">Faites défiler</span>
          <motion.div
            animate={{ height: [20, 40, 20], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-[1px] bg-gradient-to-b from-gold to-transparent"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;