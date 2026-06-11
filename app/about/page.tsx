import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Users, Shield, Cpu, Wine, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About — OfficePicks by JadeInteractive",
  description:
    "OfficePicks is curated by JadeInteractive, a Bordeaux-based studio specializing in edge computing and cybersecurity. We test and recommend the best home office equipment.",
};

const TEAM_VALUES = [
  {
    icon: Shield,
    title: "Built by Security Engineers",
    desc: "Our 6-person team brings deep expertise in cybersecurity and edge infrastructure. We evaluate office gear with the same rigor we apply to securing distributed systems.",
  },
  {
    icon: Cpu,
    title: "Edge Computing Roots",
    desc: "Based in Bordeaux, we design for remote-first, low-latency, resilient workflows. Every recommendation reflects real-world use in distributed team environments.",
  },
  {
    icon: MapPin,
    title: "Proudly Bordelais",
    desc: "Bordeaux isn't just our home — it's our inspiration. From the quays of the Garonne to the city's thriving tech scene, we craft solutions that reflect our region's blend of tradition and innovation.",
  },
  {
    icon: Users,
    title: "Small Team, Big Standards",
    desc: "With 6 specialists covering edge architecture, cybersecurity, UX, and hardware testing, we personally verify every product before it earns a spot on OfficePicks.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative pt-32 pb-20 px-6">
      <div className="max-w-[800px] mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-beige-700 bg-beige-200 px-3 py-1.5 rounded-md mb-4">
            About Us
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-beige-900 tracking-tight mb-6">
            Office Gear,{" "}
            <span className="text-beige-500">Tested in Bordeaux</span>
          </h1>
          <p className="text-lg text-beige-600 leading-relaxed max-w-2xl mx-auto">
            OfficePicks is curated by <strong>JadeInteractive</strong>, a 6-person
            studio based in Bordeaux, France. We combine edge computing and
            cybersecurity expertise with hands-on hardware testing to bring you
            honest, thorough home office recommendations.
          </p>
        </div>

        {/* The JadeInteractive Story */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-beige-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-beige-600 leading-relaxed">
            <p>
              JadeInteractive was founded in 2018 by three engineers who met at
              the Bordeaux INP engineering school. What started as a cybersecurity
              consultancy quickly evolved into something broader: a studio that
              builds secure, edge-native solutions for distributed teams across Europe.
            </p>
            <p>
              In 2023, while building a dedicated remote work setup for our own
              team, we realized how fragmented the home office market had become.
              Thousands of "best of" lists, affiliate-driven reviews, and paid
              placements made it nearly impossible to find honest, technically
              grounded recommendations.
            </p>
            <p>
              So we built <strong>OfficePicks</strong> — not as an affiliate site,
              but as a genuine testing ground. Every monitor, chair, desk, cable
              management system, and productivity tool we recommend has been
              used daily by at least one of our team members for a minimum of
              two weeks before earning a review.
            </p>
            <p>
              Today, our 6-person team spans edge infrastructure engineering,
              cybersecurity research, UX design, and hardware testing. We're
              based in a light-filled workspace near the Chartrons district in
              Bordeaux, surrounded by wine country and Atlantic light — the
              perfect environment for building better work tools.
            </p>
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-beige-900 mb-8 text-center">
            How We Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEAM_VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-beige-100 border border-beige-200 rounded-xl p-6 card-hover"
                >
                  <div className="w-12 h-12 rounded-lg bg-beige-200 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-beige-600" />
                  </div>
                  <h3 className="text-lg font-bold text-beige-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-beige-600 leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-beige-900 mb-6">The Team</h2>
          <div className="space-y-4 text-beige-600 leading-relaxed">
            <p>
              <strong className="text-beige-900">Antoine Lefèvre</strong> — Founder & Lead Security Engineer. Former Airbus Cybersecurity, now architecting edge-secure infrastructure for remote teams.
            </p>
            <p>
              <strong className="text-beige-900">Camille Renard</strong> — Edge Infrastructure Lead. Specializes in low-latency distributed systems and hardware integration.
            </p>
            <p>
              <strong className="text-beige-900">Maxime Dubois</strong> — UX & Product Design. Turns complex technical evaluations into clear, human-readable reviews.
            </p>
            <p>
              <strong className="text-beige-900">Léa Marchand</strong> — Hardware Testing & QA. Puts every product through real-world stress testing in our Bordeaux workspace.
            </p>
            <p>
              <strong className="text-beige-900">Hugo Vidal</strong> — Full-Stack Engineer. Builds and maintains the OfficePicks platform with a focus on performance and privacy.
            </p>
            <p>
              <strong className="text-beige-900">Sarah Benali</strong> — Content & Research. Digs into user feedback, community discussions, and industry trends to guide our coverage.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-beige-100 border border-beige-200 rounded-xl p-10">
          <h2 className="text-2xl font-bold text-beige-900 mb-4">
            Have a product to suggest?
          </h2>
          <p className="text-beige-600 mb-6 max-w-lg mx-auto">
            We're always testing new gear. If you have a home office product you think we should review, drop us a line.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-beige-500 hover:bg-beige-600 text-white font-medium rounded-lg transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="mailto:hello@jadeinteractive.fr"
              className="px-6 py-3 border border-beige-300 hover:border-beige-400 text-beige-600 hover:text-beige-900 font-medium rounded-lg transition-all"
            >
              hello@jadeinteractive.fr
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
