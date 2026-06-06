import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "./sections/Header";
import Footer from "./sections/Footer";
import CookieConsent from "./components/CookieConsent";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
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
    <html lang="en" className={plusJakartaSans.variable}>
      <body className={`${plusJakartaSans.className} min-h-screen antialiased`}>
        <div className="aurora-bg" />
        <div className="grid-pattern" />
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
