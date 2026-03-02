import { motion, Variants } from "framer-motion";
import { useRef } from "react";

// --- COMPOSANT TYPEWRITER ---
const TypewriterText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const letters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025, // Vitesse équilibrée pour la lecture
        delayChildren: delay
      },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 }
    },
    hidden: { opacity: 0, y: 5 },
  };

  return (
    <motion.p
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }} // Se relance au scroll pour l'effet Wow
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} className="inline-block whitespace-pre">
          {letter}
        </motion.span>
      ))}
    </motion.p>
  );
};

const TributeSection = () => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] py-16 md:py-24 bg-[#0a0a0a] text-white overflow-hidden flex flex-col justify-center">

      {/* ÉTOILES DE FOND SCINTILLANTES */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div key={i} className="absolute w-[1px] h-[1px] md:w-1 md:h-1 bg-gold rounded-full"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            animate={{ opacity: [0, 0.7, 0], scale: [1, 1.5, 1] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>

      <div className="container max-w-2xl mx-auto px-6 relative z-10">

        {/* TITRE SCINTILLANT */}
        <div className="flex flex-col items-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <p className="font-sans text-[8px] md:text-[10px] tracking-[0.5em] uppercase text-gold mb-3 text-center font-bold">Hommage & Gratitude</p>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -right-8 text-gold text-lg hidden md:block"
            >
              ✦
            </motion.span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="font-serif text-2xl md:text-5xl font-light text-center italic leading-tight"
          >
            Une vie bénie par l'Éternel
          </motion.h2>
        </div>

        <div className="space-y-12 md:space-y-20">

          {/* 1ER TEXTE : LA FAMILLE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="border-l-2 border-gold/40 pl-5 md:pl-8"
          >
            <TypewriterText
              className="font-serif text-base md:text-xl text-white/90 leading-relaxed italic"
              text="« À notre Maman, qui multiplie les plats de Ndolé comme Jésus a multiplié les pains ! Ta patience est la preuve que le Saint-Esprit existe vraiment. Merci d'être notre pilier de prière. »"
              delay={0.2}
            />
          </motion.div>

          {/* 2ÈME TEXTE : ASSOCIATION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="text-center py-8 px-6 bg-white/[0.03] rounded-[2rem] border border-white/5 relative"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0a0a0a] px-4 font-sans text-[7px] md:text-[9px] tracking-[0.3em] uppercase text-gold/60 font-bold">
              La Présidente & Ses Sœurs
            </div>
            <p className="font-serif text-base md:text-lg text-white/80 leading-relaxed italic">
              Sous ton aile, l'Association des Femmes Ménages fleurit. Tu nous guides avec la sagesse de Déborah et la force d'Esther. Que l'onction sur ta vie nous porte encore plus haut.
            </p>
          </motion.div>

          {/* 3ÈME TEXTE : FINAL */}
          <div className="relative pt-4 flex flex-col justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.15, scale: 1 }}
              className="absolute inset-x-0 top-0 h-32 bg-gold rounded-full blur-[60px] md:blur-[100px] -z-10"
            />

            <div className="text-center space-y-6">
              <TypewriterText
                className="font-script text-4xl md:text-7xl text-gold drop-shadow-2xl"
                text="Joyeux 50 ans Maman !"
                delay={0.5}
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="space-y-4"
              >
                <div className="h-[1px] w-12 bg-gold/30 mx-auto" />
                <p className="font-serif text-[11px] md:text-sm text-white/50 italic px-6 leading-relaxed max-w-sm mx-auto">
                  « L'Éternel te gardera de tout mal, Il gardera ton âme. » <br className="hidden md:block" /> — Psaume 121:7
                </p>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TributeSection;