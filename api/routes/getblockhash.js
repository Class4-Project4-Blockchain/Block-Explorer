const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/procedure');

router.get('/', (req, res) => res.render('getblockhash'));
router.post('/result', ctrl.getBlockHash.getblockhash)

module.exports = router;