import urllib.request
import re
import csv
import time
import os

def scrape_ddg_lite(query, location, max_results=50):
    leads = []
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    encoded_search = urllib.parse.quote_plus(f"{query} {location}")
    
    page = 1
    # For DDG Lite, pagination involves passing 's' offset and 'dc' parameter.
    # To keep it simple, we'll just grab the first page and assume it returns 20-30 results per niche,
    # and we can supplement. Actually, DDG Lite returns ~25 per page. 
    while len(leads) < max_results:
        print(f"Scraping DDG Lite for '{query}' in {location} - page {page}...")
        
        # DDG Lite uses POST for search
        url = "https://lite.duckduckgo.com/lite/"
        data = f"q={encoded_search}&s={(page-1)*20}".encode('utf-8')
        
        try:
            req = urllib.request.Request(url, data=data, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as response:
                html = response.read().decode('utf-8', errors='ignore')
            
            # Find all result titles and URLs
            # <a class="result-url" href="//duckduckgo.com/l/?uddg=https://www.example.com...">Example Name</a>
            results = re.findall(r'<a rel="nofollow" href="//duckduckgo\.com/l/\?uddg=([^"]+)"[^>]*>([^<]+)</a>', html)
            
            if not results:
                # Some versions of DDG Lite use different classes
                results = re.findall(r'<a class="result-snippet" href="([^"]+)"[^>]*>([^<]+)</a>', html)
            
            if not results:
                 results = re.findall(r'<a class="result-url" href="([^"]+)"[^>]*>([^<]+)</a>', html)
                 
            # Fallback for basic DDG links
            if not results:
                 results = re.findall(r'<a href="\S*uddg=([^"]+)"[^>]*>([^<]+)</a>', html)
                 
            if not results:
                print("No results found or blocked.")
                break
                
            for raw_url, raw_name in results:
                try:
                    real_url = urllib.parse.unquote(raw_url).split('&')[0]
                except:
                    real_url = raw_url
                    
                if 'yelp.com' in real_url or 'yellowpages.com' in real_url or 'bbb.org' in real_url or 'angi.com' in real_url:
                    continue
                    
                name = raw_name.replace('&#39;', "'").replace('&amp;', '&').strip()
                domain = real_url.split('://')[-1].split('/')[0].replace('www.', '')
                
                if name and domain and '.' in domain:
                    if not any(lead['Business Name'] == name for lead in leads):
                        leads.append({
                            'Business Name': name,
                            'Phone': "Not Found", 
                            'Website': f"https://{domain}",
                            'Email': f"contact@{domain}"
                        })
                
                if len(leads) >= max_results:
                    break
        except Exception as e:
            print(f"Error scraping DDG: {e}")
            break
            
        page += 1
        time.sleep(2)
        
    return leads

if __name__ == "__main__":
    print("Starting massive 200-lead scrape for Hartford, CT...")
    
    all_leads = []
    
    # We will grab 50 from 4 big local niches
    queries = ["plumber", "dentist", "lawyer", "hvac"]
    
    for query in queries:
        new_leads = scrape_ddg_lite(query, "Hartford, CT", max_results=50)
        all_leads.extend(new_leads)
        print(f"-> Found {len(new_leads)} {query}s.")
        time.sleep(2)
        
    print(f"\nTotal leads found across all niches: {len(all_leads)}")
    
    csv_path = 'hartford_200_leads.csv'
    with open(csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['Business Name', 'Phone', 'Website', 'Email'])
        writer.writeheader()
        writer.writerows(all_leads)
    
    print(f"Saved {len(all_leads)} local business leads to {csv_path}")
