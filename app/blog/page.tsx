import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog-posts";
import { ArrowRight, Calendar, Clock, Tags } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Office Picks",
  description:
    "In-depth AI tool comparisons, reviews, and guides. Expert analysis of ChatGPT, Claude, Gemini, Midjourney, GitHub Copilot, and more.",
};

export default function BlogListPage() {
  const sortedPosts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const allCategories = [...new Set(sortedPosts.map((p) => p.category))];

  return (
    <div className="relative pt-28 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#ECFDE8] tracking-tight mb-4">
            AI Tools Blog
          </h1>
          <p className="text-lg text-[#9BD69B] max-w-2xl mx-auto">
            In-depth comparisons, reviews, and guides for the latest AI tools and platforms.
            Expert analysis to help you make smarter AI investments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-[#12102A] border border-[#3A5A2A] rounded-xl p-6 card-hover flex flex-col group transition-all hover:border-[#22C55E]/50"
            >
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#22C55E]/20 text-[#22C55E]">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#5FA06D]">
                  <Clock className="w-3 h-3" />
                  {post.readTime} min read
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#ECFDE8] mb-3 group-hover:text-[#22C55E] transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-[#9BD69B] mb-4 leading-relaxed flex-grow line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-[#5FA06D] bg-[#1A1740] px-2 py-0.5 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#3A5A2A]">
                <span className="flex items-center gap-1 text-xs text-[#5FA06D]">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#22C55E] font-medium">
                  Read More <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
