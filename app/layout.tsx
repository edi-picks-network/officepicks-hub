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
    default: "OfficePicks — Curated Home Office Equipment & Tools",
    template: "%s — OfficePicks",
  },
  description:
    "Discover the best home office equipment, ergonomic furniture, and productivity tools. Expert-curated by JadeInteractive studio based in Bordeaux, France.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen antialiased bg-beige-50 text-[#3c2e22]`}>
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-beige-200 bg-beige-50/95 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-extrabold text-beige-900 hover:text-beige-600 transition-colors">
              Office<span className="text-beige-500">Picks</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium text-beige-700">
              <Link href="/" className="hover:text-beige-600 transition-colors">Home</Link>
              <Link href="/models" className="hover:text-beige-600 transition-colors">Products</Link>
              <Link href="/blog" className="hover:text-beige-600 transition-colors">Blog</Link>
              <Link href="/about" className="hover:text-beige-600 transition-colors">About</Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2 rounded-full bg-beige-500 text-white text-sm font-semibold hover:bg-beige-600 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main>{children}</main>

        {/* Footer — JadeInteractive Bordeaux */}
        <footer className="border-t border-beige-200 bg-beige-100">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <span className="text-lg font-extrabold text-beige-900">
                  Office<span className="text-beige-500">Picks</span>
                </span>
                <p className="mt-3 text-sm text-beige-600 max-w-md leading-relaxed">
                  Expert-curated recommendations for home office equipment, ergonomic furniture, and productivity tools.
                  Built by <strong>JadeInteractive</strong> — a Bordeaux-based edge computing and cybersecurity studio.
                </p>
                <p className="mt-2 text-xs text-beige-500">
                  Crafted in Bordeaux, France 🇫🇷
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-beige-900 mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li><Link href="/" className="text-sm text-beige-600 hover:text-beige-700 transition-colors">Home</Link></li>
                  <li><Link href="/models" className="text-sm text-beige-600 hover:text-beige-700 transition-colors">Products</Link></li>
                  <li><Link href="/blog" className="text-sm text-beige-600 hover:text-beige-700 transition-colors">Blog</Link></li>
                  <li><Link href="/about" className="text-sm text-beige-600 hover:text-beige-700 transition-colors">About</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-beige-900 mb-4">Contact</h3>
                <ul className="space-y-3">
                  <li><a href="mailto:hello@jadeinteractive.fr" className="text-sm text-beige-600 hover:text-beige-700 transition-colors">hello@jadeinteractive.fr</a></li>
                  <li><span className="text-sm text-beige-500">Bordeaux, France</span></li>
                  <li><Link href="/contact" className="text-sm text-beige-600 hover:text-beige-700 transition-colors">Contact Us</Link></li>
                  <li><Link href="/privacy" className="text-sm text-beige-600 hover:text-beige-700 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-sm text-beige-600 hover:text-beige-700 transition-colors">Terms of Service</Link></li>
                  <li><Link href="/disclosure" className="text-sm text-beige-600 hover:text-beige-700 transition-colors">Disclosure</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-beige-200 text-center text-xs text-beige-500">
              &copy; {new Date().getFullYear()} OfficePicks by JadeInteractive. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
