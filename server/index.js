const express = require('express');
const path = require('path');
const clientInfoRoute = require('./routes/clientInfo');
const trackRoute = require('./routes/track');

const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use('/api/client-info', clientInfoRoute);
app.use('/api/track', trackRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
