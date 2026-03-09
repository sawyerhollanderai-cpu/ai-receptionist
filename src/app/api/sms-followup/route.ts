import { NextResponse } from 'next/server';

/**
 * POST /api/sms-followup
 * 
 * Called by Vapi's "end-of-call-report" webhook (or manually).
 * Sends an SMS follow-up to the caller via Twilio with a booking link.
 *
 * Required env vars:
 *   TWILIO_ACCOUNT_SID
 *   TWILIO_AUTH_TOKEN
 *   TWILIO_PHONE_NUMBER  (your Twilio phone number, e.g. +18605551234)
 *   CALENDLY_LINK        (your booking link)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Support both direct calls and Vapi end-of-call-report format
    const callerPhone = body.phone || body.message?.call?.customer?.number;
    const callerName = body.name || body.message?.call?.metadata?.callerName || 'there';
    const businessName = body.businessName || 'ReceptionistAI';

    if (!callerPhone) {
      return NextResponse.json({ error: 'No phone number provided' }, { status: 400 });
    }

    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioFrom = process.env.TWILIO_PHONE_NUMBER;
    const calendlyLink = process.env.CALENDLY_LINK || '';

    if (!twilioSid || !twilioToken || !twilioFrom) {
      console.warn('[SMS] Twilio not configured — skipping SMS');
      return NextResponse.json({ 
        warning: 'SMS skipped — Twilio env vars not set',
        required: ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'TWILIO_PHONE_NUMBER']
      });
    }

    const messageBody = `Hey ${callerName}! Thanks for calling ${businessName}. 😊 If you'd like to book a time with our team, here's our calendar: ${calendlyLink}`;

    // Send SMS via Twilio REST API
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
    const smsRes = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${twilioSid}:${twilioToken}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        To: callerPhone,
        From: twilioFrom,
        Body: messageBody,
      }),
    });

    if (!smsRes.ok) {
      const errorText = await smsRes.text();
      console.error('[SMS] Twilio error:', errorText);
      return NextResponse.json({ error: 'Twilio API failed', details: errorText }, { status: 500 });
    }

    const smsData = await smsRes.json();
    console.log(`[SMS] ✅ Follow-up sent to ${callerPhone}: ${smsData.sid}`);

    return NextResponse.json({ 
      success: true,
      messageSid: smsData.sid,
      to: callerPhone,
    });
  } catch (error) {
    console.error('[SMS] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
