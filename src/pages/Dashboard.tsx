import { useState, useEffect, ReactNode } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, Gift, Beer,
  Wallet, Crown, Lock, Eye, EyeOff, UserCheck, XCircle
} from "lucide-react";

// --- INTERFACES ---
interface ResponseData {
  id: string;
  name: string;
  attending: string;
  guests: number;
  contribution: string;
  message: string;
  createdAt: Timestamp | null;
}

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number;
  subtext: string;
  isPrimary?: boolean;
}

const Dashboard = () => {
  const [responses, setResponses] = useState<ResponseData[]>([]);
  const [loading, setLoading] = useState(true);

  // --- ÉTATS D'AUTHENTIFICATION ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(collection(db, "responses"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ResponseData[];
      setResponses(data);
      setLoading(false);
    }, (err) => {
      console.error("Erreur Firebase:", err);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === "maman50") { // Acceptation minuscule/majuscule
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  // --- CALCULS DES STATS ---
  const totalInvites = responses.filter(r => r.attending === "Oui").reduce((acc, r) => acc + 1 + Number(r.guests || 0), 0);
  const totalOui = responses.filter(r => r.attending === "Oui").length;
  const totalBouteilles = responses.filter(r => r.contribution === "Bouteille").length;
  const totalCagnotte = responses.filter(r => r.contribution.includes("Cagnotte")).length;
  const totalCadeaux = responses.filter(r => r.contribution === "Cadeaux").length;

  // --- ÉCRAN DE CONNEXION ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-4 font-sans">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gold/20 p-8 rounded-[2rem] shadow-2xl max-w-sm w-full text-center relative"
        >
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-gold" />
          </div>
          <h2 className="font-serif text-2xl text-[#1a1a1a] mb-2 italic">Accès Privé</h2>
          <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-8 font-bold">Administration Sylvie 50</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                className={`w-full p-4 bg-gray-50 border ${error ? 'border-red-500' : 'border-gold/20'} rounded-xl outline-none focus:ring-2 focus:ring-gold/30 transition-all text-center font-bold`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1a1a1a] text-white py-4 rounded-xl font-bold active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              Se connecter
            </button>
          </form>
          {error && <p className="text-red-500 text-xs mt-4 font-bold uppercase tracking-tighter italic">Accès refusé</p>}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2D2D] font-sans">
      {/* HEADER */}
      <div className="bg-white border-b border-gold/10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="font-serif text-xl md:text-3xl italic">Le Livre d'Or</h1>
            <p className="text-[9px] uppercase tracking-widest text-gold font-bold">50 Ans de Grâce</p>
          </div>
          <div className="flex gap-2">
            <div className="bg-gold/5 px-4 py-2 rounded-xl border border-gold/20 text-center">
               <span className="block text-xl font-serif text-gold leading-none">{totalInvites}</span>
               <span className="text-[8px] uppercase font-bold text-gray-400">Total Humains</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <StatCard icon={<UserCheck className="w-4 h-4"/>} label="Présents" value={totalOui} subtext="Confirmés" isPrimary />
          <StatCard icon={<Beer className="w-4 h-4 text-blue-500"/>} label="Boissons" value={totalBouteilles} subtext="Ndolé & Vins" />
          <StatCard icon={<Wallet className="w-4 h-4 text-gold"/>} label="Cagnotte" value={totalCagnotte} subtext="OM/MoMo" />
          <StatCard icon={<Gift className="w-4 h-4 text-purple-500"/>} label="Cadeaux" value={totalCadeaux} subtext="Surprises" />
        </div>

        {/* LISTE */}
        <div className="space-y-4">
          <h2 className="font-serif text-lg italic mb-4">Détails des réponses</h2>
          <AnimatePresence>
            {responses.map((res) => (
              <motion.div
                layout
                key={res.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gold/10 rounded-2xl p-4 md:p-6 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center"
              >
                {/* Avatar */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-serif text-lg shrink-0 ${
                  res.attending === "Oui" ? "bg-gold/10 text-gold border border-gold/20" : "bg-gray-100 text-gray-400"
                }`}>
                  {res.name.charAt(0)}
                </div>

                {/* Infos */}
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-serif text-lg">{res.name}</h3>
                    {res.attending === "Oui" ?
                      <span className="text-[9px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100 font-bold uppercase tracking-tighter">+{res.guests} Invité(s)</span>
                      : <span className="text-[9px] bg-red-50 text-red-400 px-2 py-0.5 rounded-full border border-red-100 font-bold uppercase tracking-tighter">Absent</span>
                    }
                  </div>

                  {res.message && (
                    <p className="text-gray-500 text-sm italic mb-2 leading-snug">"{res.message}"</p>
                  )}

                  {res.attending === "Oui" && (
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                       <span className="bg-gray-50 px-2 py-1 rounded-md border border-gray-100">Apporte : <b className="text-gray-700">{res.contribution}</b></span>
                    </div>
                  )}
                </div>

                {/* Date */}
                <div className="text-[9px] text-gray-300 font-bold uppercase tracking-widest md:text-right">
                  {res.createdAt ? res.createdAt.toDate().toLocaleDateString('fr-FR') : '--'}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

function StatCard({ icon, label, value, subtext, isPrimary }: StatCardProps) {
  return (
    <div className={`p-4 md:p-6 rounded-2xl border bg-white shadow-sm flex flex-col items-center text-center ${isPrimary ? "border-gold" : "border-gold/10"}`}>
      <div className="w-8 h-8 md:w-10 md:h-10 bg-gold/5 rounded-lg flex items-center justify-center mb-3">
        {icon}
      </div>
      <p className="text-xl md:text-3xl font-serif text-[#1a1a1a]">{value}</p>
      <p className="text-[9px] font-bold text-gold uppercase tracking-widest">{label}</p>
    </div>
  );
}

export default Dashboard;