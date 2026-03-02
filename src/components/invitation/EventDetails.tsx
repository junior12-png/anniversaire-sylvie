import { motion, Variants, useAnimation } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Clock, PartyPopper, Shirt, Sparkles } from "lucide-react";

// --- COMPOSANT PETITS GRAINS D'OR ---
const GoldDust = ({ active }: { active: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {active && [...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: -10, x: Math.random() * 300 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, 150],
            x: (Math.random() * 300) + (Math.random() - 0.5) * 50
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.1
          }}
          className="absolute w-[2px] h-[2px] bg-gold rounded-full shadow-[0_0_5px_#D4AF37]"
        />
      ))}
    </div>
  );
};

const details = [
  { icon: MapPin, title: "Lieu", content: "Ndogpassi III ", sub: "Zone de recasement", note: "L'excellence pour vous recevoir." },
  { icon: Clock, title: "Horaire", content: "15h30", sub: "Début des festivités", note: "Soyez des nôtres dès l'ouverture." },
  { icon: PartyPopper, title: "Ambiance", content: "Gala & Danse", sub: "Dîner gastronomique", note: "Une nuit gravée dans les mémoires." },
  { icon: Shirt, title: "Dress Code", content: "Royal & Chic", sub: "Or, Blanc, Rose", note: "L'élégance est de mise." },
];

const EventDetails = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: i * 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    })
  };

  return (
    <section className="py-24 bg-[#050505] relative">
      <div className="container max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-20"
        >
          <Sparkles className="w-5 h-5 text-gold mx-auto mb-4 animate-pulse" />
          <h2 className="font-serif text-4xl md:text-5xl text-white font-light tracking-wide">
            Le Guide de la <span className="italic text-gold">Soirée</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {details.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              viewport={{ once: false }}
              className="relative group cursor-default"
            >
              {/* Effet de lueur douce derrière la carte */}
              <div className="absolute inset-0 bg-gold/5 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-10 overflow-hidden transition-all duration-500 group-hover:border-gold/30 group-hover:bg-white/[0.05]">

                {/* LES GRAINS D'OR (S'activent au hover) */}
                <GoldDust active={hoveredIndex === i} />

                <div className="relative z-10">
                  <div className="mb-8 inline-flex items-center justify-center w-12 h-12 rounded-full border border-gold/20 text-gold group-hover:scale-110 transition-transform duration-500">
                    <item.icon size={20} />
                  </div>

                  <h3 className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-3">
                    {item.title}
                  </h3>

                  <p className="font-serif text-2xl text-white mb-2 tracking-wide">
                    {item.content}
                  </p>

                  <p className="font-sans text-sm text-white/40 mb-6">
                    {item.sub}
                  </p>

                  <p className="text-[11px] font-serif italic text-gold/40 border-t border-white/5 pt-4">
                    {item.note}
                  </p>
                </div>

                {/* Reflet de lumière qui balaye la carte au survol */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:animate-shine" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;