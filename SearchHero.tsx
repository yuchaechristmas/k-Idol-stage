import { motion } from "motion/react";
import { Search, Sparkles, TrendingUp } from "lucide-react";
import { useState } from "react";

interface SearchHeroProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function SearchHero({ onSearch, isLoading }: SearchHeroProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-5xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/50 border border-zinc-200 rounded-full text-xs font-bold text-pink-600 uppercase tracking-widest mb-6 backdrop-blur-md">
            <Sparkles size={14} />
            AI-POWERED RECOMMENDATIONS
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-zinc-900 leading-[0.85] tracking-tighter uppercase mb-8">
            LEGENDARY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              STAGES
            </span>
          </h1>
          <p className="text-zinc-600 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Discover the most iconic idol fancams and performances. 
            Powered by AI to find exactly what you're looking for.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="relative max-w-2xl mx-auto group"
        >
          <div className="relative flex items-center">
            <Search className="absolute left-6 text-zinc-500 group-focus-within:text-pink-500 transition-colors" size={24} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search idol, group, or mood (e.g. 'powerful dance')..."
              className="w-full h-20 pl-16 pr-32 bg-white/80 backdrop-blur-xl border-2 border-zinc-200 rounded-3xl text-zinc-900 text-lg font-medium placeholder:text-zinc-400 focus:outline-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/10 transition-all"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-3 h-14 px-8 bg-white text-black font-black rounded-2xl hover:bg-pink-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-widest text-sm"
            >
              {isLoading ? "SEARCHING..." : "FIND"}
            </button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-zinc-500 uppercase tracking-widest"
        >
          <span className="flex items-center gap-2">
            <TrendingUp size={14} />
            TRENDING:
          </span>
          {["NewJeans", "IVE", "LE SSERAFIM", "BABYMONSTER", "aespa"].map((tag) => (
            <button
              key={tag}
              onClick={() => onSearch(tag)}
              className="px-4 py-2 bg-white/50 border border-zinc-200 rounded-xl hover:border-pink-500/30 hover:text-pink-600 transition-all"
            >
              {tag}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
