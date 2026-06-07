#!/usr/bin/env python3
"""
Generate home office / productivity tool data for OfficePicks.net
Batch by batch, each batch is one category
"""
import urllib.request
import json
import time
import re
import os

# Read Qwen API key
key = None
with open('/home/edi/.hermes/api_keys.env') as f:
    for line in f:
        if line.startswith('QWEN_API_KEY_1='):
            key = line.strip().split('=', 1)[1]
            break
if not key:
    key = os.environ.get('QWEN_API_KEY_1')
    if not key:
        print("ERROR: No QWEN_API_KEY found")
        exit(1)

API_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions"

# Home Office & Productivity categories and tools
BATCHES = [
    {
        "cat": "Office Ergonomic Chairs",
        "tools": [
            ("herman-miller-aeron", "Herman Miller Aeron"),
            ("steelcase-gesture", "Steelcase Gesture"),
            ("herman-miller-embody", "Herman Miller Embody"),
            ("steelcase-leap-v2", "Steelcase Leap V2"),
            ("hm-mirra-2", "Mirra 2"),
            ("haworth-fern", "Haworth Fern"),
            ("humanscale-freedom", "Humanscale Freedom"),
            ("autonomous-ergochair-pro", "Autonomous ErgoChair Pro"),
            ("branch-ergonomic-chair", "Branch Ergonomic Chair"),
            ("x-chair-x4", "X-Chair X4"),
        ]
    },
    {
        "cat": "Standing Desks",
        "tools": [
            ("jarvis-standing-desk", "Jarvis Standing Desk by Fully"),
            ("uplift-v2", "Uplift V2 Standing Desk"),
            ("autonomous-smartdesk-pro", "Autonomous SmartDesk Pro"),
            ("vari-standing-desk", "Vari Electric Standing Desk"),
            ("flexispot-e7", "FlexiSpot E7"),
            ("deskhaus-apex-pro", "Deskhaus Apex Pro"),
            ("branza-standing-desk", "Branza Standing Desk"),
            ("ikea-bekant", "IKEA BEKANT Standing Desk"),
            ("secretlab-magnus-pro", "Secretlab Magnus Pro XL"),
            ("anthrodesk-lite", "AnthroDesk Lite"),
        ]
    },
    {
        "cat": "Monitor Arms & Mounts",
        "tools": [
            ("ergotron-lx", "Ergotron LX Desk Mount Arm"),
            ("ergotron-hx", "Ergotron HX Heavy Duty Arm"),
            ("humanscale-m8", "Humanscale M8 Monitor Arm"),
            ("amazonbasics-monitor-arm", "Amazon Basics Premium Monitor Arm"),
            ("vivo-dual-monitor-arm", "VIVO Dual Monitor Desk Mount"),
            ("atdec-freestanding", "Atdec FreeStanding System"),
            ("loctek-d7d", "Loctek D7D Monitor Arm"),
            ("north-bayou-g60", "North Bayou G60 Monitor Arm"),
            ("workpro-single-arm", "WorkPro Single Monitor Arm"),
            ("wali-dual-arm", "WALI Dual Monitor Arm"),
        ]
    },
    {
        "cat": "Desk Accessories",
        "tools": [
            ("grovemade-desk-riser", "Grovemade Desk Riser"),
            ("logitech-mx-master-3s", "Logitech MX Master 3S"),
            ("logitech-ergo-k860", "Logitech ERGO K860 Keyboard"),
            ("grovemade-desk-mat", "Grovemade Wool Desk Mat"),
            ("felixking-desk-organizer", "FelixKing Desk Organizer"),
            ("twelve-south-bookshelf", "Twelve South BookArc Pro"),
            ("rain-design-i-level", "Rain Design iLevel Laptop Stand"),
            ("roost-laptop-stand", "Roost Laptop Stand"),
            ("anker-powerwave-stand", "Anker PowerWave Wireless Charger"),
            ("cablematters-cable-tray", "Cable Matters Cable Management Tray"),
        ]
    },
    {
        "cat": "Productivity Software",
        "tools": [
            ("obsidian", "Obsidian"),
            ("notion", "Notion"),
            ("todoist", "Todoist"),
            ("ticktick", "TickTick"),
            ("rescue-time", "RescueTime"),
            ("freedom-app", "Freedom"),
            ("forest-app", "Forest"),
            ("toggl-track", "Toggl Track"),
            ("sun-sama", "Sunsama"),
            ("focusmate", "Focusmate"),
        ]
    },
    {
        "cat": "Lighting & Ambiance",
        "tools": [
            ("benq-screenbar-halo", "BenQ ScreenBar Halo"),
            ("yeelight-smart-bulb", "Yeelight Smart LED Bulb"),
            ("philips-hue-play", "Philips Hue Play Gradient"),
            ("lifx-z-strip", "LIFX Z LED Strip"),
            ("benq-screenbar-pro", "BenQ ScreenBar Pro"),
            ("elgato-key-light", "Elgato Key Light"),
            ("quntis-screenbar", "Quntis ScreenBar"),
            ("nanolight-leaf", "NanoLeaf Shapes"),
            ("govee-flow-plus", "Govee Flow Plus"),
            ("amazon-smart-lamp", "Amazon Smart Lamp"),
        ]
    },
    {
        "cat": "Headsets & Webcams",
        "tools": [
            ("logitech-brio-4k", "Logitech Brio 4K Webcam"),
            ("elgato-facecam-pro", "Elgato Facecam Pro"),
            ("sony-wh-1000xm5", "Sony WH-1000XM5 Headphones"),
            ("jabra-evolve2-75", "Jabra Evolve2 75"),
            ("logitech-c922", "Logitech C922 Pro Stream"),
            ("razer-kraken-v3-pro", "Razer Kraken V3 Pro"),
            ("shure-mv7", "Shure MV7 Microphone"),
            ("blue-yeti-x", "Blue Yeti X Microphone"),
            ("insta360-link", "Insta360 Link Webcam"),
            ("poly-voyager-focus-2", "Poly Voyager Focus 2"),
        ]
    },
    {
        "cat": "Cable & Power Management",
        "tools": [
            ("anker-powerport-6", "Anker PowerPort 6"),
            ("ugreen-usb-hub", "UGREEN USB C Hub"),
            ("cablemod-cable-kit", "CableMod Pro Cable Kit"),
            ("joto-cable-clips", "JOTO Cable Clips"),
            ("satechi-pro-hub", "Satechi Pro Hub Max"),
            ("caldigit-ts4", "CalDigit TS4 Thunderbolt 4 Dock"),
            ("belkin-boostcharge-pro", "Belkin BoostCharge Pro 3-in-1"),
            ("monoprice-cable-sleeve", "Monoprice Cable Sleeve"),
            ("iottie-aivo-wireless", "iOttie Aivo Wireless Car Charger"),
            ("nomad-base-station-pro", "Nomad Base Station Pro"),
        ]
    },
]

