const Booking = require('../models/Booking');

const listBookings = async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json({ bookings });
};

const createBooking = async (req, res) => {
  const booking = await Booking.create({
    ...req.body,
    user: req.user?._id
  });
  res.status(201).json({ booking });
};

const updateBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ booking });
};

module.exports = { listBookings, createBooking, updateBooking };
