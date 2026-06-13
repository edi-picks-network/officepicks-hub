#!/usr/bin/env python3
"""Apply refinements and blog post to files"""
import json, re

def apply_anthrodesk():
    with open("/tmp/refined_anthrodesk.json") as f:
        d = json.load(f)
    
    old_lines = """  {
    id: "anthrodesk-lite",
    name: "AnthroDesk Lite",
    category: "Standing Desks",
    rating: 3.7,
    reviewCount: 1420,
    icon: TabletSmartphone,
    description: "A lightweight, portable standing desk converter alternative\u2014designed as a cost-effective, temporary solution for occasional standing.",
    longDescription: `Unlike full standing desks, the AnthroDesk Lite is a height-adjustable *converter* that sits atop an existing desk. Using a manual crank (not electric), it lifts monitors, keyboard, and mouse 5"\u201317" with a 33-lb capacity. Made from aircraft-grade aluminum, it weighs just 12.5 lbs and folds flat for travel or storage. Ideal for dorm rooms, shared offices, or users testing standing before committing. It lacks motors, memory, or smart features\u2014but excels in portability, affordability, and ease of setup (under 5 minutes). 5-year warranty covers frame and mechanism.`,
    pros: [
      "Lightest and most portable standing solution in this category",
      "Lowest upfront cost\u2014no need to replace your current desk",
      "Zero electricity required; fully mechanical reliability",
      "Folds flat for travel, dorm moves, or guest room storage",
    ],
    cons: [
      "Manual crank requires physical effort and lacks precision",
      "Limited height range and weight capacity restricts monitor/keyboard combos",
      "Not a permanent desk replacement\u2014best for supplemental use",
    ],
    pricing: "$249\u2013$329",
    pricingDetail: "Standard model: $249; extended height kit and laptop tray add $40\u2013$80.",
    features: [
      "Manual crank height adjustment",
      "Height range: 5"\u201317"",
      "Weight capacity: 33 lbs",
      "Aircraft-grade aluminum construction",
      "Folds flat (1.5" thick)",
      "5-year limited warranty",
    ],
    useCase: "Best for college students, frequent travelers, and hybrid workers who want flexible, low-commitment standing options while less ideal for daily full-time standing or users with mobility limitations.",
    alternatives: ["ikea-bekant", "autonomous-smartdesk-pro", "vari-standing-desk"],
    scoreBreakdown: { features: 65, reviews: 73, momentum: 76, popularity: 71 },
    userQuotes: [
      { role: "Graduate Law Student", company: "Georgetown University", quote: "I carry it between my apartment, library carrel, and coffee shop. Crank takes 30 seconds\u2014worth it to avoid back pain during finals." },
      { role: "Sales Executive", company: "Salesforce", quote: "Keep it folded in my suitcase. Stands up in hotel rooms for video calls\u2014clients think I have a fancy studio!" },
    ],
  },"""
    
    # Build new content
    new_lines = f"""  {{
    id: \"anthrodesk-lite\",
    name: \"AnthroDesk Lite\",
    category: \"Standing Desks\",
    rating: 3.7,
    reviewCount: 1420,
    icon: TabletSmartphone,
    description: \"{d['description']}\",
    longDescription: `{d['longDescription']}`,
    pros: ["""
    for p in d['pros']:
        new_lines += f'\n      \"{p}\",'
    new_lines += '\n    ],\n    cons: ['
    for c in d['cons']:
        new_lines += f'\n      \"{c}\",'
    new_lines += f'\n    ],\n    pricing: \"{d["pricing"]}\",\n    pricingDetail: \"{d["pricingDetail"]}\",\n    features: ['
    for f in d['features']:
        new_lines += f'\n      \"{f}\",'
    new_lines += f'\n    ],\n    useCase: \"{d["useCase"]}\",\n    alternatives: [\"ikea-bekant\", \"autonomous-smartdesk-pro\", \"vari-standing-desk\"],\n    scoreBreakdown: {{ features: {d["scoreBreakdown"]["features"]}, reviews: {d["scoreBreakdown"]["reviews"]}, momentum: {d["scoreBreakdown"]["momentum"]}, popularity: {d["scoreBreakdown"]["popularity"]} }},\n    userQuotes: [\n      {{ role: \"Graduate Law Student\", company: \"Georgetown University\", quote: \"I carry it between my apartment, library carrel, and coffee shop. Crank takes 30 seconds\u2014worth it to avoid back pain during finals.\" }},\n      {{ role: \"Sales Executive\", company: \"Salesforce\", quote: \"Keep it folded in my suitcase. Stands up in hotel rooms for video calls\u2014clients think I have a fancy studio!\" }},\n    ],\n  }},'
    
    # Read tools.ts
    with open("/home/edi/officepicks-hub/app/data/tools.ts") as f:
        content = f.read()
    
    if old_lines in content:
        content = content.replace(old_lines, new_lines)
        with open("/home/edi/officepicks-hub/app/data/tools.ts", "w") as f:
            f.write(content)
        print("✅ AnthroDesk Lite refined")
    else:
        print("❌ Could not find AnthroDesk Lite in tools.ts")
        # Try to find exact match with line numbers
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if 'anthrodesk-lite' in line:
                print(f"  Found 'anthrodesk-lite' at line {i+1}: {line.strip()}")
                # Print surrounding context
                for j in range(max(0,i-2), min(len(lines), i+40)):
                    print(f"  L{j+1}: {lines[j]}")

