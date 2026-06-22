import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — OfficePicks",
  description:
    "Read the Terms of Service for OfficePicks. By using our platform, you agree to these terms governing your use of the website and services.",
};

export default function TermsPage() {
  return (
    <div className="relative pt-32 pb-20 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-beige-700 bg-beige-200 px-3 py-1.5 rounded-md mb-4">
            Legal
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-beige-900 tracking-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-beige-500 text-sm">
            Last updated: May 21, 2026
          </p>
        </div>

        <div className="space-y-8 text-beige-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-beige-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the OfficePicks website (the &quot;Site&quot;), you agree to be
              bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to all of these
              Terms, you are prohibited from using the Site. We reserve the right to modify these
              Terms at any time, and your continued use constitutes acceptance of any changes.
              OfficePicks is operated by <strong>OfficePicks</strong>, Bordeaux, France.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-beige-900 mb-3">2. Description of Service</h2>
            <p>
              OfficePicks is a curated platform that provides information, reviews, and
              recommendations for home office equipment, ergonomic furniture, and productivity
              tools. Our platform serves as a research and discovery resource. We do not
              manufacture, sell, or distribute the products listed on our Site unless explicitly
              stated otherwise. We provide links to retailers where products can be purchased.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-beige-900 mb-3">3. Intellectual Property</h2>
            <p className="mb-3">
              The Site and its original content, features, and functionality — including but not
              limited to the layout, design, logos, trademarks, and written content — are owned
              by OfficePicks and are protected by international copyright, trademark, and
              intellectual property laws.
            </p>
            <p>
              Product names, logos, brand names, and model names listed on our directory are the
              property of their respective owners. Our use of these names is for identification
              and informational purposes only and does not imply endorsement or affiliation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-beige-900 mb-3">4. User Conduct</h2>
            <p className="mb-3">You agree not to use the Site to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any applicable laws, regulations, or third-party rights</li>
              <li>Submit false, misleading, or fraudulent information</li>
              <li>Upload or transmit viruses, malware, or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Scrape, crawl, or data-mine the Site without our express written permission</li>
              <li>Harass, abuse, or harm other users or our staff</li>
              <li>Interfere with the proper functioning of the Site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-beige-900 mb-3">5. Third-Party Links</h2>
            <p>
              Our Site contains links to third-party websites and services that are not owned or
              controlled by OfficePicks. We have no control over, and assume no responsibility
              for, the content, privacy policies, or practices of any third-party sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-beige-900 mb-3">6. Disclaimer of Warranties</h2>
            <p>
              The Site and all content are provided on an &quot;as is&quot; and &quot;as available&quot; basis
              without warranties of any kind, either express or implied. We do not warrant that
              the Site will be uninterrupted, error-free, or secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-beige-900 mb-3">7. Contact Information</h2>
            <div className="mt-4 p-5 bg-beige-100 border border-beige-200 rounded-xl">
              <p className="mb-2"><strong className="text-beige-900">Email:</strong> hello@officepicks.fr</p>
              <p className="mb-2"><strong className="text-beige-900">Studio:</strong> OfficePicks, 42 Quai des Chartrons, 33000 Bordeaux, France</p>
              <p><strong className="text-beige-900">Website:</strong> officepicks.net</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
