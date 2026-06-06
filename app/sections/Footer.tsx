"use client";
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative border-t border-[#3A5A2A] bg-[#0B0A1A]">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22C55E] to-[#EC4899] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-[#ECFDE8]">Office Picks</span>
            </Link>
            <p className="text-sm text-[#9BD69B] leading-relaxed mb-6">
              The most comprehensive collection of AI resources. Download models, workflows, and tools curated for you.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[{
              title: "Resources",
              links: [
                { name: 'All Resources', href: '/' },
                { name: 'Models', href: '/' },
                { name: 'LoRAs', href: '/' },
                { name: 'Workflows', href: '/' },
              ]
            }, {
              title: "Company",
              links: [
                { name: 'About', href: '/about' },
                { name: 'Blog', href: '/blog' },
              ]
            }, {
              title: "Legal",
              links: [
                { name: 'Privacy', href: '/privacy' },
                { name: 'Terms', href: '/terms' },
                { name: 'Affiliate Disclosure', href: '/disclosure' },
              ]
            }].map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-semibold text-[#ECFDE8] mb-4">{section.title}</h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-[#9BD69B] hover:text-[#22C55E] transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-[#3A5A2A] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#5FA06D]">
            &copy; {new Date().getFullYear()} Office Picks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