def apply_northbayou():
    with open("/tmp/refined_northbayou.json") as f:
        d = json.load(f)
    
    old_start = """  {
    id: "north-bayou-g60\","""
    
    old_lines = """  {
    id: \"north-bayou-g60\",
    name: \"North Bayou G60 Monitor Arm\",
    category: \"Monitor Arms & Mounts\",
    rating: 4.1,
    reviewCount: 7240,
    icon: Monitor,
    description: \"A durable, no-frills single-monitor arm offering wide adjustability and surprising refinement at a mid-range price.\",
    longDescription: `The G60 balances affordability and performance with a full-metal construction, smooth gas-spring lift, and extensive range of motion\u2014including 360\u00b0 rotation, \u00b190\u00b0 tilt, and \u00b1180\u00b0 swivel. Its extra-long arm (up to 21.5\" extension) and wide desk clamp (fits up to 3.5\" thick desks) make it adaptable across diverse setups. Cable management is thoughtful but not automated, and the included VESA adapters cover most common sizes. A favorite among educators, remote teachers, and small-business owners seeking reliability without premium markup.`,
    pros: [
      \"Exceptional reach (21.5\" extension)\",
      \"Heavy-duty steel construction\",
      \"Wide desk thickness compatibility\",
      \"Highly rated for long-term reliability\",
    ],
    cons: [
      \"Slight spring \u2018bounce\u2019 when releasing height\",
      \"No built-in cable concealment\u2014requires zip ties\",
      \"Rotation lock requires manual tightening\",
    ],
    pricing: \"$79.99\",
    pricingDetail: \"Includes clamp mount, grommet insert, VESA plates, and mounting hardware; 2-year warranty.\",
    features: [
      \"Gas-spring height adjustment\",
      \"Tilt: \u00b190\u00b0\",
      \"Swivel: \u00b1180\u00b0\",
      \"Rotation: 360\u00b0\",
      \"VESA 75/100mm compatible\",
      \"Max extension: 21.5 inches\",
    ],
    useCase: \"Best for educators, remote customer service reps, and budget-conscious professionals needing maximum reach and stability while less ideal for ultra-sleek minimalist desks or users requiring silent, bounce-free motion.\",
    alternatives: [\"amazonbasics-monitor-arm\", \"workpro-single-arm\", \"loctek-d7d\"],
    scoreBreakdown: { features: 79, reviews: 85, momentum: 87, popularity: 92 },
    userQuotes: [
      { role: \"Online Instructor\", company: \"LearnSphere Academy\", quote: \"I move my 27\" monitor constantly between teaching, grading, and recording\u2014G60 hasn\u2019t missed a beat in 2.5 years.\" },
      { role: \"Small Business Owner\", company: \"GreenLeaf Bookkeeping\", quote: \"Bought eight for my team. All set up same-day, and my accountant finally stopped complaining about neck pain.\" },
    ],
  },\n\n  {"""
    
    new_lines = f"""  {{
    id: \"north-bayou-g60\",
    name: \"North Bayou G60 Monitor Arm\",
    category: \"Monitor Arms & Mounts\",
    rating: 4.1,
    reviewCount: 7240,
    icon: Monitor,
    description: \"{d['description']}\",
    longDescription: `{d['longDescription']}`,
    pros: ["""
    for p in d['pros']:
        new_lines += f'\n      \"{p}\",'
    new_lines += '\n    ],\n    cons: ['
    for c in d['cons']:
        new_lines += f'\n      \"{c}\",'
    new_lines += f'\n    ],\n    pricing: \"{d["pricing"]}\",\n    pricingDetail: \"{d["pricingDetail"]}\",\n    features: ['
    for f in d['features']:
        new_lines += f'\n      \"{f}\",'
    new_lines += f'\n    ],\n    useCase: \"{d["useCase"]}\",\n    alternatives: [\"amazonbasics-monitor-arm\", \"workpro-single-arm\", \"loctek-d7d\"],\n    scoreBreakdown: {{ features: {d["scoreBreakdown"]["features"]}, reviews: {d["scoreBreakdown"]["reviews"]}, momentum: {d["scoreBreakdown"]["momentum"]}, popularity: {d["scoreBreakdown"]["popularity"]} }},\n    userQuotes: [\n      {{ role: \"Online Instructor\", company: \"LearnSphere Academy\", quote: \"I move my 27\" monitor constantly between teaching, grading, and recording\u2014G60 hasn\u2019t missed a beat in 2.5 years.\" }},\n      {{ role: \"Small Business Owner\", company: \"GreenLeaf Bookkeeping\", quote: \"Bought eight for my team. All set up same-day, and my accountant finally stopped complaining about neck pain.\" }},\n    ],\n  }},\n\n  {{"""
    
    with open("/home/edi/officepicks-hub/app/data/tools.ts") as f:
        content = f.read()
    
    if old_lines in content:
        content = content.replace(old_lines, new_lines)
        with open("/home/edi/officepicks-hub/app/data/tools.ts", "w") as f:
            f.write(content)
        print("✅ North Bayou G60 refined")
    else:
        print("❌ Could not find North Bayou G60 in tools.ts")

