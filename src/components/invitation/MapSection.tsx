import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Navigation } from "lucide-react";

const MapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  // LIEN GPS : Cible précisément l'école publique de Ndogpassi
  const mapSearchUrl = "https://www.google.com/maps/search/Ecole+Publique+Ndogpassi+Douala";

  // IFRAME : Zone de Ndogpassi
  const iframeSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15919.46782299712!2d9.7675!3d4.0125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10610d0f8c37d97b%3A0x6b7b8a7b8a7b8a7b!2sNdogpassi%2C+Douala!5e0!3m2!1sfr!2scm!4v1700000000000!5m2!1sfr!2scm";

  return (
    <section ref={ref} className="py-24 bg-[#080808] relative">
      <div className="container max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block p-3 rounded-full bg-gold/10 mb-6">
            <MapPin className="text-gold w-6 h-6 animate-bounce" />
          </div>
          <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/60 mb-2">
            Localisation
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-light text-center">
            Rendez-vous à <span className="italic text-gold text-center">Ndogpassi</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

          {/* INFOS ADRESSE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="border-l-2 border-gold/30 pl-6">
              <h3 className="text-white font-serif text-2xl mb-2">Lieu de la fête</h3>
              <p className="text-white/60 font-sans text-sm leading-relaxed">
                <strong className="text-gold font-medium">Ndogpassi III</strong><br />
                Zone de Recasements<br />
                Près de l'École Publique<br />
                Douala, Cameroun
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gold/80 text-xs font-sans tracking-wider uppercase">Itinéraire</p>
              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gold text-black px-8 py-4 rounded-full font-sans text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(212,175,55,0.2)] group"
              >
                <Navigation className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Ouvrir dans Maps
              </a>
            </div>
          </motion.div>

          {/* LA CARTE IFRAME */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="lg:col-span-2 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-transparent rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>

            <div className="relative rounded-2xl overflow-hidden border border-white/10 h-[400px] shadow-2xl">
              <iframe
                src={iframeSrc}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Ndogpassi"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-16 p-6 border border-white/5 rounded-xl bg-white/[0.02] text-center"
        >
          <p className="font-serif italic text-white/50 text-sm">
            "La route du bonheur passe par Ndogpassi ce jour-là."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;