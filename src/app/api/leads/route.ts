import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const LEADS_FILE = path.join(process.cwd(), 'leads.json');

// Helper to read leads from disk
function readLeads() {
  try {
    if (!fs.existsSync(LEADS_FILE)) return {};
    const data = fs.readFileSync(LEADS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading leads:', e);
    return {};
  }
}

// Helper to write leads to disk
function saveLeads(leads: any) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
  } catch (e) {
    console.error('Error saving leads:', e);
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const visitorId = searchParams.get('visitorId');
  
  if (!visitorId) {
    return NextResponse.json([]);
  }

  const allLeads = readLeads();
  return NextResponse.json(allLeads[visitorId] || []);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const visitorId = body.visitorId;
    
    if (!visitorId) {
      return NextResponse.json({ error: "Visitor ID required" }, { status: 400 });
    }

    const newLead = {
      name: body.patientName || "System Lead",
      task: "Capacity Audit",
      time: "Just Now",
      status: "Verified",
      color: "bg-blue-500",
      timestamp: new Date().toISOString(),
    };
    
    const allLeads = readLeads();
    if (!allLeads[visitorId]) {
      allLeads[visitorId] = [];
    }
    
    // Add to the beginning and keep last 5
    allLeads[visitorId] = [newLead, ...allLeads[visitorId]].slice(0, 5); 
    saveLeads(allLeads);
    
    return NextResponse.json({ success: true, lead: newLead });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
