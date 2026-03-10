import csv
import urllib.parse
import webbrowser
import time
import os

TEMPLATE = """Hi team at {business_name},

Quick question: what happens when a lead calls in at 6 PM or when your front desk is busy? 

Most of the time, that call goes to voicemail, and the customer hangs up and immediately calls the next competitor on Google.

I built an AI named Sarah that stops this from happening. It’s a 24/7 AI receptionist that answers the phone instantly, qualifies the caller, and books them right into your calendar.

Can you try calling our live AI demo number and tell me what you think? 
👉 Call: +1 (860) 407-1305

If you like it, we can have it running for {business_name} by tomorrow for less than the cost of your morning coffee.

Best,
Sawyer"""

def generate_mailto_links(csv_file):
    print("Generating pre-filled email drafts...")
    count = 0
    with open(csv_file, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        
        for row in reader:
            email = row.get('Email', '').strip()
            name = row.get('Business Name', '').strip()
            
            if not email:
                continue
                
            subject = f"Quick question about {name}'s front desk"
            body = TEMPLATE.format(business_name=name)
            
            # URL encode the subject and body
            subject_encoded = urllib.parse.quote(subject)
            body_encoded = urllib.parse.quote(body)
            
            mailto_link = f"mailto:{email}?subject={subject_encoded}&body={body_encoded}"
            
            print(f"Opening draft for {name}...")
            # This will pop open your default mail app (Mac Mail, Outlook, or Gmail in browser)
            webbrowser.open(mailto_link)
            count += 1
            
            # Pause for 2 seconds to let the mail app open
            time.sleep(2)

    print(f"\n🎉 Finished! Opened {count} pre-filled email drafts.")
    print("Just click 'Send' on each window!")

if __name__ == "__main__":
    csv_path = 'hartford_leads.csv'
    if not os.path.exists(csv_path):
        print(f"File {csv_path} not found.")
    else:
        generate_mailto_links(csv_path)
