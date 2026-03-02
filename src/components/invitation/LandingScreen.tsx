import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

interface LandingScreenProps {
  onOpen: () => void;
}

const LandingScreen = ({ onOpen }: LandingScreenProps) => {
  // On génère 40 étoiles avec des positions et délais aléatoires
  const stars = [...Array(40)];

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505] overflow-hidden"
      exit={{
        opacity: 0,
        scale: 1.1,
        transition: { duration: 1, ease: "circOut" }
      }}
    >
      {/* 1. FOND ÉTOILÉ DYNAMIQUE */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              boxShadow: "0 0 10px white",
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* 2. EFFETS DE LUMIÈRE (HALOS DORÉS) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 blur-[120px] rounded-full opacity-50" />

      <div className="relative flex flex-col items-center justify-center px-6 text-center z-10">

        {/* ICONE ANIMÉE */}
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="mb-8"
        >
          <div className="relative">
            <Sparkles className="text-gold w-12 h-12" />
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute -top-2 -right-2 text-white text-xl"
            >
              ✦
            </motion.div>
          </div>
        </motion.div>

        {/* TEXTE D'ANNIVERSAIRE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <p className="text-gold font-sans text-[10px] md:text-xs tracking-[0.6em] uppercase mb-6 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
            Événement Prestigieux
          </p>

          <motion.div className="relative inline-block mb-4">
            <h1 className="font-serif text-7xl md:text-9xl text-white font-bold tracking-tighter leading-none">
              Joyeux <br />
              <span className="text-gold italic font-light">Anniversaire</span>
            </h1>
            {/* Petit cœur flottant */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -right-8 top-0"
            >
              <Heart className="text-gold/40 w-8 h-8 fill-gold/10" />
            </motion.div>
          </motion.div>

          <p className="font-serif text-2xl md:text-4xl text-white/80 italic mt-4 mb-2">
            Sylvie Aimée
          </p>

          <div className="flex items-center justify-center gap-4 my-10">
             <div className="h-[1px] w-8 bg-gold/40" />
             <span className="font-sans text-gold text-lg tracking-[0.3em]">50 ANS</span>
             <div className="h-[1px] w-8 bg-gold/40" />
          </div>

          {/* BOUTON MAGIQUE */}
          <motion.button
          onClick={() => {
              // 1. On lance l'événement pour la musique
              window.dispatchEvent(new Event("ouvrirInvitation"));
              // 2. On déclenche la fonction d'ouverture originale
              onOpen();
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-5 bg-gradient-to-r from-gold via-[#f3cf7a] to-gold rounded-full transition-all duration-500"
          >
            <span className="relative flex items-center gap-3 text-black font-sans text-xs font-bold uppercase tracking-[0.2em]">
              Entrer dans la fête
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity }}>
                →
              </motion.span>
            </span>

            {/* Effet de brillance qui traverse le bouton */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-1/2 h-full bg-white/40 skew-x-12"
              />
            </div>
          </motion.button>
        </motion.div>

      </div>

      {/* BORDURE DÉCORATIVE AUX COINS */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-gold/20 rounded-tl-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-gold/20 rounded-br-3xl pointer-events-none" />
    </motion.div>
  );
};

export default LandingScreen;