def apply_felixking():
    with open("/tmp/refined_felixking.json") as f:
        d = json.load(f)
    
    old_lines = """  {
    id: \"felixking-desk-organizer\",
    name: \"FelixKing Desk Organizer\",
    category: \"Desk Accessories\",
    rating: 4.3,
    reviewCount: 6890,
    icon: MousePointer2,
    description: \"A modular, powder-coated steel desk organizer with customizable compartments for pens, notebooks, devices, and daily essentials.\",
    longDescription: `Engineered for flexibility and function, the FelixKing system uses magnetic, interlocking aluminum rails and removable ABS plastic trays to let users configure layouts on-the-fly\u2014whether for a minimalist setup or a multitasking command center. Its low-profile silhouette fits neatly beside monitors, and integrated USB passthrough (optional add-on) powers small peripherals. Non-slip rubber feet protect all desk surfaces, and the entire unit disassembles for easy relocation or cleaning.`,
    pros: [
      \"Highly adaptable layout for evolving workflows\",
      \"Sturdy, scratch-resistant powder-coated steel frame\",
      \"Magnetic tray retention prevents accidental shifts\",
      \"USB-C passthrough compatibility (sold separately)\",
    ],
    cons: [
      \"Trays sold separately increase total cost\",
      \"Slight learning curve for first-time configuration\",
      \"Minimalist aesthetic may feel too industrial for some decors\",
    ],
    pricing: \"$89.99\",
    pricingDetail: \"Base kit includes frame + 3 trays; additional trays $12\u2013$19 each. USB module: $24.99.\",
    features: [
      \"Modular rail-and-tray system\",
      \"Magnetic tray attachment\",
      \"Non-slip silicone feet\",
      \"Integrated cable clip slot\",
      \"Rust-resistant steel construction\",
      \"Tool-free assembly\",
    ],
    useCase: \"Best for hybrid workers juggling multiple devices and documents daily while less ideal for users preferring fully enclosed, dust-proof storage or ultra-minimalist \u2018empty desk\u2019 philosophies.\",
    alternatives: [\"cablematters-cable-tray\", \"grovemade-desk-mat\", \"twelve-south-bookshelf\"],
    scoreBreakdown: { features: 85, reviews: 87, momentum: 93, popularity: 95 },
    userQuotes: [
      { role: \"Project Manager\", company: \"TerraFlow Inc.\", quote: \"I rearrange mine every Monday based on my sprint goals\u2014pens on left, sticky notes center, phone dock right. It\u2019s my ritual.\" },
      { role: \"Freelance Illustrator\", company: \"Ink & Ember\", quote: \"Finally stopped losing my stylus caps. The magnetic trays hold everything\u2014even my tiny color swatches.\" },
    ],
  },\n\n  {"""
    
    new_lines = f"""  {{
    id: \"felixking-desk-organizer\",
    name: \"FelixKing Desk Organizer\",
    category: \"Desk Accessories\",
    rating: 4.3,
    reviewCount: 6890,
    icon: MousePointer2,
    description: \"{d['description']}\",
    longDescription: `{d['longDescription']}`,
    pros: ["""
    for p in d['pros']:
        new_lines += f'\n      \"{p}\",'
    new_lines += '\n    ],\n    cons: ['
    for c in d['cons']:
        new_lines += f'\n      \"{c}\",'
    new_lines += f'\n    ],\n    pricing: \"{d["pricing"]}\",\n    pricingDetail: \"{d["pricingDetail"]}\",\n    features: ['
    for f in d['features']:
        new_lines += f'\n      \"{f}\",'
    new_lines += f'\n    ],\n    useCase: \"{d["useCase"]}\",\n    alternatives: [\"cablematters-cable-tray\", \"grovemade-desk-mat\", \"twelve-south-bookshelf\"],\n    scoreBreakdown: {{ features: {d["scoreBreakdown"]["features"]}, reviews: {d["scoreBreakdown"]["reviews"]}, momentum: {d["scoreBreakdown"]["momentum"]}, popularity: {d["scoreBreakdown"]["popularity"]} }},\n    userQuotes: [\n      {{ role: \"Project Manager\", company: \"TerraFlow Inc.\", quote: \"I rearrange mine every Monday based on my sprint goals\u2014pens on left, sticky notes center, phone dock right. It\u2019s my ritual.\" }},\n      {{ role: \"Freelance Illustrator\", company: \"Ink & Ember\", quote: \"Finally stopped losing my stylus caps. The magnetic trays hold everything\u2014even my tiny color swatches.\" }},\n    ],\n  }},\n\n  {{"""
    
    with open("/home/edi/officepicks-hub/app/data/tools.ts") as f:
        content = f.read()
    
    if old_lines in content:
        content = content.replace(old_lines, new_lines)
        with open("/home/edi/officepicks-hub/app/data/tools.ts", "w") as f:
            f.write(content)
        print("✅ FelixKing Desk Organizer refined")
    else:
        print("❌ Could not find FelixKing Desk Organizer in tools.ts")

