import json
import os

def generate_social_content():
    """
    Identity & Soul Content Generator.
    Turns leads.json data into social proof for marketing.
    """
    print("--- INFRASTRUCTURE SOCIAL GENERATOR ---")
    
    leads_path = 'leads.json'
    if not os.path.exists(leads_path):
        print("No leads found yet. Start generating demos to feed the soul!")
        return

    with open(leads_path, 'r') as f:
        all_leads = json.load(f)
    
    # Flatten leads from all visitors for master marketing feed
    master_feed = []
    for visitor_id, leads in all_leads.items():
        master_feed.extend(leads)
    
    # Sort by recent
    recent_leads = sorted(master_feed, key=lambda x: x.get('timestamp', ''), reverse=True)[:3]
    
    if not recent_leads:
        print("Knowledge base empty. Need more live demo deployments.")
        return

    print(f"Creating content based on {len(recent_leads)} recent successes...\n")
    
    for lead in recent_leads:
        print(f"PROJECT: {lead['name']}")
        print(f"TYPE: {lead['task']}")
        print("-" * 20)
        
        # Twitter/X Pattern
        print("[TWITTER/X DRAFT]")
        print(f"The Voice Infrastructure Layer just secured another lead for {lead['name']}. 🤖📈")
        print("While other businesses sleep, our Engine handles 24/7 bilingual support.")
        print("From scrape to deployment in < 60 seconds.")
        print("#AIAgent #B2B #Infrastructure\n")
        
        # LinkedIn Pattern
        print("[LINKEDIN DRAFT]")
        print(f"Excellence in Automated Operations: {lead['name']} just deployed their ReceptionistAI Engine.")
        print("We're moving beyond 'Chatbots' and into mission-critical voice infrastructure.")
        print(f"Verification: {lead['status']} Lead Capture.")
        print("The future of B2B is predictable, scalable, and human-like. 🚀\n")
        print("=" * 30)

if __name__ == "__main__":
    generate_social_content()
