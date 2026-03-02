import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

// --- IMPORTATION DES PHOTOS ---
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
  { id: 1, src: img1, span: "md:col-span-2 md:row-span-2" }, // La grande photo à la une
  { id: 2, src: img2, span: "md:col-span-1 md:row-span-1" },
  { id: 3, src: img3, span: "md:col-span-1 md:row-span-1" },
  { id: 4, src: img4, span: "md:col-span-1 md:row-span-2" },
  { id: 5, src: img5, span: "md:col-span-1 md:row-span-1" },
  { id: 6, src: img6, span: "md:col-span-1 md:row-span-1" },
  { id: 7, src: img7, span: "md:col-span-1 md:row-span-1" },
  { id: 8, src: img8, span: "md:col-span-1 md:row-span-1" },
  { id: 9, src: img9, span: "md:col-span-2 md:row-span-1" }, // Une photo un peu plus large
  { id: 10, src: img10, span: "md:col-span-1 md:row-span-1" },
];

const PhotoGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const navigate = (dir: number) => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + dir + photos.length) % photos.length);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 15 }
    }
  };

  return (
    <section ref={ref} className="py-24 bg-[#080808] overflow-hidden relative border-t border-white/5">
      <div className="container max-w-6xl mx-auto px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <Sparkles className="text-[#D4AF37] w-5 h-5 mx-auto mb-4 animate-pulse" />
          <p className="font-sans text-[10px] tracking-[0.6em] uppercase text-[#D4AF37] mb-2 font-bold">Instants suspendus</p>
          <h2 className="font-serif text-4xl md:text-6xl text-white font-light italic">Album de Famille</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 grid-flow-row-dense gap-3 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02, zIndex: 20 }}
              onClick={() => setSelectedIndex(i)}
              className={`${photo.span} relative group cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-[#111] shadow-2xl h-[200px] md:h-auto`}
            >
              <img
                src={photo.src}
                alt={`Souvenir ${photo.id}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 backdrop-blur-md"
            onClick={() => setSelectedIndex(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-2 md:left-6 p-2 text-white/30 hover:text-[#D4AF37] transition-all"
            >
              <ChevronLeft size={48} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] flex items-center justify-center"
            >
              <img
                src={photos[selectedIndex].src}
                className="max-h-full max-w-full rounded-lg shadow-2xl object-contain border border-white/10"
              />
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-2 md:right-6 p-2 text-white/30 hover:text-[#D4AF37] transition-all"
            >
              <ChevronRight size={48} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;