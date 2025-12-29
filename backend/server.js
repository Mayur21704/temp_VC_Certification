const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

// Routes
app.use('/api', apiRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Credential Engine running on http://localhost:${PORT}`);
});