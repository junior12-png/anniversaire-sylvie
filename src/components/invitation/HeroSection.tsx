import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import heroFloral from "@/assets/hero-floral.jpg";

const slogan = "Une Vie de Lumière";
const title = "Cinquante ans de";
const subtitle = "Grâce & Majesté";
const name = "Maman Sylvie";

// --- ANIMATIONS ---

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

const yoyoTransition = {
  duration: 2,
  repeat: Infinity,
  repeatType: "mirror",
  ease: "easeInOut"
} as const;

// Transition pour l'effet de lumière qui traverse (plus rapide pour être visible)
const shimmerTransition = {
  duration: 3,
  repeat: Infinity,
  ease: "linear",
  repeatDelay: 0.5
} as const;

// --- COMPOSANT D'ÉCRITURE ---
const WritingText = ({
  text,
  className,
  stagger = 0.05,
  startDelay = 0
}: {
  text: string,
  className?: string,
  stagger?: number,
  startDelay?: number
}) => (
  <motion.span
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.3 }}
    variants={{
      visible: {
        transition: {
          staggerChildren: stagger,
          delayChildren: startDelay,
        }
      }
    }}
    className={className}
  >
    {text.split("").map((char, index) => (
      <motion.span key={index} variants={letterVariants} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </motion.span>
);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] w-full flex-col items-center overflow-hidden bg-[#050505] px-4 py-6 md:py-16"
    >
      {/* FOND IMAGE */}
      <motion.div style={{ y: yImage }} className="absolute inset-0 z-0">
        <img
          src={heroFloral}
          alt="Décor"
          className="h-full w-full object-cover scale-110 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-[#050505]" />
      </motion.div>

      {/* 1. TOP ORNAMENT */}
      <div className="relative z-10 pt-2 pb-2 md:pb-12">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5 }}
          className="h-[1px] w-12 bg-yellow-500/30 md:w-24"
        />
      </div>

      {/* 2. CENTRE : CONTENU PRINCIPAL */}
      <motion.div
        style={{ opacity: opacityContent }}
        className="relative z-10 flex w-full flex-grow flex-col items-center justify-center gap-4 sm:gap-10 text-center"
      >
        <div className="flex flex-col items-center">
          <WritingText
            text={slogan}
            stagger={0.06}
            className="mb-2 font-sans text-[10px] tracking-[0.4em] text-[#c6a243] sm:text-xs uppercase"
          />

          <h1 className="font-serif text-[1.9rem] leading-[1.2] text-white sm:text-5xl md:text-7xl max-w-[95vw]">
            <WritingText text={title} className="font-light block" startDelay={0.8} />

            <motion.span
              animate={{ backgroundPosition: ["-200% 0%", "200% 0%"] }}
              transition={shimmerTransition}
              className="italic font-medium bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#bf953f] bg-clip-text text-transparent block pb-2"
              style={{ backgroundSize: "200% auto" }}
            >
              <WritingText text={subtitle} startDelay={1.8} />
            </motion.span>
          </h1>
        </div>

        <div className="relative mt-2 sm:mt-6">
          <WritingText
            text={name}
            stagger={0.08}
            startDelay={2.8}
            className="font-script text-6xl text-[#d4af37] drop-shadow-2xl sm:text-8xl md:text-9xl"
          />
        </div>
      </motion.div>

      {/* 3. BAS : DATE & DÉCOUVRIR */}
      <div className="relative z-10 flex flex-col items-center gap-6 pt-4 pb-6 md:gap-10">

        {/* DATE AVEC EFFET DE LUMIÈRE RÉEL (SHIMMER) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 3.8, duration: 1.2 }}
          className="flex items-center gap-3 sm:gap-6"
        >
          <div className="h-[1px] w-6 bg-yellow-500/20 sm:w-12" />

          <motion.p
            animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1
            }}
            className="font-sans text-[10px] tracking-[0.3em] uppercase sm:text-xs bg-gradient-to-r from-white/20 via-white to-white/20 bg-clip-text text-transparent"
            style={{
              backgroundSize: "250% auto",
              display: "inline-block"
            }}
          >
            19 avril 2026 <span className="mx-1 text-yellow-500/40">•</span> Douala
          </motion.p>

          <div className="h-[1px] w-6 bg-yellow-500/20 sm:w-12" />
        </motion.div>

        {/* INDICATEUR DÉCOUVRIR */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 4.5 }}
          className="flex flex-col items-center gap-2"
        >
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={yoyoTransition}
            className="text-[8px] uppercase tracking-[0.4em] text-yellow-500/40 sm:text-[9px]"
          >
            Découvrir
          </motion.span>

          <div className="relative h-10 w-[1px] overflow-hidden bg-white/10 sm:h-14">
            <motion.div
              animate={{ y: [-40, 40] }}
              transition={yoyoTransition}
              className="absolute h-full w-full bg-gradient-to-b from-transparent via-yellow-500/60 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;