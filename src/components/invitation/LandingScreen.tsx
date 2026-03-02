import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

interface LandingScreenProps {
  onOpen: () => void;
}

const LandingScreen = ({ onOpen }: LandingScreenProps) => {
  // Réduit à 25 étoiles pour la fluidité mobile, tout en gardant l'effet magique
  const stars = [...Array(25)];

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505] overflow-hidden touch-none"
      exit={{
        opacity: 0,
        scale: 1.1,
        transition: { duration: 0.8, ease: "circOut" }
      }}
    >
      {/* 1. FOND ÉTOILÉ (Optimisé GPU) */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full shadow-[0_0_8px_white]"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* 2. HALO CENTRAL - Taille adaptée mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gold/10 blur-[80px] md:blur-[120px] rounded-full opacity-60" />

      <div className="relative flex flex-col items-center justify-center px-4 text-center z-10 w-full">

        {/* ICONE ANIMÉE */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="mb-6 md:mb-8"
        >
          <div className="relative">
            <Sparkles className="text-gold w-10 h-10 md:w-12 md:h-12" />
          </div>
        </motion.div>

        {/* TEXTE D'ANNIVERSAIRE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-gold font-sans text-[8px] md:text-xs tracking-[0.5em] uppercase mb-4 opacity-80">
            Événement Prestigieux
          </p>

          <div className="relative inline-block mb-2">
            <h1 className="font-serif text-5xl md:text-9xl text-white font-bold tracking-tight leading-tight px-2">
              Joyeux <br />
              <span className="text-gold italic font-light drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">Anniversaire</span>
            </h1>

            {/* Petit cœur flottant - repositionné pour mobile */}
            <motion.div
              animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -right-4 -top-4 md:-right-8 md:top-0"
            >
              <Heart className="text-gold/40 w-6 h-6 md:w-8 md:h-8 fill-gold/10" />
            </motion.div>
          </div>

          <p className="font-serif text-xl md:text-4xl text-white/90 italic mt-2">
            Sylvie Aimée
          </p>

          <div className="flex items-center justify-center gap-4 my-8 md:my-10">
             <div className="h-[1px] w-6 md:w-8 bg-gold/40" />
             <span className="font-sans text-gold text-base md:text-lg tracking-[0.3em]">50 ANS</span>
             <div className="h-[1px] w-6 md:w-8 bg-gold/40" />
          </div>

          {/* BOUTON MAGIQUE - Optimisé pour le tactile */}
          <motion.button
            onClick={() => {
              window.dispatchEvent(new Event("ouvrirInvitation"));
              onOpen();
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 md:px-12 md:py-5 bg-gradient-to-r from-gold via-[#f3cf7a] to-gold rounded-full shadow-[0_10px_30px_-10px_rgba(212,175,55,0.5)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3 text-black font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
              Entrer dans la fête
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity }}>
                →
              </motion.span>
            </span>

            {/* Brillance infinie */}
            <motion.div
              animate={{ x: ['-150%', '150%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-0 z-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
            />
          </motion.button>
        </motion.div>
      </div>

      {/* BORDURES DÉCORATIVES - Plus discrètes sur mobile */}
      <div className="absolute top-6 left-6 w-12 h-12 md:top-10 md:left-10 md:w-20 md:h-20 border-t border-l border-gold/30 rounded-tl-2xl pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-12 h-12 md:bottom-10 md:right-10 md:w-20 md:h-20 border-b border-r border-gold/30 rounded-br-2xl pointer-events-none" />
    </motion.div>
  );
};

export default LandingScreen;