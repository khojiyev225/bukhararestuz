import { Telegraf, Markup } from "telegraf";

const apiBase = process.env.API_BASE_URL || "http://localhost:3001";
const botKey = process.env.BOT_API_KEY || "";

export function startCourierBot(token: string) {
  const bot = new Telegraf(token);

  bot.start(async (ctx) => {
    await ctx.reply(
      "Courier panelga xush kelibsiz.",
      Markup.inlineKeyboard([[Markup.button.callback("Yangi buyurtmalar", "NEW_ORDERS")]])
    );
  });

  bot.action("NEW_ORDERS", async (ctx) => {
    const res = await fetch(`${apiBase}/orders/courier/new`, {
      headers: botKey ? { "x-bot-key": botKey } : undefined,
    });
    if (!res.ok) {
      await ctx.reply("Buyurtmalarni olishda xatolik.");
      return;
    }
    const orders = await res.json();
    if (!orders.length) {
      await ctx.reply("Yangi buyurtma yo‘q.");
      return;
    }
    for (const order of orders) {
      await ctx.reply(
        `#${order.id} - ${order.address}\n${order.phone}\n${order.itemsSummary}`,
        Markup.inlineKeyboard([
          [Markup.button.callback("Qabul qildim", `ACCEPT_${order.id}`)],
          [Markup.button.callback("Yuborildi", `SHIPPED_${order.id}`)]
        ])
      );
    }
  });

  bot.action(/ACCEPT_(\d+)/, async (ctx) => {
    const id = ctx.match[1];
    await fetch(`${apiBase}/orders/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(botKey ? { "x-bot-key": botKey } : {}),
      },
      body: JSON.stringify({ status: "PREPARING" })
    });
    await ctx.reply(`Buyurtma #${id} qabul qilindi.`);
  });

  bot.action(/SHIPPED_(\d+)/, async (ctx) => {
    const id = ctx.match[1];
    await fetch(`${apiBase}/orders/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(botKey ? { "x-bot-key": botKey } : {}),
      },
      body: JSON.stringify({ status: "DELIVERED" })
    });
    await ctx.reply(`Buyurtma #${id} yuborildi.`);
  });

  bot.launch();
}
