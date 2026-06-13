#!/usr/bin/env python3
"""Apply refinements to tools.ts using line-based replacement."""
import json, re

def esc(s):
    """Escape backticks and dollar signs for TS template literals."""
    return s.replace('`', '\\`').replace('${', '\\${')

def format_pros(arr):
    return '\n'.join(f'      "{esc(p)}",' for p in arr)

def format_cons(arr):
    return '\n'.join(f'      "{esc(c)}",' for c in arr)

def format_features(arr):
    return '\n'.join(f'      "{esc(f)}",' for f in arr)

def replace_tool_in_file(filepath, tool_id, old_start_line_prefix, new_content_gen):
    """Generic tool replacer"""
    with open(filepath) as f:
        content = f.read()
    
    # Find the tool entry by id
    pattern = rf'(  {{[^}}]*?id: "{re.escape(tool_id)}".*?(?=\n  {{|\n];))'
    
    # Simpler approach: find by matching id: "tool_id",
    lines = content.split('\n')
    
    # Find the tool entry boundaries
    start_idx = None
    brace_count = 0
    found_start = False
    
    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped == '{' or stripped == '  {':
            if not found_start:
                # Check if this is the tool we want by looking ahead
                for j in range(i, min(i+10, len(lines))):
                    if f'id: "{tool_id}"' in lines[j]:
                        start_idx = i
                        found_start = True
                        break
        if found_start and start_idx is not None:
            # Count braces to find matching end
            brace_count += stripped.count('{') - stripped.count('}')
            if brace_count == 0 and i > start_idx:
                end_idx = i
                break
    
    if start_idx is None or not found_start:
        print(f"❌ Could not find tool: {tool_id}")
        return False
    
    # Generate the new content
    new_block = new_content_gen()
    
    # Replace
    old_block = '\n'.join(lines[start_idx:end_idx+1])
    content = content.replace(old_block, new_block, 1)
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"✅ Replaced tool: {tool_id}")
    return True

def apply_anthrodesk():
    with open("/tmp/refined_anthrodesk.json") as f:
        d = json.load(f)
    
    def gen():
        return f'''  {{
    id: "anthrodesk-lite",
    name: "AnthroDesk Lite",
    category: "Standing Desks",
    rating: 3.7,
    reviewCount: 1420,
    icon: TabletSmartphone,
    description: "{esc(d['description'])}",
    longDescription: `{esc(d['longDescription'])}`,
    pros: [
{format_pros(d['pros'])}
    ],
    cons: [
{format_cons(d['cons'])}
    ],
    pricing: "{d['pricing']}",
    pricingDetail: "{esc(d['pricingDetail'])}",
    features: [
{format_features(d['features'])}
    ],
    useCase: "{esc(d['useCase'])}",
    alternatives: ["ikea-bekant", "autonomous-smartdesk-pro", "vari-standing-desk"],
    scoreBreakdown: {{ features: {d['scoreBreakdown']['features']}, reviews: {d['scoreBreakdown']['reviews']}, momentum: {d['scoreBreakdown']['momentum']}, popularity: {d['scoreBreakdown']['popularity']} }},
    userQuotes: [
      {{ role: "Graduate Law Student", company: "Georgetown University", quote: "I carry it between my apartment, library carrel, and coffee shop. Crank takes 30 seconds\u2014worth it to avoid back pain during finals." }},
      {{ role: "Sales Executive", company: "Salesforce", quote: "Keep it folded in my suitcase. Stands up in hotel rooms for video calls\u2014clients think I have a fancy studio!" }},
    ],
  }},'''
    return gen

def apply_northbayou():
    with open("/tmp/refined_northbayou.json") as f:
        d = json.load(f)
    
    def gen():
        return f'''  {{
    id: "north-bayou-g60",
    name: "North Bayou G60 Monitor Arm",
    category: "Monitor Arms & Mounts",
    rating: 4.1,
    reviewCount: 7240,
    icon: Monitor,
    description: "{esc(d['description'])}",
    longDescription: `{esc(d['longDescription'])}`,
    pros: [
{format_pros(d['pros'])}
    ],
    cons: [
{format_cons(d['cons'])}
    ],
    pricing: "{d['pricing']}",
    pricingDetail: "{esc(d['pricingDetail'])}",
    features: [
{format_features(d['features'])}
    ],
    useCase: "{esc(d['useCase'])}",
    alternatives: ["amazonbasics-monitor-arm", "workpro-single-arm", "loctek-d7d"],
    scoreBreakdown: {{ features: {d['scoreBreakdown']['features']}, reviews: {d['scoreBreakdown']['reviews']}, momentum: {d['scoreBreakdown']['momentum']}, popularity: {d['scoreBreakdown']['popularity']} }},
    userQuotes: [
      {{ role: "Online Instructor", company: "LearnSphere Academy", quote: "I move my 27" monitor constantly between teaching, grading, and recording\u2014G60 hasn\u2019t missed a beat in 2.5 years." }},
      {{ role: "Small Business Owner", company: "GreenLeaf Bookkeeping", quote: "Bought eight for my team. All set up same-day, and my accountant finally stopped complaining about neck pain." }},
    ],
  }},
'''
    return gen

