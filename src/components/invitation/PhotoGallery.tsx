import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

// --- IMPORTATION (Tes assets restent les mêmes) ---
import img1 from "@/assets/1.jpeg";
import img2 from "@/assets/2.jpeg";
import img3 from "@/assets/3.jpeg";
import img4 from "@/assets/4.jpeg";
import img5 from "@/assets/5.jpeg";
import img6 from "@/assets/6.jpeg";
import img7 from "@/assets/7.jpeg";
import img8 from "@/assets/8.jpeg";
import img9 from "@/assets/9.jpeg";
import img10 from "@/assets/10.jpeg";

const photos = [
  { id: 1, src: img1, span: "col-span-2 row-span-2" },
  { id: 2, src: img2, span: "col-span-1 row-span-1" },
  { id: 3, src: img3, span: "col-span-1 row-span-1" },
  { id: 4, src: img4, span: "col-span-1 row-span-2" },
  { id: 5, src: img5, span: "col-span-1 row-span-1" },
  { id: 6, src: img6, span: "col-span-1 row-span-1" },
  { id: 7, src: img7, span: "col-span-1 row-span-1" },
  { id: 8, src: img8, span: "col-span-1 row-span-1" },
  { id: 9, src: img9, span: "col-span-2 row-span-1 md:col-span-2" },
  { id: 10, src: img10, span: "col-span-1 row-span-1" },
];

const PhotoGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const navigate = (dir: number) => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + dir + photos.length) % photos.length);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section ref={ref} className="py-20 bg-[#080808] border-t border-white/5">
      <div className="container max-w-6xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center mb-12"
        >
          <Sparkles className="text-gold w-5 h-5 mx-auto mb-4" />
          <p className="font-sans text-[9px] tracking-[0.5em] uppercase text-gold/60 mb-2">Instants précieux</p>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-light italic">Album de Famille</h2>
        </motion.div>

        {/* GRILLE OPTIMISÉE */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[150px] md:auto-rows-[200px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              variants={cardVariants}
              onClick={() => setSelectedIndex(i)}
              className={`${photo.span} relative group cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-[#111]`}
            >
              <img
                src={photo.src}
                alt="Souvenir"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* LIGHTBOX TACTILE */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center backdrop-blur-xl"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Bouton Fermer plus gros pour les pouces */}
            <button className="absolute top-8 right-8 z-[110] text-white/50 p-2">
              <X size={32} />
            </button>

            {/* Navigation (Cachée sur petit mobile pour laisser place au swipe) */}
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="hidden md:flex absolute left-6 p-4 text-white/20 hover:text-gold transition-all"
            >
              <ChevronLeft size={48} />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 50) navigate(-1);
                else if (info.offset.x < -50) navigate(1);
              }}
              className="w-full h-full flex items-center justify-center p-4 md:p-12"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[selectedIndex].src}
                className="max-h-full max-w-full rounded-lg shadow-2xl object-contain border border-white/10 select-none"
              />
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="hidden md:flex absolute right-6 p-4 text-white/20 hover:text-gold transition-all"
            >
              <ChevronRight size={48} />
            </button>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 text-[10px] tracking-[0.2em] md:hidden font-sans uppercase">
               Glissez pour défiler
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;