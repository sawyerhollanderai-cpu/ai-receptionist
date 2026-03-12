import csv
import os
import json

def generate_email_drafts(leads_file):
    """
    Automated Cold Outbound Engine.
    Generates personalized, high-conversion email drafts for scraped leads.
    """
    if not os.path.exists(leads_file):
        print(f"Error: {leads_file} not found.")
        return

    print(f"--- GENERATING DRAFTS FOR: {leads_file} ---")
    
    drafts = []
    
    with open(leads_file, mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            name = row.get('name', 'Business Owner')
            industry = "Professional"
            if "dentist" in leads_file.lower(): industry = "Dentist"
            if "lawyer" in leads_file.lower(): industry = "Lawyer"
            
            # Personalized Logic based on Industry
            if industry == "Dentist":
                template = f"""
Subject: Quick question about {name}'s after-hours intake

Hi Team at {name},

I noticed you're currently providing top-tier dental care in the area. I'm reaching out because many practices in your sector lose up to 30% of new patient leads because calls go to voicemail after-hours or during busy periods.

We've built a Voice Infrastructure layer specifically for dental offices that answers 100% of calls, qualifies patient needs (whitening, cleanings, ortho), and books them directly into your calendar.

Would you be open to a 2-minute chat about how we can secure your intake?

Best,

Sawyer
ReceptionistAI Team
Hartford, CT

---
Not interested? Reply "Unsubscribe" or click here to opt-out.
"""
            elif industry == "Lawyer":
                template = f"""
Subject: Critical Lead Capture for {name}

Hi {name},

In legal services, the first point of contact is everything. I noticed your firm is active in the area, and I wanted to ask how you handle intake during court hours or late evenings?

Our "Voice Engine" acts as a high-performance paralegal-intake layer. It qualifies cases instantly and schedules consultations so you never miss a high-value client to a competitor's voicemail.

Can we sync for 5 minutes this week?

Best,

Sawyer
ReceptionistAI Team
Hartford, CT

---
Not interested? Reply "Unsubscribe" or click here to opt-out.
"""
            else:
                template = f"""
Subject: Operational Efficiency for {name}

Hi {name},

I noticed your business is growing, and 24/7 responsiveness is usually the #1 bottleneck for companies at your scale. 

We've deployed an AI Voice Infrastructure that handles 100% of your business intake, answers FAQs, and books appointments 24/7 without extra head-count.

Open to seeing a 60-second demo?

Best,

Sawyer
ReceptionistAI Team
Hartford, CT

---
Not interested? Reply "Unsubscribe" or click here to opt-out.
"""
            
            drafts.append({"name": name, "draft": template})
            print(f"✅ Drafted for {name}")

    # Output drafts to a file in marketing/output/v1
    output_filename = f"growth_drafts_{os.path.basename(leads_file).replace('growth_leads_', '').replace('.csv', '.json')}"
    output_path = os.path.join("marketing", "output", "v1", output_filename)
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'w') as f:
        json.dump(drafts, f, indent=2)
    
    print(f"---DRAFTS_PERSISTED:{output_path}---")
    return drafts

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        leads_file = sys.argv[1]
        generate_email_drafts(leads_file)
    else:
        # Fallback to test file
        test_file = "marketing/data/leads_dentist_hartford_ct.csv"
        if os.path.exists(test_file):
            generate_email_drafts(test_file)
        else:
            print("Usage: python3 email_drafter.py <leads_csv_file>")
