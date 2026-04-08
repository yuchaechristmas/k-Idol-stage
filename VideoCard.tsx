import { motion } from "motion/react";
import { Fancam } from "../types";
import { Play, Calendar, Eye } from "lucide-react";

interface VideoCardProps {
  fancam: Fancam;
  onClick: (fancam: Fancam) => void;
}

export default function VideoCard({ fancam, onClick }: VideoCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative bg-white border border-zinc-200 rounded-2xl overflow-hidden cursor-pointer transition-all hover:border-pink-500/50 hover:shadow-[0_20px_40px_-15px_rgba(236,72,153,0.15)]"
      onClick={() => onClick(fancam)}
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={fancam.thumbnailUrl}
          alt={fancam.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <Play fill="currentColor" size={24} />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-md rounded text-[10px] font-mono text-white uppercase tracking-wider">
          {fancam.groupName}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 line-clamp-1 group-hover:text-pink-600 transition-colors">
              {fancam.idolName}
            </h3>
            <p className="text-sm text-zinc-500 font-medium line-clamp-1">
              {fancam.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 text-[11px] text-zinc-500 font-mono uppercase tracking-widest">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            {fancam.date}
          </div>
          {fancam.views && (
            <div className="flex items-center gap-1">
              <Eye size={12} />
              {fancam.views}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {fancam.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-zinc-100 text-zinc-500 text-[10px] rounded-full border border-zinc-200 uppercase tracking-tighter"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
