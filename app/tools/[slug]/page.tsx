"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  CheckCircle,
  XCircle,
  Sparkles,
  TrendingUp,
  Users,
  Layers,
  Zap,
  Tag,
  DollarSign,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { TOOL_MAP, ALL_TOOLS } from "@/data/tools";

const ACCENT = "#22C55E";
const ACCENT_HOVER = "#6D28D9";

export default function ToolDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const tool = TOOL_MAP.get(slug);

  if (!tool) {
    return (
      <div className="min-h-screen bg-[#0A0A14] relative pt-32 px-6 text-center">
        <h1 className="text-3xl font-bold text-[#ECFDE8] mb-4">
          Tool Not Found
        </h1>
        <p className="text-[#9BD69B] mb-8 max-w-md mx-auto">
          The tool you are looking for does not exist or has been removed from
          our directory.
        </p>
        <Link
          href="/"
          className="inline-flex items-center text-[#22C55E] hover:text-[#6D28D9] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
        </Link>
      </div>
    );
  }

  const IconComponent = tool.icon;

  const relatedTools = ALL_TOOLS.filter(
    (t) => t.category === tool.category && t.id !== tool.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0A0A14]">
      <div className="relative pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-[#8A7DBF] hover:text-[#22C55E] transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
          </Link>

          <header className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-[#1A1740] border border-[#3A5A2A] flex items-center justify-center">
                <IconComponent className="w-7 h-7 text-[#22C55E]" />
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 bg-[#1A1740] text-[#22C55E] text-xs font-bold rounded-full border border-[#3A5A2A]">
                    {tool.category}
                  </span>
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider border ${
                      tool.pricing === "Free"
                        ? "bg-green-900/30 text-green-400 border-green-800/30"
                        : tool.pricing === "Paid"
                          ? "bg-amber-900/30 text-amber-400 border-amber-800/30"
                          : "bg-blue-900/30 text-blue-400 border-blue-800/30"
                    }`}
                  >
                    {tool.pricing}
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1A1740] text-[#9BD69B] text-xs font-bold rounded-full border border-[#3A5A2A]">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    {tool.rating}
                    <span className="text-[#5FA06D] font-normal">
                      ({tool.reviewCount.toLocaleString()})
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#ECFDE8] mb-4 tracking-tight">
              {tool.name}
            </h1>
            <p className="text-lg md:text-xl text-[#9BD69B] leading-relaxed">
              {tool.longDescription}
            </p>
          </header>

          <div className="mb-10">
            <div className="bg-[#12102A] border border-dashed border-[#3A5A2A] rounded-xl p-6 text-center">
              <p className="text-xs text-[#5FA06D] uppercase tracking-wider mb-1">
                — Advertisement —
              </p>
              <p className="text-sm text-[#4A3D7A]">
                Google AdSense Ad Unit (Responsive)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-[#12102A] border border-[#3A5A2A] rounded-xl p-4">
              <DollarSign className="w-5 h-5 text-[#22C55E] mb-2" />
              <p className="text-xs text-[#5FA06D] uppercase tracking-wider mb-1">
                Pricing
              </p>
              <p className="text-sm font-bold text-[#ECFDE8]">
                {tool.pricing}
              </p>
            </div>
            <div className="bg-[#12102A] border border-[#3A5A2A] rounded-xl p-4">
              <Star className="w-5 h-5 text-[#22C55E] mb-2" />
              <p className="text-xs text-[#5FA06D] uppercase tracking-wider mb-1">
                Rating
              </p>
              <p className="text-sm font-bold text-[#ECFDE8]">
                {tool.rating} / 5
              </p>
            </div>
            <div className="bg-[#12102A] border border-[#3A5A2A] rounded-xl p-4">
              <Users className="w-5 h-5 text-[#22C55E] mb-2" />
              <p className="text-xs text-[#5FA06D] uppercase tracking-wider mb-1">
                Reviews
              </p>
              <p className="text-sm font-bold text-[#ECFDE8]">
                {tool.reviewCount.toLocaleString()}
              </p>
            </div>
            <div className="bg-[#12102A] border border-[#3A5A2A] rounded-xl p-4">
              <Tag className="w-5 h-5 text-[#22C55E] mb-2" />
              <p className="text-xs text-[#5FA06D] uppercase tracking-wider mb-1">
                Category
              </p>
              <p className="text-sm font-bold text-[#ECFDE8] truncate">
                {tool.category}
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#ECFDE8] mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#22C55E]" />
              Performance Score
            </h2>
            <div className="bg-[#12102A] border border-[#3A5A2A] rounded-xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Features", value: tool.scoreBreakdown.features },
                  { label: "Reviews", value: tool.scoreBreakdown.reviews },
                  { label: "Momentum", value: tool.scoreBreakdown.momentum },
                  {
                    label: "Popularity",
                    value: tool.scoreBreakdown.popularity,
                  },
                ].map((score) => (
                  <div key={score.label} className="text-center">
                    <p className="text-3xl font-extrabold text-[#22C55E]">
                      {score.value}
                    </p>
                    <p className="text-xs text-[#5FA06D] uppercase tracking-wider mt-1">
                      {score.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-[#12102A] border border-[#3A5A2A] rounded-xl p-6">
              <h3 className="font-bold text-green-400 mb-4 flex items-center text-base">
                <ThumbsUp className="w-5 h-5 mr-2" /> Pros
              </h3>
              <ul className="space-y-3">
                {tool.pros.map((pro, i) => (
                  <li
                    key={i}
                    className="flex items-start text-sm text-[#9BD69B]"
                  >
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#12102A] border border-[#3A5A2A] rounded-xl p-6">
              <h3 className="font-bold text-red-400 mb-4 flex items-center text-base">
                <ThumbsDown className="w-5 h-5 mr-2" /> Cons
              </h3>
              <ul className="space-y-3">
                {tool.cons.map((con, i) => (
                  <li
                    key={i}
                    className="flex items-start text-sm text-[#9BD69B]"
                  >
                    <XCircle className="w-4 h-4 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#ECFDE8] mb-6 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-[#22C55E]" />
              Pricing
            </h2>
            <div className="bg-[#12102A] border border-[#3A5A2A] rounded-xl p-6">
              <p className="text-sm text-[#9BD69B] leading-relaxed">
                {tool.pricingDetail}
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#ECFDE8] mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#22C55E]" />
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tool.features.map((feature, i) => (
                <div
                  key={i}
                  className="bg-[#12102A] border border-[#3A5A2A] rounded-lg px-4 py-3 text-sm text-[#9BD69B] hover:text-[#ECFDE8] hover:border-[#3B1F8A] transition-all flex items-center gap-3"
                >
                  <CheckCircle className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <div className="bg-[#12102A] border border-dashed border-[#3A5A2A] rounded-xl p-6 text-center">
              <p className="text-xs text-[#5FA06D] uppercase tracking-wider mb-1">
                — Advertisement —
              </p>
              <p className="text-sm text-[#4A3D7A]">
                Google AdSense Ad Unit (Responsive)
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#ECFDE8] mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-[#22C55E]" />
              Use Case
            </h2>
            <div className="bg-[#12102A] border border-[#3A5A2A] rounded-xl p-6">
              <p className="text-sm text-[#9BD69B] leading-relaxed">
                {tool.useCase}
              </p>
            </div>
          </div>

          {tool.alternatives.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-[#ECFDE8] mb-6 flex items-center gap-2">
                <Layers className="w-6 h-6 text-[#22C55E]" />
                Alternatives
              </h2>
              <div className="flex flex-wrap gap-3">
                {tool.alternatives.map((alt, i) => {
                  const altTool = TOOL_MAP.get(alt);
                  return altTool ? (
                    <Link
                      key={alt}
                      href={`/tools/${alt}`}
                      className="px-4 py-2 bg-[#1A1740] border border-[#3A5A2A] rounded-full text-sm text-[#9BD69B] hover:text-[#ECFDE8] hover:border-[#3B1F8A] transition-all"
                    >
                      {altTool.name}
                    </Link>
                  ) : (
                    <span
                      key={alt}
                      className="px-4 py-2 bg-[#1A1740] border border-[#3A5A2A] rounded-full text-sm text-[#5FA06D]"
                    >
                      {alt}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {relatedTools.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-[#ECFDE8] mb-6 flex items-center gap-2">
                <Layers className="w-6 h-6 text-[#22C55E]" />
                More in {tool.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedTools.map((rt) => {
                  const RelIcon = rt.icon;
                  return (
                    <Link
                      key={rt.id}
                      href={`/tools/${rt.id}`}
                      className="group bg-[#12102A] border border-[#3A5A2A] rounded-xl p-5 hover:border-[#3B1F8A] transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#1A1740] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <RelIcon className="w-5 h-5 text-[#22C55E]" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-[#ECFDE8] group-hover:text-[#22C55E] transition-colors">
                            {rt.name}
                          </h3>
                          <p className="text-xs text-[#5FA06D] mt-0.5 line-clamp-2">
                            {rt.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-xs text-[#5FA06D]">
                              {rt.pricing}
                            </span>
                            <span className="text-xs text-[#5FA06D]">·</span>
                            <span className="text-xs text-[#5FA06D] flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                              {rt.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-10 text-center">
            <p className="text-xs text-[#5FA06D]">
              Information on this page is based on publicly available data and
              may change over time. Always verify pricing and features on the
              official website. When you purchase through links on our site, we
              may earn an affiliate commission.{" "}
              <Link
                href="/disclosure"
                className="text-[#22C55E] hover:underline"
              >
                Learn more
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
