
#!/usr/bin/env python3
import json
import re
import pdfplumber
from pathlib import Path

def clean_text(text):
    """Clean and normalize extracted text"""
    # Remove extra whitespace and normalize line breaks
    text = re.sub(r'\s+', ' ', text.strip())
    return text

def extract_poems_from_pdf(pdf_path):
    """Extract poem content from PDF"""
    poems_content = {}
    
    with pdfplumber.open(pdf_path) as pdf:
        full_text = ""
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                full_text += page_text + "\n"
    
    # Split text into potential poem sections
    # This is a basic approach - you may need to adjust based on PDF structure
    sections = re.split(r'\n{2,}', full_text)
    
    current_poem = None
    current_content = []
    
    for section in sections:
        section = section.strip()
        if not section:
            continue
            
        # Check if this looks like a poem title
        # Adjust this logic based on how titles appear in your PDF
        if len(section.split('\n')) == 1 and len(section) < 50:
            # Save previous poem if exists
            if current_poem and current_content:
                poems_content[current_poem] = current_content
            
            # Start new poem
            current_poem = section
            current_content = []
        else:
            # This is poem content
            if current_poem:
                lines = section.split('\n')
                for line in lines:
                    line = line.strip()
                    if line:
                        current_content.append(line)
    
    # Save last poem
    if current_poem and current_content:
        poems_content[current_poem] = current_content
    
    return poems_content

def update_json_with_poems(json_path, poems_content):
    """Update the JSON file with extracted poem content"""
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    updated_count = 0
    
    for poem in data['poems']:
        poem_title = poem['title']
        
        # Try to find matching content by title
        matched_content = None
        for extracted_title, content in poems_content.items():
            if poem_title.lower() in extracted_title.lower() or extracted_title.lower() in poem_title.lower():
                matched_content = content
                break
        
        if matched_content and not poem['content']:
            poem['content'] = matched_content
            updated_count += 1
            print(f"Updated '{poem_title}' with {len(matched_content)} lines")
    
    # Save updated JSON
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\nUpdated {updated_count} poems with content from PDF")
    return updated_count

def main():
    pdf_path = Path("attached_assets/Wiersze_antypowabne_1757701941747.PDF")
    json_path = Path("client/src/data/poetry-data.json")
    
    if not pdf_path.exists():
        print(f"PDF file not found: {pdf_path}")
        return
    
    if not json_path.exists():
        print(f"JSON file not found: {json_path}")
        return
    
    print("Extracting poems from PDF...")
    poems_content = extract_poems_from_pdf(pdf_path)
    
    print(f"Found {len(poems_content)} potential poems in PDF:")
    for title in poems_content.keys():
        print(f"  - {title}")
    
    print("\nUpdating JSON file...")
    update_json_with_poems(json_path, poems_content)
    
    print("Done!")

if __name__ == "__main__":
    main()
