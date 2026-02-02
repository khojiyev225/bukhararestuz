const express = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const { listBookings, listMyBookings, createBooking, updateBooking } = require('../controllers/booking.controller');

const router = express.Router();

router.get('/', requireAuth, requireRole(['admin', 'manager']), listBookings);
router.get('/mine', requireAuth, listMyBookings);
router.post('/', createBooking);
router.put('/:id', requireAuth, requireRole(['admin', 'manager']), updateBooking);

module.exports = router;
