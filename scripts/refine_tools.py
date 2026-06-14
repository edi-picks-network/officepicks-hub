#!/usr/bin/env python3
"""
Refine tool longDescriptions using Qwen API.
Reads tools.ts, selects 3 tools with short longDescriptions, refines them via API, and writes back.
"""
import os
import re
import json
import sys
from urllib.request import Request, urlopen
from urllib.error import URLError

# Read API key
api_key = os.environ.get('QWEN_API_KEY_1', '')
if not api_key:
    # Try to source from env file
    with open('/home/edi/.hermes/api_keys.env', 'r') as f:
        for line in f:
            if line.startswith('QWEN_API_KEY_1='):
                api_key = line.strip().split('=', 1)[1].strip()
                break

base_url = 'https://dashscope.aliyuncs.com/compatible-mode/v1'

# Read tools.ts
with open('/home/edi/officepicks-hub/app/data/tools.ts', 'r') as f:
    content = f.read()

# Find all tool entries with their longDescriptions
# We'll parse the file to find tool IDs and their longDescription lengths
tool_pattern = re.compile(r'id:\s*"([^"]+)"[\s\S]*?longDescription:\s*`([^`]*)`')

all_tools = []
for match in tool_pattern.finditer(content):
    tool_id = match.group(1)
    long_desc = match.group(2)
    char_count = len(long_desc.strip())
    all_tools.append((tool_id, char_count, long_desc))

# Sort by character count (ascending) to find shortest descriptions
all_tools.sort(key=lambda x: x[1])

print("Tools sorted by longDescription length (shortest first):")
for tid, chars, desc in all_tools:
    print(f"  {tid}: {chars} chars")

# Pick 3 tools with short descriptions (skip already-detailed ones)
# Let's focus on tools with < 500 chars
candidates = [t for t in all_tools if t[1] < 600]

if len(candidates) >= 3:
    refine_targets = candidates[:3]
else:
    refine_targets = all_tools[:3]

print(f"\nSelected for refinement: {[t[0] for t in refine_targets]}")

# For each target, call Qwen API
for tool_id, char_count, old_desc in refine_targets:
    print(f"\n=== Refining: {tool_id} (currently {char_count} chars) ===")
    
    prompt = f"""You are an expert content writer for OfficePicks, a professional office equipment and productivity tool review site.

Current description for "{tool_id}":
{old_desc}

Write a LONG, DETAILED, PROFESSIONAL product description (300-500 words) for this office/productivity tool. The description should:
1. Start with what makes the tool stand out in its category
2. Include specific, detailed features with technical depth
3. Mention real-world use cases and who it's best for
4. Compare briefly with alternatives in its class
5. Use professional but engaging language suitable for B2B audience
6. Include measurable outcomes or user benefits where possible

Write ONLY the description text, no markdown formatting, no labels. Use backtick quotes as needed for the content."""
    
    payload = json.dumps({
        "model": "qwen-plus",
        "messages": [
            {"role": "system", "content": "You are a professional product review writer for office equipment and productivity tools. Write detailed, engaging, technically accurate descriptions."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 1200,
        "temperature": 0.7
    }).encode('utf-8')
    
    req = Request(
        f"{base_url}/chat/completions",
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }
    )
    
    try:
        resp = urlopen(req, timeout=60)
        result = json.loads(resp.read().decode('utf-8'))
        new_desc = result['choices'][0]['message']['content'].strip()
        print(f"Generated: {len(new_desc)} chars")
        
        # Store for replacement
        with open('/tmp/refine_results.json', 'a') as f:
            json.dump({"id": tool_id, "old": old_desc, "new": new_desc}, f)
            f.write('\n')
            
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

print("\nAll refinements complete! Results saved to /tmp/refine_results.json")
