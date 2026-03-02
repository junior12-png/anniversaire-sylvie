import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Sparkles } from "lucide-react";

const InvitationFooter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <footer ref={ref} className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Lueur de fin de page */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="container max-w-4xl mx-auto text-center px-6 relative z-10"
      >
        {/* Ornement de séparation */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-gold/50" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Heart className="w-6 h-6 text-gold fill-gold/20" />
          </motion.div>
          <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-gold/50" />
        </div>

        {/* Nom de la maman en majesté */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="font-serif text-4xl md:text-6xl text-white font-light italic mb-6 tracking-tight">
            Maman <span className="text-gold">Sylvie Aimée</span>
            <span className="block text-sm font-sans uppercase tracking-[0.4em] text-white/40 mt-4 not-italic">
              L'élégance d'une vie
            </span>
          </p>
        </motion.div>

        {/* Message final */}
        <div className="space-y-6 mt-12">
          <p className="font-serif text-lg md:text-xl text-white/60 italic">
            "50 ans de grâce, de force et d'amour infini."
          </p>

          <div className="flex justify-center items-center gap-2 text-gold/60">
            <Sparkles className="w-4 h-4" />
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase">
              Rendez-vous à Ndogpassi
            </p>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Signature familiale */}
        <motion.div
          className="mt-20 pt-8 border-t border-white/5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <p className="font-sans text-[9px] tracking-[0.5em] uppercase text-white/30">
            Fait avec amour par la famille • 2026
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default InvitationFooter;