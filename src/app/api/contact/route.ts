import { NextResponse } from 'next/server';

// Temporary in-memory storage for contact messages
let contactMessages: any[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, visitorId } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newMessage = {
      name,
      email,
      message,
      visitorId: visitorId || "unknown",
      timestamp: new Date().toISOString(),
    };

    contactMessages.push(newMessage);
    console.log('[CONTACT FORM] New Message:', newMessage);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

export async function GET() {
  // For admin debugging only
  return NextResponse.json(contactMessages);
}
