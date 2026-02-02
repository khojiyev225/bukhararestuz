const express = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const { listOrders, createOrder, updateOrder } = require('../controllers/order.controller');

const router = express.Router();

router.get('/', requireAuth, requireRole(['admin', 'manager', 'delivery']), listOrders);
router.post('/', requireAuth, createOrder);
router.put('/:id', requireAuth, requireRole(['admin', 'manager', 'delivery']), updateOrder);

module.exports = router;