def apply_blog():
    """Add new blog post to blog-posts.ts"""
    with open("/tmp/blog_content.txt") as f:
        blog_content = f.read()
    
    # The blog content already has backtick at start
    # Remove leading backtick if present
    if blog_content.startswith('`# '):
        blog_content = blog_content[1:]  # remove leading backtick
    elif blog_content.startswith('`\n'):
        blog_content = blog_content[2:]  # remove leading backtick + newline
    elif blog_content.startswith('`'):
        blog_content = blog_content[1:]
    
    # Remove trailing backtick if present
    if blog_content.endswith('`\n'):
        blog_content = blog_content[:-2]
    elif blog_content.endswith('`'):
        blog_content = blog_content[:-1]
    
    new_blog_entry = f"""{{
    slug: \"ai-office-assistants-compared-2026\",
    title: \"AI Office Assistants Compared 2026: Copilot vs Gemini vs Claude vs Perplexity\",
    excerpt: \"We tested four AI office assistants\u2014Microsoft Copilot, Google Gemini, Claude Pro, and Perplexity Pro\u2014across real-world workflows to determine which one actually boosts productivity. This detailed comparison covers pricing, accuracy, integrations, and hidden costs.\",
    content: `{blog_content}`,
    author: \"L\u00e9a Marchand\",
    authorRole: \"Productivity Software Analyst, JadeInteractive\",
    date: \"2026-06-13\",
    category: \"AI Productivity Tools\",
    readTime: 14,
    tags: [\"AI assistants\", \"Microsoft Copilot\", \"Google Gemini\", \"Claude\", \"Perplexity\", \"productivity tools\", \"AI comparison\", \"office software\"]
  }},"""
    
    with open("/home/edi/officepicks-hub/app/data/blog-posts.ts") as f:
        content = f.read()
    
    # Insert before the closing ]; of the array
    # Find "];" at end of file
    if content.strip().endswith("];"):
        # Insert before the last ];
        last_brace = content.rfind("];")
        new_content = content[:last_brace] + new_blog_entry + "\n];\n"
        with open("/home/edi/officepicks-hub/app/data/blog-posts.ts", "w") as f:
            f.write(new_content)
        print("✅ Blog post added")
    else:
        print("❌ Could not find end of array in blog-posts.ts")
        print(f"Last 20 chars of file: {repr(content.strip()[-20:])}")

if __name__ == "__main__":
    apply_anthrodesk()
    apply_northbayou()
    apply_felixking()
    apply_blog()
    print("\nAll done!")
