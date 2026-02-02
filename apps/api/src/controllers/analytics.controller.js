const Order = require('../models/Order');
const Booking = require('../models/Booking');
const User = require('../models/User');

const getDashboardStats = async (req, res) => {
  const [orders, bookings, users] = await Promise.all([
    Order.countDocuments(),
    Booking.countDocuments(),
    User.countDocuments()
  ]);
  res.json({
    orders,
    bookings,
    users
  });
};

module.exports = { getDashboardStats };
