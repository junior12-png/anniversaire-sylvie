/**
 * RSVPForm.tsx — Formulaire RSVP revu et épuré
 *
 * Changements :
 *  - Style luxe doré cohérent avec le reste
 *  - Suppression du MTN MoMo (Orange Money uniquement)
 *  - Suppression du champ accompagnants
 */

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Heart, Loader2, Wand2, X, Copy, Frown, Smartphone } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/* ── FONT ─────────────────────────────────────────────────────────── */
const FontStyle = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@1,300;1,400;1,600&display=swap');`}</style>
);

/* ── GOLD INPUT ───────────────────────────────────────────────────── */
const GoldInput = ({
  placeholder, value, onChange, type = "text", required = false,
}: {
  placeholder: string; value: string;
  onChange: (v: string) => void;
  type?: string; required?: boolean;
}) => (
  <input
    type={type}
    required={required}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    style={{
      width: "100%", boxSizing: "border-box",
      background: "rgba(212,175,55,0.04)",
      border: "1px solid rgba(212,175,55,0.18)",
      borderRadius: 16, padding: "clamp(0.85rem, 2vw, 1rem) clamp(1rem, 2.5vw, 1.4rem)",
      color: "white", outline: "none",
      fontFamily: "'Cormorant Garamond', serif",
      fontStyle: "italic",
      fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
      letterSpacing: "0.03em",
      transition: "border-color 0.3s",
    }}
    onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
    onBlur={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.18)")}
  />
);

const GoldTextarea = ({
  placeholder, value, onChange, rows = 3,
}: {
  placeholder: string; value: string;
  onChange: (v: string) => void;
  rows?: number;
}) => (
  <textarea
    rows={rows}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    style={{
      width: "100%", boxSizing: "border-box",
      background: "rgba(212,175,55,0.04)",
      border: "1px solid rgba(212,175,55,0.18)",
      borderRadius: 16, padding: "clamp(0.85rem, 2vw, 1rem) clamp(1rem, 2.5vw, 1.4rem)",
      color: "white", outline: "none", resize: "none",
      fontFamily: "'Cormorant Garamond', serif",
      fontStyle: "italic",
      fontSize: "clamp(0.88rem, 2vw, 1rem)",
      letterSpacing: "0.03em",
      transition: "border-color 0.3s",
    }}
    onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
    onBlur={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.18)")}
  />
);

/* ── LABEL ────────────────────────────────────────────────────────── */
const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontFamily: "sans-serif",
    fontSize: "clamp(0.5rem, 1.2vw, 0.6rem)",
    letterSpacing: "0.35em",
    textTransform: "uppercase",
    color: "rgba(212,175,55,0.55)",
    marginBottom: 8,
  }}>{children}</p>
);

