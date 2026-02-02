const express = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const { getSettings, upsertSettings } = require('../controllers/settings.controller');

const router = express.Router();

router.get('/', getSettings);
router.post('/', requireAuth, requireRole(['admin']), upsertSettings);

module.exports = router;