def apply_felixking():
    with open("/tmp/refined_felixking.json") as f:
        d = json.load(f)
    
    def gen():
        return f'''  {{
    id: "felixking-desk-organizer",
    name: "FelixKing Desk Organizer",
    category: "Desk Accessories",
    rating: 4.3,
    reviewCount: 6890,
    icon: MousePointer2,
    description: "{esc(d['description'])}",
    longDescription: `{esc(d['longDescription'])}`,
    pros: [
{format_pros(d['pros'])}
    ],
    cons: [
{format_cons(d['cons'])}
    ],
    pricing: "{d['pricing']}",
    pricingDetail: "{esc(d['pricingDetail'])}",
    features: [
{format_features(d['features'])}
    ],
    useCase: "{esc(d['useCase'])}",
    alternatives: ["cablematters-cable-tray", "grovemade-desk-mat", "twelve-south-bookshelf"],
    scoreBreakdown: {{ features: {d['scoreBreakdown']['features']}, reviews: {d['scoreBreakdown']['reviews']}, momentum: {d['scoreBreakdown']['momentum']}, popularity: {d['scoreBreakdown']['popularity']} }},
    userQuotes: [
      {{ role: "Project Manager", company: "TerraFlow Inc.", quote: "I rearrange mine every Monday based on my sprint goals\u2014pens on left, sticky notes center, phone dock right. It\u2019s my ritual." }},
      {{ role: "Freelance Illustrator", company: "Ink & Ember", quote: "Finally stopped losing my stylus caps. The magnetic trays hold everything\u2014even my tiny color swatches." }},
    ],
  }},
'''
    return gen

def apply_blog():
    """Add new blog post to blog-posts.ts"""
    with open("/tmp/blog_content.txt") as f:
        blog_content = f.read()
    
    # Remove leading/trailing backticks that are part of the content
    content_for_ts = blog_content.strip()
    if content_for_ts.startswith('`'):
        content_for_ts = content_for_ts[1:]
    if content_for_ts.endswith('`'):
        content_for_ts = content_for_ts[:-1]
    
    # Escape any backticks inside
    content_for_ts = esc(content_for_ts)
    
    new_entry = f'''{{
    slug: "ai-office-assistants-compared-2026",
    title: "AI Office Assistants Compared 2026: Copilot vs Gemini vs Claude vs Perplexity",
    excerpt: "We tested four AI office assistants\u2014Microsoft Copilot, Google Gemini, Claude Pro, and Perplexity Pro\u2014across real-world workflows to determine which one actually boosts productivity. This detailed comparison covers pricing, accuracy, integrations, and hidden costs.",
    content: `{content_for_ts}`,
    author: "L\u00e9a Marchand",
    authorRole: "Productivity Software Analyst, JadeInteractive",
    date: "2026-06-13",
    category: "AI Productivity Tools",
    readTime: 14,
    tags: ["AI assistants", "Microsoft Copilot", "Google Gemini", "Claude", "Perplexity", "productivity tools", "AI comparison", "office software"]
  }},'''
    
    filepath = "/home/edi/officepicks-hub/app/data/blog-posts.ts"
    with open(filepath) as f:
        content = f.read()
    
    # Insert before the last ];
    last_brace = content.rfind("];")
    if last_brace >= 0:
        new_content = content[:last_brace] + new_entry + "\n" + content[last_brace:]
        with open(filepath, 'w') as f:
            f.write(new_content)
        print("✅ Blog post added")
    else:
        print("❌ Could not find ]; in blog-posts.ts")

def find_and_replace_tool(filepath, tool_id, gen_func):
    """More robust approach - find by id and replace everything until comma/brace match"""
    with open(filepath) as f:
        content = f.read()
    
    lines = content.split('\n')
    
    # Find the line with the tool id
    start_line = None
    for i, line in enumerate(lines):
        if f'id: "{tool_id}"' in line:
            start_line = i
            break
    
    if start_line is None:
        print(f"❌ Could not find tool id: {tool_id}")
        return False
    
    # Go back to find opening brace
    obj_start = None
    for i in range(start_line, -1, -1):
        s = lines[i].strip()
        if s == '{' or s == '  {':
            obj_start = i
            break
    
    if obj_start is None:
        print(f"❌ Could not find opening brace for {tool_id}")
        return False
    
    # Find matching end - count braces
    brace_count = 0
    obj_end = None
    for i in range(obj_start, len(lines)):
        brace_count += lines[i].count('{') - lines[i].count('}')
        if brace_count == 0 and i > obj_start:
            obj_end = i
            break
    
    if obj_end is None:
        print(f"❌ Could not find closing brace for {tool_id}")
        return False
    
    old_block = '\n'.join(lines[obj_start:obj_end+1])
    new_block = gen_func()
    
    if old_block in content:
        content = content.replace(old_block, new_block, 1)
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"✅ Replaced: {tool_id}")
        return True
    else:
        print(f"❌ Block mismatch for {tool_id}")
        print(f"Old block starts with: {old_block[:80]}...")
        print(f"New block starts with: {new_block[:80]}...")
        return False

if __name__ == "__main__":
    fp = "/home/edi/officepicks-hub/app/data/tools.ts"
    
    find_and_replace_tool(fp, "anthrodesk-lite", apply_anthrodesk())
    find_and_replace_tool(fp, "north-bayou-g60", apply_northbayou())
    find_and_replace_tool(fp, "felixking-desk-organizer", apply_felixking())
    apply_blog()
    print("\n✅ All done!")
