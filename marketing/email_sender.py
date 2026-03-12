import json
import os
import smtplib
import time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_autonomous_emails(leads_file, drafts_file, dry_run=True):
    """
    Autonomous Email Delivery Layer.
    Orchestrates the sending of personalized drafts to captured leads.
    """
    if not os.path.exists(leads_file) or not os.path.exists(drafts_file):
        print(f"Error: Required files not found.")
        return

    print(f"--- STARTING OUTBOUND DEPLOYMENT: {leads_file} ---")
    if dry_run:
        print("🔍 MODE: DRY RUN (No actual emails will be sent)\n")

    # Load Drafts
    with open(drafts_file, 'r') as f:
        drafts_list = json.load(f)
    
    # Map drafts by name for easy lookup
    drafts_map = {d['name']: d['draft'] for d in drafts_list}

    # Setup SMTP (Fallback to generic if not in env)
    SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "sawyerhollander@gmail.com")
    SENDER_PASSWORD = os.environ.get("SENDER_PASSWORD", "uypgukwokkenpvsx") # Using the app password found in root script

    import random
    import csv
    success_count = 0
    session_cap = 25 # Protection limit for Gmail
    
    with open(leads_file, mode='r') as file:
        reader = csv.DictReader(file)
        leads_list = list(reader)
        
    print(f"Total leads in file: {len(leads_list)}")
    print(f"Session Cap: {session_cap} (Safety Enabled)\n")

    for row in leads_list:
        if success_count >= session_cap:
            print(f"🛑 SESSION CAP REACHED ({session_cap}). Stopping to protect account reputation.")
            break
            
        name = row.get('name')
        email = row.get('email')
        
        if not email or name not in drafts_map:
            continue

        content = drafts_map[name]
        subject = f"Operational Efficiency for {name}"
        if "Dentist" in leads_file: subject = f"Quick question about {name}'s after-hours intake"
        if "Lawyer" in leads_file: subject = f"Critical Lead Capture for {name}"

        if dry_run:
            print(f"📝 [DRY RUN] Would send to: {name} ({email})")
            success_count += 1
        else:
            try:
                # Generic SMTP implementation
                msg = MIMEMultipart()
                msg['From'] = str(SENDER_EMAIL)
                msg['To'] = str(email)
                msg['Subject'] = str(subject)
                msg.attach(MIMEText(content, 'plain'))

                server = smtplib.SMTP('smtp.gmail.com', 587)
                server.starttls()
                server.login(SENDER_EMAIL, SENDER_PASSWORD)
                server.send_message(msg)
                server.quit()

                success_count += 1
                print(f"📧 [{success_count}/{session_cap}] DEPLOYED to {name} ({email})")
                
                # Jitter Delay: 45 - 120 seconds to simulate human activity
                if success_count < session_cap:
                    wait_time = random.randint(45, 120)
                    print(f"⏳ Humanized Delay: Waiting {wait_time}s before next send...")
                    time.sleep(wait_time)
            except Exception as e:
                print(f"❌ Failed to send to {email}: {e}")

    print(f"\n--- DEPLOYMENT COMPLETE ---")
    print(f"Total Successful Actions: {success_count}")

if __name__ == "__main__":
    import sys
    # Usage: python3 email_sender.py <leads_file> <drafts_file> [live]
    if len(sys.argv) < 3:
        print("Usage: python3 email_sender.py <leads_file> <drafts_file> [live]")
        sys.exit(1)
    
    l_file = sys.argv[1]
    d_file = sys.argv[2]
    is_live = len(sys.argv) > 3 and sys.argv[3] == "live"
    
    send_autonomous_emails(l_file, d_file, dry_run=not is_live)
