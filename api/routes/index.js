const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("메인");
});

module.exports = router;