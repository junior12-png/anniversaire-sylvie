import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, memo } from "react";
import confetti from "canvas-confetti";

const TARGET_DATE = new Date("2026-04-12T19:00:00");

// 1. On définit les types pour les props (fini le "any" !)
interface TimeUnitProps {
  label: string;
  value: number;
  isFinished: boolean;
  isInView: boolean;
}

// 2. On utilise l'interface ici
const TimeUnit = memo(({ label, value, isFinished, isInView }: TimeUnitProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    className="relative flex flex-col items-center group"
  >
    <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 flex items-center justify-center border border-white/10 rounded-full backdrop-blur-sm bg-white/[0.02] transition-colors duration-500 group-hover:border-gold/50">

      {/* Cercle de progression */}
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle cx="50%" cy="50%" r="46%" className="stroke-white/5 stroke-[1px] fill-none" />
        <motion.circle
          cx="50%" cy="50%" r="46%"
          className="stroke-gold stroke-[2px] fill-none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: value / 60 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ strokeLinecap: "round" }}
        />
      </svg>

      <div className="overflow-hidden h-10 md:h-16 flex items-center relative z-10">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -25, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className={`font-serif text-3xl md:text-6xl block ${isFinished ? "text-gold animate-pulse" : "text-white"}`}
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
    <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-gold/80 mt-4 font-bold">{label}</p>
  </motion.div>
));

const Countdown = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isFinished, setIsFinished] = useState(false);

  function calculateTimeLeft() {
    const diff = TARGET_DATE.getTime() - new Date().getTime();
    if (diff <= 0) return { Jours: 0, Heures: 0, Minutes: 0, Secondes: 0 };
    return {
      Jours: Math.floor(diff / (1000 * 60 * 60 * 24)),
      Heures: Math.floor((diff / (1000 * 60 * 60)) % 24),
      Minutes: Math.floor((diff / (1000 * 60)) % 60),
      Secondes: Math.floor((diff / 1000) % 60),
    };
  }

  const launchFireworks = () => {
    const end = Date.now() + 5 * 1000;
    const colors = ["#D4AF37", "#FFFFFF", "#FFDF00"];

    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
      if (Object.values(updated).every(v => v === 0) && !isFinished) {
        setIsFinished(true);
        launchFireworks();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  return (
    <section ref={ref} className="py-20 bg-[#080808] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-6xl text-white font-light uppercase tracking-tighter">
            {isFinished ? "C'est le " : "Le Grand "}<span className="italic text-gold">Rendez-vous</span>
          </h2>
          <div className="w-16 h-[1px] bg-gold/40 mx-auto mt-6" />
        </motion.div>

        {/* Grille adaptative optimisée mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 place-items-center">
          {Object.entries(timeLeft).map(([label, value], i) => (
            <TimeUnit
              key={label}
              label={label}
              value={value}
              isFinished={isFinished}
              isInView={isInView}
            />
          ))}
        </div>

        {isFinished && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-12">
            <button
              onClick={launchFireworks}
              className="px-10 py-4 bg-gold text-black font-bold text-xs tracking-widest uppercase rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-90 transition-transform"
            >
              Fêter ça ! 🎆
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Countdown;