const express = require('express');
const crypto = require('crypto');
const app = express();
const port = process.env.PORT || 3000;

const VERIFICATION_TOKEN = 'fbflipper-verify-token-45c70d85e3b948f54abe123d567980aa';
const ENDPOINT_URL = 'https://fbflipper-webhook.onrender.com';

app.use(express.json());

// eBay Challenge for Marketplace Deletion verification
app.get('/', (req, res) => {
  const challengeCode = req.query.challenge_code;

  if (!challengeCode) {
    return res.status(400).send('Missing challenge_code');
  }

  const rawString = challengeCode + VERIFICATION_TOKEN + ENDPOINT_URL;
  const hash = crypto.createHash('sha256').update(rawString).digest('hex');

  return res.status(200).json({ challengeResponse: hash });
});

// Optional logging for actual POST notifications
app.post('/', (req, res) => {
  console.log('Received POST:', req.body);
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Webhook running on http://localhost:${port}`);
});
