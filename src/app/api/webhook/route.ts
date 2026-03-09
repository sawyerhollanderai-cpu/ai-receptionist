import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    console.log('--- NEW WEBHOOK REQUEST RECEIVED ---');
    const body = await req.json();
    const { message } = body;

    console.log('Body Type:', message?.type);
    console.log('Full Body:', JSON.stringify(body, null, 2));

    // Vapi sends 'tool-calls' message when the agent wants to trigger a function
    if (message?.type === 'tool-calls') {
      const toolCalls = message.toolCalls || message.toolWithToolCallList;
      
      if (!toolCalls || !Array.isArray(toolCalls)) {
        console.error('No toolCalls array found in message');
        return NextResponse.json({ error: 'Invalid tool-calls payload' }, { status: 400 });
      }

      console.log(`Processing ${toolCalls.length} tool calls...`);
      
      const results = await Promise.all(toolCalls.map(async (tc: any) => {
        // Handle different Vapi payload versions
        const call = tc.toolCall || tc;
        
        if (!call || !call.function) {
          console.error('Invalid tool call object:', tc);
          return { toolCallId: call?.id || 'unknown', result: 'Error: Invalid tool call' };
        }

        if (call.function.name === 'bookAppointment') {
          try {
            const args = typeof call.function.arguments === 'string' 
              ? JSON.parse(call.function.arguments) 
              : call.function.arguments;
            
            const { date, time, patientName } = args;
            
            console.log(`[MOCK BOOKING] Appointment booked for ${patientName} on ${date} at ${time}`);

            // Extract visitorId from Vapi call metadata
            const visitorId = message.call?.metadata?.visitorId || "unknown_visitor";

            // NEW: Save the lead to our local CRM API so it shows up on the landing page
            try {
              const baseUrl = process.env.NEXT_PUBLIC_TUNNEL_URL || "http://localhost:3000";
              await fetch(`${baseUrl}/api/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...args, visitorId }),
              });
              console.log(`[CRM] Lead saved for visitor: ${visitorId}`);
            } catch (e) {
              console.error('[CRM] Failed to save lead:', e);
            }
            
            return {
              toolCallId: call.id,
              result: `Successfully booked appointment for ${patientName} on ${date} at ${time}.`,
            };
          } catch (e) {
            console.error('Error parsing function arguments:', e);
            return { toolCallId: call.id, result: 'Error: Failed to parse booking details' };
          }
        }
        
        return {
          toolCallId: call.id,
          result: `Error: Unknown function "${call.function.name}".`
        };
      }));

      console.log('Returning results to Vapi:', JSON.stringify(results));
      return NextResponse.json({ results });
    }

    // Acknowledge other webhook events
    return NextResponse.json({ status: 'ignored' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
