#!/usr/bin/env python3
"""Properly apply tool refinements using the patch tool approach - reading raw content and generating correct TS"""
import re, json, sys

def read_refined(path):
    """Read the quasi-JSON file and extract fields manually"""
    with open(path) as f:
        text = f.read()
    
    result = {}
    
    # Extract longDescription (backtick-delimited in file)
    m = re.search(r'"longDescription": `([^`]*)`', text, re.DOTALL)
    result['longDescription'] = m.group(1) if m else ''
    
    # Extract description
    m = re.search(r'"description": "((?:[^"\\]|\\.)*)"', text, re.DOTALL)
    result['description'] = m.group(1) if m else ''
    
    # Extract string arrays (pros, cons, features)
    for field in ['pros', 'cons', 'features']:
        pattern = r'"' + field + r'": \[(.*?)\]'
        m = re.search(pattern, text, re.DOTALL)
        if m:
            inner = m.group(1)
            # Find all strings - handle escaped quotes
            items = []
            for sm in re.finditer(r'"((?:[^"\\]|\\.)*)"', inner):
                item = sm.group(1)
                # Unescape
                item = item.replace('\\"', '"').replace('\\\\', '\\')
                items.append(item)
            result[field] = items
        else:
            result[field] = []
    
    # Extract pricing and pricingDetail
    m = re.search(r'"pricing": "((?:[^"\\]|\\.)*)"', text)
    result['pricing'] = m.group(1) if m else ''
    
    m = re.search(r'"pricingDetail": "((?:[^"\\]|\\.)*)"', text, re.DOTALL)
    result['pricingDetail'] = m.group(1) if m else ''
    
    # Extract useCase
    m = re.search(r'"useCase": "((?:[^"\\]|\\.)*)"', text, re.DOTALL)
    result['useCase'] = m.group(1) if m else ''
    
    # Extract scoreBreakdown
    m = re.search(r'"scoreBreakdown": \{([^}]*)\}', text, re.DOTALL)
    if m:
        inner = m.group(1)
        scores = {}
        for key in ['features', 'reviews', 'momentum', 'popularity']:
            km = re.search(rf'"{key}":\s*(\d+)', inner)
            scores[key] = int(km.group(1)) if km else 0
        result['scoreBreakdown'] = scores
    else:
        result['scoreBreakdown'] = {'features': 0, 'reviews': 0, 'momentum': 0, 'popularity': 0}
    
    return result

def esc_ts(s):
    """Escape for TS template literal content - only escape backticks and ${}"""
    return s.replace('`', '\\`').replace('${', '\\${')

def esc_dq(s):
    """Escape for double-quoted JS string - s should be raw content"""
    return s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')

def gen_tool_block(data, tool_id, name, category, rating, review_count, icon, alternatives, quotes):
    """Generate a TS tool block with properly escaped content"""
    
    # For longDescription, use template literal (backtick)
    long_desc = esc_ts(data['longDescription'])
    
    # For description, use double-quoted string
    desc = esc_dq(data['description'])
    
    # For pros/cons/features, use double-quoted strings
    # The data from read_refined already has proper escaping (\\" for quotes)
    pros_lines = '\n'.join(f'      "{p}",' for p in data['pros'])
    cons_lines = '\n'.join(f'      "{c}",' for c in data['cons'])
    feats_lines = '\n'.join(f'      "{fe}",' for fe in data['features'])
    
    # UseCase double-quoted
    use_case = esc_dq(data['useCase'])
    
    # Pricing detail
    pricing_detail = esc_dq(data['pricingDetail'])
    
    # Quotes
    quotes_lines = '\n'.join(
        f'      {{ role: "{esc_dq(q[0])}", company: "{esc_dq(q[1])}", quote: "{esc_dq(q[2])}" }},'
        for q in quotes
    )
    
    sb = data['scoreBreakdown']
    
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
    pricing: "{data['pricing']}",
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

