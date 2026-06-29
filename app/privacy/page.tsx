import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — OfficePicks",
  description:
    "Learn how OfficePicks collects, uses, and protects your personal data. Our privacy policy outlines our commitment to your privacy and data security, including Google AdSense and GDPR/CCPA compliance.",
};

export default function PrivacyPage() {
  return (
    <div className="relative pt-32 pb-20 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-beige-700 bg-beige-200 px-3 py-1.5 rounded-md mb-4">
            Legal
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-beige-900 tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-beige-500 text-sm">
            Last updated: May 21, 2026
          </p>
        </div>

        <div className="space-y-8 text-beige-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-beige-900 mb-3">1. Introduction</h2>
            <p>
              OfficePicks (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website officepicks.net (the &quot;Site&quot;). Please read this
              policy carefully. If you do not agree with the terms, do not access the Site.
            </p>
            <p className="mt-3">
              OfficePicks is operated by <strong>OfficePicks</strong>, a studio based in Bordeaux, France.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-beige-900 mb-3">2. Information We Collect</h2>
            <h3 className="text-lg font-semibold text-beige-900 mb-2">Personal Data</h3>
            <p className="mb-3">
              We may collect personally identifiable information such as your name, email address,
              and any other details you voluntarily submit through our contact forms, newsletter
              signups, or product suggestion submissions.
            </p>
            <h3 className="text-lg font-semibold text-beige-900 mb-2">Automatically Collected Data</h3>
            <p className="mb-3">
              When you visit the Site, we automatically collect certain information including your
              IP address, browser type, operating system, referring URLs, device type, and browsing
              behavior. This data helps us improve our services and understand how users interact
              with our platform.
            </p>
            <h3 className="text-lg font-semibold text-beige-900 mb-2">Cookies and Tracking Technologies</h3>
            <p>
              We use cookies, web beacons, and similar tracking technologies to enhance your
              browsing experience, analyze site traffic, and serve targeted advertisements. You
              can control cookie preferences through your browser settings. For more details, see
              our Cookie Policy below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-beige-900 mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We use the collected data for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To operate, maintain, and improve the Site and our services</li>
              <li>To respond to your comments, questions, and support requests</li>
              <li>To send you newsletters and updates about new product reviews (with your consent)</li>
              <li>To analyze usage trends and measure the effectiveness of our content</li>
              <li>To detect, prevent, and address technical issues and fraudulent activity</li>
              <li>To display personalized advertisements through Google AdSense</li>
              <li>To comply with legal obligations and enforce our Terms of Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-beige-900 mb-3">4. Google AdSense</h2>
            <p className="mb-3">
              We use Google AdSense to display advertisements on our Site. Google AdSense uses
              cookies and web beacons to serve ads based on your prior visits to our website and
              other websites across the internet.
            </p>
            <p className="mb-3">
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to
              you based on your visit to our Site and/or other sites on the Internet. You may opt
              out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-beige-500 hover:underline"
              >
                Google&apos;s Ads Settings
              </a>
              .
            </p>
            <p>
              For more information about how Google uses your data, please visit{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-beige-500 hover:underline"
              >
                How Google uses information from sites that use their services
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-beige-900 mb-3">5. Information Sharing and Disclosure</h2>
            <p className="mb-3">
              We do not sell your personal information. We may share your data in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Service Providers:</strong> We engage trusted third-party companies
                (analytics, hosting, email delivery) to assist in operating our Site.
              </li>
              <li>
                <strong>Advertising Partners:</strong> Google AdSense and other ad networks may
                use cookies to serve relevant ads.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose information if required by
                law, court order, or governmental regulation.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger, acquisition, or
                sale of assets, your information may be transferred as part of the transaction.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-beige-900 mb-3">6. Cookie Policy</h2>
            <p className="mb-3">
              Our Site uses the following types of cookies:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the basic functionality of the Site.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with the Site.</li>
              <li><strong>Advertising Cookies:</strong> Used by Google AdSense to deliver personalized advertisements.</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings.</li>
            </ul>
            <p className="mt-3">
              You can manage cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-beige-900 mb-3">7. Your Rights (GDPR & CCPA)</h2>
            <p className="mb-3">
              Depending on your jurisdiction, you may have the following rights regarding your
              personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong>Right to Deletion (Right to be Forgotten):</strong> Request deletion of your personal data.</li>
              <li><strong>Right to Restrict Processing:</strong> Request that we limit how we use your data.</li>
              <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service provider.</li>
              <li><strong>Right to Object:</strong> Object to the processing of your personal data.</li>
              <li><strong>Right to Opt Out (CCPA):</strong> California residents may opt out of the sale of their personal information.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at info@officepicks.net.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-beige-900 mb-3">8. Contact Us</h2>
            <div className="mt-4 p-5 bg-beige-100 border border-beige-200 rounded-xl">
              <p className="mb-2"><strong className="text-beige-900">Email:</strong> info@officepicks.net</p>
              <p className="mb-2"><strong className="text-beige-900">Studio:</strong> OfficePicks, 42 Quai des Chartrons, 33000 Bordeaux, France</p>
              <p><strong className="text-beige-900">Website:</strong> officepicks.net</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
