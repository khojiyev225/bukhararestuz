const express = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const { setupWebhook, handleUpdate } = require('../controllers/telegram.controller');

const router = express.Router();

router.post('/webhook', handleUpdate);
router.post('/setup', requireAuth, requireRole(['admin']), setupWebhook);

module.exports = router;
