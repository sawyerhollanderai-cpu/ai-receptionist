import urllib.request
import re
import csv
import time

def scrape_yellowpages(query, location, num_pages=5):
    leads = []
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    
    query = urllib.parse.quote_plus(query)
    location = urllib.parse.quote_plus(location)
    
    for page in range(1, num_pages + 1):
        print(f"Scraping page {page}...")
        url = f"https://www.yellowpages.com/search?search_terms={query}&geo_location_terms={location}&page={page}"
        
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as response:
                html = response.read().decode('utf-8')
            
            # Simple regex parsing to avoid dependencies
            # This is brittle but works for a quick scrape
            results = html.split('class="result"')
            for res in results[1:]:
                name_match = re.search(r'class="business-name"[^>]*><span[^>]*>([^<]+)</span>', res)
                phone_match = re.search(r'class="phones phone primary"[^>]*>([^<]+)</div>', res)
                website_match = re.search(r'class="track-visit-website"[^>]*href="([^"]+)"', res)
                
                name = name_match.group(1).strip() if name_match else ""
                # Replace html entities
                name = name.replace('&#39;', "'").replace('&amp;', '&')
                
                phone = phone_match.group(1).strip() if phone_match else ""
                website = website_match.group(1).strip() if website_match else ""
                
                if name and phone:
                    if not any(lead['Business Name'] == name for lead in leads):
                        leads.append({
                            'Business Name': name,
                            'Phone': phone,
                            'Website': website,
                            'Email': ""
                        })
                
                if len(leads) >= 100:
                    break
        except Exception as e:
            print(f"Error scraping page {page}: {e}")
            
        if len(leads) >= 100:
            break
            
        time.sleep(1) # Be polite
        
    return leads

if __name__ == "__main__":
    print("Starting scrape...")
    plumbers = scrape_yellowpages("plumber", "Hartford, CT", num_pages=4)
    dentists = scrape_yellowpages("dentist", "Hartford, CT", num_pages=4)
    
    all_leads = plumbers + dentists
    print(f"Total leads found: {len(all_leads)}")
    
    if len(all_leads) > 100:
        all_leads = all_leads[:100]
        
    with open('/tmp/hartford_100_leads.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['Business Name', 'Phone', 'Website', 'Email'])
        writer.writeheader()
        writer.writerows(all_leads)
    
    print(f"Saved {len(all_leads)} local business leads to /tmp/hartford_100_leads.csv")
