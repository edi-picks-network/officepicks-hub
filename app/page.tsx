"use client";

import { useState, useMemo } from "react";
import { Search, Star, ArrowRight, BookOpen, Layers, Sparkles, Calendar, TrendingUp, Building2, Users, Briefcase, CheckCircle, ChevronRight, Grid3X3, List, Tags } from "lucide-react";
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

  // Filter tools by search
  const filteredBySearch = tools.filter((tool: any) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Use category tabs instead of card grid
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categoriesWithCount = useMemo(() => {
    const stats: Record<string, number> = {};
    for (const t of filteredBySearch) {
      if (!stats[t.category]) stats[t.category] = 0;
      stats[t.category]++;
    }
    return Object.entries(stats).sort((a, b) => b[1] - a[1]);
  }, [filteredBySearch]);

  const displayTools = activeCategory
    ? filteredBySearch.filter((t) => t.category === activeCategory)
    : filteredBySearch;

  const latestPosts = useMemo(
    () => [...posts].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3),
    []
  );

  const featuredTool = useMemo(() => [...tools].sort((a: any, b: any) => b.rating - a.rating)[0], []);

  const FeaturedIcon = featuredTool?.icon || Star;

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 md:py-28 px-6 bg-gradient-to-b from-beige-50 to-beige-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-beige-900 tracking-tight leading-[1.1] mb-6">
            Your Workspace,{" "}
            <span className="text-beige-500">Perfected</span>
          </h1>
          <p className="text-lg md:text-xl text-beige-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Expert-tested home office equipment, curated by
            <strong className="text-beige-700"> JadeInteractive</strong> —
            a Bordeaux-based engineering studio. Every product, verified.
          </p>

          <div className="max-w-xl mx-auto">
            <div className="flex items-center rounded-full border border-beige-300 bg-beige-50 transition-all duration-300 focus-within:border-beige-500 focus-within:ring-2 focus-within:ring-beige-500/20">
              <Search className="ml-5 w-5 h-5 text-beige-400 flex-shrink-0" />
              <input
                type="search"
                placeholder="Search office products by name, category or function..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-4 px-3 bg-transparent text-beige-900 placeholder:text-beige-400 outline-none text-base"
              />
              <Link
                href={filteredBySearch.length > 0 ? `/tools/${filteredBySearch[0].id}` : "/"}
                className="mr-2 px-6 py-2.5 bg-beige-500 hover:bg-beige-600 text-white text-sm font-medium rounded-full transition-colors flex-shrink-0"
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Browser — Category Tabs Layout */}
      <section className="py-16 px-6" id="product-browser">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Layers className="w-5 h-5 text-beige-500" />
            <h2 className="text-xl font-bold text-beige-900">Browse Products</h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !activeCategory
                  ? "bg-beige-500 text-white shadow-sm"
                  : "bg-beige-100 border border-beige-200 text-beige-700 hover:bg-beige-200"
              }`}
            >
              All ({filteredBySearch.length})
            </button>
            {categoriesWithCount.map(([cat, count]) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-beige-500 text-white shadow-sm"
                    : "bg-beige-100 border border-beige-200 text-beige-700 hover:bg-beige-200"
                }`}
              >
                {cat} ({count})
              </button>
            ))}
          </div>

          {/* Product List (list-style, not card grid) */}
          {displayTools.length > 0 ? (
            <div className="space-y-3">
              {displayTools.map((tool: any) => {
                const Icon = tool.icon;
                return (
                  <Link href={`/tools/${tool.id}`} key={tool.id} className="group block">
                    <div className="border border-beige-200 rounded-xl px-5 py-4 bg-beige-50 hover:border-beige-400 hover:bg-beige-100 transition-all flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-beige-200 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5 text-beige-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-beige-900 group-hover:text-beige-700 transition-colors truncate">{tool.name}</h3>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-beige-500 bg-beige-200 px-2 py-0.5 rounded-md flex-shrink-0">{tool.category}</span>
                        </div>
                        <p className="text-xs text-beige-600 leading-relaxed mt-0.5 line-clamp-1">{tool.description}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="flex items-center gap-1 bg-beige-200 px-2 py-1 rounded-md">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span className="text-xs font-bold text-beige-900">{tool.rating}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-beige-400 group-hover:text-beige-600 transition-colors" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-beige-500">No products found matching your search.</p>
              <div className="flex gap-3 justify-center mt-4">
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory(null); }}
                  className="px-5 py-2 text-sm font-medium text-white bg-beige-500 rounded-lg hover:bg-beige-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Product */}
      {featuredTool && (
        <section className="py-16 px-6 bg-beige-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-bold text-beige-900">Featured Product</h2>
            </div>
            <div className="border border-beige-200 rounded-2xl p-8 bg-beige-50">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 rounded-2xl bg-beige-200 flex items-center justify-center flex-shrink-0">
                  <FeaturedIcon className="w-8 h-8 text-beige-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-beige-900">{featuredTool.name}</h3>
                      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-beige-600 bg-beige-200 px-2.5 py-1 rounded-md mt-1">
                        {featuredTool.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-beige-200 px-3 py-1.5 rounded-lg flex-shrink-0">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-bold text-beige-900">{featuredTool.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-beige-600 leading-relaxed mt-3 line-clamp-2">{featuredTool.description}</p>
                  <Link
                    href={`/tools/${featuredTool.id}`}
                    className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-beige-600 hover:text-beige-700 transition-colors"
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Blog Posts */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-beige-500" />
              <h2 className="text-xl font-bold text-beige-900">Latest Insights</h2>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-1 text-sm font-medium text-beige-600 hover:text-beige-700 transition-colors">
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post: any) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="border border-beige-200 rounded-xl p-6 bg-beige-50 hover:border-beige-400 hover:shadow-sm transition-all h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-beige-600 bg-beige-200 px-2.5 py-1 rounded-md">{post.category}</span>
                    <span className="text-xs text-beige-500">{post.readTime} min read</span>
                  </div>
                  <h3 className="font-semibold text-beige-900 mb-2 group-hover:text-beige-700 transition-colors leading-snug line-clamp-2 text-base">{post.title}</h3>
                  <p className="text-sm text-beige-600 leading-relaxed flex-grow line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-beige-200 text-xs text-beige-500">
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
            <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 border border-beige-300 rounded-full text-sm font-medium text-beige-600 hover:text-beige-700 transition-colors">
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-beige-100">
        <div className="max-w-6xl mx-auto">
          <div className="border border-beige-200 rounded-2xl p-8 md:p-10 bg-beige-50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-extrabold text-beige-600">{tools.length}</p>
                <p className="text-sm text-beige-600 mt-1">Products Reviewed</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-extrabold text-beige-600">{posts.length}</p>
                <p className="text-sm text-beige-600 mt-1">Expert Guides</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-extrabold text-beige-600">{CATEGORIES.length}</p>
                <p className="text-sm text-beige-600 mt-1">Categories</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-extrabold text-beige-600">{tools.length * 42}</p>
                <p className="text-sm text-beige-600 mt-1">Hours of Testing</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
