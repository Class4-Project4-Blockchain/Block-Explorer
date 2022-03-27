const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/controllers');

router.get('/', ctrl.Api.getblock);
router.get('/getblockcount', ctrl.Api.getblockcount);
router.get('/getblockhash', (req, res) => res.render('getblockhash'));
router.post('/getblockhash_result', ctrl.Api.getblockhash)

module.exports = router;