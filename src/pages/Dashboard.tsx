import { useState, useEffect, ReactNode } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, Gift, Beer,
  Wallet, MessageSquare, Crown, Calendar, Users, Lock, Eye, EyeOff
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
    // On ne lance la récupération des données QUE si l'utilisateur est authentifié
    if (!isAuthenticated) return;

    const q = query(collection(db, "responses"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ResponseData[];
      setResponses(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Maman50") { // <--- TON MOT DE PASSE ICI
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  // --- CALCULS DES STATS ---
  const totalInvites = responses.filter(r => r.attending === "Oui").reduce((acc, r) => acc + 1 + r.guests, 0);
  const totalOui = responses.filter(r => r.attending === "Oui").length;
  const totalBouteilles = responses.filter(r => r.contribution === "Bouteille").length;
  const totalCagnotte = responses.filter(r => r.contribution.includes("Cagnotte")).length;
  const totalCadeaux = responses.filter(r => r.contribution === "Cadeaux").length;

  // --- ÉCRAN DE CONNEXION ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-[#D4AF37]/20 p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-md w-full text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gold" />
          <Crown className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
          <h2 className="font-serif text-3xl text-[#1a1a1a] mb-2 italic">Accès Réservé</h2>
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-8">Espace Administrateur</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Entrez le code secret"
                className={`w-full p-4 bg-[#FAF7F2] border ${error ? 'border-red-500' : 'border-[#D4AF37]/20'} rounded-xl outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition-all text-center font-bold tracking-widest`}
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

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#1a1a1a] text-white py-4 rounded-xl font-bold hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2 group"
            >
              Déverrouiller le Journal
              <Lock className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </motion.button>
          </form>

          {error && <p className="text-red-500 text-xs mt-4 font-bold uppercase tracking-tighter">Code incorrect</p>}
        </motion.div>
      </div>
    );
  }

  // --- ÉCRAN DE CHARGEMENT APRÈS CONNEXION ---
  if (loading) return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }}>
        <Crown className="w-12 h-12 text-[#D4AF37]" />
      </motion.div>
    </div>
  );

  // --- RENDU DU DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2D2D] font-sans pb-10 md:pb-20">
      {/* HEADER ADAPTATIF */}
      <div className="bg-white border-b border-[#D4AF37]/20 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <Crown className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-[9px] font-bold">Espace Royal</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-[#1a1a1a] italic leading-tight">Le Livre d'Or de Sylvie</h1>
          </div>

          <div className="flex bg-[#D4AF37]/5 border border-[#D4AF37]/30 rounded-2xl divide-x divide-[#D4AF37]/20 overflow-hidden">
             <div className="px-5 py-3 md:px-8 md:py-4 text-center">
                <p className="text-2xl md:text-3xl font-serif text-[#D4AF37]">{totalInvites}</p>
                <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-[#8B7355] font-bold">Invités</p>
             </div>
             <div className="px-5 py-3 md:px-8 md:py-4 text-center">
                <p className="text-2xl md:text-3xl font-serif text-[#D4AF37]">{responses.length}</p>
                <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-[#8B7355] font-bold">Réponses</p>
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 md:mt-12">
        {/* GRILLE DE STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          <StatCard icon={<CheckCircle2 className="w-5 h-5 text-emerald-600"/>} label="Confirmés" value={totalOui} subtext="Présences validées" isPrimary />
          <StatCard icon={<Beer className="w-5 h-5 text-blue-600"/>} label="Bouteilles" value={totalBouteilles} subtext="Vin & Champagne" />
          <StatCard icon={<Wallet className="w-5 h-5 text-[#D4AF37]"/>} label="Cagnottes" value={totalCagnotte} subtext="Mobile & Enveloppes" />
          <StatCard icon={<Gift className="w-5 h-5 text-purple-600"/>} label="Cadeaux" value={totalCadeaux} subtext="Surprises prévues" />
        </div>

        {/* LISTE DES RÉPONSES */}
        <div className="bg-white border border-[#D4AF37]/20 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl overflow-hidden mb-10">
          <div className="p-6 md:p-8 bg-[#FAF7F2] border-b border-[#D4AF37]/10 flex justify-between items-center">
            <h2 className="font-serif text-xl md:text-2xl text-[#1a1a1a]">Journal des Présences</h2>
          </div>

          <div className="divide-y divide-[#F0E6D2]">
            {responses.length === 0 ? (
                <div className="p-20 text-center text-gray-300 italic">En attente des premières réponses...</div>
            ) : (
              responses.map((res) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  key={res.id}
                  className="p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-start hover:bg-[#FDFBF7] transition-colors group"
                >
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-xl md:text-2xl font-serif border-2 flex-shrink-0 ${
                    res.attending === "Oui" ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5" : "border-gray-200 text-gray-300 bg-gray-50"
                  }`}>
                    {res.name.charAt(0)}
                  </div>

                  <div className="flex-grow text-center md:text-left w-full">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                      <h3 className="text-xl md:text-2xl font-serif text-[#1a1a1a]">{res.name}</h3>
                      <div className="flex justify-center md:justify-start">
                        <span className={`px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm ${
                          res.attending === "Oui" ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-400 border border-red-100"
                        }`}>
                          {res.attending === "Oui" ? `Confirmé (+${res.guests})` : "Absent"}
                        </span>
                      </div>
                    </div>

                    {res.message && (
                      <div className="relative mb-4 bg-[#FAF7F2] p-4 rounded-xl md:rounded-2xl italic text-gray-600 text-sm border-l-4 border-[#D4AF37]/30 mx-auto md:mx-0 max-w-[500px]">
                        "{res.message}"
                      </div>
                    )}

                    {res.attending === "Oui" && (
                      <div className="inline-flex items-center gap-2 bg-[#D4AF37]/5 px-3 py-1.5 rounded-lg border border-[#D4AF37]/10 text-[#8B7355] text-[11px] font-medium">
                        {getContributionIcon(res.contribution)}
                        <span>Prévu : <b className="text-[#1a1a1a]">{res.contribution}</b></span>
                      </div>
                    )}
                  </div>

                  <div className="hidden sm:block text-[9px] uppercase tracking-widest text-gray-400 font-bold self-start mt-2">
                     {res.createdAt ? res.createdAt.toDate().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }) : '--'}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// --- SOUS-COMPOSANTS ---
function StatCard({ icon, label, value, subtext, isPrimary }: StatCardProps) {
  return (
    <div className={`p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border bg-white shadow-sm transition-all hover:shadow-md ${
        isPrimary ? "border-[#D4AF37] ring-1 ring-[#D4AF37]/20" : "border-[#D4AF37]/10"
      }`}
    >
      <div className="bg-[#FAF7F2] w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-4 md:mb-6">
        {icon}
      </div>
      <p className="text-3xl md:text-4xl font-serif text-[#1a1a1a] mb-1">{value}</p>
      <p className="text-[10px] md:text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-1 md:mb-2">{label}</p>
      <p className="text-[9px] md:text-[10px] text-gray-400 leading-relaxed uppercase">{subtext}</p>
    </div>
  );
}

function getContributionIcon(type: string) {
  if (type === "Bouteille") return <Beer className="w-3 h-3 text-blue-500" />;
  if (type.includes("Cagnotte")) return <Wallet className="w-3 h-3 text-[#D4AF37]" />;
  return <Gift className="w-3 h-3 text-purple-500" />;
}

export default Dashboard;