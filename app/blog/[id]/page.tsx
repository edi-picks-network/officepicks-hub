import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blog-posts";
import { renderMarkdown } from "@/lib/markdown";
import { ArrowLeft, Calendar, Clock, User, Tags } from "lucide-react";
import { blogPostSchema, organizationSchema } from "@/lib/schema";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ id: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata | undefined {
  const post = BLOG_POSTS.find((p) => p.slug === params.id);
  if (!post) return undefined;

  return {
    title: `${post.title} — OfficePicks`,
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
    'OfficePicks by JadeInteractive',
    post.excerpt
  );
  const orgJsonLd = organizationSchema(
    'OfficePicks by JadeInteractive',
    'https://officepicks.net',
    'Expert-curated home office equipment reviews by JadeInteractive, a Bordeaux-based engineering studio.'
  );

  return (
    <div className="relative pt-28 pb-20 px-6">
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
        <Link
          href="/blog"
          className="inline-flex items-center text-beige-500 hover:text-beige-600 transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-beige-200 text-beige-700">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-beige-500">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-beige-500">
              <Clock className="w-3 h-3" />
              {post.readTime} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-beige-900 mb-4 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base text-beige-600 mb-4 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-2 mb-4 text-sm text-beige-500">
            <User className="w-4 h-4" />
            <span>
              By <strong className="text-beige-900">{post.author}</strong>
              {post.authorRole ? ` — ${post.authorRole}` : ""}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <Tags className="w-4 h-4 text-beige-400 mr-1 self-center" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-beige-500 bg-beige-200 px-2 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <article
          className="prose-content mb-12"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <div className="border-t border-beige-200 pt-8 mb-8">
          <p className="text-xs text-beige-400">
            OfficePicks independently researches and verifies all product data. Tested by <strong>JadeInteractive</strong> in Bordeaux, France.
          </p>
        </div>

        <div className="border-t border-beige-200 pt-8 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center text-beige-500 hover:text-beige-600 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
