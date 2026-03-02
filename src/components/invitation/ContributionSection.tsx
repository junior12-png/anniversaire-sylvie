import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wand2, Gift, Beer, Music, Heart } from "lucide-react";

const ContributionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const contributions = [
    {
      icon: <Music className="w-6 h-6 transition-colors duration-500 group-hover:text-black" />,
      title: "DJ d'un soir",
      desc: "Préparez vos meilleurs pas de danse (même les plus honteux)."
    },
    {
      icon: <Beer className="w-6 h-6 transition-colors duration-500 group-hover:text-black" />,
      title: "Le Carburant",
      desc: "Une bouteille de votre choix pour lever nos verres ensemble."
    },
    {
      icon: <Gift className="w-6 h-6 transition-colors duration-500 group-hover:text-black" />,
      title: "La Cagnotte Magique",
      desc: "Une petite enveloppe pour aider à financer les rêves de la reine."
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-[#050505] relative overflow-hidden">
      {/* Fond étoilé discret */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gold rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white rounded-full animate-ping" />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-gold rounded-full animate-pulse" />
      </div>

      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <Wand2 className="w-8 h-8 text-gold mx-auto mb-4 animate-spin-slow" />
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">
            Devenez <span className="italic text-gold">Magicien</span> d'un jour
          </h2>
          <p className="text-white/50 font-sans max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Parce qu’organiser une fête royale demande un peu de poudre de perlimpinpin...
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contributions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileTap={{ scale: 0.98 }} // Effet clic sur mobile
              className="relative group overflow-hidden bg-[#0f0f0f] border border-white/5 p-8 rounded-2xl text-center transition-all duration-500 hover:bg-gold"
            >
              {/* Effet Grains de sable/or (Poussière dorée) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                   style={{ backgroundImage: `radial-gradient(circle, #000 1px, transparent 0)`, backgroundSize: '4px 4px' }} />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-black/10 transition-colors duration-500 text-gold group-hover:text-black">
                  {item.icon}
                </div>
                <h3 className="text-white font-serif text-xl mb-3 group-hover:text-black transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm font-sans leading-relaxed group-hover:text-black/70 transition-colors duration-500">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Mobile Money optimisée pour les petits écrans */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="mt-12 p-6 md:p-10 rounded-3xl border border-gold/30 text-center bg-gradient-to-b from-gold/[0.05] to-transparent"
        >
          <Heart className="w-6 h-6 text-gold mx-auto mb-4 animate-bounce" />
          <p className="text-white/90 font-serif text-base md:text-xl mb-8">
            "Le plus beau cadeau, c'est votre présence..."
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <div className="flex flex-col items-center p-4 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Orange Money</span>
              <span className="text-gold font-mono font-bold tracking-wider">6 99 33 24 56</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">MTN MoMo</span>
              <span className="text-gold font-mono font-bold tracking-wider">6 70 90 52 36</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContributionSection;