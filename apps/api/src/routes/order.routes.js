const express = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const { listOrders, listMyOrders, createOrder, updateOrder } = require('../controllers/order.controller');

const router = express.Router();

router.get('/', requireAuth, requireRole(['admin', 'manager', 'delivery']), listOrders);
router.get('/mine', requireAuth, listMyOrders);
router.post('/', createOrder);
router.put('/:id', requireAuth, requireRole(['admin', 'manager', 'delivery']), updateOrder);

module.exports = router;
