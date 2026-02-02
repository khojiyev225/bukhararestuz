const TelegramBot = require('node-telegram-bot-api');

let bot;

const initTelegram = () => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return null;
  if (bot) return bot;
  bot = new TelegramBot(token, { polling: false });
  return bot;
};

const sendTelegramMessage = async (text) => {
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const instance = initTelegram();
  if (!instance || !chatId) return null;
  return instance.sendMessage(chatId, text);
};

module.exports = { initTelegram, sendTelegramMessage };
