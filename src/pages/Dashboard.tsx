import { useState, useEffect, ReactNode } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import {
  CheckCircle2, Gift, Beer,
  Wallet, MessageSquare, Crown, Calendar, Users
} from "lucide-react";

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

  useEffect(() => {
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
  }, []);

  const totalInvites = responses.filter(r => r.attending === "Oui").reduce((acc, r) => acc + 1 + r.guests, 0);
  const totalOui = responses.filter(r => r.attending === "Oui").length;
  const totalBouteilles = responses.filter(r => r.contribution === "Bouteille").length;
  const totalCagnotte = responses.filter(r => r.contribution.includes("Cagnotte")).length;
  const totalCadeaux = responses.filter(r => r.contribution === "Cadeaux").length;

  if (loading) return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }}>
        <Crown className="w-12 h-12 text-[#D4AF37]" />
      </motion.div>
    </div>
  );

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

          {/* Compteurs Header Rapides */}
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

        {/* GRILLE DE STATS RESPONSIVE */}
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
            <div className="hidden sm:flex items-center gap-2 text-[#D4AF37]/50 text-[10px] uppercase tracking-widest font-bold">
              <Calendar className="w-4 h-4" /> temps réel
            </div>
          </div>

          <div className="divide-y divide-[#F0E6D2]">
            {responses.length === 0 ? (
               <div className="p-20 text-center text-gray-300 italic">En attente des premières réponses...</div>
            ) : (
              responses.map((res, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  key={res.id}
                  className="p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-start hover:bg-[#FDFBF7] transition-colors group"
                >
                  {/* Initiale Stylisée - Centrée sur mobile, à gauche sur Desktop */}
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-xl md:text-2xl font-serif border-2 flex-shrink-0 transition-transform group-hover:scale-105 ${
                    res.attending === "Oui" ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5" : "border-gray-200 text-gray-300 bg-gray-50"
                  }`}>
                    {res.name.charAt(0)}
                  </div>

                  {/* Infos de l'invité */}
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

                  {/* Date de réception (Visible uniquement sur Desktop ou petites tablettes) */}
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