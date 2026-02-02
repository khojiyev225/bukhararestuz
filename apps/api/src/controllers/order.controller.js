const Order = require('../models/Order');
const { sendTelegramMessage } = require('../config/telegram');

const listOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json({ orders });
};

const listMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user?._id }).sort({ createdAt: -1 });
  res.json({ orders });
};

const createOrder = async (req, res) => {
  const order = await Order.create({
    ...req.body,
    user: req.user?._id
  });
  await sendTelegramMessage(`🧾 New order: ${order._id} | Total: ${order.total}`);
  res.status(201).json({ order });
};

const updateOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ order });
};

module.exports = { listOrders, listMyOrders, createOrder, updateOrder };
