"use client";

import Link from "next/link";
import { ArrowLeft, Star, HardDrive, BookOpen, Package, Download } from "lucide-react";
import { ALL_RESOURCES, ALL_STYLES, RESOURCES_BY_STYLE } from "@/data/resources";
import { useState, useMemo } from "react";

export default function ModelsPage() {
  const [activeStyle, setActiveStyle] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeStyle) return ALL_RESOURCES;
    return RESOURCES_BY_STYLE[activeStyle] || [];
  }, [activeStyle]);

  return (
    <div className="relative pt-28 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Link href="/" className="inline-flex items-center text-[#8A7DBF] hover:text-[#22C55E] transition-colors mb-8 text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
        </Link>

        <h1 className="text-3xl font-bold text-[#ECFDE8] mb-2">Model Resource Library</h1>
        <p className="text-[#9BD69B] mb-8">Curated Stable Diffusion model collection, all available for free download.</p>

        {/* Filter */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <button onClick={() => setActiveStyle(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              !activeStyle ? "bg-[#22C55E] text-white" : "bg-[#1A1740] border border-[#3A5A2A] text-[#9BD69B] hover:border-[#22C55E]"
            }`}>All ({ALL_RESOURCES.length})</button>
          {ALL_STYLES.map(s => (
            <button key={s} onClick={() => setActiveStyle(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeStyle === s ? "bg-[#22C55E] text-white" : "bg-[#1A1740] border border-[#3A5A2A] text-[#9BD69B] hover:border-[#22C55E]"
              }`}>{s} ({RESOURCES_BY_STYLE[s]?.length || 0})</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {filtered.map((r) => (
            <Link key={r.id} href={`/models/${r.id}`}
              className="bg-[#12102A] border border-[#3A5A2A] rounded-xl p-5 card-hover flex flex-col group">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                  r.style === "真实系" ? "bg-blue-900/30 text-blue-400" :
                  r.style === "二次元" ? "bg-pink-900/30 text-pink-400" : "bg-amber-900/30 text-amber-400"
                }`}>{r.style}</span>
              </div>
              <h3 className="text-lg font-bold text-[#ECFDE8] mb-2 group-hover:text-[#22C55E] transition-colors">{r.name}</h3>
              <p className="text-sm text-[#9BD69B] mb-4 flex-grow line-clamp-2">{r.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="text-xs text-[#22C55E] bg-[#1A1740] px-2 py-0.5 rounded-md">{r.category}</span>
                <span className="text-xs text-[#22C55E] bg-[#1A1740] px-2 py-0.5 rounded-md">{r.version}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#3A5A2A] text-xs text-[#5FA06D]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><HardDrive className="w-3.5 h-3.5" />{r.fileSize}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{r.fileType}</span>
                </div>
                <span className="flex items-center gap-1 px-3 py-1.5 bg-[#22C55E] hover:bg-[#6D28D9] text-white rounded-lg transition-colors text-xs font-medium">
                  <Download className="w-3 h-3" /> View Details
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
