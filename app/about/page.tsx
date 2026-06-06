import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Target, RefreshCw, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Office Picks",
  description:
    "Office Picks is an independent directory of AI models, tools, and resources. We curate and organize the best AI resources to help developers and creators stay ahead.",
};

const VALUES = [
  {
    icon: Sparkles,
    title: "Curated Excellence",
    desc: "Every AI resource on our platform is hand-picked based on quality, community reputation, and real-world utility — not sponsorship or paid placement.",
  },
  {
    icon: Target,
    title: "Practical Discovery",
    desc: "We organize AI resources by category, use case, and popularity so you can quickly find the right model, tool, or tutorial for your specific needs.",
  },
  {
    icon: RefreshCw,
    title: "Fresh & Up-to-Date",
    desc: "The AI landscape evolves daily. We continuously monitor new releases, updates, and community trends to keep our catalog current and relevant.",
  },
  {
    icon: Globe,
    title: "Community-Driven",
    desc: "Our recommendations are informed by community usage patterns, open-source activity, and developer feedback — not by advertising dollars.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative pt-32 pb-20 px-6">
      <div className="max-w-[800px] mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#22C55E] bg-[#1A1740] px-3 py-1.5 rounded-md mb-4">
            About
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#ECFDE8] tracking-tight mb-6">
            Your Guide to{" "}
            <span className="text-gradient">AI Resources</span>
          </h1>
          <p className="text-lg text-[#9BD69B] leading-relaxed max-w-2xl mx-auto">
            Office Picks is an independent directory that helps developers,
            creators, and businesses discover, evaluate, and download the best
            AI models, tools, and learning resources from across the web.
          </p>
        </div>

        {/* What We Do */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#ECFDE8] mb-6">What We Do</h2>
          <div className="space-y-4 text-[#9BD69B] leading-relaxed">
            <p>
              Office Picks was created to solve a growing problem: the AI
              ecosystem is expanding faster than anyone can track. New models
              are released daily, tools spring up overnight, and finding quality
              learning resources has become a challenge of its own.
            </p>
            <p>
              We catalog and organize AI resources across dozens of categories —
              including large language models, image generation, code assistants,
              speech-to-text, video generation, AI agents, fine-tuning tools,
              and educational tutorials. Each resource page includes a clear
              description, relevant links, category tags, and community context
              to help you decide what is worth your time.
            </p>
            <p>
              Our data is compiled from public sources including model
              documentation, open-source repositories, official websites, and
              community discussions. We do not claim to have tested every
              resource personally — instead, we synthesize the best available
              public information to help you make informed choices.
            </p>
          </div>
        </div>

        {/* How We Work */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#ECFDE8] mb-8 text-center">
            How We Curate Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-[#12102A] border border-[#3A5A2A] rounded-xl p-6 card-hover"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#1A1740] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#22C55E]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#ECFDE8] mb-2">{value.title}</h3>
                  <p className="text-sm text-[#9BD69B] leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Update Frequency */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#ECFDE8] mb-6">Update Frequency</h2>
          <div className="space-y-4 text-[#9BD69B] leading-relaxed">
            <p>
              We strive to keep Office Picks as current as the field it covers.
              Our team monitors new releases and updates on a daily basis. Blog
              articles and new resource listings are published multiple times per
              week. Existing resource pages are reviewed and refreshed at least
              monthly to ensure links remain active and descriptions stay accurate.
            </p>
            <p>
              If you notice a broken link or outdated information, please let us
              know through our contact page. Community contributions help keep
              this resource reliable for everyone.
            </p>
          </div>
        </div>

        {/* Operation */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#ECFDE8] mb-6">How We Operate</h2>
          <div className="space-y-4 text-[#9BD69B] leading-relaxed">
            <p>
              Office Picks is operated independently. We are not owned by or
              affiliated with any AI model provider, cloud platform, or venture
              capital firm. Our mission is simple: help people find the right AI
              resources without the noise.
            </p>
            <p>
              The site is supported through affiliate partnerships and
              advertising via Google AdSense. These revenue streams allow us to
              keep the platform free for all users. Sponsored content, if any,
              is always clearly labeled. Our curation decisions remain independent
              of commercial relationships.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-[#12102A] border border-[#3A5A2A] rounded-xl p-10">
          <h2 className="text-2xl font-bold text-[#ECFDE8] mb-4">
            Have feedback or a suggestion?
          </h2>
          <p className="text-[#9BD69B] mb-6 max-w-lg mx-auto">
            We are always improving. If you know of a great AI resource we
            should add, or notice something that needs updating, let us know.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#22C55E] hover:bg-[#6D28D9] text-white font-medium rounded-lg transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="mailto:info@officepicks.net"
              className="px-6 py-3 border border-[#3A5A2A] hover:border-[#3D3680] text-[#9BD69B] hover:text-[#ECFDE8] font-medium rounded-lg transition-all"
            >
              info@officepicks.net
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
