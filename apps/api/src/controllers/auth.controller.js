const User = require('../models/User');

const me = async (req, res) => {
  res.json({ user: req.user });
};

const updateRole = async (req, res) => {
  const { userId, role } = req.body;
  const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
  res.json({ user });
};

module.exports = { me, updateRole };
