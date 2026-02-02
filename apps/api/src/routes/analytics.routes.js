const express = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const { getDashboardStats } = require('../controllers/analytics.controller');

const router = express.Router();

router.get('/dashboard', requireAuth, requireRole(['admin', 'manager']), getDashboardStats);

module.exports = router;
