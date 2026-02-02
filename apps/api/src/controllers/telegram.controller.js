const { initTelegram } = require('../config/telegram');

const setupWebhook = async (req, res) => {
  const bot = initTelegram();
  if (!bot) return res.status(400).json({ message: 'Telegram bot token not set' });

  const { webhookUrl } = req.body;
  if (!webhookUrl) return res.status(400).json({ message: 'webhookUrl is required' });

  await bot.setWebHook(webhookUrl);
  return res.json({ ok: true });
};

const handleUpdate = async (req, res) => {
  res.status(200).json({ ok: true, update: req.body });
};

module.exports = { setupWebhook, handleUpdate };