/* ── PAYMENT MODAL (Orange Money only) ───────────────────────────── */
const PaymentModal = ({ onSelect, onClose }: {
  onSelect: (v: string) => void;
  onClose: () => void;
}) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText("699332456");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 1rem" }}>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.94)", backdropFilter: "blur(12px)" }}
      />
      <motion.div
        initial={{ scale: 0.88, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.88, y: 50 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        style={{
          position: "relative", maxWidth: 380, width: "100%",
          background: "linear-gradient(145deg, #1c1504, #0f0b02, #1a1200)",
          border: "1px solid rgba(212,175,55,0.3)",
          borderRadius: 28,
          padding: "clamp(1.8rem, 5vw, 2.6rem)",
          overflow: "hidden",
        }}
      >
        {/* Shimmer */}
        <motion.div
          animate={{ x: ["-120%", "180%"] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
          style={{
            position: "absolute", top: 0, left: 0, width: "40%", height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.06), transparent)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)" }} />

        <button onClick={onClose} style={{
          position: "absolute", top: 14, right: 14,
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "50%", width: 32, height: 32,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "rgba(255,255,255,0.4)",
        }}><X size={16} /></button>

        <h3 style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
          color: "#d4af37",
          textAlign: "center",
          letterSpacing: "0.06em",
          marginBottom: 20,
        }}>Soutenir Maman</h3>

        {/* Orange Money */}
        <div style={{
          background: "rgba(255,102,0,0.06)",
          border: "1px solid rgba(255,102,0,0.25)",
          borderRadius: 16,
          padding: "clamp(1rem, 3vw, 1.4rem)",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "rgba(255,102,0,0.12)",
              border: "1px solid rgba(255,102,0,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Smartphone size={17} style={{ color: "#FF6600" }} />
            </div>
            <div>
              <p style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "0.65rem", color: "white", letterSpacing: "0.04em" }}>Orange Money</p>
              <p style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#FF6600", letterSpacing: "0.12em", marginTop: 2 }}>699 332 456</p>
            </div>
          </div>
          <button onClick={copy} style={{
            background: copied ? "rgba(212,175,55,0.15)" : "rgba(255,102,0,0.1)",
            border: `1px solid ${copied ? "rgba(212,175,55,0.4)" : "rgba(255,102,0,0.3)"}`,
            borderRadius: 10, padding: "6px 10px", cursor: "pointer",
            color: copied ? "#d4af37" : "#FF6600",
            fontFamily: "sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em",
            display: "flex", alignItems: "center", gap: 4,
          }}>
            {copied ? <Check size={13} /> : <Copy size={13} />}
          </button>
        </div>

        {/* Envelope option */}
        <button
          onClick={() => { onSelect("Enveloppe"); onClose(); }}
          style={{
            width: "100%", padding: "clamp(0.8rem, 2vw, 1rem)",
            background: "rgba(212,175,55,0.04)",
            border: "1px solid rgba(212,175,55,0.18)",
            borderRadius: 14, cursor: "pointer", textAlign: "left",
          }}
        >
          <p style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "0.65rem", color: "white", letterSpacing: "0.04em" }}>Enveloppe Physique</p>
          <p style={{ fontFamily: "sans-serif", fontSize: "0.5rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 3 }}>Le jour de la fête</p>
        </button>

        <button
          onClick={() => { onSelect("Orange Money"); onClose(); }}
          style={{
            marginTop: 14, width: "100%",
            background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(255,215,0,0.08))",
            border: "1px solid rgba(212,175,55,0.3)",
            borderRadius: 14, padding: "clamp(0.75rem, 2vw, 0.9rem)",
            cursor: "pointer",
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(0.55rem, 1.4vw, 0.68rem)",
            color: "#d4af37", letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Sélectionner Orange Money
        </button>
      </motion.div>
    </div>
  );
};

/* ── MAIN FORM ────────────────────────────────────────────────────── */
const RSVPForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const [form, setForm] = useState({
    name: "",
    attending: "",
    message: "",
    contribution: "",
  });

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "responses"), {
        ...form,
        contribution: form.attending === "Oui" ? form.contribution : "N/A",
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch {
      alert("Erreur de connexion. Réessayez pour Maman Sylvie !");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <FontStyle />
      <section ref={ref} id="rsvp" style={{
        padding: "clamp(3rem, 8vw, 6rem) 0",
        background: "#050505",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)",
          width: "clamp(200px, 60vw, 600px)", height: "clamp(200px, 60vw, 600px)",
          background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 65%)",
          borderRadius: "50%", filter: "blur(50px)", pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)", position: "relative", zIndex: 1 }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.9 }}
            style={{ textAlign: "center", marginBottom: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            <p style={{ fontFamily: "sans-serif", fontSize: "clamp(0.5rem, 1.3vw, 0.65rem)", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(212,175,55,0.55)", marginBottom: 10 }}>
              Réservation
            </p>
            <h2 style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "clamp(1.2rem, 3.5vw, 2rem)",
              color: "transparent",
              background: "linear-gradient(135deg, #bf953f, #fcf6ba, #b38728)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.05em",
            }}>
              Serez-vous des nôtres ?
            </h2>
            <div style={{ height: 1, width: 50, background: "linear-gradient(90deg, transparent, #d4af37, transparent)", margin: "14px auto 0" }} />
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            style={{
              background: "linear-gradient(145deg, #151003, #0a0800, #131002)",
              border: "1px solid rgba(212,175,55,0.2)",
              borderRadius: 28,
              padding: "clamp(1.8rem, 5vw, 3rem)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ambient shimmer */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
              style={{
                position: "absolute", top: 0, left: 0, width: "35%", height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.04), transparent)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "absolute", top: 0, left: "18%", right: "18%", height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)" }} />

            {/* Corner marks */}
            {[{ top: 12, left: 12, borderWidth: "1px 0 0 1px" }, { top: 12, right: 12, borderWidth: "1px 1px 0 0" },
              { bottom: 12, left: 12, borderWidth: "0 0 1px 1px" }, { bottom: 12, right: 12, borderWidth: "0 1px 1px 0" }
            ].map((pos, i) => (
              <div key={i} style={{ position: "absolute", width: 14, height: 14, borderStyle: "solid", borderColor: "rgba(212,175,55,0.25)", borderWidth: pos.borderWidth, ...pos }} />
            ))}

            <AnimatePresence mode="wait">
              {submitted ? (
                /* ── SUCCESS ── */
                <motion.div
                  key="success"
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{ textAlign: "center", padding: "clamp(1.5rem, 4vw, 2.5rem) 0" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 10 }}
                    style={{
                      width: 72, height: 72, borderRadius: "50%",
                      background: "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(255,215,0,0.1))",
                      border: "1px solid rgba(212,175,55,0.4)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <Check size={30} style={{ color: "#d4af37" }} />
                  </motion.div>

                  <h3 style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
                    color: "#f0d98a",
                    letterSpacing: "0.06em",
                    marginBottom: 10,
                  }}>C'est enregistré !</h3>

                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "clamp(0.88rem, 2vw, 1.05rem)",
                    marginBottom: 24,
                  }}>
                    {form.attending === "Oui"
                      ? "Maman Sylvie a hâte de vous voir !"
                      : "Maman Sylvie a bien reçu votre message."}
                  </p>

                  <button
                    onClick={() => setSubmitted(false)}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      fontFamily: "sans-serif",
                      fontSize: "clamp(0.5rem, 1.2vw, 0.6rem)",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(212,175,55,0.4)",
                      borderBottom: "1px solid rgba(212,175,55,0.2)",
                      paddingBottom: 2,
                    }}
                  >
                    Modifier ma réponse
                  </button>
                </motion.div>
              ) : (
                /* ── FORM ── */
                <form key="form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 22, position: "relative", zIndex: 1 }}>

                  {/* Name */}
                  <div>
                    <FieldLabel>Votre nom complet</FieldLabel>
                    <GoldInput
                      placeholder="Ex: Famille Kamga"
                      value={form.name}
                      onChange={(v) => set("name", v)}
                      required
                    />
                  </div>

                  {/* Attending */}
                  <div>
                    <FieldLabel>Serez-vous présent(e) ?</FieldLabel>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {["Oui", "Non"].map((status) => (
                        <motion.button
                          key={status}
                          type="button"
                          onClick={() => set("attending", status)}
                          whileTap={{ scale: 0.96 }}
                          style={{
                            padding: "clamp(0.8rem, 2vw, 1.1rem)",
                            borderRadius: 16,
                            border: `1px solid ${form.attending === status
                              ? (status === "Oui" ? "rgba(212,175,55,0.7)" : "rgba(255,255,255,0.35)")
                              : "rgba(255,255,255,0.08)"}`,
                            background: form.attending === status
                              ? (status === "Oui"
                                ? "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(255,215,0,0.1))"
                                : "rgba(255,255,255,0.06)")
                              : "rgba(255,255,255,0.02)",
                            cursor: "pointer",
                            fontFamily: "'Cinzel Decorative', serif",
                            fontSize: "clamp(0.55rem, 1.3vw, 0.68rem)",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: form.attending === status
                              ? (status === "Oui" ? "#d4af37" : "rgba(255,255,255,0.7)")
                              : "rgba(255,255,255,0.25)",
                            transition: "all 0.3s",
                          }}
                        >
                          {status === "Oui" ? "✨ Présent(e)" : "Désolé(e)"}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {form.attending === "Oui" && (
                      <motion.div
                        key="present"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ display: "flex", flexDirection: "column", gap: 20, overflow: "hidden" }}
                      >
                        {/* Contribution */}
                        <div>
                          <FieldLabel>Cadeau / Contribution</FieldLabel>
                          <button
                            type="button"
                            onClick={() => setShowPayment(true)}
                            style={{
                              width: "100%",
                              background: form.contribution ? "rgba(212,175,55,0.06)" : "rgba(212,175,55,0.03)",
                              border: `1px solid ${form.contribution ? "rgba(212,175,55,0.4)" : "rgba(212,175,55,0.15)"}`,
                              borderRadius: 16,
                              padding: "clamp(0.85rem, 2vw, 1rem) clamp(1rem, 2.5vw, 1.4rem)",
                              display: "flex", justifyContent: "space-between", alignItems: "center",
                              cursor: "pointer", textAlign: "left",
                              transition: "all 0.3s",
                            }}
                          >
                            <span style={{
                              fontFamily: "'Cormorant Garamond', serif",
                              fontStyle: "italic",
                              fontSize: "clamp(0.88rem, 2vw, 1rem)",
                              color: form.contribution ? "#d4af37" : "rgba(255,255,255,0.2)",
                              letterSpacing: "0.03em",
                            }}>
                              {form.contribution || "Choisir une option…"}
                            </span>
                            <Wand2 size={15} style={{ color: "rgba(212,175,55,0.5)" }} />
                          </button>
                        </div>

                        {/* Message */}
                        <div>
                          <FieldLabel>Un mot doux pour ses 50 ans ?</FieldLabel>
                          <GoldTextarea
                            placeholder="Écrivez ici votre message d'amour…"
                            value={form.message}
                            onChange={(v) => set("message", v)}
                            rows={3}
                          />
                        </div>
                      </motion.div>
                    )}

                    {form.attending === "Non" && (
                      <motion.div
                        key="absent"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ display: "flex", flexDirection: "column", gap: 16, overflow: "hidden" }}
                      >
                        <div style={{
                          padding: "clamp(0.8rem, 2vw, 1rem)",
                          borderRadius: 16,
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          textAlign: "center",
                        }}>
                          <Frown size={18} style={{ color: "rgba(255,255,255,0.25)", margin: "0 auto 8px" }} />
                          <p style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontStyle: "italic",
                            fontSize: "clamp(0.78rem, 1.8vw, 0.92rem)",
                            color: "rgba(255,255,255,0.3)",
                            letterSpacing: "0.04em",
                            lineHeight: 1.6,
                          }}>
                            Maman Sylvie sera triste de ne pas vous voir, mais elle comprendra.
                          </p>
                        </div>
                        <div>
                          <FieldLabel>Raison / Petit mot</FieldLabel>
                          <GoldTextarea
                            placeholder="Un empêchement ? Laissez-lui un mot d'amour…"
                            value={form.message}
                            onChange={(v) => set("message", v)}
                            rows={3}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={!form.name || !form.attending || isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02, boxShadow: "0 14px 40px rgba(212,175,55,0.3)" } : {}}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: "clamp(0.9rem, 2.5vw, 1.2rem)",
                      background: !form.name || !form.attending
                        ? "rgba(212,175,55,0.1)"
                        : "linear-gradient(135deg, #b8920e, #f0c842, #d4af37, #f0c842, #b8920e)",
                      backgroundSize: "300% 100%",
                      borderRadius: 16,
                      border: `1px solid ${!form.name || !form.attending ? "rgba(212,175,55,0.15)" : "transparent"}`,
                      cursor: !form.name || !form.attending ? "not-allowed" : "pointer",
                      fontFamily: "'Cinzel Decorative', serif",
                      fontSize: "clamp(0.58rem, 1.4vw, 0.72rem)",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: !form.name || !form.attending ? "rgba(212,175,55,0.3)" : "#1a0f00",
                      fontWeight: "bold",
                      transition: "all 0.3s",
                      marginTop: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    {isSubmitting
                      ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                      : form.attending === "Non"
                        ? "Envoyer mon message"
                        : <>
                            <Heart size={14} fill="rgba(26,15,0,0.5)" />
                            Confirmer ma présence
                          </>
                    }
                  </motion.button>

                  <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Payment modal */}
      <AnimatePresence>
        {showPayment && (
          <PaymentModal
            onSelect={(v) => setForm(f => ({ ...f, contribution: v }))}
            onClose={() => setShowPayment(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default RSVPForm;