# Load refined data
a_data = read_refined("/tmp/refined_anthrodesk.json")
n_data = read_refined("/tmp/refined_northbayou.json")
f_data = read_refined("/tmp/refined_felixking.json")

# Debug: check what we got
print("AnthroDesk pros:", a_data['pros'])
print()

# Build blocks
a_block = gen_tool_block(a_data, "anthrodesk-lite", "AnthroDesk Lite", "Standing Desks", 3.7, 1420, "TabletSmartphone",
    ["ikea-bekant", "autonomous-smartdesk-pro", "vari-standing-desk"],
    [
        ("Graduate Law Student", "Georgetown University", "I carry it between my apartment, library carrel, and coffee shop. Crank takes 30 seconds—worth it to avoid back pain during finals."),
        ("Sales Executive", "Salesforce", "Keep it folded in my suitcase. Stands up in hotel rooms for video calls—clients think I have a fancy studio!"),
    ])

n_block = gen_tool_block(n_data, "north-bayou-g60", "North Bayou G60 Monitor Arm", "Monitor Arms & Mounts", 4.1, 7240, "Monitor",
    ["amazonbasics-monitor-arm", "workpro-single-arm", "loctek-d7d"],
    [
        ("Online Instructor", "LearnSphere Academy", "I move my 27\" monitor constantly between teaching, grading, and recording—G60 hasn't missed a beat in 2.5 years."),
        ("Small Business Owner", "GreenLeaf Bookkeeping", "Bought eight for my team. All set up same-day, and my accountant finally stopped complaining about neck pain."),
    ])

f_block = gen_tool_block(f_data, "felixking-desk-organizer", "FelixKing Desk Organizer", "Desk Accessories", 4.3, 6890, "MousePointer2",
    ["cablematters-cable-tray", "grovemade-desk-mat", "twelve-south-bookshelf"],
    [
        ("Project Manager", "TerraFlow Inc.", "I rearrange mine every Monday based on my sprint goals—pens on left, sticky notes center, phone dock right. It's my ritual."),
        ("Freelance Illustrator", "Ink & Ember", "Finally stopped losing my stylus caps. The magnetic trays hold everything—even my tiny color swatches."),
    ])

# Write blocks to temp files
for name, block in [("a", a_block), ("n", n_block), ("f", f_block)]:
    path = f"/tmp/block_{name}.txt"
    with open(path, 'w') as f:
        f.write(block)
    print(f"Wrote {path} ({len(block)} chars)")

# Now read tools.ts and do replacements
fp = "/home/edi/officepicks-hub/app/data/tools.ts"
with open(fp) as f:
    content = f.read()

# For each tool, find and replace by matching id: "tool_id"
replacements = [
    ("anthrodesk-lite", a_block),
    ("north-bayou-g60", n_block),
    ("felixking-desk-organizer", f_block),
]

for tool_id, new_block in replacements:
    lines = content.split('\n')
    
    # Find the line with this tool id
    start_line = None
    for i, line in enumerate(lines):
        if f'id: "{tool_id}"' in line:
            start_line = i
            break
    
    if start_line is None:
        print(f"❌ Could not find: {tool_id}")
        continue
    
    # Go back to find opening brace
    obj_start = None
    for i in range(start_line, -1, -1):
        s = lines[i].strip()
        if s in ['{', '  {']:
            obj_start = i
            break
    
    if obj_start is None:
        print(f"❌ No opening brace for {tool_id}")
        continue
    
    # Find matching end
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
    
    if old_block in content:
        content = content.replace(old_block, new_block, 1)
        print(f"✅ Replaced: {tool_id}")
    else:
        print(f"❌ Block mismatch for {tool_id}")
        print(f"  Old starts: {old_block[:60]}...")
        print(f"  Old ends: ...{old_block[-60:]}")

with open(fp, 'w') as f:
    f.write(content)

print("\n✅ tools.ts updated!")

# Now apply blog post
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

# Escape for TS template literal
raw_blog = esc_ts(raw_blog)

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
