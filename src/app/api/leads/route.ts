import { NextResponse } from 'next/server';

// Simple in-memory storage for demo leads keyed by visitorId
// Note: This will reset when the server restarts or redeploys
let visitorLeads: Record<string, any[]> = {};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const visitorId = searchParams.get('visitorId');
  
  if (!visitorId) {
    return NextResponse.json([]);
  }

  return NextResponse.json(visitorLeads[visitorId] || []);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const visitorId = body.visitorId;
    
    if (!visitorId) {
      return NextResponse.json({ error: "Visitor ID required" }, { status: 400 });
    }

    const newLead = {
      name: body.patientName || "Anonymous",
      task: "Demo Booking",
      time: "Just Now",
      status: "Booked",
      color: "bg-blue-600",
      timestamp: new Date().toISOString(),
    };
    
    if (!visitorLeads[visitorId]) {
      visitorLeads[visitorId] = [];
    }
    
    // Add to the beginning of the user's specific list
    visitorLeads[visitorId] = [newLead, ...visitorLeads[visitorId]].slice(0, 5); 
    
    return NextResponse.json({ success: true, lead: newLead });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
