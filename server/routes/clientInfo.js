const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.json({
        ip,
        userAgent: req.headers['user-agent'],
        acceptLanguage: req.headers['accept-language']
    });
});

module.exports = router;
