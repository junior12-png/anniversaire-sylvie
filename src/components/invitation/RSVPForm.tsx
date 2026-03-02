import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Heart, Users, MessageSquare, Frown, Loader2, Wand2, X } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const RSVPForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    attending: "",
    guests: "0",
    message: "",
    contribution: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "responses"), {
        name: form.name,
        attending: form.attending,
        guests: form.attending === "Oui" ? parseInt(form.guests) : 0,
        contribution: form.attending === "Oui" ? form.contribution : "N/A",
        message: form.message,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Erreur Firebase:", error);
      alert("Erreur réseau. Réessaye pour maman !");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCagnotteSelection = (type: string) => {
    setForm({ ...form, contribution: `Cagnotte (${type})` });
    setShowPaymentModal(false);
  };

  return (
    <section ref={ref} className="py-24 bg-[#050505] relative overflow-hidden">
      {/* --- POP-UP PAIEMENT --- */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setShowPaymentModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative bg-[#0f0f0f] border border-gold/30 p-8 rounded-[2.5rem] max-w-sm w-full shadow-2xl"
            >
              <button onClick={() => setShowPaymentModal(false)} className="absolute top-6 right-6 text-white/40 hover:text-white">
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif text-2xl text-gold mb-2 text-center">Soutenir Maman</h3>
              <p className="text-white/40 text-[10px] uppercase tracking-widest text-center mb-8">Choisissez votre mode d'envoi</p>

              <div className="space-y-4">
                <button onClick={() => handleCagnotteSelection("Orange Money")} className="w-full p-4 bg-[#FF6600]/10 border border-[#FF6600]/20 rounded-2xl flex justify-between items-center group hover:bg-[#FF6600]/20 transition-all">
                  <div className="text-left">
                    <span className="block text-white font-bold text-sm">Orange Money</span>
                    <span className="block text-[#FF6600] font-mono text-xs">6 99 33 24 56</span>
                  </div>
                  <Check className={`w-5 h-5 text-[#FF6600] ${form.contribution === "Cagnotte (Orange Money)" ? "opacity-100" : "opacity-0"}`} />
                </button>

                <button onClick={() => handleCagnotteSelection("MTN MoMo")} className="w-full p-4 bg-[#FFCC00]/10 border border-[#FFCC00]/20 rounded-2xl flex justify-between items-center group hover:bg-[#FFCC00]/20 transition-all">
                  <div className="text-left">
                    <span className="block text-white font-bold text-sm">MTN MoMo</span>
                    <span className="block text-[#FFCC00] font-mono text-xs">670 90 52 36</span>
                  </div>
                  <Check className={`w-5 h-5 text-[#FFCC00] ${form.contribution === "Cagnotte (MTN MoMo)" ? "opacity-100" : "opacity-0"}`} />
                </button>

                <button onClick={() => handleCagnotteSelection("Enveloppe")} className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center group hover:bg-white/10 transition-all">
                  <div className="text-left">
                    <span className="block text-white font-bold text-sm">Enveloppe Physique</span>
                    <span className="block text-white/40 text-[10px]">À remettre le jour de la fête</span>
                  </div>
                  <Check className={`w-5 h-5 text-white ${form.contribution === "Cagnotte (Enveloppe)" ? "opacity-100" : "opacity-0"}`} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="container max-w-2xl mx-auto px-6 relative z-10">
        {/* ... (En-tête identique) */}
        <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-12">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <Check className="w-12 h-12 text-gold mx-auto mb-6" />
                <h3 className="font-serif text-3xl text-white mb-4">C'est validé !</h3>
                <p className="text-white/60">Maman Sylvie a hâte de vous embrasser.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-gold/40 text-[10px] uppercase">Modifier ma réponse</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Nom */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-gold/70"><Heart className="w-3 h-3" /> Nom Complet</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-gold/50 outline-none" placeholder="Ex: M. & Mme. Kamga" />
                </div>

                {/* Présence */}
                <div className="grid grid-cols-2 gap-4">
                  {["Oui", "Non"].map((id) => (
                    <button key={id} type="button" onClick={() => setForm({ ...form, attending: id })} className={`py-4 rounded-xl border transition-all ${form.attending === id ? "bg-gold text-black border-gold shadow-lg" : "bg-white/5 border-white/10 text-white/40"}`}>
                      {id === "Oui" ? "✨ Présent" : "Absent"}
                    </button>
                  ))}
                </div>

                {form.attending === "Oui" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                    {/* Accompagnants */}
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-gold/70">Nombre d'accompagnants</label>
                      <div className="grid grid-cols-4 gap-2">
                        {["0", "1", "2", "3"].map((n) => (
                          <button key={n} type="button" onClick={() => setForm({...form, guests: n})} className={`py-3 rounded-lg border transition-all ${form.guests === n ? "bg-white/20 border-gold" : "bg-white/5 border-white/10 text-white/40"}`}>{n === "0" ? "Seul" : `+${n}`}</button>
                        ))}
                      </div>
                    </div>

                    {/* Contributions */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold/70"><Wand2 className="w-3 h-3" /> Votre contribution</label>
                      <div className="grid grid-cols-1 gap-3">
                        <button type="button" onClick={() => setForm({...form, contribution: "Bouteille"})} className={`p-4 rounded-xl border text-left text-xs transition-all ${form.contribution === "Bouteille" ? "border-gold bg-gold/10 text-white" : "border-white/10 text-white/40"}`}>🍾 Je ramène une bouteille (Le Carburant)</button>

                        <button type="button" onClick={() => setShowPaymentModal(true)} className={`p-4 rounded-xl border text-left text-xs transition-all ${form.contribution.includes("Cagnotte") ? "border-gold bg-gold/10 text-white" : "border-white/10 text-white/40"}`}>
                          <div className="flex justify-between items-center">
                            <span>🧧 Je participe à la cagnotte (OM/MoMo/Env.)</span>
                            {form.contribution.includes("Cagnotte") && <span className="text-[9px] text-gold uppercase px-2 py-1 bg-gold/10 rounded-full border border-gold/30">Sélectionné</span>}
                          </div>
                        </button>

                        <button type="button" onClick={() => setForm({...form, contribution: "Cadeaux"})} className={`p-4 rounded-xl border text-left text-xs transition-all ${form.contribution === "Cadeaux" ? "border-gold bg-gold/10 text-white" : "border-white/10 text-white/40"}`}>🎁 Je viendrai avec des cadeaux pour la Reine</button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Message */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold/70"><MessageSquare className="w-3 h-3" /> Petit mot</label>
                  <textarea rows={3} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-gold/50 transition-all resize-none" placeholder="Un mot doux..."></textarea>
                </div>

                <motion.button type="submit" disabled={!form.name || !form.attending || (form.attending === "Oui" && !form.contribution) || isSubmitting} className="w-full bg-gold disabled:bg-white/10 py-5 rounded-xl text-black font-bold uppercase tracking-widest text-[10px] shadow-2xl transition-all">
                  {isSubmitting ? <Loader2 className="w-5 h-5 mx-auto animate-spin" /> : "Confirmer ma venue"}
                </motion.button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default RSVPForm;