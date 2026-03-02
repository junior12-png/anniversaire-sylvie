import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti"; // On importe les confettis

const TARGET_DATE = new Date("2026-04-12T19:00:00");

const Countdown = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
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

  // Fonction pour lancer les feux d'artifice
// Fonction pour lancer les feux d'artifice
  const launchFireworks = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    // On utilise ReturnType<typeof setInterval> au lieu de any
    const interval: ReturnType<typeof setInterval> = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTime = calculateTimeLeft();
      setTimeLeft(updatedTime);

      // Si le compteur arrive à zéro et qu'on ne l'a pas encore marqué comme fini
      if (updatedTime.Jours === 0 && updatedTime.Heures === 0 &&
          updatedTime.Minutes === 0 && updatedTime.Secondes === 0 && !isFinished) {
        setIsFinished(true);
        launchFireworks(); // BOUM ! 🎆
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  return (
    <section ref={ref} className="py-24 bg-[#080808] relative overflow-hidden">
      {/* Halo de fond */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]" />

      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/60 mb-4">
            {isFinished ? "L'événement a commencé" : "L'instant approche"}
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-white font-light">
            {isFinished ? "C'est le " : "Le Grand "}<span className="italic text-gold">Rendez-vous</span>
          </h2>
          <div className="w-12 h-[1px] bg-gold/30 mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {Object.entries(timeLeft).map(([label, value], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="relative flex flex-col items-center"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center border border-white/5 rounded-full backdrop-blur-sm bg-white/[0.02]">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="50%" cy="50%" r="48%" className="stroke-gold/10 stroke-[1px] fill-none" />
                  <motion.circle
                    cx="50%" cy="50%" r="48%"
                    className="stroke-gold stroke-[2px] fill-none"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: value / 60 } : {}}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </svg>

                <div className="overflow-hidden h-12 md:h-16 flex items-center">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={value}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "backOut" }}
                      className={`font-serif text-4xl md:text-6xl block ${isFinished ? "text-gold animate-pulse" : "text-white"}`}
                    >
                      {String(value).padStart(2, "0")}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/80 mt-6 font-bold">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Message de célébration quand c'est fini */}
        {isFinished && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-12"
          >
            <button
              onClick={launchFireworks}
              className="px-8 py-3 bg-gold text-black font-sans text-xs tracking-[0.2em] uppercase rounded-full hover:bg-white transition-colors duration-300"
            >
              Lancer les feux d'artifice 🎆
            </button>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-16 font-serif italic text-white/40 text-sm"
        >
          {isFinished ? "Bienvenue à cette soirée exceptionnelle !" : "Nous avons hâte de célébrer ce moment avec vous."}
        </motion.p>
      </div>
    </section>
  );
};

export default Countdown;