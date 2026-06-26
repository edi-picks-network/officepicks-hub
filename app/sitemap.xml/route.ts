import { MetadataRoute } from "next";

const BLOG_SLUGS = [
  "best-home-office-desk-chairs-2026",  "complete-home-office-setup-guide", "10-essential-home-office-upgrades-2026", "top-office-productivity-tools-2026", "standing-desk-ergonomics-2026", "state-of-remote-collaboration-tools-2026", "microsoft-365-vs-google-workspace-2026", "ai-office-assistants-compared-2026", "hybrid-home-office-guide-2026", "best-pm-tools-small-business-2026", "ai-productivity-tools-remote-teams-2026",  "time-blocking-tools-2026-sunsama-vs-motion-vs-reclaim", "dual-monitor-home-office-setup-2026", "office-collab-tools-20240620", "home-office-lighting-optimization-2026", "remote-team-collaboration-tools-2026", "async-first-productivity-tools-remote-teams-2026", "ergonomic-accessories-productivity-2026", "cable-management-home-office-2026", "height-adjustable-standing-desk-comparison-2026", "dual-monitor-vs-ultrawide-2026",
] as const;

const TOOL_SLUGS = [
  "herman-miller-aeron",  "steelcase-gesture",  "herman-miller-embody",  "steelcase-leap-v2",  "hm-mirra-2",  "haworth-fern",  "humanscale-freedom",  "autonomous-ergochair-pro",  "branch-ergonomic-chair",  "x-chair-x4",  "jarvis-standing-desk",  "uplift-v2",  "autonomous-smartdesk-pro",  "vari-standing-desk",  "flexispot-e7",  "deskhaus-apex-pro",  "branza-standing-desk",  "ikea-bekant",  "secretlab-magnus-pro",  "anthrodesk-lite",  "ergotron-lx",  "ergotron-hx",  "humanscale-m8",  "amazonbasics-monitor-arm",  "vivo-dual-monitor-arm",  "atdec-freestanding",  "loctek-d7d",  "north-bayou-g60",  "workpro-single-arm",  "wali-dual-arm",  "grovemade-desk-riser",  "grovemade-desk-mat",  "felixking-desk-organizer",  "rain-design-i-level",  "roost-laptop-stand",  "cablematters-cable-tray",  "anker-powerwave-stand",  "twelve-south-bookshelf",  "logitech-ergo-k860",  "logitech-mx-master-3s",  "obsidian",  "notion",  "todoist",  "ticktick",  "rescue-time",  "freedom-app",  "forest-app",  "toggl-track",  "sun-sama",  "focusmate",  "benq-screenbar-halo",  "yeelight-smart-bulb",  "philips-hue-play",  "lifx-z-strip",  "benq-screenbar-pro",  "elgato-key-light",  "quntis-screenbar",  "nanolight-leaf",  "govee-flow-plus",  "amazon-smart-lamp-for-bedroom",  "logitech-brio-4k",  "elgato-facecam-pro",  "sony-wh-1000xm5",  "jabra-evolve2-75",  "logitech-c922",  "razer-kraken-v3-pro",  "shure-mv7",  "blue-yeti-x",  "insta360-link",  "poly-voyager-focus-2",  "anker-powerport-6",  "ugreen-usb-hub",  "cablemod-cable-kit",  "joto-cable-clips",  "satechi-pro-hub",  "caldigit-ts4",  "belkin-boostcharge-pro",  "monoprice-cable-sleeve",  "iottie-aivo-wireless",  "nomad-base-station-pro",
] as const;

const CATEGORY_SLUGS = [
  "cable-power-management",  "desk-accessories",  "headsets-webcams",  "lighting-ambiance",  "monitor-arms-mounts",  "office-ergonomic-chairs",  "productivity-software",  "standing-desks",
] as const;

export async function GET() {
  const baseUrl = "https://officepicks.net";

  const urls: string[] = [];

  urls.push(`<url><loc>${baseUrl}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/blog</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/about</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/contact</loc><changefreq>monthly</changefreq><priority>0.4</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/faq</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/privacy</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/terms</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/disclosure</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);

  for (const slug of CATEGORY_SLUGS) {
    urls.push(`<url><loc>${baseUrl}/category/${slug}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
  }

  for (const slug of BLOG_SLUGS) {
    urls.push(`<url><loc>${baseUrl}/blog/${slug}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  }

  for (const slug of TOOL_SLUGS) {
    urls.push(`<url><loc>${baseUrl}/tools/${slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
