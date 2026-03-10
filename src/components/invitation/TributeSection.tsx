import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// --- COMPOSANT TEXTE AVEC ÉCLAT DORÉ ---
export const TributeText = ({ text = "", className = "" }: { text: string, className?: string }) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`${className} text-transparent bg-clip-text bg-gradient-to-br from-[#f8e6a5] via-[#c5a059] to-[#8a6d3b]`}
      style={{ textShadow: "0 0 15px rgba(197, 160, 89, 0.3)" }}
    >
      {text}
    </motion.p>
  );
};

// --- COMPOSANT SLIDER COMPACT ---
export const TributeSlider = ({ slides, title }: { slides: string[], title: string }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const delay = 7000 + Math.random() * 2000;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, delay);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="w-full py-4">
      <h3 className="text-center text-[10px] tracking-[0.4em] uppercase text-[#c5a059]/70 mb-4 font-bold italic">
        {title}
      </h3>

      <div className="relative min-h-[140px] flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <TributeText
            key={index}
            text={slides[index]}
            className="font-serif text-lg md:text-xl italic text-center leading-[1.6] max-w-xl"
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- SECTION PRINCIPALE ---
const TributeSection = () => {
  const level1 = [
    "Maman, tu es la racine de notre vie et la source de notre courage. Quand je te vois prier, je sens que le ciel s’ouvre pour nous. Tu as porté nos joies et nos peines avec une force silencieuse qui ne peut venir que de Dieu.",
    "Maman, ton sourire est comme une lampe qui ne s’éteint jamais. Même dans nos nuits les plus sombres, ta voix douce et tes plats préparés avec amour nous redonnent espoir.",
    "Maman, tu es mon refuge. Tes bras sont le lieu où je trouve la paix, et tes prières sont le manteau qui me protège du monde.",
    "Maman, tu es mon héroïne. Tu as toujours cru en moi, même quand je doutais de moi-même. Tes prières sont mon armure et ton amour est mon abri.",
    "À notre Maman, lumière de notre maison et étoile de nos vies. Merci pour tes sacrifices, pour tes prières, et pour ce Ndolé qui rassemble nos cœurs comme une bénédiction éternelle."
  ];

  const level2 = [
    "À mon petit rayon de soleil qui a bien grandi, te voir franchir cette nouvelle étape me rappelle tous nos souvenirs d’enfance. Je suis si fière de la personne que tu deviens.",
    "Joyeux anniversaire à mon modèle ! Merci d'être ce guide et ce pilier sur qui je peux toujours compter. Ta présence est mon plus beau cadeau.",
    "On dit que les sœurs sont les meilleures amies que la nature nous donne. Merci pour ton écoute, ta patience et ta bienveillance. Je t'adore !",
    "Bon anniversaire ! Avoir un(e) frère/sœur comme toi est une chance. Merci de m'avoir ouvert la voie, je serai toujours là pour assurer tes arrières !"
  ];

  const level3 = [
    "Joyeux anniversaire ! Ta présence apporte une lumière et une énergie qui nous tirent tous vers le haut. Toute notre communauté s'unit pour te souhaiter le meilleur.",
    "À notre chère présidente, nous avons la chance de pouvoir compter sur ton dévouement. Que chaque instant de ta journée soit rempli de douceur.",
    "Plus qu'une simple réunion, nous formons grâce à toi une véritable famille. Santé, bonheur et projets accomplis."
  ];

  return (
    <section className="bg-[#0a0a0a] text-white py-12">
      <div className="container max-w-xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl italic text-[#c5a059] font-light tracking-wide drop-shadow-lg">
            Une vie bénie
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          <TributeSlider title="Cœur d'une Mère" slides={level1} />
          <TributeSlider title="La Fratrie Unie" slides={level2} />
          <TributeSlider title="Cœur de notre Communauté" slides={level3} />
        </div>
      </div>
    </section>
  );
};

export default TributeSection;