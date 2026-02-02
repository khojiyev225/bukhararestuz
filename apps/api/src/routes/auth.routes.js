const express = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const { me, updateRole } = require('../controllers/auth.controller');

const router = express.Router();

router.get('/me', requireAuth, me);
router.post('/role', requireAuth, requireRole(['admin']), updateRole);

module.exports = router;
