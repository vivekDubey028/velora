import zipfile
import xml.etree.ElementTree as ET
import json
import os
import re

def extract_text_from_docx(file_path):
    document_text = ""
    with zipfile.ZipFile(file_path) as docx:
        xml_content = docx.read('word/document.xml')
        tree = ET.fromstring(xml_content)
        
        namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        
        paragraphs = []
        for p in tree.iterfind('.//w:p', namespaces):
            texts = [node.text for node in p.iterfind('.//w:t', namespaces) if node.text]
            if texts:
                paragraphs.append(''.join(texts))
    return paragraphs

def parse_products(paragraphs):
    products = []
    current_product = {}
    current_field = None
    
    fields = ['Chemical Formula', 'HS Code', 'CAS Number', 'Appearance', 'Odour', 'Density',
              'Boiling Point', 'Melting Point', 'Flash Point', 'Solubility', 'pH', 'Purity / Grade',
              'Packaging', 'Description', 'Applications', 'Storage']
    
    for p in paragraphs:
        p = p.strip()
        if not p: continue
        
        # Check if it's a new product title e.g. "1. Product Name"
        if re.match(r'^\d+\.\s+', p):
            if current_product and 'name' in current_product:
                products.append(current_product)
            current_product = {'name': re.sub(r'^\d+\.\s+', '', p)}
            current_field = None
            for field in fields:
                current_product[field] = ""
            continue
            
        if not current_product:
            continue
            
        # Check if this paragraph is a field name
        found_field = False
        for field in fields:
            if p.startswith(field):
                current_field = field
                value = p[len(field):].strip()
                if value:
                    current_product[current_field] += value + " "
                found_field = True
                break
                
        if not found_field and current_field:
            current_product[current_field] += p + " "
            
    if current_product and 'name' in current_product:
        products.append(current_product)
        
    return products

all_products = []
for file_name in ['catalogue1.docx', 'catalogue2.docx']:
    path = os.path.join(r'c:\PROJECTS\velora\src\assets\products', file_name)
    if os.path.exists(path):
        paras = extract_text_from_docx(path)
        all_products.extend(parse_products(paras))

with open('products_data.json', 'w', encoding='utf-8') as f:
    json.dump(all_products, f, indent=2)

print(f"Extracted {len(all_products)} products.")
