import { motion, Variants } from "framer-motion";
import { useRef } from "react";

// --- COMPOSANT TYPEWRITER ---
const TypewriterText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const letters = Array.from(text);
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: delay },
    },
  };
  const child: Variants = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 5 },
  };

  return (
    <motion.p variants={container} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} className={className}>
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
    <section ref={sectionRef} className="relative min-h-screen py-20 bg-[#0a0a0a] text-white overflow-hidden flex flex-col justify-center">

      {/* ÉTOILES DE FOND */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 bg-gold rounded-full"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      <div className="container max-w-3xl mx-auto px-6 relative z-10">

        {/* TITRE SCINTILLANT */}
        <div className="flex flex-col items-center mb-16">
          <motion.div className="relative" animate={{ textShadow: ["0 0 0px #D4AF37", "0 0 15px #D4AF37", "0 0 0px #D4AF37"] }} transition={{ duration: 2, repeat: Infinity }}>
            <p className="font-sans text-[10px] tracking-[0.6em] uppercase text-gold mb-2 text-center">Hommage & Gratitude</p>
            <motion.span animate={{ rotate: 360, scale: [1, 1.3, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="absolute -top-5 -right-10 text-gold text-xl">✦</motion.span>
          </motion.div>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-center italic">Une vie bénie par l'Éternel</h2>
        </div>

        <div className="space-y-16">

          {/* 1ER TEXTE : LA FAMILLE (Gris rigolo et religieux) */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="border-l-2 border-gold/40 pl-6"
          >
            <TypewriterText
              className="font-serif text-lg md:text-xl text-white/90 leading-relaxed italic"
              text="« À notre Maman, qui multiplie les plats de Ndolé comme Jésus a multiplié les pains ! Ta patience avec nous est la preuve vivante que le Saint-Esprit existe vraiment. Merci d'être notre premier pilier de prière. »"
              delay={0.1}
            />
          </motion.div>

          {/* 2ÈME TEXTE : FEMMES MÉNAGES (Apparition fondu / Middle) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-center py-4 px-6 bg-gold/5 rounded-2xl border border-gold/10"
          >
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-3">La Présidente & Ses Sœurs</p>
            <p className="font-serif text-lg md:text-xl text-white/80 leading-relaxed max-w-xl mx-auto">
              Sous ton aile, l'Association des Femmes Ménages fleurit dans la foi. Tu nous guides avec la sagesse de Déborah et la force d'Esther. Que le Seigneur continue d'oindre ton leadership pour nous porter encore plus haut.
            </p>
          </motion.div>

          {/* 3ÈME TEXTE : RELIGIEUX & ANNIVERSAIRE (Incrustation remontée) */}
          <div className="relative pt-6 flex flex-col justify-center items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1.1, opacity: 0.2 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-gold rounded-full blur-[70px] -z-10"
            />
            <div className="text-center space-y-4">
              <TypewriterText
                className="font-script text-4xl md:text-6xl text-gold"
                text="Joyeux 50ème Anniversaire Maman !"
                delay={0.4}
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="font-serif text-sm md:text-base text-white/60 italic px-4"
              >
                « L'Éternel te garde, l'Éternel est ton ombre à ta main droite. » — Psaume 121:5
              </motion.p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TributeSection;