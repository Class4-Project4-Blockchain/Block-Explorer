const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/controllers');

router.get('/', ctrl.Api.getblock);

module.exports = router;