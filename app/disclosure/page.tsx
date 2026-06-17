import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure — OfficePicks by JadeInteractive",
  description:
    "OfficePicks' affiliate disclosure policy. Learn how we may earn commissions through partner links on our site.",
};

export default function DisclosurePage() {
  return (
    <div className="relative pt-32 pb-20 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-beige-700 bg-beige-200 px-3 py-1.5 rounded-md mb-4">Legal</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-beige-900 tracking-tight mb-3">Affiliate Disclosure</h1>
          <p className="text-beige-500 text-sm">Last updated: May 21, 2026</p>
        </div>
        <div className="space-y-6 text-beige-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-beige-900 mb-3">Transparency First</h2>
            <p>OfficePicks by JadeInteractive is committed to transparency. This Affiliate Disclosure explains how we may earn compensation through links on our website.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-beige-900 mb-3">Affiliate Links</h2>
            <p>Some of the links on this website are affiliate links. If you click on a link and make a purchase, we may receive a commission at no additional cost to you.</p>
            <p className="mt-3">These commissions help us maintain and improve our platform, including the hands-on testing and review process we run from our Bordeaux studio.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-beige-900 mb-3">No Impact on Reviews</h2>
            <p>Our product reviews and recommendations are never influenced by affiliate relationships. We evaluate products based on quality, ergonomics, durability, and value — not sponsorship dollars. Every product we recommend has been physically tested by our team.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-beige-900 mb-3">Questions</h2>
            <p>If you have any questions, please contact us at <a href="mailto:info@officepicks.net" className="text-beige-500 hover:underline">info@officepicks.net</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
