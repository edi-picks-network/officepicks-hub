import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Office Picks — Best Home Office Equipment Recommendations",
    template: "%s — Office Picks",
  },
  description:
    "Discover the best home office equipment, ergonomic furniture, and productivity tools. Expert-curated picks for your perfect workspace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen antialiased bg-white text-slate-900`}>
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-extrabold text-slate-900 hover:text-lime-600 transition-colors">
              Office<span className="text-lime-500">Picks</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
              <Link href="/" className="hover:text-lime-600 transition-colors">Home</Link>
              <Link href="/models" className="hover:text-lime-600 transition-colors">Products</Link>
              <Link href="/blog" className="hover:text-lime-600 transition-colors">Blog</Link>
              <Link href="/about" className="hover:text-lime-600 transition-colors">About</Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2 rounded-full bg-lime-500 text-white text-sm font-semibold hover:bg-lime-600 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <span className="text-lg font-extrabold text-slate-900">
                  Office<span className="text-lime-500">Picks</span>
                </span>
                <p className="mt-3 text-sm text-slate-500 max-w-md leading-relaxed">
                  Expert-curated recommendations for home office equipment, ergonomic furniture, and productivity tools.
                  Build your perfect workspace with confidence.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li><Link href="/" className="text-sm text-slate-500 hover:text-lime-600 transition-colors">Home</Link></li>
                  <li><Link href="/models" className="text-sm text-slate-500 hover:text-lime-600 transition-colors">Products</Link></li>
                  <li><Link href="/blog" className="text-sm text-slate-500 hover:text-lime-600 transition-colors">Blog</Link></li>
                  <li><Link href="/about" className="text-sm text-slate-500 hover:text-lime-600 transition-colors">About</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li><Link href="/privacy" className="text-sm text-slate-500 hover:text-lime-600 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-sm text-slate-500 hover:text-lime-600 transition-colors">Terms of Service</Link></li>
                  <li><Link href="/disclosure" className="text-sm text-slate-500 hover:text-lime-600 transition-colors">Disclosure</Link></li>
                  <li><Link href="/contact" className="text-sm text-slate-500 hover:text-lime-600 transition-colors">Contact</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-slate-200 text-center text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Office Picks. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
