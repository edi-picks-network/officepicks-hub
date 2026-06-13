#!/usr/bin/env python3
"""Properly apply tool refinements - handles embedded quotes correctly"""
import re, json

def read_field(text, field):
    """Read a string field from the quasi-JSON"""
    m = re.search(rf'"{re.escape(field)}": `([^`]*)`', text, re.DOTALL)
    if m:
        return m.group(1)
    # For double-quoted fields
    m = re.search(rf'"{re.escape(field)}": "', text)
    if m:
        start = m.end()
        result = ""
        i = start
        while i < len(text):
            if text[i] == '\\' and i+1 < len(text):
                c2 = text[i+1]
                if c2 == '"':
                    result += '\\"'
                    i += 2
                elif c2 == '\\':
                    result += '\\\\'
                    i += 2
                elif c2 == 'n':
                    result += '\\n'
                    i += 2
                elif c2 == 't':
                    result += '\\t'
                    i += 2
                elif c2 == 'u':
                    # Unicode escape - consume 4 hex digits
                    if i+5 < len(text):
                        result += text[i:i+6]
                        i += 6
                    else:
                        result += text[i]
                        i += 1
                else:
                    result += text[i:i+2]
                    i += 2
            elif text[i] == '"':
                break
            else:
                result += text[i]
                i += 1
        return result
    return None

def read_array(text, field):
    """Read an array field"""
    m = re.search(rf'"{re.escape(field)}": \[(.*?)\]', text, re.DOTALL)
    if not m:
        return []
    inner = m.group(1)
    items = []
    i = 0
    while i < len(inner):
        # Skip whitespace and commas
        while i < len(inner) and inner[i] in ' \n\r\t,':
            i += 1
        if i >= len(inner) or inner[i] != '"':
            break
        # Found start of string
        i += 1  # skip opening "
        result = ""
        while i < len(inner):
            if inner[i] == '\\' and i+1 < len(inner):
                c2 = inner[i+1]
                if c2 == '"':
                    result += '\\"'
                    i += 2
                elif c2 == '\\':
                    result += '\\\\'
                    i += 2
                else:
                    result += inner[i:i+2]
                    i += 2
            elif inner[i] == '"':
                i += 1
                break
            else:
                result += inner[i]
                i += 1
        items.append(result)
    return items

def read_scores(text):
    m = re.search(r'"scoreBreakdown": \{([^}]*)\}', text, re.DOTALL)
    if m:
        inner = m.group(1)
        scores = {}
        for key in ['features', 'reviews', 'momentum', 'popularity']:
            km = re.search(rf'"{re.escape(key)}":\s*(\d+)', inner)
            scores[key] = int(km.group(1)) if km else 0
        return scores
    return {'features': 0, 'reviews': 0, 'momentum': 0, 'popularity': 0}

def gen_tool_block(data, tool_id, name, category, rating, review_count, icon, alternatives, quotes):
    """Generate a TS tool block"""
    
    long_desc = data['longDescription']
    desc = data['description']
    
    pros_lines = '\n'.join(f'      "{p}",' for p in data['pros'])
    cons_lines = '\n'.join(f'      "{c}",' for c in data['cons'])
    feats_lines = '\n'.join(f'      "{f}",' for f in data['features'])
    
    pricing = data['pricing']
    pricing_detail = data['pricingDetail']
    use_case = data['useCase']
    sb = data['scoreBreakdown']
    
    quotes_lines = '\n'.join(
        f'      {{ role: "{q[0]}", company: "{q[1]}", quote: "{q[2]}" }},'
        for q in quotes
    )
    
    return f'''  {{
    id: "{tool_id}",
    name: "{name}",
    category: "{category}",
    rating: {rating},
    reviewCount: {review_count},
    icon: {icon},
    description: "{desc}",
    longDescription: `{long_desc}`,
    pros: [
{pros_lines}
    ],
    cons: [
{cons_lines}
    ],
    pricing: "{pricing}",
    pricingDetail: "{pricing_detail}",
    features: [
{feats_lines}
    ],
    useCase: "{use_case}",
    alternatives: {json.dumps(alternatives)},
    scoreBreakdown: {{ features: {sb['features']}, reviews: {sb['reviews']}, momentum: {sb['momentum']}, popularity: {sb['popularity']} }},
    userQuotes: [
{quotes_lines}
    ],
  }},'''

# Load all refined data
files_data = {}
for key, path in [("a", "/tmp/refined_anthrodesk.json"), 
                   ("n", "/tmp/refined_northbayou.json"),
                   ("f", "/tmp/refined_felixking.json")]:
    with open(path) as f:
        text = f.read()
    d = {
        'description': read_field(text, 'description'),
        'longDescription': read_field(text, 'longDescription'),
        'pros': read_array(text, 'pros'),
        'cons': read_array(text, 'cons'),
        'features': read_array(text, 'features'),
        'pricing': read_field(text, 'pricing'),
        'pricingDetail': read_field(text, 'pricingDetail'),
        'useCase': read_field(text, 'useCase'),
        'scoreBreakdown': read_scores(text),
    }
    files_data[key] = d
    
    # Debug
    print(f"\n=== {key} ===")
    print(f"  pros count: {len(d['pros'])}")
    for i, p in enumerate(d['pros']):
        print(f"  pros[{i}]: [{p}]")
    print(f"  cons count: {len(d['cons'])}")
    print(f"  features count: {len(d['features'])}")
    print(f"  score: {d['scoreBreakdown']}")

