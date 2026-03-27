import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, contactInfo, building, stage, budget, timeline 
    } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Validation
    if (!name || !contactInfo || !building) {
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
🚨 *New Founder Intake Application* 🚨

*FOUNDER INFO*
*Name:* ${name}
*Contact:* ${contactInfo}

*THE BUILD*
*Building:* ${building}
*Stage:* ${stage || 'Not provided'}

*LOGISTICS*
*Budget:* ${budget || 'Not provided'}
*Timeline:* ${timeline || 'Not provided'}
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
