const express = require('express');
const router = express.Router();
const autoInsert = require('../controllers/autoInsert');

router.get('/', (req, res) => {
    autoInsert
});

module.exports = router;