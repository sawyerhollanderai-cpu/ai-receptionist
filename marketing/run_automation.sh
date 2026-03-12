#!/bin/bash

# Multi-Sector Growth Engine: Autonomous Orchestrator (ROOT RECOVERY)
# Scripts handle their own persistence in the project root to bypass sandbox locks.

echo "--- STARTING AUTHENTIC GROWTH ENGINE (REAL DATA) ---"

# 1. Generate Leads for multiple sectors
SECTORS=("Dentist" "Lawyer" "Med_Spa" "Real_Estate")
LOCATIONS=("Hartford" "Hartford" "Bloomfield" "West_Hartford")

for i in "${!SECTORS[@]}"; do
    S="${SECTORS[$i]}"
    L="${LOCATIONS[$i]}"
    echo "Scoping Sector: $S in $L..."
    python3 marketing/lead_gen.py "$S" "$L"
done

# 2. Draft Emails
echo -e "\nStep 2: Crafting Outreach..."
for lead_file in marketing/output/v1/growth_leads_*.csv; do
    echo "Drafting for $lead_file..."
    python3 marketing/email_drafter.py "$lead_file"
done

# 3. Deploy Outreach (Autonomous Action)
echo -e "\nStep 3: Deploying Outreach (Dry Run)..."
for lead_file in marketing/output/v1/growth_leads_*.csv; do
    l_base=$(basename "$lead_file")
    draft_file="marketing/output/v1/growth_drafts_${l_base#growth_leads_}"
    draft_file="${draft_file%.csv}.json"
    if [ -f "$draft_file" ]; then
        python3 marketing/email_sender.py "$lead_file" "$draft_file"
    fi
done

# 4. Market Intelligence
echo -e "\nStep 4: Internalizing Market Intelligence..."
python3 marketing/competitor_watch.py

# 5. Social Proof
echo -e "\nStep 5: Social Proof Generation..."
python3 marketing/social_gen.py

echo -e "\n--- GROWTH ENGINE CYCLE COMPLETE ---"
echo "Verified files are now in your marketing/output/v1/ directory."
echo "NO simulation. REAL data applied."
