#!/usr/bin/env python3
"""
Generate home office tools data for OfficePicks.net. 
One batch at a time to avoid timeout.
"""
import urllib.request
import json
import time
import re
import os
import sys

key = None
with open('/home/edi/.hermes/api_keys.env') as f:
    for line in f:
        if line.startswith('QWEN_API_KEY_1='):
            key = line.strip().split('=', 1)[1]
            break

API_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions"

def gen_batch(cat, tools_list):
    tool_descs = "\n".join([f'id="{tid}", name="{name}"' for tid, name in tools_list])
    
    prompt = f"""Generate {len(tools_list)} home office products for category "{cat}" in OfficePicks.net as a JSON array.

Each item: id, name, category("{cat}"), rating(3.5-4.9), reviewCount(500-8000), description(1 sentence), longDescription(3-5 sentences), pros(4 items), cons(3 items), pricing, pricingDetail, features(5-6), useCase("Best for... while less ideal for..."), alternatives(2-3 ids), scoreBreakdown({{features,reviews,momentum,popularity}} 65-95), userQuotes(2 items: role, company, quote).

Tools:
{tool_descs}

Return ONLY the JSON array."""

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
        
        json_match = re.search(r'\[\s*\{.*\}\s*\]', content, re.DOTALL)
        data = json.loads(json_match.group()) if json_match else json.loads(content)
        return data
    except Exception as e:
        print(f"  ❌ Error: {e}", flush=True)
        return None

if __name__ == "__main__":
    batch_idx = int(sys.argv[1])
    
    BATCHES = [
        ("Office Ergonomic Chairs", [
            ("herman-miller-aeron","Herman Miller Aeron"),("steelcase-gesture","Steelcase Gesture"),
            ("herman-miller-embody","Herman Miller Embody"),("steelcase-leap-v2","Steelcase Leap V2"),
            ("hm-mirra-2","Mirra 2"),("haworth-fern","Haworth Fern"),
            ("humanscale-freedom","Humanscale Freedom"),("autonomous-ergochair-pro","Autonomous ErgoChair Pro"),
            ("branch-ergonomic-chair","Branch Ergonomic Chair"),("x-chair-x4","X-Chair X4"),
        ]),
        ("Standing Desks", [
            ("jarvis-standing-desk","Jarvis Standing Desk"),("uplift-v2","Uplift V2 Standing Desk"),
            ("autonomous-smartdesk-pro","Autonomous SmartDesk Pro"),("vari-standing-desk","Vari Electric Standing Desk"),
            ("flexispot-e7","FlexiSpot E7"),("deskhaus-apex-pro","Deskhaus Apex Pro"),
            ("branza-standing-desk","Branza Standing Desk"),("ikea-bekant","IKEA BEKANT Standing Desk"),
            ("secretlab-magnus-pro","Secretlab Magnus Pro XL"),("anthrodesk-lite","AnthroDesk Lite"),
        ]),
        ("Monitor Arms & Mounts", [
            ("ergotron-lx","Ergotron LX Desk Mount Arm"),("ergotron-hx","Ergotron HX Heavy Duty Arm"),
            ("humanscale-m8","Humanscale M8 Monitor Arm"),("amazonbasics-monitor-arm","Amazon Basics Premium Monitor Arm"),
            ("vivo-dual-monitor-arm","VIVO Dual Monitor Desk Mount"),("atdec-freestanding","Atdec FreeStanding System"),
            ("loctek-d7d","Loctek D7D Monitor Arm"),("north-bayou-g60","North Bayou G60 Monitor Arm"),
            ("workpro-single-arm","WorkPro Single Monitor Arm"),("wali-dual-arm","WALI Dual Monitor Arm"),
        ]),
        ("Desk Accessories", [
            ("grovemade-desk-riser","Grovemade Desk Riser"),("logitech-mx-master-3s","Logitech MX Master 3S"),
            ("logitech-ergo-k860","Logitech ERGO K860"),("grovemade-desk-mat","Grovemade Wool Desk Mat"),
            ("felixking-desk-organizer","FelixKing Desk Organizer"),("rain-design-i-level","Rain Design iLevel Laptop Stand"),
            ("roost-laptop-stand","Roost Laptop Stand"),("anker-powerwave-stand","Anker PowerWave Wireless Charger"),
            ("cablematters-cable-tray","Cable Matters Cable Management Tray"),("twelve-south-bookshelf","Twelve South BookArc Pro"),
        ]),
        ("Productivity Software", [
            ("obsidian","Obsidian"),("notion","Notion"),
            ("todoist","Todoist"),("ticktick","TickTick"),
            ("rescue-time","RescueTime"),("freedom-app","Freedom"),
            ("forest-app","Forest"),("toggl-track","Toggl Track"),
            ("sun-sama","Sunsama"),("focusmate","Focusmate"),
        ]),
        ("Lighting & Ambiance", [
            ("benq-screenbar-halo","BenQ ScreenBar Halo"),("yeelight-smart-bulb","Yeelight Smart LED Bulb"),
            ("philips-hue-play","Philips Hue Play Gradient"),("lifx-z-strip","LIFX Z LED Strip"),
            ("benq-screenbar-pro","BenQ ScreenBar Pro"),("elgato-key-light","Elgato Key Light"),
            ("quntis-screenbar","Quntis ScreenBar"),("nanolight-leaf","NanoLeaf Shapes"),
            ("govee-flow-plus","Govee Flow Plus"),("amazon-smart-lamp-for-bedroom","Amazon Smart Lamp"),
        ]),
        ("Headsets & Webcams", [
            ("logitech-brio-4k","Logitech Brio 4K Webcam"),("elgato-facecam-pro","Elgato Facecam Pro"),
            ("sony-wh-1000xm5","Sony WH-1000XM5"),("jabra-evolve2-75","Jabra Evolve2 75"),
            ("logitech-c922","Logitech C922 Pro Stream"),("razer-kraken-v3-pro","Razer Kraken V3 Pro"),
            ("shure-mv7","Shure MV7 Microphone"),("blue-yeti-x","Blue Yeti X"),
            ("insta360-link","Insta360 Link"),("poly-voyager-focus-2","Poly Voyager Focus 2"),
        ]),
        ("Cable & Power Management", [
            ("anker-powerport-6","Anker PowerPort 6"),("ugreen-usb-hub","UGREEN USB C Hub"),
            ("cablemod-cable-kit","CableMod Pro Cable Kit"),("joto-cable-clips","JOTO Cable Clips"),
            ("satechi-pro-hub","Satechi Pro Hub Max"),("caldigit-ts4","CalDigit TS4 Thunderbolt 4 Dock"),
            ("belkin-boostcharge-pro","Belkin BoostCharge Pro"),("monoprice-cable-sleeve","Monoprice Cable Sleeve"),
            ("iottie-aivo-wireless","iOttie Aivo Wireless"),("nomad-base-station-pro","Nomad Base Station Pro"),
        ]),
    ]
    
    cat, tools = BATCHES[batch_idx]
    print(f"Generating {cat} ({len(tools)} tools)...", flush=True)
    data = gen_batch(cat, tools)
    if data:
        with open(f'/tmp/office_batch_{batch_idx}.json', 'w') as f:
            json.dump(data, f, indent=2)
        print(f"✅ Saved {len(data)} tools to /tmp/office_batch_{batch_idx}.json", flush=True)
    else:
        print(f"❌ Failed to generate {cat}", flush=True)
        exit(1)
