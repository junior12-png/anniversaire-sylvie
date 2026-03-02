import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { MapPin, Clock, PartyPopper, Shirt, Sparkles } from "lucide-react";

// --- COMPOSANT PETITS GRAINS D'OR (Optimisé GPU) ---
const GoldDust = ({ active }: { active: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {active && [...Array(8)].map((_, i) => ( // Réduit à 8 pour la performance mobile
        <motion.div
          key={i}
          initial={{ opacity: 0, y: -10, x: Math.random() * 250 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, 200],
            x: (Math.random() * 250) + (Math.random() - 0.5) * 30
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.2
          }}
          className="absolute w-[1.5px] h-[1.5px] bg-gold rounded-full shadow-[0_0_4px_#D4AF37]"
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
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.8, ease: "easeOut" }
    })
  };

  return (
    <section className="py-16 md:py-24 bg-[#050505] relative overflow-hidden">
      <div className="container max-w-5xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-12 md:mb-20"
        >
          <Sparkles className="w-5 h-5 text-gold mx-auto mb-4 animate-pulse" />
          <h2 className="font-serif text-3xl md:text-5xl text-white font-light tracking-wide">
            Le Guide de la <span className="italic text-gold">Soirée</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {details.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              onMouseEnter={() => setActiveCard(i)}
              onMouseLeave={() => setActiveCard(null)}
              onClick={() => setActiveCard(activeCard === i ? null : i)} // Toggle pour mobile
              className="relative group cursor-default"
            >
              {/* Lueur de fond (moins forte sur mobile) */}
              <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className={`relative bg-white/[0.03] backdrop-blur-md border rounded-3xl p-6 md:p-10 overflow-hidden transition-all duration-500
                ${activeCard === i ? 'border-gold/40 bg-white/[0.06]' : 'border-white/10'}`}>

                {/* GRAINS D'OR */}
                <GoldDust active={activeCard === i} />

                <div className="relative z-10">
                  <div className="mb-6 inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-gold/20 text-gold transition-transform duration-500 group-hover:scale-110">
                    <item.icon size={18} />
                  </div>

                  <h3 className="font-sans text-[9px] tracking-[0.3em] uppercase text-gold/60 mb-2">
                    {item.title}
                  </h3>

                  <p className="font-serif text-xl md:text-2xl text-white mb-1 tracking-wide">
                    {item.content}
                  </p>

                  <p className="font-sans text-xs md:text-sm text-white/40 mb-6">
                    {item.sub}
                  </p>

                  <p className="text-[10px] md:text-[11px] font-serif italic text-gold/50 border-t border-white/5 pt-4">
                    {item.note}
                  </p>
                </div>

                {/* Shine effect optimisé */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;