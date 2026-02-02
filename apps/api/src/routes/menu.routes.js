const express = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const { listMenu, createMenu, updateMenu, deleteMenu } = require('../controllers/menu.controller');

const router = express.Router();

router.get('/', listMenu);
router.post('/', requireAuth, requireRole(['admin', 'manager']), createMenu);
router.put('/:id', requireAuth, requireRole(['admin', 'manager']), updateMenu);
router.delete('/:id', requireAuth, requireRole(['admin']), deleteMenu);

module.exports = router;
