const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../controllers/webhookController');

// Endpoint: POST /api/v1/webhook/receive
router.post('/receive', handleWebhook);

module.exports = router;
