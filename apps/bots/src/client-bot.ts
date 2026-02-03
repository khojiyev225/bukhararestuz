import { Telegraf, Markup } from "telegraf";

const apiBase = process.env.API_BASE_URL || "http://localhost:3001";

async function fetchMenu() {
  const res = await fetch(`${apiBase}/menu/public`);
  if (!res.ok) return [];
  return res.json();
}

export function startClientBot(token: string) {
  const bot = new Telegraf(token);

  bot.start(async (ctx) => {
    await ctx.reply(
      "BUKHARA REST botiga xush kelibsiz!",
      Markup.inlineKeyboard([
        [Markup.button.callback("Menyu", "MENU")],
        [Markup.button.callback("Buyurtmalarim", "ORDERS")],
        [Markup.button.callback("Bronlarim", "RESERVATIONS")]
      ])
    );
  });

  bot.action("MENU", async (ctx) => {
    const items = await fetchMenu();
    if (!Array.isArray(items) || items.length === 0) {
      await ctx.reply("Menyu hozircha bo‘sh.");
      return;
    }
    for (const item of items) {
      await ctx.reply(`${item.name} — ${item.price} so‘m\n${item.description ?? ""}`);
    }
  });

  bot.action("ORDERS", async (ctx) => {
    await ctx.reply("Buyurtmalar tarixini ko‘rish uchun saytdagi profilingizga kiring.");
  });

  bot.action("RESERVATIONS", async (ctx) => {
    await ctx.reply("Bronlar tarixini ko‘rish uchun saytdagi profilingizga kiring.");
  });

  bot.launch();
}
