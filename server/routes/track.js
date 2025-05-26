const express = require('express');
const axios = require('axios');
const router = express.Router();

const FINGERPRINTJS_SECRET_KEY = process.env.FPJS_SECRET_KEY; // from .env

router.post('/fingerprint', async (req, res) => {
    const { visitorId } = req.body;

    if (!visitorId) return res.status(400).json({ error: 'Missing visitorId' });

    try {
        const response = await axios.get(`https://api.fpjs.io/visitors/${visitorId}`, {
            headers: {
                'Authorization': `Bearer ${FINGERPRINTJS_SECRET_KEY}`
            }
        });

        return res.json(response.data);
    } catch (err) {
        console.error('Error fetching FPJS data:', err.response?.data || err.message);
        return res.status(500).json({ error: 'Failed to fetch fingerprint data' });
    }
});

module.exports = router;