# Generate blocks
a_block = gen_tool_block(files_data['a'], "anthrodesk-lite", "AnthroDesk Lite", "Standing Desks", 3.7, 1420, "TabletSmartphone",
    ["ikea-bekant", "autonomous-smartdesk-pro", "vari-standing-desk"],
    [
        ("Graduate Law Student", "Georgetown University", "I carry it between my apartment, library carrel, and coffee shop. Crank takes 30 seconds\u2014worth it to avoid back pain during finals."),
        ("Sales Executive", "Salesforce", "Keep it folded in my suitcase. Stands up in hotel rooms for video calls\u2014clients think I have a fancy studio!"),
    ])

n_block = gen_tool_block(files_data['n'], "north-bayou-g60", "North Bayou G60 Monitor Arm", "Monitor Arms & Mounts", 4.1, 7240, "Monitor",
    ["amazonbasics-monitor-arm", "workpro-single-arm", "loctek-d7d"],
    [
        ("Online Instructor", "LearnSphere Academy", "I move my 27\" monitor constantly between teaching, grading, and recording\u2014G60 hasn\u2019t missed a beat in 2.5 years."),
        ("Small Business Owner", "GreenLeaf Bookkeeping", "Bought eight for my team. All set up same-day, and my accountant finally stopped complaining about neck pain."),
    ])

f_block = gen_tool_block(files_data['f'], "felixking-desk-organizer", "FelixKing Desk Organizer", "Desk Accessories", 4.3, 6890, "MousePointer2",
    ["cablematters-cable-tray", "grovemade-desk-mat", "twelve-south-bookshelf"],
    [
        ("Project Manager", "TerraFlow Inc.", "I rearrange mine every Monday based on my sprint goals\u2014pens on left, sticky notes center, phone dock right. It\u2019s my ritual."),
        ("Freelance Illustrator", "Ink & Ember", "Finally stopped losing my stylus caps. The magnetic trays hold everything\u2014even my tiny color swatches."),
    ])

# Apply to tools.ts
fp = "/home/edi/officepicks-hub/app/data/tools.ts"
with open(fp) as f:
    content = f.read()

for tool_id, new_block in [("anthrodesk-lite", a_block), ("north-bayou-g60", n_block), ("felixking-desk-organizer", f_block)]:
    lines = content.split('\n')
    
    # Find the tool entry
    start_line = None
    for i, line in enumerate(lines):
        if f'id: "{tool_id}"' in line:
            start_line = i
            break
    
    if start_line is None:
        print(f"❌ Could not find: {tool_id}")
        continue
    
    # Find opening brace
    obj_start = None
    for i in range(start_line, -1, -1):
        s = lines[i].strip()
        if s == '{':
            obj_start = i
            break
    
    if obj_start is None:
        print(f"❌ No opening brace for {tool_id}")
        continue
    
    # Find closing brace
    brace_count = 0
    obj_end = None
    for i in range(obj_start, len(lines)):
        brace_count += lines[i].count('{') - lines[i].count('}')
        if brace_count == 0 and i > obj_start:
            obj_end = i
            break
    
    if obj_end is None:
        print(f"❌ No closing brace for {tool_id}")
        continue
    
    old_block = '\n'.join(lines[obj_start:obj_end+1])
    
    if old_block not in content:
        print(f"❌ Block mismatch for {tool_id}")
        # Try to find it by normalized form
        print(f"  Old block starts: {repr(old_block[:80])}")
        continue
    
    content = content.replace(old_block, new_block, 1)
    print(f"✅ Replaced: {tool_id}")

with open(fp, 'w') as f:
    f.write(content)

print("\n✅ tools.ts updated!")

# Apply blog post
bp = "/home/edi/officepicks-hub/app/data/blog-posts.ts"
with open(bp) as f:
    blog_content = f.read()

with open("/tmp/blog_content.txt") as f:
    raw_blog = f.read()

raw_blog = raw_blog.strip()
if raw_blog.startswith('`'):
    raw_blog = raw_blog[1:]
if raw_blog.endswith('`'):
    raw_blog = raw_blog[:-1]

new_blog_entry = f'''{{
    slug: "ai-office-assistants-compared-2026",
    title: "AI Office Assistants Compared 2026: Copilot vs Gemini vs Claude vs Perplexity",
    excerpt: "We tested four AI office assistants\u2014Microsoft Copilot, Google Gemini, Claude Pro, and Perplexity Pro\u2014across real-world workflows to determine which one actually boosts productivity. This detailed comparison covers pricing, accuracy, integrations, and hidden costs.",
    content: `{raw_blog}`,
    author: "L\u00e9a Marchand",
    authorRole: "Productivity Software Analyst, JadeInteractive",
    date: "2026-06-13",
    category: "AI Productivity Tools",
    readTime: 14,
    tags: ["AI assistants", "Microsoft Copilot", "Google Gemini", "Claude", "Perplexity", "productivity tools", "AI comparison", "office software"]
  }},'''

last_brace = blog_content.rfind("];")
if last_brace >= 0:
    new_blog_content = blog_content[:last_brace] + new_blog_entry + "\n" + blog_content[last_brace:]
    with open(bp, 'w') as f:
        f.write(new_blog_content)
    print("✅ Blog post added")
else:
    print("❌ Could not find ]; in blog-posts.ts")

print("\n✅ All done!")
