---
description: Fully autonomous lead generation and outreach loop for ReceptionistAI
---

// turbo-all

This workflow is designed for autonomous execution by the Antigravity agent to drive growth with minimal user oversight.

### Phase 1: Lead Identification
1. Search for high-value local business niches in a specific city (e.g., "Personal Injury Lawyers in Miami", "HVAC in Houston").
2. Use the `scrape_200.py` or equivalent lead generation scripts to gather at least 100 new leads.
3. Save these leads to a timestamped CSV in `leads/`.

### Phase 2: Outreach Execution
1. Verify the leads using a validation script (or manual check of email formatting).
2. Load the `send_emails_resend.py` script.
3. Update the `target_csv` path to the new lead list.
4. Execute the Resend blast.

### Phase 3: Tracking & Reporting
1. Monitor the Resend dashboard for opens/clicks.
2. If any replies are received in the user's Gmail (`sawyerhollanderai@gmail.com`), summarize them.
3. Update the `DASHBOARD.md` in the root directory with the latest campaign stats.

### Phase 4: Sarah Deployment
1. For any positive replies, generate a custom demo link using the `/demo-generator`.
2. Send the demo link along with a "Performance Tier" ($25 per booking) pitch.
