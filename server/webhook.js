const express = require('express');
const router = express.Router();
const { handleWebhook } = require('./webhookController');

router.post('/', express.raw({ type: 'application/json' }), handleWebhook);

module.exports = router;
