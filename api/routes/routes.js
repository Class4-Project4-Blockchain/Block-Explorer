const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/controllers');
const rpc = require('../rpc/getRpcBlock');

// router.get('/', ctrl.Api.getblock);
router.post('/test', rpc);

module.exports = router;