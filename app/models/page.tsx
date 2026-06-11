"use client";

import Link from "next/link";
import { ArrowLeft, Star, Layers, ChevronRight } from "lucide-react";
import { ALL_TOOLS } from "@/data/tools";
import { useState, useMemo } from "react";

export default function ModelsPage() {
  const categories = useMemo(() => {
    const map: Record<string, { count: number; avgRating: number; items: any[] }> = {};
    for (const t of ALL_TOOLS) {
      if (!map[t.category]) map[t.category] = { count: 0, avgRating: 0, items: [] };
      map[t.category].count++;
      map[t.category].avgRating += t.rating;
      map[t.category].items.push(t);
    }
    return Object.entries(map).map(([name, data]) => ({
      name,
      count: data.count,
      avgRating: Math.round((data.avgRating / data.count) * 10) / 10,
      items: data.items,
    }));
  }, []);

  return (
    <div className="relative pt-28 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Link href="/" className="inline-flex items-center text-beige-500 hover:text-beige-600 transition-colors mb-8 text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-beige-900 mb-2">All Product Categories</h1>
        <p className="text-beige-600 mb-8">Browse our curated collection of home office equipment across {categories.length} categories.</p>

        <div className="space-y-8">
          {categories.map((cat) => (
            <div key={cat.name} className="bg-beige-100 border border-beige-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-beige-500" />
                  <h2 className="text-lg font-bold text-beige-900">{cat.name}</h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-beige-500">
                  <span>{cat.count} products</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {cat.avgRating}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {cat.items.slice(0, 6).map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.id}`}
                      className="group flex items-center gap-3 px-4 py-3 bg-beige-50 border border-beige-200 rounded-lg hover:border-beige-400 hover:bg-beige-100 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-beige-200 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4 text-beige-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-beige-900 truncate">{tool.name}</p>
                        <p className="text-xs text-beige-500 truncate">{tool.description}</p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-bold text-beige-700">{tool.rating}</span>
                      </div>
                    </Link>
                  );
                })}
                {cat.items.length > 6 && (
                  <div className="flex items-center justify-center px-4 py-3 text-sm text-beige-500">
                    +{cat.items.length - 6} more products
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
