import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Heart, MessageSquare, Loader2, Wand2, X, Copy, Frown } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const RSVPForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    attending: "",
    guests: "0",
    message: "",
    contribution: "",
  });

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "responses"), {
        ...form,
        guests: form.attending === "Oui" ? parseInt(form.guests) : 0,
        contribution: form.attending === "Oui" ? form.contribution : "N/A",
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (error) {
      alert("Erreur de connexion. Réessaye pour Maman Sylvie !");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="rsvp" className="py-20 bg-[#050505] relative overflow-hidden">

      {/* --- MODAL PAIEMENT --- */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
              onClick={() => setShowPaymentModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
              className="relative bg-[#0f0f0f] border border-gold/20 p-6 md:p-8 rounded-[2rem] max-w-sm w-full shadow-2xl"
            >
              <button onClick={() => setShowPaymentModal(false)} className="absolute top-5 right-5 text-white/20 hover:text-white">
                <X size={24} />
              </button>
              <h3 className="font-serif text-2xl text-gold mb-6 text-center italic">Soutenir Maman</h3>
              <div className="space-y-3">
                <div className="relative">
                  <button onClick={() => { setForm({...form, contribution: "Orange Money"}); setShowPaymentModal(false); }} className="w-full p-4 bg-[#FF6600]/5 border border-[#FF6600]/20 rounded-2xl flex justify-between items-center text-left">
                    <div>
                      <span className="block text-white font-bold text-sm">Orange Money</span>
                      <span className="block text-[#FF6600] font-mono text-xs">699332456</span>
                    </div>
                  </button>
                  <button onClick={() => copyToClipboard("699332456", "orange")} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/5 rounded-lg text-[#FF6600]">
                    {copied === "orange" ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <div className="relative">
                  <button onClick={() => { setForm({...form, contribution: "MTN MoMo"}); setShowPaymentModal(false); }} className="w-full p-4 bg-[#FFCC00]/5 border border-[#FFCC00]/20 rounded-2xl flex justify-between items-center text-left">
                    <div>
                      <span className="block text-white font-bold text-sm">MTN MoMo</span>
                      <span className="block text-[#FFCC00] font-mono text-xs">670905236</span>
                    </div>
                  </button>
                  <button onClick={() => copyToClipboard("670905236", "mtn")} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/5 rounded-lg text-[#FFCC00]">
                    {copied === "mtn" ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <button onClick={() => { setForm({...form, contribution: "Enveloppe"}); setShowPaymentModal(false); }} className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-left">
                  <span className="block text-white font-bold text-sm">Enveloppe Physique</span>
                  <span className="block text-white/40 text-[10px] uppercase">Le jour de la fête</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="container max-w-xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-gold font-sans text-[10px] tracking-[0.4em] uppercase mb-2">Réservation</p>
          <h2 className="text-3xl md:text-5xl font-serif text-white italic">Serez-vous des nôtres ?</h2>
        </div>

        <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-6 md:p-10 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
                <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="text-gold w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl text-white mb-2">C'est enregistré !</h3>
                <p className="text-white/50 text-sm mb-8">{form.attending === "Oui" ? "Maman Sylvie a hâte de vous voir !" : "Maman Sylvie a bien reçu votre message."}</p>
                <button onClick={() => setSubmitted(false)} className="text-gold/50 text-[10px] uppercase tracking-widest border-b border-gold/20 pb-1">Modifier ma réponse</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-gold/60 ml-2 italic">Votre Nom complet</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-gold/50 outline-none transition-all placeholder:text-white/10" placeholder="Ex: Famille Kamga" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {["Oui", "Non"].map((status) => (
                    <button key={status} type="button" onClick={() => setForm({...form, attending: status})} className={`py-4 rounded-2xl border transition-all font-sans text-xs uppercase tracking-widest ${form.attending === status ? (status === "Oui" ? "bg-gold text-black border-gold" : "bg-white/20 text-white border-white/40") : "bg-white/5 border-white/10 text-white/40"}`}>
                      {status === "Oui" ? "✨ Présent" : "Désolé(e)"}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {form.attending === "Oui" && (
                    <motion.div key="present" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-6 overflow-hidden">
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-gold/60 ml-2 italic">Accompagnants</label>
                        <div className="grid grid-cols-4 gap-2">
                          {["0", "1", "2", "3"].map((n) => (
                            <button key={n} type="button" onClick={() => setForm({...form, guests: n})} className={`py-3 rounded-xl border text-[10px] transition-all ${form.guests === n ? "bg-white/10 border-gold text-white" : "bg-white/5 border-white/10 text-white/40"}`}>{n === "0" ? "Seul" : `+${n}`}</button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-gold/60 ml-2 italic">Cadeau / Contribution</label>
                        <button type="button" onClick={() => setShowPaymentModal(true)} className={`w-full p-4 rounded-2xl border text-left flex justify-between items-center transition-all ${form.contribution ? "border-gold/50 bg-gold/5" : "border-white/10 bg-white/5"}`}>
                          <span className={`text-xs ${form.contribution ? "text-white" : "text-white/40"}`}>{form.contribution || "Choisir une option..."}</span>
                          <Wand2 size={14} className="text-gold/50" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-gold/60 ml-2 italic text-center block">Un mot doux pour ses 50 ans ?</label>
                        <textarea rows={3} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-gold/50 transition-all resize-none text-sm placeholder:text-white/10" placeholder="Écrivez ici..." />
                      </div>
                    </motion.div>
                  )}

                  {form.attending === "Non" && (
                    <motion.div key="absent" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-4 overflow-hidden">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                        <Frown className="w-5 h-5 mx-auto mb-2 text-white/40" />
                        <p className="text-[10px] text-white/40 italic uppercase tracking-wider leading-relaxed">Maman Sylvie sera triste de ne pas vous voir, mais elle comprendra.</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 ml-2 italic">Raison de l'absence / Petit mot</label>
                        <textarea rows={3} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-white/30 transition-all resize-none text-sm placeholder:text-white/10" placeholder="Un empêchement ? Laissez-lui un mot..." />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button type="submit" disabled={!form.name || !form.attending || isSubmitting} className="w-full bg-gold py-5 rounded-2xl text-black font-bold uppercase tracking-[0.2em] text-[10px] active:scale-[0.98] disabled:opacity-20 transition-all shadow-xl shadow-gold/10 mt-4">
                  {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : (form.attending === "Non" ? "Envoyer mon message" : "Confirmer ma présence")}
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default RSVPForm;