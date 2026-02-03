import { Telegraf, Markup } from "telegraf";

const apiBase = process.env.API_BASE_URL || "http://localhost:3001";
const botKey = process.env.BOT_API_KEY || "";

export function startAdminBot(token: string) {
  const bot = new Telegraf(token);

  bot.start(async (ctx) => {
    await ctx.reply(
      "Admin botga xush kelibsiz.",
      Markup.inlineKeyboard([
        [Markup.button.callback("Yangi buyurtmalar", "ADMIN_ORDERS")],
        [Markup.button.callback("Bronlar", "ADMIN_RESERVATIONS")],
        [Markup.button.callback("Statistika", "ADMIN_STATS")]
      ])
    );
  });

  bot.action("ADMIN_ORDERS", async (ctx) => {
    const res = await fetch(`${apiBase}/orders/admin/new`, {
      headers: botKey ? { "x-bot-key": botKey } : undefined,
    });
    if (!res.ok) {
      await ctx.reply("Buyurtmalarni olishda xatolik.");
      return;
    }
    const orders = await res.json();
    if (!orders.length) {
      await ctx.reply("Yangi buyurtmalar yo‘q.");
      return;
    }
    for (const order of orders) {
      await ctx.reply(`#${order.id} - ${order.total} so‘m - ${order.status}`);
    }
  });

  bot.action("ADMIN_RESERVATIONS", async (ctx) => {
    const res = await fetch(`${apiBase}/reservations/admin`, {
      headers: botKey ? { "x-bot-key": botKey } : undefined,
    });
    if (!res.ok) {
      await ctx.reply("Bronlarni olishda xatolik.");
      return;
    }
    const items = await res.json();
    for (const r of items) {
      await ctx.reply(`#${r.id} - ${r.date} ${r.time} (${r.people}) - ${r.status}`);
    }
  });

  bot.action("ADMIN_STATS", async (ctx) => {
    const res = await fetch(`${apiBase}/analytics/summary`, {
      headers: botKey ? { "x-bot-key": botKey } : undefined,
    });
    if (!res.ok) {
      await ctx.reply("Statistikani olishda xatolik.");
      return;
    }
    const stats = await res.json();
    await ctx.reply(`Oylik buyurtmalar: ${stats.monthlyOrders}\nEng faol mijozlar: ${stats.topCustomers}`);
  });

  bot.launch();
}
