"use client";

import { useState, useMemo } from "react";
import { Search, Star, ArrowRight, BookOpen, Layers, Sparkles, Calendar, TrendingUp, Building2, Users, Briefcase, CheckCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ALL_TOOLS } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog-posts";

interface HomePageProps {
  tools?: any[];
  posts?: any[];
}

export default function HomePage(props?: HomePageProps) {
  const tools = props?.tools || ALL_TOOLS;
  const posts = props?.posts || BLOG_POSTS;
  const [searchQuery, setSearchQuery] = useState("");

  const CATEGORIES = Array.from(new Set(tools.map((t: any) => t.category)));

  const filteredTools = tools.filter((tool: any) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const latestPosts = useMemo(
    () => [...posts].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3),
    []
  );

  const topCategories = useMemo(() => {
    const stats: Record<string, { count: number; avgRating: number }> = {};
    for (const t of tools) {
      if (!stats[t.category]) stats[t.category] = { count: 0, avgRating: 0 };
      stats[t.category].count++;
      stats[t.category].avgRating += t.rating;
    }
    for (const key of Object.keys(stats)) {
      stats[key].avgRating = Math.round((stats[key].avgRating / stats[key].count) * 10) / 10;
    }
    return Object.entries(stats).sort((a, b) => b[1].count - a[1].count).slice(0, 8);
  }, []);

  const featuredTool = useMemo(() => [...tools].sort((a: any, b: any) => b.rating - a.rating)[0], []);

  const totalRatingSum = useMemo(() => tools.reduce((sum: number, t: any) => sum + t.rating, 0), []);

  const FeaturedIcon = featuredTool?.icon || Star;

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 md:py-28 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
            Find Office Products That{" "}
            <span className="text-lime-500">Work</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Compare, evaluate, and choose the right home office solutions for your workspace.
            We&apos;ve curated <span className="text-lime-600 font-semibold">{tools.length}</span> products across{" "}
            <span className="text-lime-600 font-semibold">{CATEGORIES.length}</span> categories.
          </p>

          <div className="max-w-xl mx-auto">
            <div className="flex items-center rounded-full border border-slate-300 bg-white transition-all duration-300 focus-within:border-lime-500 focus-within:ring-2 focus-within:ring-lime-500/20">
              <Search className="ml-5 w-5 h-5 text-slate-400 flex-shrink-0" />
              <input
                type="search"
                placeholder="Search office products by name, category or function..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-4 px-3 bg-transparent text-slate-900 placeholder:text-slate-400 outline-none text-base"
              />
              <Link
                href={filteredTools.length > 0 ? `/tools/${filteredTools[0].id}` : "/"}
                className="mr-2 px-6 py-2.5 bg-lime-500 hover:bg-lime-600 text-white text-sm font-medium rounded-full transition-colors flex-shrink-0"
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Layers className="w-5 h-5 text-lime-500" />
            <h2 className="text-xl font-bold text-slate-900">Popular Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {topCategories.map(([cat, stats]) => {
              const tool = tools.find((t: any) => t.category === cat);
              const CatIcon = tool?.icon || Layers;
              return (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group border border-slate-200 rounded-xl p-5 hover:border-lime-500 hover:shadow-sm transition-all text-center bg-white"
                >
                  <div className="w-10 h-10 rounded-lg bg-lime-50 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <CatIcon className="w-5 h-5 text-lime-600" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-lime-600 transition-colors truncate">{cat}</p>
                  <p className="text-xs text-slate-400 mt-1">{stats.count} products · ★ {stats.avgRating}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Product */}
      {featuredTool && (
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-bold text-slate-900">Featured Product</h2>
            </div>
            <div className="border border-slate-200 rounded-2xl p-8 bg-white">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 rounded-2xl bg-lime-50 flex items-center justify-center flex-shrink-0">
                  <FeaturedIcon className="w-8 h-8 text-lime-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{featuredTool.name}</h3>
                      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-lime-600 bg-lime-50 px-2.5 py-1 rounded-md mt-1">
                        {featuredTool.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-lg flex-shrink-0">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-bold text-slate-900">{featuredTool.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mt-3 line-clamp-2">{featuredTool.description}</p>
                  <Link
                    href={`/tools/${featuredTool.id}`}
                    className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-lime-600 hover:text-lime-700 transition-colors"
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Products */}
      <section className="py-16 px-6" id="all-tools">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                All Office Products
              </h2>
              <p className="text-slate-400 mt-1 text-base">{filteredTools.length} product{filteredTools.length !== 1 ? "s" : ""} found</p>
            </div>
            <div className="w-full md:w-72 flex items-center rounded-full border border-slate-300 bg-white focus-within:border-lime-500 focus-within:ring-2 focus-within:ring-lime-500/20">
              <Search className="ml-4 w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                type="search"
                placeholder="Filter products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-2.5 px-2 bg-transparent text-slate-900 placeholder:text-slate-400 outline-none text-sm"
              />
            </div>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredTools.map((tool: any) => {
                const Icon = tool.icon;
                return (
                  <Link href={`/tools/${tool.id}`} key={tool.id} className="group">
                    <article className="border border-slate-200 rounded-xl p-5 bg-white hover:border-lime-500 hover:shadow-sm transition-all h-full flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-lime-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-5 h-5 text-lime-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-semibold text-slate-900 group-hover:text-lime-600 transition-colors truncate">{tool.name}</h3>
                          <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-lime-600">{tool.category}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md flex-shrink-0">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span className="text-xs font-bold text-slate-900">{tool.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-1 flex-grow mb-4">{tool.description}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <span className="text-xs text-lime-600 font-semibold group-hover:text-lime-700 transition-colors flex items-center">
                          View Details <ArrowRight className="ml-1 w-3.5 h-3.5" />
                        </span>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-slate-400">No products found matching your search.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 px-5 py-2 text-sm font-medium text-white bg-lime-500 rounded-lg hover:bg-lime-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-lime-500" />
              <h2 className="text-xl font-bold text-slate-900">Latest Insights</h2>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-1 text-sm font-medium text-lime-600 hover:text-lime-700 transition-colors">
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post: any) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="border border-slate-200 rounded-xl p-6 bg-white hover:border-lime-500 hover:shadow-sm transition-all h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-lime-600 bg-lime-50 px-2.5 py-1 rounded-md">{post.category}</span>
                    <span className="text-xs text-slate-400">{post.readTime} min read</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-lime-600 transition-colors leading-snug line-clamp-2 text-base">{post.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-grow line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    <span className="mx-1">·</span>
                    {post.author}
                  </div>
                </article>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 rounded-full text-sm font-medium text-lime-600 hover:text-lime-700 transition-colors">
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="border border-slate-200 rounded-2xl p-8 md:p-10 bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-extrabold text-lime-600">{tools.length}</p>
                <p className="text-sm text-slate-500 mt-1">Products Reviewed</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-extrabold text-lime-600">{posts.length}</p>
                <p className="text-sm text-slate-500 mt-1">Expert Guides</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-extrabold text-lime-600">{CATEGORIES.length}</p>
                <p className="text-sm text-slate-500 mt-1">Categories</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-extrabold text-lime-600">{totalRatingSum.toFixed(0)}</p>
                <p className="text-sm text-slate-500 mt-1">Total Rating Score</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
