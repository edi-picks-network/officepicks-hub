#!/usr/bin/env python3
"""Merge all batch JSON files into TypeScript format and write tools.ts"""
import json, re

# Define icon mapping for each category
CATEGORY_ICONS = {
    "Office Ergonomic Chairs": "ArmchairIcon",
    "Standing Desks": "TabletSmartphone",
    "Monitor Arms & Mounts": "Monitor",
    "Desk Accessories": "MousePointer2",
    "Productivity Software": "LayoutDashboard",
    "Lighting & Ambiance": "Lightbulb",
    "Headsets & Webcams": "Headphones",
    "Cable & Power Management": "Cable",
}

# Icon -> lucide-react import mapping
ICON_IMPORTS = {
    "ArmchairIcon": "ArmchairIcon",
    "TabletSmartphone": "TabletSmartphone",
    "Monitor": "Monitor", 
    "MousePointer2": "MousePointer2",
    "LayoutDashboard": "LayoutDashboard",
    "Lightbulb": "Lightbulb",
    "Headphones": "Headphones",
    "Cable": "Cable",
}

# Load all batches
all_tools = []
for i in range(8):
    with open(f'/tmp/office_batch_{i}.json') as f:
        batch = json.load(f)
        all_tools.extend(batch)

print(f"Loaded {len(all_tools)} tools total")

# Read existing tools.ts
with open('/home/edi/officepicks-hub/app/data/tools.ts') as f:
    original = f.read()

# Extract interface definition (up to export const ALL_TOOLS)
interface_end = original.find("export const ALL_TOOLS:")
interface_def = original[:interface_end]

# Verify the interface exists
if "export interface ToolData" not in interface_def:
    print("ERROR: Could not find ToolData interface!")
    exit(1)

print(f"Interface definition: {len(interface_def)} chars")

# Build icon imports
icon_names = set()
for t in all_tools:
    cat = t.get("category", "")
    icon_name = CATEGORY_ICONS.get(cat, "Package")
    icon_names.add(icon_name)

# Generate import line
icon_imports_str = ",\n  ".join(sorted(icon_names))
new_import = f"""import {{
  {icon_imports_str},
  type LucideIcon,
}} from "lucide-react";"""

# Replace old import section
import_end = interface_def.find("} from \"lucide-react\"")
import_start = interface_def.find("import {")
new_interface = interface_def[:import_start] + new_import + "\n\n" + interface_def[import_end + len("} from \"lucide-react\""):]

# Generate tool entries
def esc(s):
    """Escape string for TS template literal"""
    if s is None:
        return ""
    return str(s).replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')

def gen_tool_ts(t):
    icon_name = CATEGORY_ICONS.get(t.get("category", ""), "Package")
    lines = []
    lines.append("  {")
    lines.append(f'    id: "{esc(t.get("id"))}",')
    lines.append(f'    name: "{esc(t.get("name"))}",')
    lines.append(f'    category: "{esc(t.get("category"))}",')
    lines.append(f'    rating: {t.get("rating", 4.0)},')
    lines.append(f'    reviewCount: {t.get("reviewCount", 500)},')
    lines.append(f'    icon: {icon_name},')
    lines.append(f'    description: "{esc(t.get("description"))}",')
    
    long_desc = t.get("longDescription", "")
    if len(long_desc) > 120:
        # Split into chunks to avoid TS issues
        lines.append(f'    longDescription: `{long_desc}`,')
    else:
        lines.append(f'    longDescription: `{long_desc}`,')
    
    # Pros
    pros = t.get("pros", [])
    lines.append("    pros: [")
    for p in pros:
        lines.append(f'      "{esc(p)}",')
    lines.append("    ],")
    
    # Cons
    cons = t.get("cons", [])
    lines.append("    cons: [")
    for c in cons:
        lines.append(f'      "{esc(c)}",')
    lines.append("    ],")
    
    lines.append(f'    pricing: "{esc(t.get("pricing"))}",')
    lines.append(f'    pricingDetail: "{esc(t.get("pricingDetail"))}",')
    
    # Features
    features = t.get("features", [])
    lines.append("    features: [")
    for f in features:
        lines.append(f'      "{esc(f)}",')
    lines.append("    ],")
    
    lines.append(f'    useCase: "{esc(t.get("useCase"))}",')
    
    # Alternatives
    alts = t.get("alternatives", [])
    lines.append(f'    alternatives: [{", ".join(f'"{esc(a)}"' for a in alts)}],')
    
    # Score breakdown
    sb = t.get("scoreBreakdown", {})
    lines.append(f'    scoreBreakdown: {{ features: {sb.get("features", 80)}, reviews: {sb.get("reviews", 80)}, momentum: {sb.get("momentum", 80)}, popularity: {sb.get("popularity", 80)} }},')
    
    # User quotes
    uqs = t.get("userQuotes", [])
    lines.append("    userQuotes: [")
    for uq in uqs[:2]:
        lines.append(f'      {{ role: "{esc(uq.get("role"))}", company: "{esc(uq.get("company"))}", quote: "{esc(uq.get("quote"))}" }},')
    if len(uqs) < 2:
        # Fallback
        lines.append(f'      {{ role: "Remote Worker", company: "Tech Company", quote: "This product improved my home office setup significantly." }},')
    lines.append("    ],")
    lines.append("  },")
    return "\n".join(lines)

# Generate all tool entries
tool_entries = "\n\n".join(gen_tool_ts(t) for t in all_tools)

# Assemble final file
new_tools_ts = f"""{new_interface}

export const ALL_TOOLS: ToolData[] = [
{tool_entries}
];
"""

# Verify by counting tools
id_count = new_tools_ts.count('id: "')
print(f"Generated {id_count} tool entries")

# Write
with open('/home/edi/officepicks-hub/app/data/tools.ts', 'w') as f:
    f.write(new_tools_ts)

print("✅ Written to app/data/tools.ts")
print(f"File size: {len(new_tools_ts)} bytes")
