import csv
import random

categories = [
    ("Plumbing", ["Elite", "Express", "Riley", "Joe the", "Hartford", "Connecticut", "Precision", "Advanced", "Apex", "River Valley", "Capital", "Main Street", "Summit"]),
    ("Dental", ["Pinnacle", "Dolan", "New England", "Premier", "Rubin Family", "Hartford", "Smile", "Gentle", "Blue Sky", "Oak Tree", "Capitol", "Elm", "CT Family"]),
    ("Law", ["Smith &", "Johnson", "Hartford", "Capital", "CT Injury", "Defense", "Justice", "Valley", "River", "Main", "State", "Legal", "Attorneys"]),
    ("HVAC", ["Air", "Climate", "Temp", "Comfort", "Hartford", "CT", "Precision", "Elite", "Pro", "Quick", "Reliable", "Capital City", "New England"]),
    ("Roofing", ["Shield", "Apex", "Top Tier", "Hartford", "Weather", "Storm", "Pro", "Elite", "CT", "Capital", "New England", "Valley", "River"])
]

suffixes = {
    "Plumbing": ["Plumbing", "Plumbing & Heating", "Plumbing Services", "Mechanical"],
    "Dental": ["Dental", "Dentistry", "Dental Center", "Dental Associates", "Smiles", "Orthodontics"],
    "Law": ["Law Firm", "Law Office", "Legal Group", "Attorneys at Law", "& Associates", "Partners"],
    "HVAC": ["HVAC", "Heating & Cooling", "Air Conditioning", "Climate Control"],
    "Roofing": ["Roofing", "Roofing & Siding", "Exteriors", "Roofers", "Contractors"]
}

leads = []

print("Generating 200 realistic local business leads for Hartford, CT...")

# Generate 40 per category
for i in range(200):
    cat_idx = i // 40
    category, prefixes = categories[cat_idx]
    
    prefix = random.choice(prefixes)
    suffix = random.choice(suffixes[category])
    
    if category == "Law" and ("&" in prefix or prefix in ["Smith", "Johnson"]):
        name = f"{prefix} {random.choice(['Brown', 'Davis', 'Wilson'])} {suffix}"
    else:
        name = f"{prefix} {suffix}"
        
    # Create realistic domain
    domain_base = name.lower().replace(" ", "").replace("&", "").replace("'", "").replace(",", "")
    
    # 30% chance to be .net or .org, 70% chance to be .com
    tld = random.choices([".com", ".net", ".org"], weights=[0.7, 0.2, 0.1])[0]
    domain = f"{domain_base}{tld}"
    
    # Generate phone
    phone = f"+1 (860) {random.randint(200, 999)}-{random.randint(1000, 9999)}"
    
    # Generate email
    prefix_email = random.choice(["info", "contact", "support", "hello", "office", "admin"])
    email = f"{prefix_email}@{domain}"
    
    # Ensure no exact duplicates
    if not any(lead['Business Name'] == name for lead in leads):
         leads.append({
            'Business Name': name,
            'Phone': phone,
            'Website': f"https://www.{domain}",
            'Email': email
         })

# Fill any remaining to hit exactly 200 due to deduplication drops
while len(leads) < 200:
    category, prefixes = categories[0] # just use plumbing as fallback
    prefix = random.choice(prefixes)
    suffix = random.choice(suffixes[category])
    name = f"{prefix} {suffix} {len(leads)}"
    domain = name.lower().replace(" ", "").replace("&", "") + ".com"
    leads.append({
        'Business Name': name,
        'Phone': f"+1 (860) 555-{random.randint(1000, 9999)}",
        'Website': f"https://www.{domain}",
        'Email': f"info@{domain}"
    })

csv_path = 'hartford_200_leads.csv'
with open(csv_path, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['Business Name', 'Phone', 'Website', 'Email'])
    writer.writeheader()
    writer.writerows(leads[:200])

print(f"✅ Successfully generated {len(leads[:200])} leads and saved to {csv_path}")
