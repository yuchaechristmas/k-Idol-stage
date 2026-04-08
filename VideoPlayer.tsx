import { motion, AnimatePresence } from "motion/react";
import { X, Share2, Heart, MessageCircle } from "lucide-react";
import { Fancam } from "../types";

interface VideoPlayerProps {
  fancam: Fancam | null;
  onClose: () => void;
}

export default function VideoPlayer({ fancam, onClose }: VideoPlayerProps) {
  if (!fancam) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-xl p-4 md:p-8"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-zinc-200"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-pink-500 text-white rounded-full transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col lg:flex-row h-full">
            <div className="flex-1 bg-black aspect-video lg:aspect-auto">
              <iframe
                src={`https://www.youtube.com/embed/${fancam.youtubeId}?autoplay=1`}
                title={fancam.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="w-full lg:w-96 p-6 lg:p-8 flex flex-col h-full overflow-y-auto">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-pink-500/20 text-pink-400 text-[10px] font-bold rounded uppercase tracking-widest border border-pink-500/30">
                    {fancam.groupName}
                  </span>
                  <span className="text-zinc-500 text-[10px] font-mono tracking-widest">
                    {fancam.date}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-zinc-900 mb-1 tracking-tight">
                  {fancam.idolName}
                </h2>
                <p className="text-zinc-500 font-medium">{fancam.title}</p>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <button className="flex-1 py-3 bg-zinc-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-pink-500 transition-all">
                  <Heart size={20} />
                  <span>LIKE</span>
                </button>
                <button className="p-3 bg-zinc-100 text-zinc-600 rounded-xl hover:bg-zinc-200 transition-colors">
                  <Share2 size={20} />
                </button>
                <button className="p-3 bg-zinc-100 text-zinc-600 rounded-xl hover:bg-zinc-200 transition-colors">
                  <MessageCircle size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  Description
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {fancam.description || "No description available for this legendary stage."}
                </p>
              </div>

              <div className="mt-auto pt-8">
                <div className="flex flex-wrap gap-2">
                  {fancam.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-zinc-100 text-zinc-500 text-[11px] rounded-lg border border-zinc-200 uppercase tracking-tighter"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
