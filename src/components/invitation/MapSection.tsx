import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Navigation } from "lucide-react";

const MapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // LIEN GPS : Google Maps direct
  const mapSearchUrl = "https://www.google.com/maps/search/?api=1&query=Ndogpassi+III+Douala";

  // IFRAME : Zone de Ndogpassi (Utilise une URL embed réelle si possible)
  const iframeSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.943!2d9.78!3d4.02!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMDEnMTIuMCJOIDnCsDQ2JzQ4LjAiRQ!5e0!3m2!1sfr!2scm!4v1620000000000";

  return (
    <section ref={ref} className="py-20 bg-[#080808] relative overflow-hidden">
      <div className="container max-w-6xl mx-auto px-6">

        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex p-3 rounded-full bg-gold/10 mb-4 md:mb-6">
            <MapPin className="text-gold w-5 h-5 md:w-6 md:h-6 animate-bounce" />
          </div>
          <p className="font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-2">
            Localisation
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-light leading-tight">
            Rendez-vous à <span className="italic text-gold">Ndogpassi</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">

          {/* INFOS ADRESSE - Toujours en haut sur mobile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-6 md:space-y-8 order-2 lg:order-1"
          >
            <div className="border-l-2 border-gold/30 pl-5">
              <h3 className="text-white font-serif text-xl md:text-2xl mb-3">Lieu de la fête</h3>
              <p className="text-white/60 font-sans text-sm leading-relaxed">
                <strong className="text-gold font-medium">Ndogpassi III</strong><br />
                Zone de Recasements<br />
                Près de l'École Publique<br />
                <span className="text-white/40 italic">Douala, Cameroun</span>
              </p>
            </div>

            <div className="pt-2">
              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-gold text-black w-full sm:w-auto px-8 py-4 rounded-full font-sans text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(212,175,55,0.2)] active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                Ouvrir l'itinéraire
              </a>
            </div>
          </motion.div>

          {/* LA CARTE - Responsive height */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="lg:col-span-2 relative group order-1 lg:order-2"
          >
            {/* Effet de lueur derrière la carte */}
            <div className="absolute -inset-1 bg-gold/20 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-700"></div>

            <div className="relative rounded-2xl overflow-hidden border border-white/10 h-[300px] md:h-[450px] shadow-2xl">
              <iframe
                src={iframeSrc}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(1) invert(92%) contrast(85%) brightness(95%)"
                }}
                allowFullScreen
                loading="lazy"
                title="Localisation Ndogpassi"
              />
              {/* Overlay pour empêcher le scroll accidentel sur mobile */}
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl"></div>
            </div>
          </motion.div>
        </div>

        {/* Message final citation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-12 md:mt-16 p-6 md:p-8 border border-white/5 rounded-2xl bg-white/[0.01] text-center"
        >
          <p className="font-serif italic text-white/40 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            "La route du bonheur passe par Ndogpassi ce jour-là."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;