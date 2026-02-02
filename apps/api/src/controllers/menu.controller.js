const MenuItem = require('../models/MenuItem');

const listMenu = async (req, res) => {
  const items = await MenuItem.find().sort({ createdAt: -1 });
  res.json({ items });
};

const createMenu = async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.status(201).json({ item });
};

const updateMenu = async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ item });
};

const deleteMenu = async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};

module.exports = { listMenu, createMenu, updateMenu, deleteMenu };
