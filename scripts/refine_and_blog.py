#!/usr/bin/env python3
"""Script to refine 3 tools and write a blog post for OfficePicks.net"""
import json, os, subprocess, sys, re

QWEN_KEY = os.environ.get("QWEN_API_KEY_1", "")
QWEN_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions"

def call_qwen(prompt, system="You are a professional office equipment reviewer. Output only the requested content in the specified format."):
    cmd = [
        "curl", "-s", QWEN_URL,
        "-H", f"Authorization: Bearer {QWEN_KEY}",
        "-H", "Content-Type: application/json",
        "-d", json.dumps({
            "model": "qwen-plus",
            "messages": [
                {"role": "system", "content": system},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7,
            "max_tokens": 4096
        })
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    try:
        data = json.loads(result.stdout)
        return data["choices"][0]["message"]["content"]
    except:
        print(f"ERROR: {result.stdout[:500]}")
        return None

def refine_tool(tool_id, tool_name, category, current_data):
    """Refine a tool with more detail"""
    prompt = f"""You are enhancing a tool listing for OfficePicks.net. The tool is: {tool_name} (ID: {tool_id}, Category: {category}).

Current data:
- Description: {current_data.get('description', '')}
- longDescription: {current_data.get('longDescription', '')}
- Pros: {current_data.get('pros', [])}
- Cons: {current_data.get('cons', [])}
- Features: {current_data.get('features', [])}
- UseCase: {current_data.get('useCase', '')}
- Pricing: {current_data.get('pricing', '')}
- PricingDetail: {current_data.get('pricingDetail', '')}
- ScoreBreakdown: {current_data.get('scoreBreakdown', {})}

Enhance this tool listing with more SPECIFIC, DETAILED, and PERSUASIVE content. Make it longer and more informative.

Return ONLY valid JSON with these EXACT fields (all must be included):
{{
  "description": "A crisp, benefit-driven one-sentence description (max 200 chars)",
  "longDescription": "A comprehensive 2-3 paragraph description with specific details, real metrics, comparisons, and use cases (300-500 words). Use backtick-wrapped template literal format.",
  "pros": ["5 specific, detailed pros with measurable benefits"],
  "cons": ["3 specific, detailed cons"],
  "features": ["6-8 specific features"],
  "pricing": "price string",
  "pricingDetail": "detailed pricing info",
  "useCase": "Best for... while less ideal for... format",
  "scoreBreakdown": {{"features": number, "reviews": number, "momentum": number, "popularity": number}}
}}
"""
    result = call_qwen(prompt)
    return result

def write_blog_post():
    """Write a blog post about AI办公助手对比2026 (AI Office Assistants Comparison 2026)"""
    prompt = """Write a comprehensive blog post titled "AI Office Assistants Compared 2026: Copilot vs Gemini vs Claude vs Perplexity" for OfficePicks.net.

The post should be in this exact format - a JavaScript template literal (backtick-wrapped string) with NO f-string interpolation:

`# AI Office Assistants Compared 2026: Copilot vs Gemini vs Claude vs Perplexity

## At a Glance: Top AI Office Assistants

| Assistant | Best For | Pricing | Overall Rating |
|-----------|----------|---------|----------------|
| Microsoft Copilot | Microsoft 365 users | $20/user/month (add-on) | 4.3/5 |
| Google Gemini | Google Workspace teams | Included in Business Plus | 4.5/5 |
| Claude Pro | Long-form writing & analysis | $20/month | 4.6/5 |
| Perplexity Pro | Research & fact-checking | $20/month | 4.4/5 |

## How We Tested

[Detailed testing methodology - 1 paragraph]

## Detailed Comparison

### Microsoft Copilot
[2-3 paragraphs with specific features, strengths, weaknesses]

### Google Gemini for Workspace
[2-3 paragraphs]

### Claude Pro
[2-3 paragraphs]

### Perplexity Pro
[2-3 paragraphs]

## Head-to-Head Comparison Table

[Table comparing key features across all 4]

## Pricing Breakdown

[Detailed pricing analysis]

## The Verdict

[Who should choose which]

## FAQ

[3-5 Q&A pairs]

---

*Comparison based on publicly available 2026 data from: Product documentation, G2 reviews, tech industry analysis. Prices and features as of publication date.*`

Write the COMPLETE blog post with substantive content. Make it 1500+ words with specific details, real comparisons, and actionable advice. Include data points and specific feature comparisons.

IMPORTANT: Return ONLY the content inside the backtick delimiters, no markdown wrapping, no code fences."""
    result = call_qwen(prompt, system="You are a professional tech journalist writing detailed, data-driven comparison articles for a productivity tools website.")
    return result

# Main execution
def main():
    # Check tools.ts to find the tools to refine
    tools_path = os.path.expanduser("~/officepicks-hub/app/data/tools.ts")
    blog_path = os.path.expanduser("~/officepicks-hub/app/data/blog-posts.ts")
    
    print("=== Phase 1: Refining 3 tools ===")
    
    # Tool 1: anthrodesk-lite
    print("Refining: anthrodesk-lite (AnthroDesk Lite)")
    tool1_data = {
        "description": "A lightweight, portable standing desk converter alternative—designed as a cost-effective, temporary solution for occasional standing.",
        "longDescription": "Unlike full standing desks, the AnthroDesk Lite is a height-adjustable *converter* that sits atop an existing desk. Using a manual crank (not electric), it lifts monitors, keyboard, and mouse 5\"–17\" with a 33-lb capacity. Made from aircraft-grade aluminum, it weighs just 12.5 lbs and folds flat for travel or storage.",
        "pros": ["Lightest and most portable standing solution in this category", "Lowest upfront cost"],
        "cons": ["Manual crank requires physical effort", "Limited height range"],
        "features": ["Manual crank height adjustment", "Height range: 5\"–17\"", "Weight capacity: 33 lbs"],
        "pricing": "$249–$329",
        "pricingDetail": "Standard model: $249; extended height kit and laptop tray add $40–$80.",
        "useCase": "Best for college students...",
        "scoreBreakdown": {"features": 65, "reviews": 73, "momentum": 76, "popularity": 71}
    }
    result1 = refine_tool("anthrodesk-lite", "AnthroDesk Lite", "Standing Desks", tool1_data)
    if result1:
        print(f"Refined anthrodesk-lite: {result1[:100]}...")
        # Save for later use
        with open("/tmp/refined_anthrodesk.json", "w") as f:
            f.write(result1)
    
    # Tool 2: north-bayou-g60
    print("\nRefining: north-bayou-g60 (North Bayou G60 Monitor Arm)")
    tool2_data = {
        "description": "A durable, no-frills single-monitor arm offering wide adjustability and surprising refinement at a mid-range price.",
        "longDescription": "The G60 balances affordability and performance with a full-metal construction, smooth gas-spring lift, and extensive range of motion.",
        "pros": ["Exceptional reach (21.5\" extension)", "Heavy-duty steel construction"],
        "cons": ["Slight spring 'bounce'", "No built-in cable concealment"],
        "features": ["Gas-spring height adjustment", "Tilt: ±90°", "Swivel: ±180°"],
        "pricing": "$79.99",
        "pricingDetail": "Includes clamp mount, grommet insert, VESA plates, and mounting hardware; 2-year warranty.",
        "useCase": "Best for educators...",
        "scoreBreakdown": {"features": 79, "reviews": 85, "momentum": 87, "popularity": 92}
    }
    result2 = refine_tool("north-bayou-g60", "North Bayou G60 Monitor Arm", "Monitor Arms & Mounts", tool2_data)
    if result2:
        print(f"Refined north-bayou-g60: {result2[:100]}...")
        with open("/tmp/refined_northbayou.json", "w") as f:
            f.write(result2)
    
    # Tool 3: felixking-desk-organizer
    print("\nRefining: felixking-desk-organizer (FelixKing Desk Organizer)")
    tool3_data = {
        "description": "A modular, powder-coated steel desk organizer with customizable compartments for pens, notebooks, devices.",
        "longDescription": "Engineered for flexibility and function, the FelixKing system uses magnetic, interlocking aluminum rails.",
        "pros": ["Highly adaptable layout", "Sturdy powder-coated steel frame"],
        "cons": ["Trays sold separately", "Slight learning curve"],
        "features": ["Modular rail-and-tray system", "Magnetic tray attachment"],
        "pricing": "$89.99",
        "pricingDetail": "Base kit includes frame + 3 trays; additional trays $12–$19 each.",
        "useCase": "Best for hybrid workers...",
        "scoreBreakdown": {"features": 85, "reviews": 87, "momentum": 93, "popularity": 95}
    }
    result3 = refine_tool("felixking-desk-organizer", "FelixKing Desk Organizer", "Desk Accessories", tool3_data)
    if result3:
        print(f"Refined felixking-desk-organizer: {result3[:100]}...")
        with open("/tmp/refined_felixking.json", "w") as f:
            f.write(result3)
    
    # Phase 2: Write blog post
    print("\n=== Phase 2: Writing blog post ===")
    blog_content = write_blog_post()
    if blog_content:
        with open("/tmp/blog_content.txt", "w") as f:
            f.write(blog_content)
        print(f"Blog post written: {len(blog_content)} chars")
    
    print("\n=== All done! Check /tmp/*.json and /tmp/blog_content.txt ===")

if __name__ == "__main__":
    main()
