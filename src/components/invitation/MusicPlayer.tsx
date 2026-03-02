import { useState, useEffect } from "react"; // Ajout de useEffect
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import magicMusic from "../../assets/magic-system.mp3";

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [audio] = useState(() => {
    const a = new Audio(magicMusic);
    a.loop = true;
    a.volume = 0.4;
    return a;
  });

  // LOGIQUE POUR LANCER AUTOMATIQUEMENT
  useEffect(() => {
    const startMusic = () => {
      audio.play().then(() => setPlaying(true)).catch(err => {
        console.warn("Auto-play bloqué, en attente d'interaction");
      });
    };

    // On écoute l'événement "ouvrirInvitation"
    window.addEventListener("ouvrirInvitation", startMusic);

    return () => window.removeEventListener("ouvrirInvitation", startMusic);
  }, [audio]);

  const toggle = () => {
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex items-center gap-3">
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
          playing
          ? "bg-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.6)]"
          : "bg-white/10 text-gold border border-gold/30 backdrop-blur-md"
        }`}
      >
        <AnimatePresence>
          {playing && (
            <>
              <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.8, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 bg-gold rounded-full -z-10"
              />
            </>
          )}
        </AnimatePresence>
        {playing ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6 opacity-50" />}
      </motion.button>

      {playing && (
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="hidden md:flex flex-col text-left">
          <span className="text-[10px] text-gold uppercase tracking-[0.2em] font-bold">En musique</span>
          <span className="text-[9px] text-white/60">Magic System - Joyeux Anniversaire</span>
        </motion.div>
      )}
    </div>
  );
};

export default MusicPlayer;