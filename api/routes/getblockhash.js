const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/procedure');

router.post('/', ctrl.getBlockHash.getblockhash)

module.exports = router;