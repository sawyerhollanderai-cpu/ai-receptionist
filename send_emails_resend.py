import csv
import time
import requests
import os

RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")

# -------------------------------------------------------------------
# IMPORTANT: Before you can send to other people, you MUST verify a 
# custom domain in Resend (e.g. sawyer@yourwebsite.com). 
# If you don't do this, Resend will only let you send emails to yourself!
# -------------------------------------------------------------------
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "sawyer@receptionistai.cc")

TEMPLATE = """Hi team at {business_name},

Quick question: what happens when a lead calls in at 6 PM or when your front desk is busy? 

Most of the time, that call goes to voicemail, and the customer hangs up and immediately calls the next competitor on Google.

I built an AI named Sarah that stops this from happening. It’s a 24/7 AI receptionist that answers the phone instantly, qualifies the caller, and books them right into your calendar.

Can you try calling our live AI demo number and tell me what you think? 
👉 Call: +1 (860) 407-1305

If you like it, we can have it running for {business_name} by tomorrow for less than the cost of your morning coffee.

Best,
Sawyer"""

def send_campaign(csv_file):
    print(f"Starting automated email campaign via Resend API...\n")
    success_count = 0
    
    with open(csv_file, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        
        for row in reader:
            email = row.get('Email', '').strip()
            name = row.get('Business Name', '').strip()
            
            if not email:
                continue
                
            subject = f"Quick question about {name}'s front desk"
            body = TEMPLATE.format(business_name=name)
            
            print(f"Sending to {name} ({email})...")
            
            try:
                headers = {
                    "Authorization": f"Bearer {RESEND_API_KEY}",
                    "Content-Type": "application/json"
                }
                
                payload = {
                    "from": SENDER_EMAIL,
                    "to": [email],
                    "reply_to": "sawyerhollanderai@gmail.com",
                    "subject": subject,
                    "text": body
                }
                
                response = requests.post("https://api.resend.com/emails", headers=headers, json=payload)
                
                if response.status_code in [200, 201]:
                    print("✅ Sent successfully via Resend!")
                    success_count += 1
                else:
                    error_msg = response.json()
                    print(f"❌ Failed to send. API says: {error_msg.get('message', response.text)}")
                
                # Sleep to avoid hitting rate limits
                time.sleep(1)
                
            except Exception as e:
                print(f"❌ Script error: {e}")
                
    print(f"\n🎉 Campaign complete! Successfully sent {success_count} emails.")

if __name__ == "__main__":
    csv_path = 'hartford_200_leads.csv'
    if not os.path.exists(csv_path):
        print(f"File {csv_path} not found.")
    else:
        send_campaign(csv_path)
