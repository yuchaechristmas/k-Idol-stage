/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, TrendingUp, AlertCircle, Loader2 } from "lucide-react";
import SearchHero from "./components/SearchHero";
import VideoCard from "./components/VideoCard";
import VideoPlayer from "./components/VideoPlayer";
import { Fancam } from "./types";
import { getAIRecommendations } from "./services/gemini";

const INITIAL_FANCAMS: Fancam[] = [
  {
    id: "1",
    title: "Hype Boy @ Inkigayo",
    idolName: "Hanni",
    groupName: "NewJeans",
    youtubeId: "jT0Lh-V6VmU",
    thumbnailUrl: "https://img.youtube.com/vi/jT0Lh-V6VmU/maxresdefault.jpg",
    date: "2022-08-07",
    views: "15M+",
    description: "The legendary debut stage that took the world by storm.",
    tags: ["refreshing", "debut", "viral"]
  },
  {
    id: "2",
    title: "LOVE DIVE @ Music Bank",
    idolName: "Wonyoung",
    groupName: "IVE",
    youtubeId: "Y8JFxS1HlDo",
    thumbnailUrl: "https://img.youtube.com/vi/Y8JFxS1HlDo/maxresdefault.jpg",
    date: "2022-04-15",
    views: "20M+",
    description: "Wonyoung's iconic 'narcissistic' expression during the chorus.",
    tags: ["visual", "elegant", "iconic"]
  },
  {
    id: "3",
    title: "Drama @ Inkigayo",
    idolName: "Karina",
    groupName: "aespa",
    youtubeId: "0vS4M_W-K6U",
    thumbnailUrl: "https://img.youtube.com/vi/0vS4M_W-K6U/maxresdefault.jpg",
    date: "2023-11-12",
    views: "12M+",
    description: "Powerful performance with Karina's AI-like visuals.",
    tags: ["powerful", "dance", "visual"]
  },
  {
    id: "4",
    title: "Perfect Night @ Music Bank",
    idolName: "Chaewon",
    groupName: "LE SSERAFIM",
    youtubeId: "hLvHbe2E6M0",
    thumbnailUrl: "https://img.youtube.com/vi/hLvHbe2E6M0/maxresdefault.jpg",
    date: "2023-11-03",
    views: "10M+",
    description: "The catchy choreography and Chaewon's charming stage presence.",
    tags: ["catchy", "performance", "cute"]
  }
];

export default function App() {
  const [fancams, setFancams] = useState<Fancam[]>(INITIAL_FANCAMS);
  const [selectedFancam, setSelectedFancam] = useState<Fancam | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiReason, setAiReason] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getAIRecommendations(query);
      setFancams(result.fancams);
      setAiReason(result.reason);
      
      // Scroll to results
      const resultsSection = document.getElementById("results");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.error(err);
      setError("Failed to get AI recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffe7ff] text-zinc-900 selection:bg-pink-500 selection:text-white font-sans">
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-white/20 border-b border-zinc-200/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center font-black text-white text-xl">
            I
          </div>
          <span className="font-black text-xl tracking-tighter uppercase">IDOL STAGE</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-zinc-600 uppercase tracking-widest">
          <a href="#" className="hover:text-pink-600 transition-colors">Trending</a>
          <a href="#" className="hover:text-pink-600 transition-colors">Groups</a>
          <a href="#" className="hover:text-pink-600 transition-colors">AI Recommender</a>
        </nav>
        <button className="px-4 py-2 bg-white text-black text-xs font-black rounded-full hover:bg-pink-500 hover:text-white transition-all uppercase tracking-widest">
          Sign In
        </button>
      </header>

      <main>
        <SearchHero onSearch={handleSearch} isLoading={isLoading} />

        <section id="results" className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-pink-500" />
                <span className="text-xs font-bold text-pink-500 uppercase tracking-widest">
                  {aiReason ? "AI RECOMMENDATIONS" : "FEATURED STAGES"}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tight uppercase">
                {aiReason ? "DISCOVERED FOR YOU" : "LEGENDARY MOMENTS"}
              </h2>
              {aiReason && (
                <p className="mt-4 text-zinc-400 max-w-2xl font-medium leading-relaxed italic">
                  "{aiReason}"
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button className="p-3 bg-white/50 border border-zinc-200 rounded-xl text-zinc-600 hover:text-pink-600 hover:border-pink-200 transition-all">
                <TrendingUp size={20} />
              </button>
              <button className="p-3 bg-white/50 border border-zinc-200 rounded-xl text-zinc-600 hover:text-pink-600 hover:border-pink-200 transition-all">
                <Sparkles size={20} />
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-12 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-400">
              <AlertCircle size={24} />
              <p className="font-medium">{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
              <Loader2 className="w-12 h-12 text-pink-500 animate-spin" />
              <p className="text-zinc-500 font-mono uppercase tracking-[0.3em] text-sm animate-pulse">
                Analyzing legendary performances...
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {fancams.map((fancam, index) => (
                  <motion.div
                    key={fancam.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    layout
                  >
                    <VideoCard
                      fancam={fancam}
                      onClick={setSelectedFancam}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        <section className="bg-zinc-900/30 py-32 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center" style={{ backgroundColor: '#ffe7ff' }}>
            <div>
              <h2 className="text-5xl md:text-7xl font-black text-zinc-900 leading-[0.9] tracking-tighter uppercase mb-8">
                NEVER MISS A <br />
                <span className="text-pink-500" style={{ backgroundColor: '#ffe7ff' }}>LEGENDARY</span> STAGE.
              </h2>
              <p className="text-zinc-400 text-lg font-medium mb-10 max-w-lg">
                Our AI analyzes thousands of fancams to bring you the most iconic moments in K-pop history.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-pink-500 hover:text-white transition-all uppercase tracking-widest text-sm">
                  Get Started
                </button>
                <button className="px-8 py-4 bg-zinc-800 text-white font-black rounded-2xl hover:bg-zinc-700 transition-all uppercase tracking-widest text-sm">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-[4rem] blur-3xl" />
              <div className="relative h-full w-full bg-white/80 border border-zinc-200 rounded-[4rem] overflow-hidden p-8" style={{ backgroundColor: '#ffe7ff' }}>
                <div className="h-full w-full border border-dashed border-zinc-300 rounded-[3rem] flex flex-col items-center justify-center text-center p-12" style={{ backgroundColor: '#ffe7ff' }}>
                  <Sparkles className="w-16 h-16 text-pink-500 mb-6" />
                  <h3 className="text-2xl font-black text-zinc-900 mb-4 uppercase tracking-tight">AI Curation</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Our proprietary algorithm identifies high-energy performances, iconic visuals, and viral moments across all generations of K-pop.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-800 rounded flex items-center justify-center font-black text-white text-sm">
              I
            </div>
            <span className="font-black text-sm tracking-tighter uppercase text-zinc-500">IDOL STAGE</span>
          </div>
          <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
            © 2026 IDOL STAGE RECOMMENDER. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-zinc-600 hover:text-zinc-400 transition-colors">
            {/* Social icons placeholder */}
          </div>
        </div>
      </footer>

      <VideoPlayer
        fancam={selectedFancam}
        onClose={() => setSelectedFancam(null)}
      />
    </div>
  );
}
