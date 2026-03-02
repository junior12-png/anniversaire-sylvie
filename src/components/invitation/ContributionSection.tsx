import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wand2, Gift, Beer, Music, Heart } from "lucide-react";

const ContributionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const contributions = [
    {
      icon: <Music className="w-6 h-6 text-gold" />,
      title: "DJ d'un soir",
      desc: "Préparez vos meilleurs pas de danse (même les plus honteux)."
    },
    {
      icon: <Beer className="w-6 h-6 text-gold" />,
      title: "Le Carburant",
      desc: "Une bouteille de votre choix pour lever nos verres ensemble."
    },
    {
      icon: <Gift className="w-6 h-6 text-gold" />,
      title: "La Cagnotte Magique",
      desc: "Une petite enveloppe pour aider à financer les rêves de la reine."
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Effet de particules en fond */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-2 h-2 bg-gold rounded-full animate-ping" />
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-white rounded-full animate-pulse" />
      </div>

      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <Wand2 className="w-8 h-8 text-gold mx-auto mb-4 animate-spin-slow" />
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">
            Devenez <span className="italic text-gold">Magicien</span> d'un jour
          </h2>
          <p className="text-white/60 font-sans max-w-2xl mx-auto leading-relaxed">
            Parce qu’organiser une fête royale demande un peu de poudre de perlimpinpin,
            voici comment vous pouvez nous aider à rendre ce moment inoubliable !
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contributions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2, type: "spring" }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl text-center group hover:border-gold/50 transition-colors"
            >
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-white font-serif text-xl mb-3">{item.title}</h3>
              <p className="text-white/40 text-sm font-sans leading-relaxed italic">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 p-8 rounded-3xl border-2 border-dashed border-gold/20 text-center bg-gold/[0.02]"
        >
          <Heart className="w-6 h-6 text-gold mx-auto mb-4 fill-gold/20" />
          <p className="text-white/80 font-serif text-lg">
            "Le plus beau cadeau, c'est votre présence... <br className="hidden md:block"/>
            <span className="text-sm text-white/40 font-sans">(Mais si vous ramenez du rab, on ne dira pas non !)</span>"
          </p>

          {/* Optionnel : Bouton vers une cagnotte en ligne ou infos Mobile Money */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
             <div className="px-6 py-3 bg-white/5 rounded-full border border-white/10 text-[10px] text-gold uppercase tracking-[0.2em]">
                Orange Money : [Ton numéro]
             </div>
             <div className="px-6 py-3 bg-white/5 rounded-full border border-white/10 text-[10px] text-gold uppercase tracking-[0.2em]">
                MTN MoMo : [Ton numéro]
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Animation personnalisée pour la baguette
const style = document.createElement('style');
style.textContent = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }
`;
if (typeof document !== 'undefined') document.head.appendChild(style);

export default ContributionSection;