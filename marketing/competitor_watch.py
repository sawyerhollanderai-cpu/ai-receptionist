import json
import os
import random

def watch_competitors():
    """
    Market Intelligence Engine.
    Monitors industry leaders and identifies responsiveness gaps.
    """
    print("--- COMPETITOR INTELLIGENCE CORE ---")
    
    competitors = [
        {"name": "MyAiFrontDesk", "status": "Active", "last_update": "2 days ago", "weakness": "Limited Bilingual support"},
        {"name": "Vapi.ai Direct", "status": "Active", "last_update": "Today", "weakness": "High technical barrier for small biz"},
        {"name": "CallJoy (Legacy)", "status": "Dead", "last_update": "2021", "weakness": "N/A"},
    ]
    
    print(f"Scanning {len(competitors)} market entities...\n")
    
    alerts = []
    
    for comp in competitors:
        # Simulate an alert based on a "weakness" overlap
        if comp['weakness'] == "Limited Bilingual support":
            alerts.append(f"🚨 OPPORTUNITY: {comp['name']} has gaps in Spanish support. Deploy your Bilingual Infrastructure to Dentist leads.")
        
        if comp['weakness'] == "High technical barrier for small biz":
            alerts.append(f"🚨 OPPORTUNITY: {comp['name']} is too complex for local shops. Pitch 'One-Click Deployment' to Law Firms.")

    if alerts:
        print("CRITICAL MARKET ALERTS:")
        for alert in alerts:
            print(alert)
    else:
        print("Market steady. Maintain deployment velocity.")

    return alerts

if __name__ == "__main__":
    watch_competitors()
