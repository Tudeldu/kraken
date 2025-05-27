import express from 'express';
import axios from 'axios';
import { FingerprintJsServerApiClient, Region } from '@fingerprintjs/fingerprintjs-pro-server-api';

const router = express.Router();

router.post('/fingerprint', async (req, res) => {
    const { visitorId } = req.body;

    if (!visitorId) return res.status(400).json({ error: 'Missing visitorId' });

    try {
        const client = new FingerprintJsServerApiClient({
            apiKey: process.env.FPJS_SECRET_KEY,
            region: Region.EU,
        });

        // Await the visitor history result
        const visitorHistory = await client.getVisitorHistory(visitorId);

        return res.json(visitorHistory);
    } catch (err) {
        console.error('Error fetching FPJS data:', err.response?.data || err.message);
        return res.status(500).json({ error: 'Failed to fetch fingerprint data' });
    }
});

export default router;