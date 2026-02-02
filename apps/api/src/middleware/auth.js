const { getAuth } = require('../config/firebase');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.replace('Bearer ', '') : null;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = await getAuth().verifyIdToken(token);
    let user = await User.findOne({ uid: decoded.uid });
    if (!user) {
      user = await User.create({
        uid: decoded.uid,
        email: decoded.email || '',
        phone: decoded.phone_number || '',
        name: decoded.name || decoded.email || 'Client',
        role: 'client'
      });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const requireRole = (roles = []) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  return next();
};

module.exports = { requireAuth, requireRole };
