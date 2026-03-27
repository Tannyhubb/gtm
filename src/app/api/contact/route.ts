import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, email, companyName, url, userType, goals, 
      bottleneck, problemDuration, urgency, budget, 
      authority, serviceType, source, trigger 
    } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!botToken || !chatId) {
      console.error("Telegram bot error: Keys are missing in environment variables.");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const message = `
🚨 *New Protocol Application* 🚨

*PERSONAL INFO*
*Name:* ${name}
*Email:* ${email}
*Company:* ${companyName || 'Not provided'}
*URL:* ${url || 'Not provided'}
*Type:* ${userType || 'Not provided'}

*GOALS & PROBLEMS*
*Goals:* ${(goals || []).join(', ')}
*Bottleneck:* ${bottleneck || 'Not provided'}
*Duration:* ${problemDuration || 'Not provided'}

*QUALIFICATION*
*Urgency:* ${urgency || 'Not provided'}
*Budget:* ${budget || 'Not provided'}
*Authority:* ${authority || 'Not provided'}
*Needs:* ${serviceType || 'Not provided'}

*SOURCE*
*Found via:* ${source || 'Not provided'}
*Trigger:* ${trigger || 'Not provided'}
    `;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Telegram API responded with ${response.status}: ${errorData}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