def gen_batch(batch):
    cat = batch["cat"]
    tools_list = batch["tools"]
    tool_names_str = "\n".join([f'  id="{tid}", name="{name}"' for tid, name in tools_list])
    
    prompt = f"""Generate EXACTLY {len(tools_list)} home office products for the category "{cat}" in OfficePicks.net (a home office & productivity tools guide).

For each tool, return a JSON array. Each item must have these fields:
- id: string (matching the id provided)
- name: string (matching the name provided)
- category: string (exactly "{cat}")
- rating: number (3.5-4.9, realistic)
- reviewCount: number (500-8000, realistic)
- description: string (1 sentence, 15-25 words, descriptive)
- longDescription: string (3-5 sentences, detailed review-like content mentioning specific features, use cases, and comparisons)
- pros: string[] (exactly 4 items, specific and actionable)
- cons: string[] (exactly 3 items, honest drawbacks)
- pricing: string (like "$199", "Free / $10/mo", "From $849")
- pricingDetail: string (like "Free | Premium $10/mo | Business $15/user/mo" or "Standard $849 | Advanced $1,049")
- features: string[] (exactly 5-6 items, spec-like bullet points)
- useCase: string (1 sentence, "Best for... while less ideal for...")
- alternatives: string[] (2-3 related product IDs from the same batch)
- scoreBreakdown: {{ features: number, reviews: number, momentum: number, popularity: number }} (all 65-95)
- userQuotes: array of 2 items, each with role, company, quote (realistic)

Tools to generate:
{tool_names_str}

Return ONLY a valid JSON array, no other text."""

    payload = json.dumps({
        "model": "qwen-plus",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 8000,
        "temperature": 0.7,
    }).encode('utf-8')
    
    req = urllib.request.Request(API_URL, data=payload, method='POST')
    req.add_header('Authorization', f'Bearer {key}')
    req.add_header('Content-Type', 'application/json')
    
    try:
        resp = urllib.request.urlopen(req, timeout=180)
        result = json.loads(resp.read().decode())
        content = result['choices'][0]['message']['content']
        
        # Extract JSON from response (handle markdown wrapping)
        json_match = re.search(r'\[\s*\{.*\}\s*\]', content, re.DOTALL)
        if json_match:
            tools_data = json.loads(json_match.group())
        else:
            tools_data = json.loads(content)
        
        print(f"  ✅ {cat}: {len(tools_data)} tools generated")
        return tools_data
    except Exception as e:
        print(f"  ❌ {cat}: {e}")
        return None

# Generate all batches sequentially
all_tools = []
for i, batch in enumerate(BATCHES):
    print(f"\nBatch {i+1}/{len(BATCHES)}: {batch['cat']}")
    tools = gen_batch(batch)
    if tools:
        all_tools.extend(tools)
    else:
        print(f"  ⚠️  Using fallback for {batch['cat']}")
    time.sleep(2)

# Save raw data
with open('/tmp/office_tools_raw.json', 'w') as f:
    json.dump(all_tools, f, indent=2)

print(f"\n\nTotal tools generated: {len(all_tools)}")
print("Saved to /tmp/office_tools_raw.json")
