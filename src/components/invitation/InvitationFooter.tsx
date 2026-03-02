import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Sparkles } from "lucide-react";

const InvitationFooter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <footer ref={ref} className="py-16 md:py-24 bg-[#050505] relative overflow-hidden">
      {/* Lueur de fin de page - Ajustée pour mobile */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[200px] md:h-[300px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="container max-w-4xl mx-auto text-center px-6 relative z-10"
      >
        {/* Ornement de séparation - Responsive */}
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-10">
          <div className="h-[1px] w-8 md:w-24 bg-gradient-to-r from-transparent to-gold/50" />
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <Heart className="w-5 h-5 md:w-6 md:h-6 text-gold fill-gold/10" />
          </motion.div>
          <div className="h-[1px] w-8 md:w-24 bg-gradient-to-l from-transparent to-gold/50" />
        </div>

        {/* Nom de la maman - Typographie adaptée mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="font-serif text-3xl md:text-6xl text-white font-light italic mb-4 tracking-tight leading-tight">
            Maman <span className="text-gold">Sylvie Aimée</span>
          </p>
          <p className="text-[9px] md:text-sm font-sans uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/40 mb-10">
             L'élégance d'une vie
          </p>
        </motion.div>

        {/* Message final */}
        <div className="space-y-4 md:space-y-6 mt-8">
          <p className="font-serif text-base md:text-xl text-white/60 italic px-4">
            "50 ans de grâce, de force et d'amour infini."
          </p>

          <div className="flex justify-center items-center gap-2 text-gold/50">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            <p className="font-sans text-[8px] md:text-[10px] tracking-[0.2em] uppercase">
              Rendez-vous à Ndogpassi
            </p>
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
          </div>
        </div>

        {/* Signature familiale - Plus discrète sur mobile */}
        <motion.div
          className="mt-16 md:mt-20 pt-6 border-t border-white/5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="font-sans text-[8px] tracking-[0.3em] uppercase text-white/20 px-2 leading-relaxed">
            Fait avec amour par la famille • 2026
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default InvitationFooter;