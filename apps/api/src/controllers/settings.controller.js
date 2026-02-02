const Setting = require('../models/Setting');

const getSettings = async (req, res) => {
  const settings = await Setting.findOne();
  res.json({ settings });
};

const upsertSettings = async (req, res) => {
  const existing = await Setting.findOne();
  const settings = existing
    ? await Setting.findByIdAndUpdate(existing._id, req.body, { new: true })
    : await Setting.create(req.body);
  res.json({ settings });
};

module.exports = { getSettings, upsertSettings };
