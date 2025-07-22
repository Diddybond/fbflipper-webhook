const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Required to parse JSON in POST bodies
app.use(express.json());

// Token for verification (must match the one you put in the eBay dashboard)
const VERIFICATION_TOKEN = 'fbflipper-verify-token-45c70d85e3b948f5a4be1234567890aa';

// Verification handler — this is where eBay checks your server
app.get('/', (req, res) => {
  const token = req.query.verification_token;
  if (token === VERIFICATION_TOKEN) {
    res.send(token);
  } else {
    res.status(400).send('Invalid verification token');
  }
});

// Handle actual POST notifications (optional for now)
app.post('/', (req, res) => {
  console.log('Received notification:', req.body);
  res.status(200).send('OK');
});

// Start server
app.listen(port, () => {
  console.log(`Webhook listening at http://localhost:${port}`);
});
