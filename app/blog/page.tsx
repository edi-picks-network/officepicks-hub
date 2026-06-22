import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog-posts";
import { ArrowRight, Calendar, Clock, Tags } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — OfficePicks",
  description:
    "In-depth reviews and guides for office furniture, home office setups, and productivity tools. Expert advice from the OfficePicks team.",
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
          <h1 className="text-4xl md:text-5xl font-extrabold text-beige-900 tracking-tight mb-4">
            Office & Productivity Blog
          </h1>
          <p className="text-lg text-beige-600 max-w-2xl mx-auto">
            In-depth reviews and guides for office furniture, home office setups, and productivity tools.
            Expert advice from the OfficePicks team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-beige-100 border border-beige-200 rounded-xl p-6 card-hover flex flex-col group transition-all hover:border-beige-400"
            >
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-beige-200 text-beige-700">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-beige-500">
                  <Clock className="w-3 h-3" />
                  {post.readTime} min read
                </span>
              </div>
              <h2 className="text-xl font-bold text-beige-900 mb-3 group-hover:text-beige-700 transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-beige-600 mb-4 leading-relaxed flex-grow line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-beige-500 bg-beige-200 px-2 py-0.5 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-beige-200">
                <span className="flex items-center gap-1 text-xs text-beige-500">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1 text-xs text-beige-600 font-medium">
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
