#!/usr/bin/env python3
"""Extract data from the refined JSON files (which have TS template literals) and apply to tools.ts"""
import re

import json

def extract_field(text, field):
    """Extract a field value from the quasi-JSON"""
    # Match "field": `...` or "field": "..."
    pattern1 = f'"{field}": `([^`]*)`'
    m = re.search(pattern1, text, re.DOTALL)
    if m:
        return m.group(1)
    pattern2 = f'"{field}": "((?:[^"\\\\]|\\\\.)*)"'
    m = re.search(pattern2, text, re.DOTALL)
    if m:
        return m.group(1)
    return None

def extract_array(text, field):
    """Extract array field"""
    pattern = f'"{field}": \\[(.*?)\\]'
    m = re.search(pattern, text, re.DOTALL)
    if m:
        items = re.findall(r'"((?:[^"\\\\]|\\\\.)*)"', m.group(1))
        return items
    return []

def extract_obj(text, field):
    """Extract scoreBreakdown object"""
    pattern = f'"{field}": {{([^}}]*)}}'
    m = re.search(pattern, text, re.DOTALL)
    if m:
        inner = m.group(1)
        result = {}
        for key in ['features', 'reviews', 'momentum', 'popularity']:
            km = re.search(fr'"{key}":\s*(\d+)', inner)
            if km:
                result[key] = int(km.group(1))
        return result
    return {}

def esc(s):
    return s.replace('`', '\\`').replace('${', '\\${')

def process_file(inpath, outprefix):
    with open(inpath) as f:
        text = f.read()
    
    desc = extract_field(text, 'description')
    long_desc = extract_field(text, 'longDescription')
    pros = extract_array(text, 'pros')
    cons = extract_array(text, 'cons')
    pricing = extract_field(text, 'pricing')
    pricing_detail = extract_field(text, 'pricingDetail')
    features = extract_array(text, 'features')
    use_case = extract_field(text, 'useCase')
    score = extract_obj(text, 'scoreBreakdown')
    
    return {
        'description': desc,
        'longDescription': long_desc,
        'pros': pros,
        'cons': cons,
        'pricing': pricing,
        'pricingDetail': pricing_detail,
        'features': features,
        'useCase': use_case,
        'scoreBreakdown': score,
    }

# Load all 3
a = process_file('/tmp/refined_anthrodesk.json', 'a')
n = process_file('/tmp/refined_northbayou.json', 'n')
f = process_file('/tmp/refined_felixking.json', 'f')

# Generate replacement blocks
def gen_tool_block(data, tool_id, name, category, rating, review_count, icon, alternatives, quotes):
    pros_str = '\n'.join(f'      "{esc(p)}",' for p in data['pros'])
    cons_str = '\n'.join(f'      "{esc(c)}",' for c in data['cons'])
    feats_str = '\n'.join(f'      "{esc(fe)}",' for fe in data['features'])
    quotes_str = '\n'.join(f'      {{ role: "{esc(q[0])}", company: "{esc(q[1])}", quote: "{esc(q[2])}" }},' for q in quotes)
    
    return f'''  {{
    id: "{tool_id}",
    name: "{name}",
    category: "{category}",
    rating: {rating},
    reviewCount: {review_count},
    icon: {icon},
    description: "{esc(data['description'])}",
    longDescription: `{esc(data['longDescription'])}`,
    pros: [
{pros_str}
    ],
    cons: [
{cons_str}
    ],
    pricing: "{data['pricing']}",
    pricingDetail: "{esc(data['pricingDetail'])}",
    features: [
{feats_str}
    ],
    useCase: "{esc(data['useCase'])}",
    alternatives: {json.dumps(alternatives)},
    scoreBreakdown: {{ features: {data['scoreBreakdown'].get('features', 0)}, reviews: {data['scoreBreakdown'].get('reviews', 0)}, momentum: {data['scoreBreakdown'].get('momentum', 0)}, popularity: {data['scoreBreakdown'].get('popularity', 0)} }},
    userQuotes: [
{quotes_str}
    ],
  }},'''

