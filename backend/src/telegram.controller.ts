import { Body, Controller, Headers, Post } from '@nestjs/common';

@Controller('telegram')
export class TelegramController {
  @Post('webhook')
  async webhook(
    @Body() update: any,
    @Headers('x-telegram-bot-api-secret-token') secret: string,
  ) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

    if (!botToken || !webhookSecret || secret !== webhookSecret) {
      return { ok: false };
    }

    const message = update?.message;
    const chatId = message?.chat?.id;
    const text = message?.text;

    if (chatId && text?.startsWith('/start')) {
      await fetch(
        'https://api.telegram.org/bot' + botToken + '/sendMessage',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: 'Assalomu alaykum! Malina platformasiga xush kelibsiz! ❤️',
            reply_markup: {
              inline_keyboard: [[
                {
                  text: 'Malinani ochish',
                  web_app: {
                    url: process.env.FRONTEND_URL || 'https://malina-yangi-mini-ap.vercel.app/',
                  },
                },
              ]],
            },
          }),
        },
      );
    }

    return { ok: true };
  }
}
