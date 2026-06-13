"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Should I get a standing desk or stick with a traditional desk?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standing desk isn't strictly necessary, but it can make a real difference in how you feel by the end of the day. The key is alternating between sitting and standing — most people find 45–60 minutes sitting followed by 15–20 minutes standing works well. A quality electric standing desk with a sturdy frame (avoid wobble at standing height) and programmable presets is worth the investment if you plan to actually use the standing feature. Manual crank desks are cheaper but you'll be less likely to change positions. If your budget is tight, a desk converter that sits on top of your existing desk is a practical compromise.",
      },
    },
    {
      "@type": "Question",
      name: "What should I look for when buying an ergonomic chair?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "The most important features are: adjustable lumbar support that actually hits your lower back, seat depth adjustment so the front of the seat doesn't press against the back of your knees, armrests that adjust in both height and width, and a seat cushion that doesn't bottom out after a few months. Mesh back chairs (like the Herman Miller Aeron or Steelcase Kira) breathe better for long sessions. Budget pick: the IKEA Markus is decent for the price but lacks adjustable armrests. Mid-range sweet spot: the Steelcase Series 1 or the Staples Hyken. Don't buy a chair without sitting in it first if possible — every body is different.",
      },
    },
    {
      "@type": "Question",
      name: "What equipment is essential for a productive home office?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "Start with these core pieces: (1) A good monitor — 24–27 inches, 1440p resolution is the sweet spot for most people. (2) A decent ergonomic chair — don't skimp here, you'll spend thousands of hours in it. (3) A reliable desk — at least 120cm wide for a single monitor, 150cm+ for dual monitors. (4) A quality webcam — 1080p minimum with good low-light performance. (5) A noise-cancelling headset or microphone — your colleagues will thank you. (6) Proper lighting — a desk lamp that doesn't cast harsh shadows, or ring light for video calls. Everything else (standing desk converters, cable management, monitor arms) is nice to have but not essential to get started.",
      },
    },
    {
      "@type": "Question",
      "name": "What monitor size and resolution is best for working from home?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "For most home office tasks, a 27-inch 1440p (QHD) monitor hits the sweet spot. It gives you enough screen real estate for side-by-side windows without needing to scale the interface. At 24 inches, 1080p is still fine for budget setups but you'll feel cramped with multiple windows. At 32 inches, consider 4K — 1440p at 32 inches looks slightly pixelated. For coding or design work, 4K on a 27-inch monitor gives razor-sharp text, though you may need to scale to 200% on Windows or Mac. Ultrawide monitors (34-inch 21:9) are excellent for multitasking but can be tricky with screen sharing. Pro tip: a single 27-inch 1440p monitor plus a laptop screen is often more practical than two large monitors.",
      },
    },
    {
      "@type": "Question",
      "name": "Do I really need an ergonomic keyboard and mouse?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "If you type for more than a few hours a day, yes — they can prevent wrist strain and discomfort before it starts. For keyboards, the minimalist approach is a standard mechanical keyboard with a gentle slope. If you already have wrist discomfort, a split ergonomic keyboard (like the Kinesis Freestyle Pro or Logitech Ergo K860) lets you position each half at shoulder width, keeping your wrists straight. For mice, a vertical mouse (like the Logitech MX Vertical or Anker vertical mouse) rotates your hand into a handshake position, reducing forearm strain. The trackball alternative (Logitech MX Ergo) keeps your hand stationary — great for tight desks. Budget option: a simple gel wrist rest paired with any standard keyboard and mouse already reduces pressure significantly.",
      },
    },
    {
      "@type": "Question",
      "name": "Are noise-cancelling headphones worth it for remote work?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "Absolutely — if you work in a shared space or have any background noise (street traffic, roommates, appliances, pets), a good pair of noise-cancelling headphones is one of the highest-impact purchases you can make. For purely work use, look for: excellent microphone quality (your voice should sound clear, not muffled), comfortable clamping force for all-day wear, and multipoint Bluetooth so you can switch between your computer and phone seamlessly. Top picks: Sony WH-1000XM5 (best noise cancellation, great mic), Bose QC Ultra (most comfortable for long sessions), and the humble but excellent Anker Soundcore Space Q45 (best value). If you don't need isolation, open-back headphones like the Philips SHP9500 give better audio quality and breathability.",
      },
    },
    {
      "@type": "Question",
      "name": "How can I set up a productive home office on a tight budget?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "You don't need to spend a lot for a functional setup. Priorities on a budget: (1) Chair — look for a used Steelcase or Herman Miller on marketplace, they last decades. Failing that, the IKEA Markus ($250) or a simple mesh task chair with lumbar support. (2) Desk — a basic 120x60cm table from IKEA ($60) is stable and plenty of space. Add a desk riser if you want to stand. (3) Monitor — use what you have, even a single 1080p monitor is productive. Save for a 27-inch 1440p as your first upgrade. (4) Peripherals — Logitech MK270 combo ($25) is perfectly usable. Upgrade to mechanical keyboard and vertical mouse over time. (5) Lighting — a $15 desk lamp with warm bulb makes your space feel professional. Total cost for a decent starting setup: under $500, and you can improve piece by piece.",
      },
    },
    {
      "@type": "Question",
      "name": "How should I arrange my home office space?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "Start with three principles: light, sight lines, and separation. (1) Position your desk perpendicular to windows — facing a window can cause eye strain from brightness contrast, while having it behind you creates glare on your screen. Side lighting is ideal. (2) Your monitor should be at arm's length, with the top bezel at or just below eye level. Use books or a monitor arm if needed. (3) If possible, dedicate a specific area to work that you can physically leave at the end of the day — even a corner of a room with a room divider or curtain creates mental separation. (4) Keep your desk surface clear — only the essentials (monitor, keyboard, mouse, phone charger). Clutter adds cognitive load. (5) Add one personal item (plant, photo, small decoration) to make the space feel yours without becoming distracting.",
      },
    },
    {
      "@type": "Question",
      "name": "Do I need separate webcam, microphone, and speakers for video calls?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "For most people, a good headset with a built-in mic is enough. But if you take many calls or present frequently, upgrading the audio makes a huge difference. The jump from a laptop's built-in mic to even a $50 USB microphone (like the Blue Snowball or Samson Q2U) is dramatic. For webcams, the Logitech C920 ($60) is still the gold standard for value — 1080p, decent low-light, reliable. If you have a modern smartphone, consider using it as a webcam via EpocCam or Camo — the camera quality far exceeds most dedicated webcams. For speakers, skip them unless you frequently share your screen in meetings — use your headset. One exception: if you don't like wearing headsets, get a desktop microphone and use your laptop speakers or a basic speaker.",
      },
    },
    {
      "@type": "Question",
      "name": "How often should I replace my home office equipment?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "It depends on the item. Monitors: every 5–7 years. The technology improves slowly, so replace when you want higher resolution, better color accuracy, or USB-C connectivity. Ergonomic chairs: 7–15 years. High-end chairs (Steelcase, Herman Miller) last over a decade with minor maintenance (tightening bolts, replacing casters). Budget chairs: 2–4 years before the cushion and gas cylinder degrade. Keyboards: mechanical keyboards can last 10+ years (Cherry MX switches are rated for 50 million keystrokes). Membrane keyboards: 1–3 years. Mice: 2–5 years, depending on click switches and scroll wheel quality. Headsets: 2–4 years — the ear pads and battery (for wireless) degrade. Webcams: the Logitech C920 is still competitive after 10+ years, so only upgrade if you need 4K or better low-light performance.",
      },
    },
    {
      "@type": "Question",
      "name": "What printer should I get for home office use?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "That depends on how often you print. If you print less than once a week (most remote workers), get a monochrome laser printer — the toner never dries out like ink does. The Brother HL-L2370DW ($120) is the go-to recommendation: reliable, duplex printing, wireless, and toner lasts 1,200+ pages for $40. If you need occasional color printing, the Brother HL-L3270CDW is a solid color laser option. Avoid budget inkjet printers unless you print photos regularly — the ink costs more than the printer within months. For all-in-one (scan/copy/fax), the Brother MFC-L2750DW is excellent. If you truly print only a few pages a month, skip the printer entirely and use a print shop — it'll be cheaper and less hassle.",
      },
    },
    {
      "@type": "Question",
      "name": "What software tools do I need for remote work productivity?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "Keep your stack simple. Communication: Slack or Teams for messaging, Zoom or Google Meet for video calls, and Loom for async video messages. Project management: Notion or Todoist for personal task management (free tiers are generous), Linear or Asana for team projects. Document collaboration: Google Workspace or Microsoft 365 — pick one ecosystem and stick with it. Password management: Bitwarden (free and open source) or 1Password. Note-taking: Obsidian or Notion for long-form notes, Apple Notes or Google Keep for quick captures. File sync: Dropbox or Google Drive. Beyond these core tools, don't add more unless you have a specific need. Each additional tool adds cognitive overhead. A good rule: if you haven't opened an app in two weeks, uninstall it.",
      },
    },
  ],
};

const FAQ_ITEMS = FAQ_SCHEMA.mainEntity.map((item) => ({
  question: item.name,
  answer: item.acceptedAnswer.text,
}));

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative pt-32 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-beige-700 bg-beige-200 px-3 py-1.5 rounded-md mb-4">
            FAQ
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-beige-900 tracking-tight mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-beige-600 text-lg">
            Everything you need to know about setting up, equipping, and
            optimizing your home office.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className="bg-beige-100 border border-beige-200 rounded-xl overflow-hidden transition-all duration-200 card-hover"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-beige-900 font-semibold text-sm pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-beige-500 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? "max-h-[600px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 text-beige-600 text-sm leading-relaxed border-t border-beige-200 pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
