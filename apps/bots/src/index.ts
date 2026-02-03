import "dotenv/config";
import { startAdminBot } from "./admin-bot.js";
import { startClientBot } from "./client-bot.js";
import { startCourierBot } from "./courier-bot.js";

const clientToken = process.env.TELEGRAM_CLIENT_BOT_TOKEN;
const courierToken = process.env.TELEGRAM_COURIER_BOT_TOKEN;
const adminToken = process.env.TELEGRAM_ADMIN_BOT_TOKEN;

if (!clientToken || !courierToken || !adminToken) {
  console.error("Missing bot tokens. Set TELEGRAM_CLIENT_BOT_TOKEN, TELEGRAM_COURIER_BOT_TOKEN, TELEGRAM_ADMIN_BOT_TOKEN.");
  process.exit(1);
}

startClientBot(clientToken);
startCourierBot(courierToken);
startAdminBot(adminToken);

console.log("Bots started.");
