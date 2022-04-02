const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/procedure');

router.get('/', ctrl.getBlockDao.blockcheck);

module.exports = router;