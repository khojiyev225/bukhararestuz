const { getAuth } = require('../config/firebase');
const User = require('../models/User');

const parseList = (value) =>
  (value || '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.replace('Bearer ', '') : null;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = await getAuth().verifyIdToken(token);
    const adminEmails = parseList(process.env.ADMIN_EMAILS);
    const adminUids = parseList(process.env.ADMIN_UIDS);
    const managerEmails = parseList(process.env.MANAGER_EMAILS);
    const managerUids = parseList(process.env.MANAGER_UIDS);
    const deliveryEmails = parseList(process.env.DELIVERY_EMAILS);
    const deliveryUids = parseList(process.env.DELIVERY_UIDS);

    const normalizedEmail = (decoded.email || '').toLowerCase();
    const uid = decoded.uid || '';

    let role = 'client';
    if (adminEmails.includes(normalizedEmail) || adminUids.includes(uid)) {
      role = 'admin';
    } else if (managerEmails.includes(normalizedEmail) || managerUids.includes(uid)) {
      role = 'manager';
    } else if (deliveryEmails.includes(normalizedEmail) || deliveryUids.includes(uid)) {
      role = 'delivery';
    }

    let user = await User.findOne({ uid: decoded.uid });
    if (!user) {
      user = await User.create({
        uid: decoded.uid,
        email: decoded.email || '',
        phone: decoded.phone_number || '',
        name: decoded.name || decoded.email || 'Client',
        role
      });
    } else if (role !== user.role && role !== 'client') {
      user.role = role;
      await user.save();
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