# AnthroDesk Lite
quotes_a = [
    ("Graduate Law Student", "Georgetown University", "I carry it between my apartment, library carrel, and coffee shop. Crank takes 30 seconds\u2014worth it to avoid back pain during finals."),
    ("Sales Executive", "Salesforce", "Keep it folded in my suitcase. Stands up in hotel rooms for video calls\u2014clients think I have a fancy studio!"),
]

# North Bayou G60
quotes_n = [
    ("Online Instructor", "LearnSphere Academy", "I move my 27\u201d monitor constantly between teaching, grading, and recording\u2014G60 hasn\u2019t missed a beat in 2.5 years."),
    ("Small Business Owner", "GreenLeaf Bookkeeping", "Bought eight for my team. All set up same-day, and my accountant finally stopped complaining about neck pain."),
]

# FelixKing
quotes_fk = [
    ("Project Manager", "TerraFlow Inc.", "I rearrange mine every Monday based on my sprint goals\u2014pens on left, sticky notes center, phone dock right. It\u2019s my ritual."),
    ("Freelance Illustrator", "Ink & Ember", "Finally stopped losing my stylus caps. The magnetic trays hold everything\u2014even my tiny color swatches."),
]

block_a = gen_tool_block(a, "anthrodesk-lite", "AnthroDesk Lite", "Standing Desks", 3.7, 1420, "TabletSmartphone", 
                         ["ikea-bekant", "autonomous-smartdesk-pro", "vari-standing-desk"], quotes_a)

block_n = gen_tool_block(n, "north-bayou-g60", "North Bayou G60 Monitor Arm", "Monitor Arms & Mounts", 4.1, 7240, "Monitor",
                         ["amazonbasics-monitor-arm", "workpro-single-arm", "loctek-d7d"], quotes_n)

block_f = gen_tool_block(f, "felixking-desk-organizer", "FelixKing Desk Organizer", "Desk Accessories", 4.3, 6890, "MousePointer2",
                         ["cablematters-cable-tray", "grovemade-desk-mat", "twelve-south-bookshelf"], quotes_fk)

# Now replace in file

fp = "/home/edi/officepicks-hub/app/data/tools.ts"
with open(fp) as f:
    content = f.read()

# Find and replace each tool
replacements = [
    ('"anthrodesk-lite"', block_a),
    ('"north-bayou-g60"', block_n),
    ('"felixking-desk-organizer"', block_f),
]

for tool_id_str, new_block in replacements:
    lines = content.split('\n')
    
    # Find the line with this tool id
    start_line = None
    for i, line in enumerate(lines):
        if f'id: {tool_id_str}' in line:
            start_line = i
            break
    
    if start_line is None:
        print(f"❌ Could not find: {tool_id_str}")
        continue
    
    # Go back to find opening brace
    obj_start = None
    for i in range(start_line, -1, -1):
        s = lines[i].strip()
        if s in ['{', '  {']:
            obj_start = i
            break
    
    if obj_start is None:
        print(f"❌ No opening brace for {tool_id_str}")
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
        print(f"❌ No closing brace for {tool_id_str}")
        continue
    
    old_block = '\n'.join(lines[obj_start:obj_end+1])
    content = content.replace(old_block, new_block, 1)
    print(f"✅ Replaced: {tool_id_str}")

with open(fp, 'w') as f:
    f.write(content)

print("✅ tools.ts updated")

# Now apply blog post
bp = "/home/edi/officepicks-hub/app/data/blog-posts.ts"
with open(bp) as f:
    blog_content = f.read()

with open("/tmp/blog_content.txt") as f:
    raw_blog = f.read()

# Clean up blog content
raw_blog = raw_blog.strip()
if raw_blog.startswith('`'):
    raw_blog = raw_blog[1:]
if raw_blog.endswith('`'):
    raw_blog = raw_blog[:-1]

# Escape potential issues
raw_blog = esc(raw_blog)

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
