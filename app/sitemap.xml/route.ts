import { MetadataRoute } from "next";

const BLOG_SLUGS = [
  "notion-vs-evernote-vs-onenote-2026",
    "best-ai-productivity-tools-2026-15-essential-apps",
] as const;

const TOOL_SLUGS = [
  "chatgpt",
    "jasper",
    "copy-ai",
    "writesonic",
    "grammarly",
    "rytr",
    "sudowrite",
    "claude",
    "frase",
    "contentbot",
    "midjourney",
    "dall-e-3",
    "stable-diffusion",
    "adobe-firefly",
    "canva-ai",
    "leonardo-ai",
    "runway",
    "picsart-ai",
    "clipdrop",
    "ideogram",
    "github-copilot",
    "cursor",
    "replit-ai",
    "tabnine",
    "codeium",
    "amazon-codewhisperer",
    "gitlab-duo",
    "sourcegraph-cody",
    "pieces",
    "debuild",
    "synthesia",
    "heygen",
    "elevenlabs",
    "descript",
    "murf",
    "pictory",
    "runway-gen-2",
    "invideo-ai",
    "veed-io",
    "wondershare-filmora-ai",
    "notion-ai",
    "motion",
    "mem",
    "otter-ai",
    "fireflies-ai",
    "krisp",
    "superhuman-ai",
    "reclaim-ai",
    "clockwise",
    "goblin-tools",
    "semrush-ai",
    "surfer-seo",
    "writer",
    "marketmuse",
    "wordlift",
    "anyword",
    "acrolinx",
    "cognigy",
    "tableau-ai",
    "julius-ai",
    "obviously-ai",
    "akkio",
    "polymer",
    "seek-ai",
    "pandas-ai",
    "hex-ai",
    "sisu",
    "chatgpt-advanced-data-analysis",
    "zapier-ai",
    "make-ai",
    "n8n-ai",
    "bubble-ai",
    "airtable-ai",
    "softr-ai",
    "adalo-ai",
    "glide-ai",
    "bardeen-ai",
    "tray-ai",
    "autogpt",
    "autogen",
    "crewai",
    "metagpt",
    "openclaw",
    "hermes-agent",
    "langchain",
    "coze",
    "dify",
] as const;

const CATEGORY_SLUGS = [
  "ai-agent-and-framework",
    "ai-app-builder",
    "ai-audio-enhancement",
    "ai-automation-platform",
    "ai-browser-automation",
    "ai-calendar-and-task-management",
    "ai-calendar-management",
    "ai-calendar-optimization",
    "ai-code-assistant",
    "ai-code-completion",
    "ai-code-developer",
    "ai-code-editor",
    "ai-code-toolkit",
    "ai-code-understanding",
    "ai-data-and-analytics",
    "ai-database-and-automation",
    "ai-devsecops-platform",
    "ai-developer-productivity",
    "ai-email-assistant",
    "ai-enterprise-automation",
    "ai-image-and-design",
    "ai-knowledge-management",
    "ai-marketing-and-seo",
    "ai-meeting-and-transcription-assistant",
    "ai-meeting-intelligence",
    "ai-mobile-app-builder",
    "ai-neurodiversity-and-task-assistant",
    "ai-no-code-app-builder",
    "ai-no-code-app-platform",
    "ai-no-code-portal-builder",
    "ai-video-and-audio",
    "ai-visual-automation",
    "ai-workflow-automation",
    "ai-writing-and-content",
    "ai-writing-and-knowledge-assistant",
    "cloud-ide-with-ai",
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
