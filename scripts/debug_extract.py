#!/usr/bin/env python3
"""Simple script to extract and print refined data for manual verification"""
import re, json

def extract_string(text, field):
    """Extract a string field"""
    # Try backtick first (for longDescription)
    m = re.search(rf'"{re.escape(field)}": `([^`]*)`', text, re.DOTALL)
    if m:
        return m.group(1)
    # Try double-quoted - but this is tricky due to embedded quotes
    # Use a simple approach: find the field, then find the content
    m = re.search(rf'"{re.escape(field)}": "', text)
    if m:
        start = m.end()
        # Find the closing quote - look for " that is not preceded by \
        result = ""
        i = start
        while i < len(text):
            if text[i] == '\\' and i+1 < len(text):
                result += text[i:i+2]
                i += 2
            elif text[i] == '"':
                break
            else:
                result += text[i]
                i += 1
        return result
    return None

files = {
    "anthrodesk": "/tmp/refined_anthrodesk.json",
    "northbayou": "/tmp/refined_northbayou.json",
    "felixking": "/tmp/refined_felixking.json",
}

for name, path in files.items():
    with open(path) as f:
        text = f.read()
    
    # Extract longDescription - it's between backticks
    ld_match = re.search(r'"longDescription": `([^`]*)`', text, re.DOTALL)
    ld = ld_match.group(1) if ld_match else ""
    
    print(f"\n{'='*60}")
    print(f"FILE: {name}")
    print(f"{'='*60}")
    
    # For arrays, find the content
    for field in ['pros', 'cons', 'features']:
        m = re.search(rf'"{re.escape(field)}": \[(.*?)\]', text, re.DOTALL)
        if m:
            inner = m.group(1)
            print(f"\n{field}:")
            # Split by comma and try to extract
            # Simple: print the raw section
            print(f"  RAW: {inner[:200]}...")
    
    # Show description
    desc_match = re.search(r'"description": "([^"]*)"', text)
    if desc_match:
        print(f"\ndescription: {desc_match.group(1)[:100]}")
    
    print(f"\nlongDescription length: {len(ld)}")
