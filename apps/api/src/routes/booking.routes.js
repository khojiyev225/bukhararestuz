const express = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const { listBookings, createBooking, updateBooking } = require('../controllers/booking.controller');

const router = express.Router();

router.get('/', requireAuth, requireRole(['admin', 'manager']), listBookings);
router.post('/', requireAuth, createBooking);
router.put('/:id', requireAuth, requireRole(['admin', 'manager']), updateBooking);

module.exports = router;
