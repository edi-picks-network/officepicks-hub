#!/usr/bin/env python3
"""Generate new sitemap.tsx for officepicks-hub with home office tools data"""
import json, re

# Load tools to extract slugs and categories
all_tools = []
for i in range(8):
    with open(f'/tmp/office_batch_{i}.json') as f:
        all_tools.extend(json.load(f))

# Extract unique categories and slugify
def slugify(s):
    return s.lower().replace(" & ", "-").replace("&", "-and-").replace(" ", "-").replace("/", "-").replace(",", "")

tool_slugs = [f'  "{t["id"]}",' for t in all_tools]
cat_slugs_set = set()
for t in all_tools:
    cat_slugs_set.add(slugify(t["category"]))
cat_slugs = sorted([f'  "{c}",' for c in cat_slugs_set])

blog_slugs = [
    '  "best-home-office-desk-chairs-2026",',
    '  "complete-home-office-setup-guide",',
]

print(f"Tools: {len(tool_slugs)}")
print(f"Categories: {len(cat_slugs)}")

sitemap_content = f"""import {{ MetadataRoute }} from "next";

const BLOG_SLUGS = [
{''.join(blog_slugs)}
] as const;

const TOOL_SLUGS = [
{''.join(tool_slugs)}
] as const;

const CATEGORY_SLUGS = [
{''.join(cat_slugs)}
] as const;

export async function GET() {{
  const baseUrl = "https://officepicks.net";

  const urls: string[] = [];

  urls.push(`<url><loc>${{baseUrl}}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/blog</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/about</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/contact</loc><changefreq>monthly</changefreq><priority>0.4</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/faq</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/privacy</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/terms</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/disclosure</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);

  for (const slug of CATEGORY_SLUGS) {{
    urls.push(`<url><loc>${{baseUrl}}/category/${{slug}}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
  }}

  for (const slug of BLOG_SLUGS) {{
    urls.push(`<url><loc>${{baseUrl}}/blog/${{slug}}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  }}

  for (const slug of TOOL_SLUGS) {{
    urls.push(`<url><loc>${{baseUrl}}/tools/${{slug}}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  }}

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n${{urls.join("\\n")}}\\n</urlset>`;

  return new Response(sitemap, {{
    headers: {{ "Content-Type": "application/xml" }},
  }});
}}
"""

with open('/home/edi/officepicks-hub/app/sitemap.xml/route.ts', 'w') as f:
    f.write(sitemap_content)

print("✅ Sitemap generated")
