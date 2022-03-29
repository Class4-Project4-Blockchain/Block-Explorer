const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/procedure');

router.get('/', ctrl.getBlockCount.getblockcount);
router.get('/test', ctrl.rpcOptionsTest.test);

module.exports = router;