import json
import os

with open('products_data.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

# Clean up keys and formatting
cleaned_products = []
for idx, p in enumerate(products):
    name_clean = p.get('name', '').strip()
    
    cleaned = {
        "id": str(idx + 1),
        "name": name_clean,
        "chemicalFormula": p.get('Chemical Formula', '').strip(),
        "hsCode": p.get('HS Code', '').strip(),
        "casNumber": p.get('CAS Number', '').strip(),
        "appearance": p.get('Appearance', '').strip(),
        "odour": p.get('Odour', '').strip(),
        "density": p.get('Density', '').strip(),
        "boilingPoint": p.get('Boiling Point', '').strip(),
        "meltingPoint": p.get('Melting Point', '').strip(),
        "flashPoint": p.get('Flash Point', '').strip(),
        "solubility": p.get('Solubility', '').strip(),
        "pH": p.get('pH', '').strip(),
        "purity": p.get('Purity / Grade', '').strip(),
        "packaging": p.get('Packaging', '').strip(),
        "description": p.get('Description', '').strip(),
        "applications": p.get('Applications', '').strip(),
        "storage": p.get('Storage', '').strip()
    }
    cleaned_products.append(cleaned)

ts_content = f"""export interface ProductData {{
  id: string;
  name: string;
  chemicalFormula: string;
  hsCode: string;
  casNumber: string;
  appearance: string;
  odour: string;
  density?: string;
  boilingPoint?: string;
  meltingPoint?: string;
  flashPoint?: string;
  solubility?: string;
  pH?: string;
  purity: string;
  packaging: string;
  description: string;
  applications: string;
  storage: string;
}}

export const productDatabase: ProductData[] = {json.dumps(cleaned_products, indent=2, ensure_ascii=False)};
"""

# Create the data dir if it doesn't exist
os.makedirs(r'c:\PROJECTS\velora\src\data', exist_ok=True)

with open(r'c:\PROJECTS\velora\src\data\productsData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Generated src/data/productsData.ts")
