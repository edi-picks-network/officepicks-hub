import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blog-posts";
import { renderMarkdown } from "@/lib/markdown";
import { ArrowLeft, Calendar, Clock, User, Tags } from "lucide-react";
import { blogPostSchema, organizationSchema } from "@/lib/schema";

// Generate static params for all blog posts
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ id: post.slug }));
}

// Dynamic metadata per post
export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata | undefined {
  const post = BLOG_POSTS.find((p) => p.slug === params.id);
  if (!post) return undefined;

  return {
    title: `${post.title} — Office Picks`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.id);

  if (!post) {
    notFound();
  }

  const contentHtml = renderMarkdown(post.content);

  const blogJsonLd = blogPostSchema(
    post.title,
    post.author,
    post.date,
    'Office Picks',
    post.excerpt
  );
  const orgJsonLd = organizationSchema(
    'Office Picks',
    'https://officepicks.net',
    'Curated AI resources, models, and tools for the AI community.'
  );

  return (
    <div className="relative pt-28 pb-20 px-6">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(orgJsonLd),
        }}
      />
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-[#8A7DBF] hover:text-[#22C55E] transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#22C55E]/20 text-[#22C55E]">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-[#5FA06D]">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-[#5FA06D]">
              <Clock className="w-3 h-3" />
              {post.readTime} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[#ECFDE8] mb-4 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base text-[#9BD69B] mb-4 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author */}
          <div className="flex items-center gap-2 mb-4 text-sm text-[#8A7DBF]">
            <User className="w-4 h-4" />
            <span>
              By <strong className="text-[#ECFDE8]">{post.author}</strong>
              {post.authorRole ? ` — ${post.authorRole}` : ""}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            <Tags className="w-4 h-4 text-[#5FA06D] mr-1 self-center" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[#5FA06D] bg-[#1A1740] px-2 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <article
          className="prose-content mb-12"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Footer navigation */}
        <div className="border-t border-[#3A5A2A] pt-8 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center text-[#22C55E] hover:text-[#6D28D9] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
